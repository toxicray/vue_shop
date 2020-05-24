/* eslint-disable import/no-duplicates */
import Vue from 'vue'
import { Button, Input, Form, FormItem, Message } from 'element-ui'

// use也可以支持链式调用
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 全局的挂载提示框
Vue.prototype.$message = Message
