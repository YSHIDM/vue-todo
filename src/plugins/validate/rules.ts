export default {
    tel: {
        validate(value: string): boolean {
            return /^((0\d{2,3}-\d{7,8})|(1[358497]\d{9}))$/.test(value)
        },
        message: "{_field_}格式不正确"
    },
    codeNum: {
        validate(value: string): boolean {
            return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(value)
        },
        message: "{_field_}格式不正确"
    },
    floatNumber: {
        params: ['length'],
        validate(value: string, arg: any): boolean {
            const p = new RegExp(`^(([1-9]\\d*)|([0]))(\\.\\d{0,${arg.length}})?$`)
            return p.test(value)
        },
        message: "{_field_}小数只能有{length}位"
    },
    integerNotZero: {
        validate(value: string) {
            return /^[1-9]([0-9]*)$/.test(value)
        },
        message: "{_field_}只能是正整数"
    },
    number: {
        validate(value: string): boolean {
            return /^[0-9]+(.[0-9]+)?$/.test(value)
        },
        message: "{_field_}只能是数字"
    }
}

export const formatList = [
    {
        id: 'gapass',
        name: '港澳通行证',
        value: /^[HMhm]([0-9]{10}|[0-9]{8})$/,
    },
    {
        id: 'passport',
        name: '护照',
        value: /^[a-zA-Z]{5,17}$|^[a-zA-Z0-9]{5,17}$/,
    },
    {
        id: 'ch',
        name: '中文',
        value: /^[\u4e00-\u9fa5]+$/,
    },
    {
        id: 'en',
        name: '英文',
        value: /^[a-zA-Z]+$/,
    },
    {
        id: 'num',
        name: '数字',
        value: /^[0-9]+$/,
    },
    {
        id: 'zln',
        name: '中文、英文、数字',
        value: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/,
    },
    {
        id: 'zl',
        name: '中文、英文',
        value: /^[\u4e00-\u9fa5a-zA-Z]+$/,
    },
    {
        id: 'letternum',
        name: '数字和英文组合',
        value: /^(([a-z]+[0-9]+)|([0-9]+[a-z]+))[a-z0-9]*$/i,
    },
    {
        id: 'zlcomb',
        name: '中文和英文组合',
        value: /^(([\u4e00-\u9fa5]+[a-zA-Z]+)|([a-zA-Z]+[\u4e00-\u9fa5]+))[\u4e00-\u9fa5a-zA-Z]*$/,
    },
    {
        id: 'zhnum',
        name: '数字和中文组合',
        value: /^(([\u4e00-\u9fa5]+[0-9]+)|([0-9]+[\u4e00-\u9fa5]+))[\u4e00-\u9fa50-9]*$/,
    },
    {
        id: 'integerOrTwo',
        name: '正整数或保留两位小数',
        value: /^\d+(\.\d{0,2})?$/,
    },
    {
        id: 'integerOrThree',
        name: '正整数或保留三位小数',
        value: /^\d+(\.\d{0,3})?$/,
    },
];
