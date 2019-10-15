import mqttCredentials from './credentials';


const config = {
  global: {
    modules: {
      // template: {
      //   prettyName: 'Template module',
      //   config: {
      //     interval: 5000,
      //     pin: 600,
      //   },
      // },
      dht: {
        prettyName: 'DHT',
        config: {
          pin: 17,
          interval: 5000,
        },
      },
      // os: {
      //   prettyName: 'System stats',
      //   config: {
      //     interval: 60000,
      //   },
      // },
    },
    // modules: [
    //   {
    //     name: 'dht',
    //     prettyName: 'DHT',
    //     config: {
    //       dataPin: 17,
    //       probingInterval: 300,
    //       savingInterval: 600,
    //     },
    //   },
    //   {
    //     name: 'os',
    //     prettyName: 'System stats',
    //     config: {
    //       probingInterval: 300,
    //       savingInterval: 600,
    //     },
    //   },
    // ],
  },
  development: {
    debugging: true,
  },
  production: {
    debugging: false,
  },
};

const env = process.env.NODE_ENV || 'development';
const fullConfig = Object.assign(
  config.global,
  mqttCredentials,
  config[env],
);

export default fullConfig;
