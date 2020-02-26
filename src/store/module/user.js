import {setToken, getToken, localSave, localRead} from '@/utils/store'
import {constant, apiList, http} from '@/utils'
//let {USER_NAME, USER_INFO} = constant
export default {
    state: {
        token: getToken(),
        userInfo: localRead(constant.USER_INFO),
        organizationList : localRead(constant.ORGANIZATION_LIST),
        currentOrganization : localRead(constant.CURRENT_ORGANIZATION),
        permissionList: [],
        auth : [],
        allAuth : [],
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },
        SET_USER_INFO(state, userInfo) {
            state.userInfo = userInfo
        },
        SET_CURRENT_ORGANIZATION(state,currentOrganization){
            state.currentOrganization = currentOrganization
        },
        SET_ORGANIZATION_LIST(state, organizationList){
            state.organizationList = organizationList
        },
        SET_PERMISSION_LIST: (state, permissionList) => {
            state.permissionList = permissionList
        },
        SET_AUTH : (state, auth) => {
            state.auth = auth
        },
        SET_ALL_AUTH : (state, allAuth) => {
            state.allAuth = allAuth
        },
    },
    actions: {
        HANDLE_LOGIN({commit}, data) {
            let {tokenList, member, organizationList} = data
            setToken(tokenList)
            localSave(constant.USER_INFO, member)
            localSave(constant.ORGANIZATION_LIST, organizationList)
            localSave(constant.CURRENT_ORGANIZATION, organizationList[0])
            commit('SET_TOKEN', tokenList)
            commit('SET_USER_INFO', member)
            commit('SET_ORGANIZATION_LIST',organizationList)
            commit('SET_CURRENT_ORGANIZATION',organizationList[0])
        },

        // 获取用户信息
        async GET_PERMISSION_LIST({commit}) {
            let {SUCCESS} = constant
            let {code, data} = await http.post(apiList.index_nav)
            if (code === SUCCESS) {
                if (data) {
                    commit('SET_PERMISSION_LIST', data)
                }
            }
            return data
        },

        // 退出登录
        async LOGIN_OUT({commit, state}) {
            commit('SET_TOKEN', '')
            commit('SET_PERMISSION_LIST', [])
            setToken('')
            location.href = "/"
        },
    }
}
