import * as configJson from '../jbconfig.json';

export default class JbConfig {
    constructor() {
      this.oauthToken = configJson.twitchOauthToken;
      this.nick = configJson.nickname;
      this.ircServer = configJson.ircServer;
      this.channel = configJson.channel;
      this.configObject = configJson;
    }

    private oauthToken: String;
    private nick: String;
    private channel: String;
    private ircServer: String;
    private configObject: object;

    public getOauthToken() : String {
      return this.oauthToken;
    }

    public getNick() : String {
      return this.nick;
    }

    public getChannel() : String {
      return this.channel;
    }

    public getIrcServer() : String {
      return this.ircServer;
    }

    public getConfigObject() : object {
      return this.configObject;
    }
}