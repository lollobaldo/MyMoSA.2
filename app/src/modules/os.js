import os from 'os';

let probeTimer;
let publish;

// eslint-disable-next-line no-unused-vars
const stable = {
  platform: os.type(),
  release: os.release(),
  cpuCount: os.cpus().length,
  memTotal: os.totalmem(),
};

const probe = () => ({
  memFree: os.freemem(),
  // cpuFree: os.cpuFree(),
  cpuAver: os.loadavg(1),
});

const execute = () => {
  publish('', probe(), { qos: 2, retain: true });
  // publish('ciaoo');
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
