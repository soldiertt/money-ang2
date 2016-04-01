export default class Config {
  sessionSecret: string
  db: string
  viewEngine:string

  constructor(secret, db, engine) {
    this.sessionSecret = secret;
    this.db = db;
    this.viewEngine = engine;
  }
}
