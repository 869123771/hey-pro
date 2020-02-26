import Cookies from 'js-cookie'

// cookie保存的天数
import constant from './constant'
const {ACCESS_TOKEN,config: {cookieExpires}} = constant

export const setToken = (token) => {
    Cookies.set(ACCESS_TOKEN, token, {expires: cookieExpires || 1})
}

export const getToken = () => {
    const token = Cookies.get(ACCESS_TOKEN)
    if (token) return token
    else return false
}

export const localSave = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const localRead = (key) => {
    return JSON.parse(localStorage.getItem(key)) || ''
}