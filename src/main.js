import Vue from 'vue'
import App from './App.vue'
import { Button, Form, Input, Select, Skeleton } from 'ant-design-vue'

Vue.component(Button.name, Button)
Vue.component(Form.name, Form)
Vue.component(Form.Item.name, Form.Item)
Vue.component(Select.name, Select)
Vue.component(Input.name, Input)
Vue.component(Skeleton.name, Skeleton)
// Vue.component(Icon.name, Icon)
// Vue.component(Upload.Dragger.name, Upload.Dragger)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
