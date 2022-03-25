import React, { memo } from 'react'
import { Card, Avatar, message } from 'antd'
import { CoursesWrapper } from './style'
import { withRouter } from 'react-router-dom'
const { Meta } = Card
const HotCourses = memo((props) => {

    const goDetail = (message) => {
        console.log(message);
        props.history.push({pathname:'/coursedetail',state: message})
    }
    
    return (
        <div style={{marginTop:'20px'}}>
            <h1 style={{ marginLeft: '100px' }}>{props.title}</h1>
            <CoursesWrapper>
                {
                    props.courseList && props.courseList.map((item, index) => {
                        return (
                            <Card style={{ width: 300 }}
                            onClick = {()=>{goDetail(item)}}
                            cover={
                                <img alt='course' src={"http://"+item.course_cover_url} 
                                     style={{width:300,height:200}}/>
                            }
                            key = {item.course_id}
                        >
                            <Meta avatar={<Avatar src={"http://"+item.creatorInfo.user_avatar_url} />}
                                title={item.course_name}
                                description={item.course_introduction}
                                ></Meta>
                        </Card>
                        )
                    })
                }
            </CoursesWrapper>

        </div>

    )
})

export default withRouter(HotCourses)