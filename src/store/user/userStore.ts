import { getPublicKey, signIn, signUp } from '@/api/axios/user/index'
import { RES_CODE } from '@/api/const'
import { Store } from 'vuex'
import { State, User } from './type.d'

const SET_USER = 'SET_USER'
const SET_PUBLIC_KEY = 'SET_PUBLIC_KEY'

export default {
  namespaced: true,
  state: {
    user: {
      id: '',
      nickname: '',
    },
    publicKey: '',
  },
  // getters: {
  // },
  mutations: {
    [SET_PUBLIC_KEY](state: State, publicKey: string) {
      state.publicKey = publicKey
    },
    [SET_USER](state: State, user: User) {
      state.user = user
    }
  },
  actions: {
    async getPublicKeyAction({ commit }: Store<any>) {
      const { code, data } = await getPublicKey()
      if (code !== RES_CODE.SUCCESS) {
        return null
      }
      console.log('getPublicKeyAction :>>', data)
      commit(SET_PUBLIC_KEY, data)
      return data

    },
    async signInAction({ commit }: Store<any>, body: { nickname: string; encryptPassword: string }) {
      const { code, data } = await signIn(body)
      // 异常处理
      if (code !== RES_CODE.SUCCESS) {
        return null
      }
      commit(SET_USER, data)
      return data
    },
    async signUpAction({ commit }: Store<any>, body: { nickname: string; encryptPassword: string }) {
      const { code, data } = await signUp(body)
      if (code !== RES_CODE.SUCCESS) {
        return null
      }
      commit(SET_USER, data)
      return data
    },
  }
}