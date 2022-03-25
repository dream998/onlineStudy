import React, { memo,useState, useEffect } from 'react'
import { CourseCatalogWrapper } from './style'
import { getCourseCatalog } from '../../services/courseService'
const CourseCatalog = memo((props) => {

    const [catalog, setCatalog] = useState([])
  const [catalogHas, setcatalogHas] = useState(false)
  useEffect(() => {
    getCourseCatalog(props.courseId).then(res=>{
        console.log(res)
        setCatalog(res)
        setcatalogHas(true)
    })
  
  }, [catalogHas])
  return (
    <CourseCatalogWrapper>
         {
                catalog.map((item, index)=>{
                    return (
                        <div key={item.section_id}>
                            <h2>{item.section_order+'. '+item.section_name}</h2>
                            {
                                item.subsections.map((subItem,subIndex)=>{
                                   return <h3 key={item.subsection_id}>{item.section_order+'.'+subItem.subsection_order+'. '+subItem.subsection_name}</h3>
                                })
                            }
                        </div>
                    )
                })
            }
    </CourseCatalogWrapper>
  )
})

export default CourseCatalog