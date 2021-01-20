import Vue from 'vue'
import App from './App.vue'
import router from './router'

//加载全局样式文件
import './stylus/index.less'

import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

import {ElementTiptapPlugin} from 'element-tiptap'


Vue.use(ElementUI);

Vue.use(ElementTiptapPlugin, {
  lang: 'zh',
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
