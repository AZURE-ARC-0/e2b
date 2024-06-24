import { Logger } from './logs'

export const DOMAIN = process?.env?.E2B_DOMAIN || 'e2b.dev'
const DEBUG = (process?.env?.E2B_DEBUG || 'false').toLowerCase() === 'true'
const API_KEY = process?.env?.E2B_API_KEY
const ACCESS_TOKEN = process?.env?.E2B_ACCESS_TOKEN
const REQUEST_TIMEOUT_MS = 30_000  // 30s
export const KEEPALIVE_INTERVAL = 90_000 // 90s

export interface ConnectionOpts {
  apiKey?: string
  accessToken?: string
  domain?: string
  debug?: boolean
  requestTimeoutMs?: number
  logger?: Logger
}

export class ConnectionConfig {
  readonly debug: boolean
  readonly domain: string
  readonly apiUrl: string
  readonly logger?: Logger

  readonly requestTimeoutMs: number

  readonly apiKey?: string
  readonly accessToken?: string

  constructor(opts?: ConnectionOpts) {
    this.apiKey = opts?.apiKey || API_KEY
    this.debug = opts?.debug || DEBUG
    this.domain = opts?.domain || DOMAIN
    this.accessToken = opts?.accessToken || ACCESS_TOKEN
    this.requestTimeoutMs = opts?.requestTimeoutMs ?? REQUEST_TIMEOUT_MS
    this.logger = opts?.logger

    this.apiUrl = this.debug ? 'http://localhost:3000' : `https://api.${this.domain}`
  }

  getSignal(requestTimeoutMs?: number) {
    const timeout = requestTimeoutMs ?? this.requestTimeoutMs

    return timeout ? AbortSignal.timeout(timeout) : undefined
  }
}

export type Username = 'root' | 'user'

export const defaultUsername: Username = 'user'
