import isBrowser from 'is-in-browser'
import { Dispatch } from 'redux'
if (!isBrowser) {
  require('isomorphic-fetch')
}
const { getCookie } = require('redux-cookie')

const apiRootUrl = 'http://localhost:8889/api'

export function get<R>(url: string, opts: RequestInit = {}) {
  return new Promise<R>((resolve, reject) => {
    fetch(apiRootUrl + url, {
      ...opts,
      headers: { 'Content-Type': 'application/json', ...opts.headers },
    })
      .then(response => {
        resolve(response.json())
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const post = <R>(url: string, opts: RequestInit = {}) =>
  get<R>(url, { method: 'POST', ...opts })

export const put = <R>(url: string, opts: RequestInit = {}) =>
  get<R>(url, { method: 'PUT', ...opts })

export const del = <R>(url: string, opts: RequestInit = {}) =>
  get<R>(url, { method: 'DELETE', ...opts })

export function withToken<R>(
  request: <RE>(url: string, opts: RequestInit) => Promise<RE>,
  url: string,
  opts: RequestInit = {},
) {
  return (dispatch: Dispatch<any>) => {
    return request<R>(url, {
      ...opts,
      headers: {
        ...(opts.headers || {}),
        Authorization: 'Bearer ' + dispatch(getCookie('token')),
      },
    })
  }
}
