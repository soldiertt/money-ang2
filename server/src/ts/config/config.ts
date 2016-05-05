import Config from "./env/config.class";
import configDev from "./env/development";
import configProd from "./env/production";

export default function(): Config {
  if (process.env.NODE_ENV === "production") {
    return configProd;
  } else {
    return configDev;
  }
};
