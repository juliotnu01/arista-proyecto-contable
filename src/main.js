import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from "primevue/config";
import route from './plugins/router'
import Lara from './plugins/themes/aura';


createApp(App)
.use(route)
.use(PrimeVue, {
    unstyled: true,
    pt: Lara                            //apply preset        
})
.mount('#app')
