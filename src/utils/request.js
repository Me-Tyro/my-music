import axios from 'axios'

export const request = (url, params) => {
  const instance = axios.create({
    baseURL: 'http://localhost:8080'
  })

  // 判断用户是否传入了 params
  if (params) {
    params = {
      params: params
    }
    return instance.get(url, params)
  } else {
    return instance.get(url)
  }
}
