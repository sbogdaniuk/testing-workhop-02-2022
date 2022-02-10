import { BASE_URL } from '../constants'

export const getAPIUrl = (nestedPath: string = '') => [BASE_URL, nestedPath].filter(Boolean).join('/')
