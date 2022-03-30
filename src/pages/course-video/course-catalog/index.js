import React, { memo, useState, useEffect, useRef } from 'react'
import { CourseCatalogWrapper } from './style'
import { getCourseCatalog, getStudyProcess } from '../../../services/courseService'
const CourseCatalog = memo((props) => {
  //console.log(props.location.state);
  const [catalog, setCatalog] = useState([])
  const [catalogHas, setcatalogHas] = useState(false)

  const [studyProcessList, setStudyProcessList] = useState({})
  const [studyProcessHas, setStudyProcessHas] = useState(false)
  const [subsectionCount, setSubsectionCount] = useState(0)


  useEffect(() => {
    console.log('获取目录');
    getCourseCatalog(props.courseId).then(res => {
      console.log(res)
      setCatalog(res)
      setcatalogHas(true)
      let count = 0
      for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < res[i].subsections.length; j++) {
          count++
        }
      }
      setSubsectionCount(count)
      console.log('小节总数是：', count);

    })


  }, [catalogHas])

  useEffect(() => {
    console.log('根据目录获取进度');
    for (let i = 0; i < catalog.length; i++) {
      const section = catalog[i]
      console.log('章节', section);
      for (let j = 0; j < section.subsections.length; j++) {
        const subsection = section.subsections[j]
        console.log(subsection);

        console.log('获取学习进度');
        getStudyProcess(subsection.subsection_id).then(res => {
          console.log('小节id是', subsection.subsection_id);

          setStudyProcessList((prev) => {
            const newStudyProcessList = { ...prev }
            newStudyProcessList[subsection.subsection_id] = res
            console.log(newStudyProcessList);
            return newStudyProcessList

          })
        }).catch(err => { console.log(err); })


      }
    }
    setStudyProcessHas(true)

  }, [catalogHas])


  const onItemClick = (item) => {
    props.setVideoUrl('http://' + item.subsection_video_url)
  }

  const showProcess = (subsectionId) => {
    console.log('展示进度');
    console.log(studyProcessList);
    const process = studyProcessList[subsectionId]
    const keys = Object.keys(studyProcessList)
    console.log(subsectionId);
    const index = keys.indexOf(subsectionId.toString())
    console.log(keys);
    console.log('index是',index);
    console.log('学习进度的长度是',Object.values(studyProcessList).length);
    const spans = document.getElementsByClassName('status')
    let spanColor = ''
    if (JSON.stringify(studyProcessList) == '{}') {
      return ''
    } else if (Object.values(studyProcessList).length !== subsectionCount) {
      return ''
    } else if (process.length === 0) {
      
        spans[index].style.color = 'red'
     
      return '未开始'
    } else if (process.video_finished == 1 && process.file_finished == 1 && process.test_finished == 1) {
      
        spans[index].style.color = 'green'
      
      return '已完成'
    } else {
      
        spans[index].style.color = 'yellow'
      
      return '未完成'
    }
    
    for(let i = 0; i < spans.length; i++){
      spans[i].style.color = spanColor
    }
  }
  return (
    <CourseCatalogWrapper>
      {
        catalog.map((item, index) => {
          return (
            <div key={item.section_id} >
              <h2>{item.section_order + '. ' + item.section_name}</h2>
              {
                item.subsections.map((subItem, subIndex) => {
                  return <h3 key={subItem.subsection_id} onClick={() => { onItemClick(subItem) }}>
                    <span>{item.section_order + '.' + subItem.subsection_order + '. ' + subItem.subsection_name}</span>
                    <span className='status' style={{marginLeft: '5px' }}>{showProcess(subItem.subsection_id)}</span>
                  </h3>
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