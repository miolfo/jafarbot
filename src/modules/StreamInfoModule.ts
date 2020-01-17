import * as irc from "irc";
import JbConfig from "../JbConfig";
import TwitchApi from "../twitch/TwitchApi";
import IBaseModule from "./IBaseModule";

export default class StreamInfoModule implements IBaseModule {

  private irc: any;
  private twitchApi: TwitchApi;
  private config: JbConfig;

  public Initialize(ircClient: any) {
    this.irc = ircClient;
    this.twitchApi = new TwitchApi();
    this.config = new JbConfig();
  }

  public GetName(): string {
    return "StreamInfoModule";
  }

  public GetHelpMessage?(): string {
    return "!info fetches the current stream info";
  }

  public HandleMessage(msg: import("./IMessage").default): string {
    if (msg.body.startsWith("!info")) {
      this.twitchApi.getStreamStatus()
      .then((info) => {
        this.irc.say("#" + this.config.getChannel(), info);
      });
    }
    return "";
  }
}
