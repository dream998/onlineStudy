import React, { memo } from 'react'
import {Menu} from 'antd'
import { renderRoutes } from 'react-router-config'
import {NavLink} from 'react-router-dom'

import routers from '../../router/profile-router'
import { ProfileWrapper } from './style'
const Profile = memo(() => {
  return (
    <ProfileWrapper>
      <div className='menu'>
        <Menu
          style={{width:256, backgroundColor:'#E6E6E6', height:'600px'}}
          mode='inline'
          >
            <Menu.Item key={1}><NavLink to={'/profile/my'}>个人信息</NavLink></Menu.Item>
            <Menu.Item key={2}><NavLink to={'/profile/mycourses'}>我的课程</NavLink></Menu.Item>
            <Menu.Item key={3}><NavLink to={'/profile/mymessage'}>我的消息</NavLink></Menu.Item>
            
        </Menu>
      </div>
        <div className='content'>
          {renderRoutes(routers)}
       
      </div>
    </ProfileWrapper>
  )
})

export default Profile