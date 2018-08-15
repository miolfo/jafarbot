import * as fs from 'fs'
import * as irc from 'irc'
import JbConfig from './JbConfig';

export default class IrcConnect {

  public Connect () {
    let config = new JbConfig();
    let client = new irc.Client(config.getIrcServer(), config.getNick(),{
      password: config.getOauthToken(),
      debug: true,
      autoConnect: false
    });

    client.addListener('error', function(message) {
      console.log('error: ', message);
    });

    client.connect(1, function(msg) {
      client.send('CAP REQ', 'twitch.tv/membership');
      client.join('#' + config.getChannel(), function(msg){
        client.say('#' + config.getChannel(), 'hello world!');
        client.addListener('message', function (from, to, message) {
          console.log(from + ' => ' + to + ': ' + message);
      });
      });
    });
  }
}