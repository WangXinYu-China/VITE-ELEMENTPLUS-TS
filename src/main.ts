import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/style/index.scss';

import * as ElIcons from '@element-plus/icons'

const app = createApp(App)

for (const name in ElIcons){
	app.component(name,(ElIcons as any)[name])
}

app
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount('#app')


