
import * as jwt from 'jsonwebtoken'
import { Payload, TokenManager } from '../../domain/token-manager'

export class JwtTokenManager implements TokenManager {
  private readonly secret: string

  constructor (secret: string) {
    this.secret = secret
  }

  async sign (info: Payload, expires?: string): Promise<string> {
    if (expires) {
      return jwt.sign(info, this.secret, { expiresIn: expires })
    }
    return jwt.sign(info, this.secret, { expiresIn: '30d' })
  }

  async verify (token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, this.secret) as Payload
      return decoded
    } catch (error) {
      throw new Error('Failed to verify token')
    }
  }
}
