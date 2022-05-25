import React, { memo } from 'react'
import moment from 'moment';
const CourseCommentDetail = memo((props) => {
    console.log(props.location.state.item);
    const article = props.location.state.item
  return (
    <div>
        <h2 style={{textAlign:'center', marginTop:'30px'}}>{article.title}</h2>
        <div style={{textAlign:'center', color:'#777777'}}>
            <span style={{marginRight:'50px'}}>{article.authorName}</span>

            <span>{moment(article.createAt).format('YYYY-MM-DD HH:mm:ss')}</span>
        </div>
        <p style={{marginTop:'30px',marginLeft:'10px',fontSize:'16px',lineHeight:'30px',textIndent:'2em'}}>{article.content}</p>
    </div>
  )
})

export default CourseCommentDetail