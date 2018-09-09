import axios from 'axios'
import { getRedirectPath } from './../util.js'


const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCESS = 'AUTH_SUCESS' 

const initState = {
  redirectTo:'',
  msg: '',
  user: '',
  type: ''
}

 
// reducer
export function user(state=initState, action) {
  switch(action.type) {
    case AUTH_SUCESS:
      return {...state, msg: '', isAuth:true,...action.payload, redirectTo:getRedirectPath(action.payload)}
    case ERROR_MSG:
      return {...state, isAuth:false, msg:action.msg}
    case LOAD_DATA:
      return {...state,...action.payload}
    default:
      return state
  }
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG }
}

function authSuccess(obj) {
  // 过滤 pwd 字段
  const {pwd, ...data} = obj
  return {type: AUTH_SUCESS, payload:data}
}
// action creator
export function login({user,pwd}) {
  if (!user||!pwd) {
    return errorMsg('用户名密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd}, {})
    .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
// action creator
export function register({user,pwd,type,repeatpwd}) {
  if (!user||!pwd||!type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码个确认密码不同') 
  }

  return dispatch => {
    axios.post('/user/register', {user, pwd, type})
     .then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({user, pwd, type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

// action creator
export function loadData(userinfo) {
  return {type:LOAD_DATA,payload:userinfo}
}

//
export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}