import { createLogger, transports as _transports, format as _format } from 'winston';

const getLogFormat = (info) => {
  const stack = info.stack ? `\n${info.stack}` : '';
  return `[${info.timestamp}] [${info.level.toUpperCase()}]> ${
    info.message
  } ${stack}`;
};

const winstonLogger = createLogger({
  transports: [
    new _transports.Console({
      format: _format.combine(
        _format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSS' }),
        _format.printf((info) => getLogFormat(info)),
      ),
    }),
  ],
});

export default winstonLogger;
