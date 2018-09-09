
import React from 'react'
import { NavBar, InputItem, TextareaItem, Button, WhiteSpace} from 'antd-mobile';
import AvatarSelector from './../../component/avatar-selector/avatar-seletor'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
  state =>state.user,
  {update}
)
class BossInfo extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      company: '',
      money: '',
      desc: '',
      avatar: ' '
    },
    this.selectAvatar = this.selectAvatar.bind(this)
  }
  onChange(key, val) {
    this.setState({
      [key]:val
    })
  }
  selectAvatar(imgname) {
    this.setState({
      avatar:imgname
    })
  }
  render() {
    const path = this.props.location.pathname
    const redirect =  this.props.redirectTo
    return (
      <div>
      {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
        <NavBar mode="dark">Boss 完善信息页</NavBar>
        <AvatarSelector
          selectAvatar={this.selectAvatar}
        ></AvatarSelector>
        <WhiteSpace/>
        <InputItem onChange={(v) => this.onChange('title', v)}>
          招聘岗位
        </InputItem>
        <InputItem onChange={(v) => this.onChange('company', v)}>
          公司名称
        </InputItem>
        <InputItem onChange={(v) => this.onChange('money', v)}>
          职位薪酬
        </InputItem>
        <TextareaItem onChange={(v) => this.onChange('desc', v)} rows={3} autoHeight title="职位要求">
          职位要求
        </TextareaItem>
        <WhiteSpace/>
        <Button 
          onClick={() => {this.props.update(this.state)}}
          type="primary">保存</Button>
      </div>
    )
  }
}

export default BossInfo