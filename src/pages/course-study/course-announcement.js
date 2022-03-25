import React, { memo } from 'react'

const CourseAnnouncement = memo((props) => {
  return (
    <div>{props.location.state.course_announcement}</div>
  )
})

export default CourseAnnouncement