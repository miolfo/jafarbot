import * as irc from "irc";
import JbConfig from "../JbConfig";
import IBaseModule from "./IBaseModule";

export default class HelpModule {
  public Initialize(modules: IBaseModule[], ircClient: irc.Client) {
    const config = new JbConfig();
    let msg: string = "";
    modules.forEach((module) => {
      if (module.GetHelpMessage) {
        msg += module.GetHelpMessage() + "\n";
      }
    });

    ircClient.addListener("message", (from, to, message) => {
      if (message.startsWith("!help")) {
        ircClient.say("#" + config.getChannel(), msg);
      }
    });
  }
}
