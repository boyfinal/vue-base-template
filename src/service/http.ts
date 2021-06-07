import { HTTPOption } from './http.d'
import { isEmpty } from '../utils'
import { useRouter } from 'vue-router'

export const HTTP_STATUS_TOKEN_EXPIRED = 401
export const HTTP_STATUS_UNAUTHORIZED = 401
export const SERVER_ERROR_MESSAGE = 'Sorry, an unexpected error occurred. Please try again later.'
export const RESPONSE_TYPE_JSON = 'json'
export const RESPONSE_TYPE_BLOB = 'blob'

const http = {
  async request(method: string, url: string, data: object, options: HTTPOption|string) {
    const apiUrl = url.indexOf("http") === 0 ? url : `${process.env.VUE_APP_BASE_API_ENDPOINT}${url}`
    const type = typeof options === 'string' ? options : options.type || RESPONSE_TYPE_JSON
    
    
    const init :RequestInit = {
      method: method.toUpperCase(),
      headers: options.headers || undefined,
    }

    if (!isEmpty(data)) {
      init.body = JSON.stringify(data)
    }

    if (data instanceof ArrayBuffer || data instanceof FormData) {
      init.body = data
    }

    let response = await fetch(apiUrl, init)

    const router = useRouter()
    if (response && response.status == HTTP_STATUS_UNAUTHORIZED) {
      router.push({ name: 'sign-in' })
      return
    }

    if (!response.ok) {
      let data = {}
      try {
        data = await response.json()
      } catch (error) {
        data = {}
      }

      data.errorMessage = data.message || data.error || SERVER_ERROR_MESSAGE
      data.errors = data.errors || data.validates || []

      return Object.assign(
        {
          success: false,
          error: true,
          requestError: true,
          statusCode: response.status,
        },
        data
      )
    }

    if (type === RESPONSE_TYPE_JSON) {
      return await response.json()
    }

    if (type === RESPONSE_TYPE_BLOB) {
      return await response.blob()
    }

    return await response.text()
  } catch (e) {
    return {
      success: false,
      error: true,
      requestError: true,
      errorMessage: SERVER_ERROR_MESSAGE,
    }
  }
  },
  get() {},
};
