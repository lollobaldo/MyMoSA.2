import mqttCredentials from './credentials';

// IMPORTANT: Pins to be indicated by their physical pin number
// Use
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
      // os: {
      //   prettyName: 'System stats',
      //   config: {
      //     interval: 60000,
      //   },
      // },
      people: {
        prettyName: 'Flatmates presence',
        config: {
          interval: 30000,
        },
      },
      // dht: {
      //   prettyName: 'Humidity and Temperature',
      //   config: {
      //     sensorType: 11,
      //     pin: 11,
      //     interval: 5000,
      //   },
      // },
      // plant: {
      //   prettyName: 'Plant water level',
      //   config: {
      //     pin: 12,
      //     interval: 5000,
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
