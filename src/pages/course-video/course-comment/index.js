import React, { memo, useState, useEffect } from 'react'
import { Comment, Avatar, Form, Button, List, Input, message, Space } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { postComment, getCommentsBySubsectionId, getPersonalInfo } from '../../../services/courseService';
import { CommentWrapper } from './style';
import { generateComment } from '../../../common/comment';
import { formatComments } from '../../../utils/formatComents';
const { TextArea } = Input


const Editor = ({ onChange, onSubmit, submitting, value, currentComment, setCurrentComment }) => (
    <>
        <Form.Item>
            <TextArea placeholder='添加评论' rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                {currentComment === -1 ? '添加评论' : '回复id为' + currentComment + '的评论'}
            </Button>
            <Space />
            <Button onClick={() => setCurrentComment(-1)}>重置</Button>
        </Form.Item>
    </>
);
const CourseComment = memo((props) => {

    const [comments, setComments] = useState([])
    const [submitting, setSubmitting] = useState(false)
    const [value, setValue] = useState('')
    const [personInfo, setPersonInfo] = useState({})
    const [currentComment, setCurrentComment] = useState(-1)
    console.log('props是', props);


    // 获取评论
    useEffect(() => {
        getCommentsBySubsectionId(props.subsectionId).then(res => {

            console.log(res)
            // 格式化评论并更新评论
            setComments(formatComments(res))
        })


    }, [])
    // 获取个人信息
    useEffect(() => {
        getPersonalInfo().then(res => {
            console.log(res);
            setPersonInfo(res)
        })


    }, [])



    const handleSubmit = () => {
        if (!value) {
            return
        }
        setSubmitting(true)
        postComment(
            props.subsectionId,
            {
                commentContent: value,
                courseId: props.courseId,
                parentCommentId: currentComment
            }
        ).then(res => {
            console.log('评论发表成功！');
            message.success('评论发表成功！');
            getCommentsBySubsectionId(props.subsectionId).then(res => {

                console.log(res)
                // 格式化评论并更新评论
                setComments(formatComments(res))
            })
        })
        setTimeout(() => {
            setSubmitting(false)
            setValue('')
            // setComments([...comments, {
            //     author: personInfo.user_name,
            //     avatar: 'http://' + personInfo.user_avatar_url,
            //     content: <p>{value}</p>,
            //     datetime: moment().fromNow(),
            //     parentCommentId: currentComment,
                
            // }])
            

        })
    }
    const handleChange = e => {
        setValue(e.target.value)
    }
    return (
        <CommentWrapper>
            <>
                {/* {comments.length > 0 && <CommentList comments={comments} />} */}
                {
                    // 生成嵌套结构的评论
                    generateComment(comments, setCurrentComment)
                }
                <Comment
                    avatar={<Avatar src={'http://' + personInfo.user_avatar_url} alt={personInfo.user_name} />}
                    content={
                        <Editor
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            value={value}
                            currentComment={currentComment}
                            setCurrentComment={setCurrentComment}

                        />
                    }
                />
            </>
        </CommentWrapper>
    )
})

export default CourseComment