export default {
    tokenKey : 'ACCESS_TOKEN',
    userInfo : 'USER_INFO',
    globalTabs : 'GLOBAL_TABS',
    config : {
        /**
         * @description 配置显示在浏览器标签的title
         */
        title: 'element',
        /**
         * @description token在Cookie中存储的天数，默认1天
         */
        cookieExpires: 1,
        /**
         * @description 是否使用国际化，默认为false
         *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
         *              用来在菜单中显示文字
         */
        useI18n: true,
        /**
         * @description api请求基础路径
         */
        baseUrl: {
            domianURL: 'http://47.107.178.235:8080',
            imgDomainURL: 'http://47.107.178.235:8080/jeecg-boot/sys/common/view',
            pdfDomainURL : 'http://47.107.178.235:8080/jeecg-boot/sys/common/pdf/pdfPreviewIframe',
            proxyURL : '/jeecg-boot'
        },
        /**
         * @description 默认打开的首页的路由name值，默认为home
         */
        homeName: 'home',
        loginName : 'login',
        avatarLocation : 'http://111.230.157.133:8081/static/avatar/'
    }
}