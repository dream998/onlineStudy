import React, { memo, useState } from 'react'

import { CaretDownOutlined, MessageOutlined  } from '@ant-design/icons'
import { Input, Badge, Avatar  } from 'antd';
import { HeaderWrapper } from './style'
import { NavLink } from 'react-router-dom'


const AppHeader = memo(() => {
    // 是否登录
    const [isLogin,setIsLogin] = useState(true)

    const { Search } = Input
    // 定义搜索按钮点击事件
    const onSearch = value => console.log(value);

    return (
        <HeaderWrapper>
            <div style={{ width: '20%' }}>
                <NavLink to={'/'}>在线教学平台</NavLink>
            </div>

            <NavLink to={'/courseclassify'}>课程分类<CaretDownOutlined /></NavLink>
            <Search placeholder="请输入要搜索的课程" onSearch={onSearch} style={{ width: '25%' }} />
            <NavLink to={'/mycourses'} disabled={!isLogin}>我的课程</NavLink>
            <NavLink to={'/message'} title='我的消息' disabled={!isLogin}>
                <Badge count={5}>
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