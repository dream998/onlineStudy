import React, { memo, useState, useEffect } from 'react'
import {CourseIntroduction} from './style'
import CourseCatalog from '../../components/course-catalog'
import { getCourseCatalog } from '../../services/courseService'
const DetailTab = memo((props) => {
  console.log(props.courseId);
  return (
    <div>
        <CourseIntroduction>
            {props.content}
        </CourseIntroduction>

        <CourseCatalog courseId = {props.courseId}/>
    </div>
  )
})

export default DetailTab