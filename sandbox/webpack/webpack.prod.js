/**
 * This is a prod config to be merged with the Client config
 */

const {root} = require('./helpers');


module.exports = {
  entry: root('./src/client.prod.ts'),
};
