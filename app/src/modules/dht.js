import { getGpioNumber } from 'raspi-board';
import sensor from 'node-dht-sensor';

let probeTimer;
let publish;

const execute = (sensorType, pin) => {
  // console.log('Attempting a read');
  sensor.read(sensorType, pin, (err, temperature, humidity) => {
    if (!err) {
      const result = {
        temperature: temperature.toFixed(1),
        humidity: humidity.toFixed(1),
      };
      console.log(result);
      publish('', result, { qos: 2, retain: true });
    } else {
      console.log(err);
      console.log('Error incurred, see details above');
    }
  });
};

export const setup = ({
  publishFunction,
  sensorType,
  pin,
  interval,
}) => {
  publish = publishFunction;
  console.log('board');
  const gpio = getGpioNumber(`P1-${pin}`);
  probeTimer = setInterval(execute.bind(this, sensorType, gpio), interval);
};

export const onMessage = (topic, message) => {
  // console.log(`Received new message on topic ${topic}: ${message}`);
};

export const cleanup = () => {
  clearInterval(probeTimer);
  console.log('cleaned up');
};
