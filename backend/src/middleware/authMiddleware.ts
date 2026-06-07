import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'

// 🛡️ Satpam: dipasang di depan endpoint yang butuh login.
// Cek token di header Authorization, kalau asli -> lanjut, kalau nggak -> tendang 401.
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // 1) Ambil header. Formatnya: "Bearer <token>"
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token tidak ada' })
    }

    // 2) Potong kata "Bearer " biar dapet token-nya doang
    const token = authHeader.split(' ')[1]

    // 3) Cek cap-nya. Kalau palsu/expired -> verifyToken lempar error -> ke catch
    const payload = verifyToken(token)

    // 4) Tempelin info user ke req, biar controller tau ini siapa
    req.user = payload

    // 5) Lolos pemeriksaan -> "silakan masuk"
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid' })
  }
}
