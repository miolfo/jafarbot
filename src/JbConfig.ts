import * as configJson from "../jbconfig.json";

export default class JbConfig {

    private oauthToken: string;
    private twitchClientId: string;
    private nick: string;
    private channel: string;
    private ircServer: string;
    private disabledModules: string[];
    private configObject: object;

    constructor() {
      this.oauthToken = configJson.twitchOauthToken;
      this.twitchClientId = configJson.twitchClientId;
      this.nick = configJson.nickname;
      this.ircServer = configJson.ircServer;
      this.channel = configJson.channel;
      this.configObject = configJson;
      this.disabledModules = configJson.disabledModules;
    }

    public getOauthToken(): string {
      return this.oauthToken;
    }

    public getTwitchClientId(): string {
      return this.twitchClientId;
    }

    public getNick(): string {
      return this.nick;
    }

    public getChannel(): string {
      return this.channel;
    }

    public getIrcServer(): string {
      return this.ircServer;
    }

    public getConfigObject(): object {
      return this.configObject;
    }

    public getDisabledModules(): string[] {
      return this.disabledModules;
    }
}
