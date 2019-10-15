import find from 'local-devices';

let probeTimer;
let publish;

const execute = () => {
  find().then((devices) => {
    console.log(devices);
    // publish('', probe(), { qos: 2, retain: true });
  }).catch((e) => {
    console.warn(e);
    console.warn('Error executing ping, additional logs shown above');
  });
};

export const setup = ({ publishFunction, interval }) => {
  publish = publishFunction;
  probeTimer = setInterval(execute, interval);
};

export const onMessage = (topic, message) => {
  console.log(`Received new message on topic ${topic}: ${message}`);
};

export const cleanup = () => {
  clearInterval(probeTimer);
  console.log('cleaned up');
};
