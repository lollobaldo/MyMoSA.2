import find from 'local-devices';
import dayjs from 'dayjs';

let probeTimer;
let publish;

const inHouse = {
  jack: false,
  lorenzo: false,
  marco: false,
  vittorio: false,
  will: false,
};

const nameToMate = (name) => {
  switch (name) {
    case 'Galaxy-J5':
      return 'lorenzo';
    case 'marcos-iPhone.home':
      return 'marco';
    case 'WillKempsiPhone.home':
      return 'will';
    default:
      return false;
  }
};

const execute = () => {
  find().then((devices) => {
    console.log(devices);
    const people = devices
      .map(({ name }) => nameToMate(name))
      .filter(name => !!name);
    Object.keys(inHouse).foreach((p) => {
      if (inHouse[p] !== people.contains(p)) {
        inHouse[p] = !inHouse[p];
        console.log(
          `${p}
          ${inHouse[p] ? 'arrived in' : 'left'}
          the house at ${dayjs().format('hh:mm')}`,
        );
      }
    });
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
