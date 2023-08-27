import bcrypt from 'bcryptjs'

const matchPassword = async (user, enteredPassword) => {
  return await bcrypt.compare(enteredPassword, user.password)
}

export default matchPassword
