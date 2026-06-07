import { JwtPayload } from '../utils/jwt'

// Nambahin properti `user` ke object Request bawaan Express.
// Diisi sama middleware auth setelah token terbukti asli, biar
// controller bisa baca req.user buat tau "ini siapa yang lagi login".
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export {}
