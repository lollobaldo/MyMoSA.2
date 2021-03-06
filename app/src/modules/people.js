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
    case 'Galaxy-J5.home':
      return 'lorenzo';
    case 'marcos-iPhone.home':
      return 'marco';
    case 'VittoriosiPhone.home':
      return 'vittorio';
    case 'WillKempsiPhone.home':
      return 'will';
    default:
      return false;
  }
};

const execute = () => {
  find().then((devices) => {
    // console.log(devices);
    const people = devices
      .map(({ name }) => nameToMate(name))
      .filter(name => !!name);
    // console.log(devices.map(({ name }) => name));
    // console.log(devices.map(({ name }) => nameToMate(name)));
    // console.log(people);
    // console.log(inHouse);
    Object.keys(inHouse).forEach((p) => {
      if (inHouse[p] !== people.includes(p)) {
        inHouse[p] = !inHouse[p];
        const time = dayjs().format('hh:mm');
        console.log(
          `${p} ${inHouse[p] ? 'arrived in' : 'left'} the house at ${time}`,
        );
        publish(p, `${inHouse[p] ? 'IN' : 'OUT'} at ${time}`);
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
  // console.log(`Received new message on topic ${topic}: ${message}`);
};

export const cleanup = () => {
  clearInterval(probeTimer);
  console.log('cleaned up');
};
