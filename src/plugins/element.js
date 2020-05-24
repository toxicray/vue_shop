/* eslint-disable import/no-duplicates */
import Vue from 'vue'
import { Button, Input } from 'element-ui'
// eslint-disable-next-line import/no-duplicates
import { Form, FormItem } from 'element-ui'
import { Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 全局的挂载提示框
Vue.prototype.$message = Message
