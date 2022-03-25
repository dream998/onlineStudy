import React, { memo, useState, useEffect } from 'react'
import Carousel from '../../components/carousel'
import HotCourses from './hot-course'
import { getNewCourses } from '../../services/courseService'

const Home = memo(() => {

  const [courseList, setCourseList] = useState([])
  const [courseListHas, setCourseListHas] = useState(false)
  const getCourses = () => {
    getNewCourses().then(res => {
      setCourseList(res)
      setCourseListHas(true)
    }).catch(err => {
      console.log(err);
    })
  }
  useEffect(() => {
    getCourses()
  
    
  }, [courseListHas])
  
  return (
    <div>
      <Carousel />
      <HotCourses  title ="最新课程" courseList = {courseList}/>
      <br />
      <br />
      <HotCourses  title ="最热课程" courseList = {courseList}/>
    </div>
  )
})

export default Home