const getTokenFromCookie = () => {
  const name = 'access_token'
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  if (match) return match[2]

  return null
}

const setTokenFromCookie = (value: string, days?: number) => {
  const name = 'access_token'
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

export { getTokenFromCookie, setTokenFromCookie }
