export const ciao = () => {
  // eslint-disable-next-line no-unused-vars
  const cc = 10;
  return null;
};

export const logger = {
  error: (msg) => {
    console.error(msg);
  },
  warn: (msg) => {
    console.warn(msg);
  },
  log: (msg) => {
    console.log(msg);
  },
};

export const defaultCleanup = (module) => {
  logger.log(`Cleaned module: ${module.prettyName}`);
};

export default ciao;
