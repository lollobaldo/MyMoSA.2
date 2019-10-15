// // import rpio from 'rpio';

// let probeTimer;
// let publish;

// const execute = (sensorType, pin) => {
//   console.log('Attempting a read');
// };

// export const setup = ({
//   publishFunction,
//   sensorType,
//   pin,
//   interval,
// }) => {
//   publish = publishFunction;
//   probeTimer = setInterval(execute.bind(this, sensorType, pin), interval);
// };

// export const onMessage = (topic, message) => {
//   console.log(`Received new message on topic ${topic}: ${message}`);
// };

// export const cleanup = () => {
//   clearInterval(probeTimer);
//   console.log('cleaned up');
// };
