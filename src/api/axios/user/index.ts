import { service } from '@/api/config'

export const getPublicKey: () => Promise<{ code: number, data: any }> = () => service.get('/user/getPublicKey')
export const signIn: (body: { nickname: string, encryptPassword: string }) => Promise<{ code: number, data: any }> = (body: { nickname: string, encryptPassword: string }) => service.post('/user/signIn', body)
export const signUp: (body: { nickname: string, encryptPassword: string }) => Promise<{ code: number, data: any }> = (body: { nickname: string, encryptPassword: string }) => service.post('/user/signUp', body)

// { code: number, data: any }
// ({
//   url: '/user/getPublicKey'
// })