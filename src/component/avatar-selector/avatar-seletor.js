
import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
  // 属性强行校验
  static PropTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  render () {
    const avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'
                        .split(',')
                        .map(v => ({
                          icon: require(`../img/${v}.png`),
                          text: v
                        }))
    const  gridHeader = this.state.text ? (<div>
                                              <span>已选择的图片</span>
                                              <img style={{width:20}} src={this.state.icon} alt=""/>
                                          </div>)
                                        : '请选择头像'
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={elm => {
              this.setState(elm)
              this.props.selectAvatar(elm.text)
            }}>
            头像选择
          </Grid>
        </List>
      </div>
    )
  }
}

export default AvatarSelector