export function sendRNFunction(funcName: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { ReactNativeWebView } = window as any
  if (ReactNativeWebView) {
    ReactNativeWebView.postMessage(JSON.stringify({ type: funcName }))
  }
}
