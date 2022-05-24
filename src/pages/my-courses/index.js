import React, { memo, useState, useEffect } from 'react'
import { Card } from 'antd';

import { MyCourseWrapper } from './style';
import { getMycourses } from '../../services/courseService';
const { Meta } = Card;


const MyCourses = memo((props) => {

  const [myCourses, setMyCourses] = useState([])
  useEffect(() => {
    getMycourses().then(res => {
      console.log(res);
      setMyCourses(res)

    }).catch(err => {
      console.log(err);
    })


  }, [])

  function goDetail(item){
    props.history.push({pathname:'/coursestudy',state:item})
  }


  return (
    <div>
      <h1 style={{margin:'50px'}}>已加入的课程</h1>
    <MyCourseWrapper>      
      {
        myCourses.map((item, index) => {
          return (
            <Card
              key={item.course_id}
              style={{ width: 300 }}
              className = 'course-item'
              cover={
                <img
                  alt={item.course_name}
                  src={'http://' + item.course_cover_url}
                />
              }
              onClick = {()=>{goDetail(item)}}
            >
              <Meta
                title={item.course_name}

              />
            </Card>
          )
        })
      }
    </MyCourseWrapper>
    </div>
  )
})

export default MyCourses