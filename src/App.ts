import * as express from "express";
import IrcConnect from "./IrcConnect";
import JbConfig from "./JbConfig";
import DiscordModule from "./modules/DiscordModule";
import HelpModule from "./modules/HelpModule";
import IBaseModule from "./modules/IBaseModule";
import TimedMessageModule from "./modules/TimedMessageModule";
import TwitchApi from "./twitch/TwitchApi";

class App {
  public express;
  private config: JbConfig;

  constructor() {
    this.express = express();
    this.config = new JbConfig();
    this.mountRoutes();
    this.initIrcConnection();
  }

  private mountRoutes(): void {
    const router = express.Router();
    const apiTest = new TwitchApi();
    router.get("/", (req, res) => {
      apiTest.getStreamStatus();
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

    this.addIfNotBlacklisted(modules, new DiscordModule());
    this.addIfNotBlacklisted(modules, new TimedMessageModule());
    const irc = new IrcConnect(modules);
    irc.Connect();

    const helpModule = new HelpModule();
    helpModule.Initialize(modules, irc.ircClient);
  }

  private addIfNotBlacklisted(modules: IBaseModule[], module: IBaseModule) {
    if (this.config.getDisabledModules().indexOf(module.GetName()) === -1) {
      console.log("Adding module " + module.GetName() + " to allowed modules!");
      modules.push(module);
    } else {
      console.log("Not adding module " + module.GetName() +
      " to allowed modules since it is included in blacklisted modules!");
    }
  }

}

export default new App().express;
