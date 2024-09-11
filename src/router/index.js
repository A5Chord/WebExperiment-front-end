import {createRouter, createWebHistory} from 'vue-router'
import Login from '@/views/head/Login.vue'
import Register from '@/views/head/Register.vue'
import ChangePwd from '@/views/head/ChangePwd.vue'
import ManageSystem from '@/views/body/Menu.vue'
import Home from '@/views/body/Home.vue'
import UserTable from '@/views/body/AuthorTable.vue'
import NotFound from '@/views/head/NotFound.vue'

const routes = [
    {path: '/', redirect: '/login'},
    {path: '/login', name: 'login', component: Login},
    {path: '/register', name: 'register', component: Register},
    {path: '/change-pwd', name: 'change-pwd', component: ChangePwd},
    {
        path: '/manage-system', component: ManageSystem, children: [
            {path: '/home', name: 'home', component: Home},
            {path: '/user-table', name: 'user-table', component: UserTable},
            {path: '/404-inline', component: NotFound}
        ]
    },
    {path: '/404-page', component: NotFound}
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router