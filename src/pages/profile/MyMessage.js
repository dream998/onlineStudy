import React, { memo, useState, useEffect } from 'react'
import { getNewMessage } from '../../services/courseService'
import { generateComment } from '../../common/comment'
import { Empty, Avatar, Button, Comment, Form, Input, List, Modal, message } from 'antd';
import moment from 'moment';
import { postComment, updateMessageState, getWarning, updateWarning } from '../../services/courseService';
import { formatComments } from '../../utils/formatComents';
import { WarningWrapper } from './style'
const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        添加评论
      </Button>
    </Form.Item>
  </>
);
const CommentEditor = memo((props) => {
  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');

  console.log(props);
  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    props.setIsModalVisible(false)
    postComment(
      props.comment.subsectionId,
      {
        commentContent: value,
        courseId: props.comment.courseId,
        parentCommentId: props.comment.commentId
      }
    ).then(res => {

      console.log('评论发表成功！');
      message.success('评论发表成功！');
      // getCommentsBySubsectionId(props.subsectionId).then(res => {

      //     console.log(res)
      //     // 格式化评论并更新评论
      //     setComments(formatComments(res))
      // })
    })
    setTimeout(() => {
      setSubmitting(false);
      setValue('');
      setComments([
        ...comments,
        {
          author: 'Han Solo',
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
        },
      ]);
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return <Comment
    avatar={<Avatar src={props.comment.avatar} alt={props.comment.author} />}
    content={
      <Editor
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitting={submitting}
        value={value}
      />
    }
  />


})
const MyMessage = memo(() => {
  const [newMessages, setNewMessages] = useState([])
  // 弹出框相关
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);

  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  /*  弹出框结束 */
  const [currentComment, setCurrentComment] = useState({})

  const [warning, setWarning] = useState([])
  useEffect(() => {
    getWarning().then(res => {
      console.log(res);
      setWarning(res)
      updateWarning().then(res=>{
        console.log('warningState更新成功！');
      })
    })

  }, [])


  useEffect(() => {
    getNewMessage().then(res => {
      const comments = []
      for (let i = 0; i < res.length; i++) {
        const { commment_id: commentId, comment_content: content, user_id: userId, user_name: author, subsection_id: subsectionId, course_id: courseId } = res[i]
        const avatar = 'http://' + res[i].userMes.user_avatar_url
        comments.push({ commentId, content, author, avatar, subsectionId, courseId })
      }
      setNewMessages(comments)
      console.log(comments);
      updateMessageState(res).then(res => {
        console.log(res);
      })
    }).catch(err => {
      console.log(err)
    })

  }, [])


  return (
    <div>
      {
        warning.length > 0 ? <WarningWrapper><p>老师温馨提示：您{warning[0].courseName }学习进度已落后，请尽快完成相关学习任务！</p></WarningWrapper> : ''
      }

      {newMessages.length > 0 ? generateComment(newMessages, (commentId, comment) => { console.log(comment); setCurrentComment(comment); showModal() }) : <Empty />}

      <Modal title="回复消息" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <CommentEditor comment={currentComment} setIsModalVisible={setIsModalVisible} />
      </Modal>
    </div>
  )
})

export default MyMessage