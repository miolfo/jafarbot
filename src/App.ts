import * as express from "express";
import IrcConnect from "./IrcConnect";
import JbConfig from "./JbConfig";
import DiscordModule from "./modules/DiscordModule";

class App {
  public express;

  constructor() {
    this.express = express();
    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router();
    router.get("/", (req, res) => {
      res.json({
        message: "Hello World with upd",
      });
    });
    router.post("/connect-to-chat", (req, res) => {
      const modules = [];
      modules.push(new DiscordModule());
      new IrcConnect(modules).Connect();
      res.json({
        message: "connecting to IRC",
      });
    });
    router.post("/get-config", (req, res) => {
      const conf = new JbConfig();
      res.json({
        message: conf.getConfigObject(),
      });
    });
    this.express.use("/", router);
  }
}

export default new App().express;
