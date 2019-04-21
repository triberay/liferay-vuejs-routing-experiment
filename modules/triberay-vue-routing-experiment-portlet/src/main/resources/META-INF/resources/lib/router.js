import Vue from 'vue/dist/vue.common';
import VueRouter  from 'vue-router';
import Home from './components/Home.vue';
import User from './components/user/User';
import UserStart from './components/user/UserStart';
import UserDetail from './components/user/UserDetail';
import UserEdit from './components/user/UserEdit';
import Test from './components/Test';

Vue.use(VueRouter);

export const routes = [
    {   path: '/home', name: 'home', component: Home },
    {   path: '/users', component: User, children: [
            { path: '', component: UserStart },
            { path: ':id', component: UserDetail },
            { path: ':id/edit', component: UserEdit, name: 'userEdit' }
        ]
    },
    {   path: '/test', name: 'test', component: Test },
];

export const router = new VueRouter({
    mode: 'history',
    routes: routes,
    base: '/web/triberayvuerouting/'
});
