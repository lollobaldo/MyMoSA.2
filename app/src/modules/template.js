let probeTimer;
let publish;

const execute = (pin) => {
  console.log(`Executing probe on pin ${pin}`);
  publish('', 'ciaone123', { qos: 2, retain: true });
  // publish('ciaoo');
};

export const setup = ({ publishFunction, interval, pin }) => {
  publish = publishFunction;
  probeTimer = setInterval(execute.bind(this, pin), interval);
};

export const onMessage = ({ topic, message }) => {
  console.log(`Received new message on topic ${topic}: ${message}`);
};

export const cleanup = () => {
  clearInterval(probeTimer);
  console.log('cleaned up');
};

// export default setup;
