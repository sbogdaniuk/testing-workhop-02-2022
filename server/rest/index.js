import jsonServer from 'json-server'
import { DB } from '../database'

export const initRESTServer = async (app) => {
  // Use default router
  app.use('/rest', jsonServer.defaults(), jsonServer.router(DB))
}
