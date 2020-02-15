// 表单校验 需要的 vue 功能包 vee-validate 使用：

// 1.导入 extend 以及 全部的校验规则：
// a.导入localize 函数（本土化语言）
import { extend, localize } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
// b.导入语言:
import zhCN from 'vee-validate/dist/locale/zh_CN.json'
// 2.注册全部校验规则：
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

// c.注册语言：
localize({ zhCN })
// d.使用：
localize('zhCN')
// 自定义 校验规则  vee-validate
extend('phone', {
  validate: value => {
    const reg = /^1[35789]\d{9}$/ // 正则
    return reg.test(value) // 返回正则的校验结果
  },
  message: '{_field_}格式不正确'
})