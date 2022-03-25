import React, { memo, useEffect, useState } from 'react'
import { Collapse } from 'antd'
import { getCourseCatalog } from '../../services/courseService'
import {PlayCircleOutlined, ContainerOutlined, EditOutlined} from '@ant-design/icons'
const {Panel} = Collapse
const CourseInformation = memo((props) => {

  const [catalog, setCatalog] = useState([])
  const [catalogHas, setcatalogHas] = useState(false)
  useEffect(() => {
    getCourseCatalog(props.location.state.course_id).then(res=>{
        console.log(res)
        setCatalog(res)
        setcatalogHas(true)
    })
  
  }, [catalogHas])

  const goVideo = ()=>{
    props.history.push({pathname:'/coursevideo',state:props.location.state.course_id})
}
  return (
    <div>
      <Collapse defaultActiveKey={[0]}>
        
        {
          catalog.map((item, index)=>{
              return (
                <Panel header={item.section_order+'. '+item.section_name}
                        key={index}>
                  {
                    item.subsections.map((subItem,subIndex)=>{
                      return (
                        <div>
                          <ul onClick={goVideo}>
                            <li>
                              <h4>{item.section_order+'.'+subItem.subsection_order+' '+subItem.subsection_name}</h4>
                            </li>
                            <li><PlayCircleOutlined style={{color:'#00CC7E'}}/> 视频资源</li>
                            <li><ContainerOutlined style={{color:'#00CC7E'}}/> 文档</li>
                            <li><EditOutlined style={{color:'#00CC7E'}}/> 随堂测验</li>
                          </ul>
                        </div>
                      )
                    })
                  }
                </Panel>
              )
          })
        }
      </Collapse>
      
    </div>
  )
})

export default CourseInformation