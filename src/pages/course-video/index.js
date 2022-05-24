import React, { memo, useState, useEffect, useRef } from 'react'
import { VideoHeaderWrapper, VideoContentWrapper, VideoContentLeft, VideoContentRight, QuestionArea } from './style'
import { LeftOutlined } from '@ant-design/icons'
import { Card, Button, Radio, Space, Form, message } from 'antd'
import CourseCatalog from './course-catalog'
import CourseComment from './course-comment'
import { getQuestions, getStudyProcess, postAnswers, postStudyProcess } from '../../services/courseService'


const CourseVideo = (props) => {
    console.log(props.location.state)
    const [subsection, setSubsection] = useState(props.location.state.subsection)
    //setSubsection(props.location.state)
    console.log('subsection', subsection);
    const [activeTabKey, setActiveTabKey] = useState('catalog')
    //保存选择题
    const [choiceQuestions, setChoiceQuestions] = useState([])
    const [choiceQuestionsHas, setChoiceQuestionsHas] = useState(false)
    // 保存判断题
    const [judgeQuestions, setJudgeQuestions] = useState([])
    const [judgeQuestionsHas, setJudgeQuestionsHas] = useState(false)

    // 保存选择题答案
    const [choiceValues, setChoiceValues] = useState([])
    // 保存判断题答案
    const [judgeValues, setJudgeValues] = useState([])
    // 保存学习进度

    const [studyProcess, setStudyProcess] = useState({
        videoProcess: 0,
        videoFinished: 0,
        fileFinished: 0,
        testFinished: 0
    })
    const [studyProcessHas, setStudyProcessHas] = useState(false)
    // 视频url
    const [videoUrl, setVideoUrl] = useState('http://' + subsection.subsection_video_url)
    // useEffect(() => {
    //     setSubsection(props.location.state)

    // },[subsection])

    useEffect(() => {

        console.log('subsection.subsection_id:', subsection.subsection_id);
        getQuestions(subsection.subsection_id).then(
            (questions) => {
                //console.log('请求完成');
                setChoiceQuestions(questions[0])
                setChoiceValues(new Array(questions[0].length))
                setChoiceQuestionsHas(true)
                setJudgeQuestions(questions[1])
                setJudgeValues(new Array(questions[1].length))
                setJudgeQuestionsHas(true)


            }
        ).catch(err => {
            console.log(err);
        })

    }, [choiceQuestionsHas, judgeQuestionsHas])
    const videoRef = useRef()
    useEffect(() => {
        const hints = document.getElementsByClassName('hint')
        for (let i = 0; i < hints.length; i++) {
            hints[i].style.display = 'none'
        }
    },[videoUrl]

    )

    

    useEffect(() => {
        getStudyProcess(subsection.subsection_id).then((res) => {
            // console.log(res);
            const newStudyProcess = {
                videoProcess: res[0].video_process,
                videoFinished: res[0].video_finished,
                fileFinished: res[0].file_finished,
                testFinished: res[0].test_finished
            }

            new Promise((resolve, reject) => {
                setStudyProcess(newStudyProcess)
                setStudyProcessHas(true)
                resolve()

            }).then(res => {
                // console.log(studyProcess);
                // videoRef.current.currentTime = 10
                // document.getElementsByTagName('video')[0].currentTime = 10
                // console.log(videoRef.current.currentTime, studyProcess.videoProcess);
            })


        }).catch(err => {
            console.log(err);
        })
    }, studyProcessHas)

    const onVideoLoader = () => {
        //console.log('加载完成');
        //console.log(studyProcess);
        videoRef.current.currentTime = 10
        document.getElementById('video').currentTime = 10
        //console.log(videoRef.current.currentTime, studyProcess.videoProcess);
        //console.log(document.getElementById('video').currentTime);
    }
    const onTabChange = key => {
        setActiveTabKey(key)
    }

    const tabList = [
        {
            key: 'catalog',
            tab: '目录'
        },
        {
            key: 'comments',
            tab: '讨论'
        }
    ]
    const contentList = {
        catalog: <CourseCatalog courseId={props.location.state.courseId} setVideoUrl={setVideoUrl} setSubsection={setSubsection} setChoiceValues = {setChoiceValues} setJudgeValues = {setJudgeValues}/>,
        comments: <CourseComment courseId={props.location.state.courseId} subsectionId = {props.location.state.subsection.subsection_id}/>
    }

    const onChoiceChange = (e, item) => {
        const newChoiceValues = [...choiceValues]
        newChoiceValues[item.question_order - 1] = { questionId: item.question_id, answer: e.target.value }
        setChoiceValues(newChoiceValues)
        //choiceValues[item.question_order - 1] = { questionId: item.question_id, userAnswer: e.target.value }

    }

    const onJudgeChange = (e, item) => {
        const newJudgeValues = [...judgeValues]
        newJudgeValues[item.question_order - 1] = { questionId: item.question_id, answer: e.target.value }
        setJudgeValues(newJudgeValues)
        //judgeValues[item.question_order - 1] = { questionId: item.question_id, userAnswer: e.target.value }
    }

    const commitAnswer = () => {
        //console.log(choiceValues);
        //console.log(judgeValues);
        const choiceCurrentDivs = document.getElementsByClassName('choiceCurrentDiv')
        const choiceErrorDivs = document.getElementsByClassName('choiceErrorDiv')
        const judgeCurrentDivs = document.getElementsByClassName('judgeCurrentDiv')
        const judgeErrorDivs = document.getElementsByClassName('judgeErrorDiv')
        for (let i = 0; i < choiceValues.length; i++) {
            if (choiceValues[i].answer === choiceQuestions[i].question_answer) {
                choiceCurrentDivs[i].style.display = 'block'
                choiceErrorDivs[i].style.display = 'none'
            } else {
                choiceErrorDivs[i].style.display = 'block'
                choiceCurrentDivs[i].style.display = 'none'
            }
        }
        for (let i = 0; i < judgeValues.length; i++) {
            if (judgeValues[i].answer === judgeQuestions[i].question_answer) {
                judgeCurrentDivs[i].style.display = 'block'
                judgeErrorDivs[i].style.display = 'none'
            } else {
                judgeErrorDivs[i].style.display = 'block'
                judgeCurrentDivs[i].style.display = 'none'
            }
        }
        // 设置测试题完成度
        //setStudyProcess({ ...studyProcess, testFinished: 1 })

        setStudyProcess((prev)=>{
            const newStudyProcess = {...prev,testFinished: 1}
            postStudyProcess(subsection.subsection_id,newStudyProcess).then(res=>{
                message.success('学习进度保存成功')
                postAnswers(subsection.subsection_id,[choiceValues, judgeValues]).then(res=>{
                    message.success('回答保存成功')
                })
            })
            return newStudyProcess
        })


    }

    const recordVideoTime = e => {
        //console.log(e.target.duration);
        setStudyProcess({ ...studyProcess, videoProcess: e.target.currentTime })
        //console.log(parseInt(e.target.currentTime)/parseInt(e.target.duration));
        if (parseInt(e.target.currentTime) / parseInt(e.target.duration) >= 0.9) {
            setStudyProcess({ ...studyProcess, videoFinished: 1 })
        }
        // videoProcess = e.target.currentTime
        //console.log(e.target.currentTime);
    }
    // 设置文件已完成
    const setFileVisited = () => {
        setStudyProcess({ ...studyProcess, fileFinished: 1 })
    }
    return (
        <div>
            <VideoHeaderWrapper>
                <div className='header-left'><LeftOutlined /> 返回</div>
                <div className='header-middle'>章节详情</div>
                <div className='header-right'></div>
            </VideoHeaderWrapper>

            <VideoContentWrapper>
                <VideoContentLeft>
                    <h2>C语言的发展概述</h2>
                    <video src={videoUrl} ref={videoRef}
                        id='video'
                        width="640" height="480" controls
                        style={{ backgroundColor: 'black' }}
                        onTimeUpdate={recordVideoTime}
                    // onLoadedMetadata={onVideoLoader}
                    ></video>
                    <br />
                    <br />
                    <br />
                    {subsection.subsection_file_url && <Button style={{ width: '50%', height: '50px' }} type='primary' onClick={setFileVisited}><a target='_blank' rel="noreferrer" href={'http://' + subsection.subsection_file_url}>查看资料</a></Button>}
                    <QuestionArea>
                        <h2>本章测试</h2>
                        <h3>选择题</h3>


                        {
                            choiceQuestions.map((item, index) => {
                                return (
                                    <div style={{ textAlign: 'left', marginLeft: '20%' }}>

                                        <p>{<h3>{index + 1 + '. ' + item.question_content}</h3>}</p>
                                        <Radio.Group onChange={(e) => { onChoiceChange(e, item) }} value={choiceValues[index] ? choiceValues[index].answer : ''}>
                                            <Space direction="vertical">
                                                <Radio value={'A'}>{'A. ' + item.question_item_a}</Radio>
                                                <Radio value={'B'}>{'B. ' + item.question_item_b}</Radio>
                                                <Radio value={'C'}>{'C. ' + item.question_item_c}</Radio>
                                                <Radio value={'D'}>{'D. ' + item.question_item_d}</Radio>
                                            </Space>
                                        </Radio.Group>
                                        <div className='choiceCurrentDiv hint' style={{ display: 'none' }}>
                                            <p style={{ color: 'lightgreen' }}>您回答正确！</p>
                                        </div>
                                        <div className='choiceErrorDiv hint' style={{ display: 'none' }}>
                                            <p style={{ color: 'red' }}>
                                                {'正确答案是：' + item.question_answer + ' 您的答案是：' + (choiceValues[index] ? choiceValues[index].answer : '')}
                                            </p>
                                        </div>
                                    </div>

                                )
                            })
                        }

                        <h3>判断题</h3>
                        {
                            judgeQuestions.map((item, index) => {
                                return (
                                    <div style={{ textAlign: 'left', marginLeft: '20%' }}>
                                        <p>{<h3>{index + 1 + '. ' + item.question_content}</h3>}</p>
                                        <Radio.Group onChange={(e) => { onJudgeChange(e, item) }} value={judgeValues[index] ? judgeValues[index].answer : ''}>
                                            <Space direction="vertical">
                                                <Radio value={1}>对</Radio>
                                                <Radio value={0}>错</Radio>

                                            </Space>
                                            <br />
                                        </Radio.Group>

                                        <div className='judgeCurrentDiv hint' style={{ display: 'none' }}>
                                            <p style={{ color: 'lightgreen' }}>您回答正确！</p>
                                        </div>
                                        <div className='judgeErrorDiv hint' style={{ display: 'none' }}>
                                            <p style={{ color: 'red' }}>
                                                回答错误！
                                            </p>
                                        </div>

                                    </div>
                                )
                            })
                        }

                        <Button onClick={commitAnswer}>提交答案</Button>

                    </QuestionArea>
                </VideoContentLeft>

                <VideoContentRight>
                    <Card style={{ width: '100%' }}
                        tabList={tabList}
                        activeTabKey={activeTabKey}
                        onTabChange={key => { onTabChange(key) }}>

                        {contentList[activeTabKey]}
                    </Card>

                </VideoContentRight>

            </VideoContentWrapper>

        </div>
    )
}

export default CourseVideo