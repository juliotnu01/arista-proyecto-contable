import { createWebHistory, createRouter } from 'vue-router'

import Home from '../views/Home.vue'
import AsientosContables from '../views/AsientosContables.vue'

const routes = [
    { path: '/', component: Home, name:'home',  },
    { path: '/asiento-contable', component: AsientosContables, name:'asiento.contable' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router