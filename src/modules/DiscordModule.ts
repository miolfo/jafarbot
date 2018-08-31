import * as discorConfig from "./configs/DiscordModuleConf.json";
import IBaseModule from "./IBaseModule";
import IMessage from "./IMessage";

export default class DiscordModule implements IBaseModule {

  private discordUrl: string;

  public Initialize() {
    this.discordUrl = discorConfig.joinDiscordUrl;
  }

  public HandleMessage(msg: IMessage): string {
    if (msg.body.startsWith("!discord")) {
      return this.discordUrl;
    }
    return "";
  }
}
