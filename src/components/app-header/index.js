import React, { memo, useState, useEffect } from 'react'

import {  MessageOutlined  } from '@ant-design/icons'
import { Input, Badge, Avatar  } from 'antd';
import { HeaderWrapper } from './style'
import { NavLink } from 'react-router-dom'
import { getNewMessage, getWarning } from '../../services/courseService';

const AppHeader = memo(() => {
    // 是否登录
    const [isLogin,setIsLogin] = useState(true)
    const [newMessageCount, setNewMessageCount] = useState(0)
    const { Search } = Input
    // 定义搜索按钮点击事件
    const onSearch = value => console.log(value);
    useEffect(() => {
      getNewMessage().then(res=>{
          setNewMessageCount(res.length)
      })

    }, [])
    useEffect(() => {
        getWarning().then(res => {
          //console.log(res);
          if(res.length > 0)
          setNewMessageCount(newMessageCount+1)
        })
    
      }, [])
    
    return (
        <HeaderWrapper>
            <div style={{ width: '20%' }}>
                <NavLink to={'/'}>在线教学平台</NavLink>
            </div>

            <NavLink to={'/courseclassify'}>全部课程</NavLink>
            <Search placeholder="请输入要搜索的课程" onSearch={onSearch} style={{ width: '25%' }} />
            <NavLink to={'/profile/mycourses'} disabled={!isLogin}>我的课程</NavLink>
            <NavLink to={'/profile/mymessage'} title='我的消息' disabled={!isLogin} onClick={()=>{setNewMessageCount(0)}}>
                <Badge count={newMessageCount}>
                    <MessageOutlined style={{ fontSize: '30px',color: 'white' }} />
                </Badge>

            </NavLink>
            <NavLink to={'/profile'} disabled={!isLogin}>
            <Avatar 
                size={50}  
                src='https://img0.baidu.com/it/u=348766424,581681588&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500' 
                title= '个人中心'/>
            </NavLink>
        </HeaderWrapper>
    )
})

export default AppHeader