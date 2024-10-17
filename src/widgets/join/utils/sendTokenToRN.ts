import { sendRNFunction } from '@/shared'

function sendTokenToRN(value: string) {
  if (value.length === 0) sendRNFunction('getLoginToken', { result: 'fail' })
  else sendRNFunction('getLoginToken', { result: 'success', token: value })
}

export { sendTokenToRN }
