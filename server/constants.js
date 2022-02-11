import path, { join } from 'path'
import { fileURLToPath } from 'url'

export const SERVER_ROOT_PATH = path.dirname(fileURLToPath(import.meta.url))

export const DB_FILE_PATH = join(SERVER_ROOT_PATH, '../db.json')

export const SERVER_URL = process.env.CODESANDBOX_SSE ? 'https://kvwuy-3001.sse.codesandbox.io/rest' : 'http://localhost:3001/rest'
