import * as fs from "fs";
import * as irc from "irc";
import JbConfig from "./JbConfig";
import IBaseModule from "./modules/IBaseModule";

export default class IrcConnect {

  private modules: IBaseModule[];

  constructor(modules: IBaseModule[]) {
    modules.forEach((module) => {
      module.Initialize();
    });
    this.modules = modules;
  }

  public Connect() {
    const config = new JbConfig();
    const client = new irc.Client(config.getIrcServer(), config.getNick(), {
      autoConnect: false,
      debug: true,
      password: config.getOauthToken(),
    });

    client.addListener("error", (message) => {
      console.log("error: ", message);
    });

    client.connect(1, (msg) => {
      client.send("CAP REQ", "twitch.tv/membership");
      client.join("#" + config.getChannel(), (_) => {
        // client.say("#" + config.getChannel(), "hello world!");
        client.addListener("message", (from, to, message) => {
          console.log(from + " => " + to + ": " + message);
          const iMessage = {
            body: message,
            channel: to,
            sender: from,
          };
          this.modules.forEach((module) => {
            const response = module.HandleMessage(iMessage);
            if (response !== "") {
              console.log("Responded with '" + response + "'");
              client.say("#" + config.getChannel(), response);
            }
          });
      });
      });
    });
  }
}
