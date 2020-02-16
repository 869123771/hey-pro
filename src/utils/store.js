import Cookies from 'js-cookie'

// cookie保存的天数
import constant from './constant'
const {tokenKey,config: {cookieExpires}} = constant

export const setToken = (token) => {
    Cookies.set(tokenKey, token, {expires: cookieExpires || 1})
}

export const getToken = () => {
    const token = Cookies.get(tokenKey)
    if (token) return token
    else return false
}

export const localSave = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const localRead = (key) => {
    return JSON.parse(localStorage.getItem(key)) || ''
}