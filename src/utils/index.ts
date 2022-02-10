import { BASE_URL } from '../constants'

export const getAPIUrl = (nestedPath: string = ''): string => [BASE_URL, nestedPath].filter(Boolean).join('/')
