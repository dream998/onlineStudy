import React, { memo, useState } from 'react'
import { Breadcrumb, Button, Card, message } from 'antd';
import { DetailWrapper, OverviewWrapper } from './style';
import { Image } from 'antd';
import DetailTab from './detail-tab';
import { joinCourse } from '../../services/courseService'; 

const CourseDetail = memo((props) => {

    const [activeTabKey, setActiveTabKey] = useState('detail')

    const { course_id, course_name, course_introduction, course_cover_url } = props.location.state
    const { user_id, user_name, introduction } = props.location.state.creatorInfo

    const tabList = [
        {
            key: 'detail',
            tab: '课程详情'
        },
        {
            key: 'courseComment',
            tab: '课程评价'
        },
        {
            key: 'teacherIntroduction',
            tab: '教师简介'
        }
    ]
    const contentList = {
        detail: <DetailTab content={course_introduction} courseId = {course_id}/>,
        courseComment: <p>课程评价</p>,
        teacherIntroduction: <p>{introduction}</p>
    }
    const onTabChange = key =>{
        setActiveTabKey(key)
    }

    const joinThisCourse = ()=>{
        joinCourse(course_id).then(res=>{
            message.success('加入课程成功！')
        }).catch(err=>{
            message.error('加入课程失败')
        })

        props.history.push({pathname:'/coursestudy',state:props.location.state})
    }
    console.log(props.location.state);

    return (
        <DetailWrapper>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href='http://localhost:3000'>首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    当前
                </Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <OverviewWrapper>
                <Image width={400} src={"http://" + course_cover_url} />
                <div>
                    <h1>{"课程名称：" + course_name}</h1>
                    <h3>{"任课教师：" + user_name}</h3>
                    <h4>{"参与人数： 0"}</h4>
                    <br />
                    <br />
                    <Button type='primary' style={{ width: '100%', height: '50px', borderRadius: '10px' }} onClick= {joinThisCourse}>立即加入</Button>
                </div>
            </OverviewWrapper>
            <br />
            <br /><br />
            <Card style={{width:'100%'}}
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={key => {
                    onTabChange(key);
                  }}
            >
                {contentList[activeTabKey]}
            </Card>

        </DetailWrapper>
    )
})

export default CourseDetail