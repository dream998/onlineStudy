import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config'
import routes from '../../router/coursestudy-router'
import { NavLink } from 'react-router-dom'
import { Menu, Image } from 'antd'
import { StudyHeader, StudyContent } from './style'
const { SubMenu } = Menu
const CourseStudy = memo((props) => {
    //console.log(props.location.state);
    const {course_id,course_name,course_announcement} = props.location.state
    const {user_name} = props.location.state.creatorInfo
    
    return (
        <div>
            <StudyHeader>
                <div className='left'>
                    <h2>{course_name}</h2>
                    <h3>{user_name}</h3>
                </div>
                <div className='middle'>
                    <h2>课程学习</h2>
                </div>
                <div className='right'>
                    <span>评价课程</span>
                    <span>学习进度</span>
                </div>
            </StudyHeader>

            <StudyContent>
                <div className='left-content'>
                    <Image 
                        style={{width:'350px',height:'250px',borderRadius: '10px'}}
                        src='https://pica.zhimg.com/v2-b303c3f2c827888ba652085ced518cda_1440w.jpg?source=172ae18b'></Image>
                    
                    <br /><br />
                    <Menu mode="inline"
                          defaultSelectedKeys={['1']}
                          style={{fontSize:'20px'}}>
                        <Menu.Item key='1' style={{height: '60px'}} >
                            <NavLink to={{pathname:'/coursestudy/announce',state:props.location.state}}>课程公告</NavLink>
                        </Menu.Item>
                        <Menu.Item key='2' style={{height: '60px'}}>
                            <NavLink to={{pathname:'/coursestudy/info',state:props.location.state}}>课程资料</NavLink>
                        </Menu.Item>
                        <Menu.Item key='3' style={{height: '60px'}}>
                            <NavLink to={{pathname:'/coursestudy/test',state:props.location.state}}>课程测验</NavLink>
                        </Menu.Item>
                        <Menu.Item key='4' style={{height: '60px'}}>
                        <NavLink to={{pathname:'/coursestudy/comment',state:props.location.state}}>分享天地</NavLink>
                        </Menu.Item>
                        <Menu.Item key='5' style={{height: '60px'}}>
                        <NavLink to={{pathname:'/coursestudy/sharewrite',state:props.location.state}}>发表分享</NavLink>
                        </Menu.Item>
                    </Menu>
                    
                </div>
                <div className='right-content'>
                    {
                        renderRoutes(routes)
                    }
                </div>
            </StudyContent>

        </div>
    )
})

export default CourseStudy