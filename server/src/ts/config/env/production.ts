import Config from "./config.class";

let config = new Config(
    "productionSessionSecret",
    "mongodb://localhost/moneyv2",
    "ejs");
export default config;
