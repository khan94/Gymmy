import jwt from 'jsonwebtoken'

export const generateTokenAsCookie = (res, userId) => {
  const token = generateToken(res, userId)
  res.cookie('jwt', token, {
    sameSite: 'none',
    secure: true,
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
}

export const generateToken = (res, userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}
