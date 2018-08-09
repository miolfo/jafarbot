import * as express from 'express'

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
      res.json({
        message: 'connecting to IRC'
      })
    })
    this.express.use('/', router)
  }
}

export default new App().express
