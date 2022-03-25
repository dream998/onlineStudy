import React, { memo, useState } from 'react'
import { VideoHeaderWrapper, VideoContentWrapper, VideoContentLeft, VideoContentRight } from './style'
import { LeftOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import CourseCatalog from '../../components/course-catalog'


const CourseVideo = memo((props) => {

    const [activeTabKey, setActiveTabKey] = useState('catalog')
    // const [catalog, setCatalog] = useState([])
    // const [catalogHas, setcatalogHas] = useState(false)
    // useEffect(() => {
    //   getCourseCatalog(props.courseId).then(res=>{
    //       console.log(res)
    //       setCatalog(res)
    //       setcatalogHas(true)
    //   })
    
    // }, [catalogHas])
    const onTabChange = key => {
        setActiveTabKey(key)
    }

    const tabList = [
        {
            key: 'catalog',
            tab: '目录'
        },
        {
            key: 'comments',
            tab: '讨论'
        }
    ]
    const contentList = {
        catalog: <CourseCatalog courseId = {props.location.state}/>,
        comments: <p>讨论区</p>
    }
    return (
        <div>
            <VideoHeaderWrapper>
                <div className='header-left'><LeftOutlined /> 返回</div>
                <div className='header-middle'>章节详情</div>
                <div className='header-right'></div>
            </VideoHeaderWrapper>

            <VideoContentWrapper>
                <VideoContentLeft>
                    <h2>C语言的发展概述</h2>
                    <video src="http://localhost:8000/courses/41/video"
                           width="640" height="480" controls
                           style={{backgroundColor:'black'}}
                    ></video>
                </VideoContentLeft>

                <VideoContentRight>
                    <Card style={{width: '100%'}}
                          tabList={tabList}
                          activeTabKey={activeTabKey}
                          onTabChange={key=>{onTabChange(key)}}>

                        {contentList[activeTabKey]}
                    </Card>

                </VideoContentRight>

            </VideoContentWrapper>

        </div>
    )
})

export default CourseVideo