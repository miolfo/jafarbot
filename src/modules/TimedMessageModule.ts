import JbConfig from "../JbConfig";
import IBaseModule from "./IBaseModule";
import IMessage from "./IMessage";

export default class TimedMessageModule implements IBaseModule {
  public Initialize(ircClient: any) {
    const config = new JbConfig();
    const timedMessage = "timed message!";
    setTimeout(() => {
      ircClient.say("#" + config.getChannel(), timedMessage);
    }, 60 * 5 * 1000);
  }

  public HandleMessage(message: IMessage): string {
    return "";
  }
}
