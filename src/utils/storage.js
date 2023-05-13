const KEY = "XINGBAKE-TOKEN"

export const getToken=()=>{
    return localStorage.getItem(KEY)
}

export const setToken=(newToken)=>{
    return localStorage.setItem(KEY,newToken)
}

export const delToken=()=>{
    return localStorage.removeItem(KEY)
}