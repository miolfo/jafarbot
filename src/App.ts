import * as express from "express";
import IrcConnect from "./IrcConnect";
import JbConfig from "./JbConfig";
import DiscordModule from "./modules/DiscordModule";
import HelpModule from "./modules/HelpModule";
import TimedMessageModule from "./modules/TimedMessageModule";

class App {
  public express;

  constructor() {
    this.express = express();
    this.mountRoutes();
    this.initIrcConnection();
  }

  private mountRoutes(): void {
    const router = express.Router();
    router.get("/", (req, res) => {
      res.json({
        message: "Hello World with upd",
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

  private initIrcConnection() {
    const modules = [];
    modules.push(new DiscordModule());
    modules.push(new TimedMessageModule());
    const irc = new IrcConnect(modules);
    irc.Connect();

    const helpModule = new HelpModule();
    helpModule.Initialize(modules, irc.ircClient);
  }
}

export default new App().express;
