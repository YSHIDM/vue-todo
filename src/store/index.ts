import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

const store: Store<any> = new Vuex.Store({})
// 自动注册/store/modules下的vuex模块
const storeModules = require.context('./', true, /\w+Store.ts$/)
// console.log('storeModules :>>', storeModules)
storeModules.keys().forEach((moduleName: string) => {
  let theName = moduleName.split('/').pop()
  if (!theName)
    return
  theName = theName.replace(/\.\w+$/, '')
  const theModule = storeModules(moduleName)
  store.registerModule(theName, theModule.default || theModule)
})

export default store
