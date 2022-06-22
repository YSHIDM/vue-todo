// 当环境变量为test是打出的包的目录和大小与production时不同,且体积大
// 所以划分环境为线上(production)和线下(development)
// 线上环境用VUE_APP_TYPE区分,测试服(test)和正式服(pro)
import dev from './dev'
import prod from './pro'
import test from './test'

const env = process.env.NODE_ENV
const type = process.env.VUE_APP_TYPE
export default env === 'production' ? type === 'test' ? test : prod : dev
