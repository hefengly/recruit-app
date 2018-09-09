import React from 'react'
import {Router} from 'react-router-dom'
import {connect} from 'react-redux'
import { NavBar } from 'antd-mobile'
import Navlink from './../../component/navlink/navlink'

function Boss() {
  return <h2>Boss首页</h2>
}
function Genius() {
  return <h2>牛人首页</h2>
}
function Msg() {
  return <h2>消息列表</h2>
}
function User() {
  return <h2>个人中心</h2>
}
@connect(
  state => state
)
class Dashboard extends React.Component {
  


  render() {
    const {pathname} = this.props.location
    const user = this.props.user
    console.log(user)
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'Boss列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar mode='dard'>{navList.find(v => v.path === pathname).title}</NavBar>
        {/* <h2>cont</h2> */}
        <Navlink data={navList}></Navlink>
        {/* <Router path="/boss" Component={Boss}></Router>
        <Router path="/genius" Component={Genius}></Router> */}

      </div>
    )
  }
} 

export default Dashboard