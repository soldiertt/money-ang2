import Config from './config.class'
let config = new Config(
  'developmentSessionSecret', 
  'mongodb://localhost/moneyv2',
  'ejs');
export default config;
