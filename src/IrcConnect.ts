import * as fs from 'fs'
import * as irc from 'irc'

export default class IrcConnect {
  public Connect () {
    const oauthToken = fs.readFileSync('.oauthtoken', 'utf8');
    let client = new irc.Client('irc.chat.twitch.tv', 'JafarinLeukaBot',{
      password: oauthToken,
      debug: true,
      autoConnect: false
    });

    client.addListener('error', function(message) {
      console.log('error: ', message);
    });

    client.connect(1, function(msg) {
      client.join('#jafarinleuka', function(msg){
        client.say('#jafarinleuka', 'hello world!');
        client.addListener('message', function (from, to, message) {
          console.log(from + ' => ' + to + ': ' + message);
      });
      });
    });
  }
}