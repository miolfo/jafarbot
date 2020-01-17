import fetch from "node-fetch";
import JbConfig from "../JbConfig";
import StreamInfo from "./model/StreamInfo";

export default class TwitchApi {

  private clientId: string;
  private streamsBaseUrl: string = "https://api.twitch.tv/helix/streams/?user_login=";
  private conf: JbConfig;

  constructor() {
    this.conf = new JbConfig();
    this.clientId = this.conf.getTwitchClientId();
  }

  public getStreamStatus() {
    return this.getStreamInfo();
  }

  private async getStreamInfo(): Promise<StreamInfo> {
    const result = await fetch(this.streamsBaseUrl + this.conf.getChannel(), {
      headers: {
        "Client-ID": this.conf.getTwitchClientId(),
      },
    });
    const json = await result.json();
    const info = new StreamInfo(json);
    return info;
  }
}
