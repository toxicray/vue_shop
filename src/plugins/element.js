/* eslint-disable import/no-duplicates */
import Vue from 'vue'
import { Button, Input, Form, FormItem, Message, Container, Header, Aside, Main, Footer } from 'element-ui'

// use也可以支持链式调用
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)

// 全局的挂载提示框
Vue.prototype.$message = Message
