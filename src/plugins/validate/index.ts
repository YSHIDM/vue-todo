import { VueConstructor } from "vue"
import { ValidationProvider, ValidationObserver, extend } from "vee-validate"
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/zh_CN.json'
import { ValidationRule } from "vee-validate/dist/types/types.d"
import customRules, { formatList } from "./rules"

const ruleNames: {[key: string]: ValidationRule} = {}; // 存放所有的校验的规则
// 扩展校验规则
export const extendRule = (rule: string, schema: ValidationRule): void => {
  ruleNames[rule] = schema;
  extend(rule, schema);
}

// 加载 vee-validate 所有的内置的校验规则
for (const [rule, validation] of Object.entries(rules)) {
    extendRule(rule, {
        ...validation,
        message: messages[rule as keyof typeof messages]
    } as ValidationRule);
}

// 加载 自定义 rules 文件中所有的校验规则
for (const [rule, schema] of Object.entries(customRules)) {
    extendRule(rule, schema);
}
formatList.map((item: any) => {
    extendRule(item.id, {
        validate: (value: string): boolean => item.value.test(value),
        message: `{_field_}格式应该是${item.name}`
    })
})

// 保存 Vue，防止插件被多次加载
let _Vue: VueConstructor;
// 导出一个 install 方法，在 main.js 中，使用 Vue.use 的方式引用
export default (vue: VueConstructor) => {
    if (_Vue) {
        return
    }
    _Vue = vue;
    _Vue.component("validation-provider", ValidationProvider)
    _Vue.component("validation-observer", ValidationObserver)
}
