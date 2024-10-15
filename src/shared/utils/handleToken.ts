const setTokenFromLocalStorage = (accessToken: string) => {
  localStorage.setItem('access_token', accessToken)
}

const getTokenFromLocalStorage = () => {
  const accessToken = localStorage.getItem('access_token')
  if (!accessToken) return null
  return accessToken
}

export { setTokenFromLocalStorage, getTokenFromLocalStorage }
