import sensor from 'node-dht-sensor';

let probeTimer;
let publish;

const execute = (pin) => {
  sensor.read(22, pin, (err, temperature, humidity) => {
    if (!err) {
      const result = {
        temperature: temperature.toFixed(1),
        humidity: humidity.toFixed(1),
      };
      console.log(result);
      publish('', JSON.stringify(result), { qos: 2, retain: true });
    }
  });
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
