import bunyan from 'bunyan';
import StdoutStream from 'bunyan-stdout-stream';
import clc from 'cli-color';

const NAME = 'mqtt-traedfri';
const level = process.env.DEBUG
  ? 'debug'
  : 'info';

const stdoutStreamConfig = {
  colors: {
    10: {
      level: 't',
      source: source => source,
    },
    20: {
      level: clc.bgGreenBright('d'),
      source: source => clc.greenBright(source),
    },
    60: {
      level: clc.bgRedBright('c'),
      source: source => clc.redBright(source),
    },
  },
};

export const createLogger = (name = NAME) => bunyan.createLogger({
  name,
  streams: [
    {
      name: 'default',
      level,
      type: 'raw',
      stream: new StdoutStream(stdoutStreamConfig),
    },
  ],
});

export default createLogger();
