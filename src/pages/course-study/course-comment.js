import React, { memo, useState, useEffect } from 'react'
import { Card, Space } from 'antd';
import { ContentWrapper } from './style';
import { getShares } from '../../services/courseService';
const CourseComment = memo((props) => {
  const [articles, setArticles] = useState([])
  useEffect(() => {
    setArticles([{
      title: '关于我对数据结构的一些理解',
      content: '数据结构说白了就是如何保存数据，数据的不同的保存方式有着不同的应用方向。',
      author: '数据桃白白',
      date: '2022-5-23 15:32'
    },
    {
      title: '如何理解堆栈和队列',
      content: '数据结构说白了就是如何保存数据，数据的不同的保存方式有着不同的应用方向。',
      author: '数据桃白白',
      date: '2022-5-23 15:32'
    },
    {
      title: '关于数据结构的宝藏书籍推荐，UU们看过来！',
      content: '数据结构说白了就是如何保存数据，数据的不同的保存方式有着不同的应用方向。',
      author: '数据桃白白',
      date: '2022-5-23 15:32'
    },
    {
      title: '谈谈我学数据结构的一些感悟吧',
      content: '数据结构说白了就是如何保存数据，数据的不同的保存方式有着不同的应用方向。数据结构说白了就是如何保存数据，数据的不同的保存方式有着不同的应用方向。数据结构说白了就是如何保存数据，数据的不同的保存方式有着不同的应用方向。数据结构说白了就是如何保存数据，数据的不同的保存方式有着不同的应用方向。数据结构说白了就是如何保存数据，数据的不同的保存方式有着不同的应用方向。',
      author: '数据桃白白',
      date: '2022-5-23 15:32'
    }])


  }, [])
  useEffect(()=>{
    getShares(props.location.state.course_id).then(res=>{
      console.log('分享是',res);
      setArticles(res)
    })
  },[])

  return (
    <div>
      <Space direction="vertical">
        {
          articles.length > 0 && articles.map((item, index) => {
            return (
              <Card
                key={item.title}
                title={item.title}
                extra={<p style={{ color: '#00CC7E', cursor: 'pointer' }} onClick={() => { console.log(props);props.history.push({pathname:'/coursestudy/commentdetail',state:{...props.location.state,item}})}}>More</p>}
                style={{
                  width: '90%',
                  margin: 'auto'
                }}
              >
                <ContentWrapper><p>{item.content}</p></ContentWrapper>
              </Card>
            )
          })
        }
      </Space>


    </div>
  )
})

export default CourseComment