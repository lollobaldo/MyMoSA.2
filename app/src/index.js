import { connect } from 'mqtt';

import { logger } from './utils';
import appConfig from './config';

const { server, ...credentials } = appConfig.mqttCredentials;

const modules = Object.assign({}, appConfig.modules);
const trivialFunction = () => {};
const defaultExports = {
  setup: trivialFunction,
  onMessage: trivialFunction,
  cleanup: trivialFunction,
};

const client = connect(server, credentials);

const safePublish = (module, topic, message, options) => {
  const t = module + (topic ? '/' : '');
  const m = (typeof message === 'string') ? message : JSON.stringify(message);
  client.publish(t, m, options);
};

// Call setup for every module in config. Returns array of cleanup functions.
// eslint-disable-next-line no-shadow
const startup = async () => {
  Object.keys(modules).forEach(async (name) => {
    const m = modules[name];
    m.name = name;
    try {
      // Cannot use template literals. Path has to be hardcoded. Module name can change
      const { setup, onMessage, cleanup } = Object.assign(
        defaultExports,
        // eslint-disable-next-line prefer-template
        await import('./modules/' + m.name + '.js'),
      );
      logger.log(`Loaded module: ${m.prettyName}.`);
      setup({ publishFunction: safePublish.bind(null, m.name), ...m.config });
      logger.log(`Setup module: ${m.prettyName}.`);
      modules[m.name].loaded = true;
      modules[m.name].callbacks = { setup, onMessage, cleanup };
    } catch (e) {
      logger.warn(`Failed to load module: ${m.prettyName}.`);
      logger.warn(e);
    }
  });
};

client.on('connect', () => {
  logger.log('Connected to MQTT broker');
  startup().then(() => {
    Object.keys(modules).forEach((name) => {
      const m = modules[name];
      client.subscribe(m.name, (err) => {
        if (err) logger.error(err);
      });
    });
  }).catch((e) => {
    console.log(e);
    console.log('Error setting up modules. Likely more error output is shown above');
  });
});

client.on('message', (topic, message) => {
  console.log(`New message on topic ${topic}: ${message.toString()}`);
  modules[topic].callbacks.onMessage(topic, message);
});

process.on('exit', (code) => {
  logger.log(`Whoa! Exit code ${code}, cleaning up...`);
  modules.forEach((m) => {
    m.cleanup();
  });
});
