export { Request, Response } from 'express'

export class AuthController {
  static async register (req: Request, res: Response): Promise<Response> {}
  static async login (req: Request, res: Response): Promise<Response> {}
}
