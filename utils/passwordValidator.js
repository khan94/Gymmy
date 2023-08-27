const passwordValidator = (password) => {
  if (password.toUpperCase() === password) {
    throw new Error('Password must contain at least one lower case character')
  }
  if (password.toLowerCase() === password) {
    throw new Error('Password must contain at least one upper case character')
  }
  if (!/\d/.test(password)) {
    throw new Error('Password must contain at least one number')
  }
  if (password.length < 8) {
    throw new Error('Password must contain at least 8 characters')
  }
}

export default passwordValidator
