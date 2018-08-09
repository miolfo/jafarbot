import * as irc from 'irc-connect'
import * as fs from 'fs'

export default class IrcConnect {
  public Connect () {
    const oauthToken = fs.readFileSync('.oauthtoken', 'utf8');
  }
}


const ircOptions = {
	//[port] if not provided defaults to 6667 (or if secure, 6697)
	port: 6667,
	//[secure] can be true/false or 'semi' for lazy CA checking (self-signed, obscure CA, etc)
	secure: false,
	//[nick] is the desired nickname, if not provided one will be generated (you can always use nick() later)
	nick: 'JafarinLeukaBot',
	//[realname] is the "real name" shown in WHOIS results
	realname: 'Jafarin Leuka'
}