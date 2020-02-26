import Vue from 'vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { url } from 'regular-xb'

import {setToken, getToken, localSave, localRead} from '@/utils/store'

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/login', '/user/register-result'] // no redirect whitelist

router.beforeEach((to, from, next) => {
    NProgress.start() // start progress bar
    let {matched, path} = to
    if (getToken()) {
        /* has token */
        if (path === '/login') {
            next({path: '/'})
            NProgress.done()
        } else {
            if (store.getters.permissionList.length === 0) {
                store.dispatch('GET_PERMISSION_LIST').then((data) => {
                    if (!data) {
                        return;
                    }
                    let constRoutes = [];
                    constRoutes = generateIndexRouter(data);
                    // 添加主界面路由
                    store.dispatch('GET_ROUTERS', {constRoutes}).then(() => {
                        // 根据roles权限生成可访问的路由表
                        // 动态添加可访问路由表
                        router.addRoutes(store.getters.addRouters)
                        const redirect = decodeURIComponent(from.query.redirect || path)
                        if (path === redirect) {
                            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                            next({...to, replace: true})
                        } else {
                            // 跳转到目的路由
                            next({path: redirect})
                        }
                    })
                })
                    .catch(() => {
                        store.dispatch('LOGIN_OUT').then(() => {
                            next({path: '/login', query: {redirect: to.fullPath}})
                        })
                    })
            } else {
                if(path.includes(':')){
                    next({...from, replace: true})
                    NProgress.done()
                }else{
                    next()
                }
            }
        }
    } else {
        if (whiteList.includes(to.path)) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next({path: '/login', query: {redirect: to.fullPath}})
            NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        }
    }
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})

// 生成首页路由
export const generateIndexRouter = (data) =>{
    let indexRouter = [{
        path: '/',
        name: 'home',
        //component: () => import('@/components/layouts/BasicLayout'),
        component: resolve => require(['@/components/layouts/PageLayout'], resolve),
        meta: { title: '首页' },
        redirect: '/home',
        children: [
            ...generateChildRouters(data)
        ]
    },{
        "path": "*", "redirect": "/404", "hidden": true
    }]
    return indexRouter;
}

// 生成嵌套路由（子路由）
const generateChildRouters = (data) =>{
    const routers = [];
    for (let item of data) {
        let {url,fullUrl:path,id,file_path,name,title,icon,params,children} = item
        let component = "";
        if(url.includes('#')){
            component = "components/layouts/RouteView";
        }else{
            component = "views/" + url;
        }

        let menu =  {
            path : '/' + path,
            name,
            component: resolve => require(['@/' + component + '.vue'], resolve),
            meta: {
                title ,
                icon,
                url ,
                params,
                id
            }
        }
        if (children && children.length > 0) {
            menu.children = [...generateChildRouters(children)];
        }
        //--update-begin----author:scott---date:20190320------for:根据后台菜单配置，判断是否路由菜单字段，动态选择是否生成路由（为了支持参数URL菜单）------
        //判断是否生成路由
        if(item.route && item.route === '0'){
            console.log(' 不生成路由 item.route：  '+item.route);
            console.log(' 不生成路由 item.path：  '+item.path);
        }else{
            routers.push(menu);
        }
        //--update-end----author:scott---date:20190320------for:根据后台菜单配置，判断是否路由菜单字段，动态选择是否生成路由（为了支持参数URL菜单）------
    }
    return routers
}
