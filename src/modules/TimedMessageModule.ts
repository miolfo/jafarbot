import JbConfig from "../JbConfig";
import IBaseModule from "./IBaseModule";
import IMessage from "./IMessage";

import * as timedMessageConfig from "./configs/TimedMessageModuleConf.json";

export default class TimedMessageModule implements IBaseModule {
  public Initialize(ircClient: any) {
    const config = new JbConfig();
    const timedMessage = timedMessageConfig.timedMessage;
    setTimeout(() => {
      ircClient.say("#" + config.getChannel(), timedMessage);
    }, timedMessageConfig.timedIntervalMs);
  }

  public GetName() {
    return "TimedMessageModule";
  }

  public HandleMessage(message: IMessage): string {
    return "";
  }
}
