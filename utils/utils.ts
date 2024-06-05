
export const isValidEmail = (email: string) => {
  email = email.trim()
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRe.test(email)
}
