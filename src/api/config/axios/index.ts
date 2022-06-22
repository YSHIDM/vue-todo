import axios, { AxiosRequestConfig } from 'axios'
import config from '@/config'
import router from '@/router'
import {
  setToken,
  getToken,
  clearLocal,
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage
} from '@/libs/util'
import { RES_CODE } from '@/api/const'

const PUBLIC_KEY_MD5 = 'publicKeyMd5'

let pending: any[] = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const { CancelToken } = axios
const removePending: any = (axiosRequestConfig: AxiosRequestConfig, f: ((arg0: string) => void) | undefined) => {
  // 获取请求的url
  const flagUrl = axiosRequestConfig.url
  // 判断该请求是否在请求队列中
  const flagUrlIndex = pending.indexOf(flagUrl)
  if (flagUrlIndex !== -1) {
    // 如果在请求中，并存在f,f即axios提供的取消函数
    if (f) {
      f('取消重复请求') // 执行取消操作
    } else {
      pending.splice(flagUrlIndex, 1) // 把这条记录从数组中移除
    }
  } else if (f) {
    pending.push(flagUrl)
  }
}
/* 创建axios实例 */
export const service = axios.create({
  baseURL: config.serverUrl,
  method: 'POST',
  timeout: 60000, // 请求超时时间
})
/* request拦截器 */
service.interceptors.request.use((config: any) => {
  // neverCancel 配置项，允许多个请求
  if (!config.neverCancel) {
    // 生成cancelToken
    config.cancelToken = new CancelToken((c: any) => {
      removePending(config, c)
    })
  }
  if (config.url === '/user/signIn' || config.url === '/user/signUp') {
    config.headers[PUBLIC_KEY_MD5] = getLocalStorage(PUBLIC_KEY_MD5)
    removeLocalStorage(PUBLIC_KEY_MD5)
  }
  const token = getToken()
  if (token) {
    config.headers['token'] = token
  }
  return config
}, (error: any) => Promise.reject(error))
/* respone拦截器 */
service.interceptors.response.use((response: any) => {
  const res = response.data
  if (res.code !== RES_CODE.SUCCESS) {
    return res
  }
  // TODO: 登录页面
  console.log('response.config.url :>>', response.config.url)
  if (response.config.url.startsWith('/user/getPublicKey')) {
    setLocalStorage(PUBLIC_KEY_MD5, response.request.getResponseHeader(PUBLIC_KEY_MD5))
  }
  if (response.config.url.startsWith('/user/signIn') || response.config.url.startsWith('/user/signUp')) {
    console.log('response.request.getResponseHeader(token) :>>', response.request.getResponseHeader('token'))
    setToken(response.request.getResponseHeader('token'))
  }

  if (response.config.url.startsWith('/user/logout') || response.config.url.startsWith(response.config.baseURL + '/user/logout')) {
    clearLocal()
  }
  // 移除队列中的该请求，注意这时候没有传第二个参数f
  removePending(response.config)
  // 获取返回数据，并处理。按自己业务需求修改。下面只是个demo
  if (response.status) res.status = response.status

  // 跳转到登陆页
  switch (response.data.code) {
    case RES_CODE.BAD_TOKEN:
    case RES_CODE.NEED_TOKEN:
    case RES_CODE.TOKEN_EXPIRE:
      clearLocal()
      router.replace({ name: process.env.NODE_ENV === 'production' ? 'oatuth' : 'wgn' }).catch()
  }

  return res
}, (error: any) => {
  // 异常处理
  // const { response } = error;
  // const { resmessage } = response.data;

  pending = []
  // globalBus.$Notice.error({
  //   title: response.statusText?response.statusText:'请求异常',
  //   desc: resmessage?resmessage:'请联系相关人员或者稍后再试!'
  // })
  if (error.message === '取消重复请求') {
    return Promise.reject(error)
  }
  return Promise.reject(error)
})
