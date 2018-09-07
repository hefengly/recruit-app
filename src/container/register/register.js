import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WhiteSpace, Button, Radio} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {register} from '../../redux/user.redux'

@connect(
  state =>state.user,
  {register}
)
class Register extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      user:'',
      pwd:'',
      repeatpwd:'',
      type: 'genius'
    }

    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange(key,val) {
    this.setState({
      [key]:val
    })
  }
  handleRegister() {
    // 经过connect的作用后， register 本身返回了一个dispatch()  
    this.props.register(this.state)
  }
  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <Logo></Logo>
        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
        <List>
          <InputItem
            onChange={v => this.handleChange('user',v)}  
          >用户名</InputItem>
          <InputItem
            onChange={v => this.handleChange('pwd',v)}
            type='password'
          >密码</InputItem>
          <InputItem
            onChange={v => this.handleChange('repeatpwd',v)}
            type='password'
          >确认密码</InputItem>
          <WhiteSpace/>
          <RadioItem
            checked={this.state.type==='genius'}
            onChange={() => this.handleChange('type', 'genius')}
          >
            牛人
          </RadioItem>
          <RadioItem
            checked={this.state.type==='boss'}
            onChange={() => this.handleChange('type', 'boss')}
          >
            Boss
          </RadioItem>
          <WhiteSpace/>
          <WhiteSpace/>
          <Button type='primary' onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register 