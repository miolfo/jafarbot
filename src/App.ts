import * as express from 'express'
import IrcConnect from './IrcConnect'
import JbConfig from './JbConfig';

class App {
  public express

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World with upd'
      })
    })
    router.post('/connect-to-chat', (req, res) => {
      new IrcConnect().Connect();
      res.json({
        message: 'connecting to IRC'
      })
    })
    router.post('/get-config', (req, res) => {
      let conf = new JbConfig();
      res.json({
        message: conf.getConfigObject()
      })
    })
    this.express.use('/', router)
  }
}

export default new App().express
