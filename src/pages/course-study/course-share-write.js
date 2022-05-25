import React, { memo, useState, useRef } from 'react'
import { Input, Button, message } from 'antd';
import { sendShare } from '../../services/courseService';
const { TextArea } = Input
const CourseShareWrite = memo((props) => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const titleRef = useRef()
    const contentRef = useRef()
    console.log(props.location.state);

    const publishShare = () => {
        // console.log(titleRef.current.input.value);
        // console.log(contentRef.current.resizableTextArea.props.value);
        const title = titleRef.current.input.value
        const content = contentRef.current.resizableTextArea.props.value
        const courseId = props.location.state.course_id
        const data = {title,content,courseId}
        sendShare(data).then((res)=>{
            console.log('发表成功');
            message.success("发表成功")
        })

    }
    return (
        <div style={{ marginLeft: '20px', marginTop: '20px' }}>
            <div style={{ display: 'flex', marginBottom: '30px' }}>
                <span>标题：</span><Input placeholder='请输入标题' style={{ width: '80%' }}  ref={titleRef}/>
            </div>
            <div style={{ display: 'flex', margin: 'auto' }}>
                <span>内容：</span><TextArea rows={20} placeholder='请输入内容' style={{ width: '80%' }}  ref={contentRef}/>
            </div>
            <Button type='primary' style={{ marginLeft: '200px', marginTop: '10px' }} onClick={publishShare}>发表共享</Button>
        </div>
    )
})

export default CourseShareWrite