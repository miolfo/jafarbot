import fetch from "node-fetch";
import JbConfig from "../JbConfig";

export default class TwitchApi {

  private clientId: string;
  private streamsBaseUrl: string = "https://api.twitch.tv/helix/streams/?user_login=";
  private conf: JbConfig;

  constructor() {
    this.conf = new JbConfig();
    this.clientId = this.conf.getTwitchClientId();
    console.log("initializing twitch api");
  }

  public getStreamStatus() {
    return this.getStreamInfo();
  }

  private async getStreamInfo() {
    console.log("async");
    const result = await fetch(this.streamsBaseUrl + this.conf.getChannel(), {
      headers: {
        "Client-ID": this.conf.getTwitchClientId(),
      },
    });
    const json = await result.json();
    console.log(json);
  }
}
