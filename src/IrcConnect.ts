import * as fs from "fs";
import * as irc from "irc";
import JbConfig from "./JbConfig";

export default class IrcConnect {

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
        client.say("#" + config.getChannel(), "hello world!");
        client.addListener("message", (from, to, message) => {
          console.log(from + " => " + to + ": " + message);
      });
      });
    });
  }
}
