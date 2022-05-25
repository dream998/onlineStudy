import request from './axios'
import axios from 'axios'
export function getNewCourses(){
    return request.get('/courses/newcourses')
}
export function getCourseCatalog(courseId){
    return request.get(`/courses/${courseId}/catalog`)
}

function getChoiceQuestions(subsectionId){
    return request.get(`/courses/${subsectionId}/choicequestions`)
}

function getJudgeQuestions(subsectionId){
    return request.get(`/courses/${subsectionId}/judgequestions`)
}

export function getQuestions(subsectionId){
    return axios.all([getChoiceQuestions(subsectionId), getJudgeQuestions(subsectionId)])
}
export function joinCourse(courseId){
    return request.get(`/courses/${courseId}/joincourse`)
}
export function getStudyProcess(subsectionId){
    return request.get(`/courses/${subsectionId}/studyprocess`)
}
export function postStudyProcess(subsectionId,studyProcess){
    return request.post(`/courses/${subsectionId}/studyprocess`,studyProcess)
}
export function postAnswers(subsectionId,answers){
    return request.post(`/courses/${subsectionId}/answers`,answers)
}
// 获取选课信息
export function getChoiceCourses(courseId){
    return request.get(`/courses/${courseId}/choicecourse`)
}

// 获取我的课程
export function getMycourses(){
    return request.get(`/courses/mycourses`)
}

// 发表评论
export function postComment(subsectionId, values){
    return request.post(`/courses/${subsectionId}/comment`,values)
}
// 根据小节id获取评论
export function getCommentsBySubsectionId(subsectionId){
    return request.get(`/courses/${subsectionId}/comment`)
}
// 根据课程id获取评论
export function getCommentsByCourseId(courseId){
    return request.get(`/courses/${courseId}/allcomments`)
}
// 获取个人信息
export function getPersonalInfo(){
    return request.get('/users/personalinfo')
}

// 获取最新消息
export function getNewMessage(){
    return request.get('/users/mymessage')
}

// 更新消息state
export function updateMessageState(value){
    return request.post('/courses/updatacommentstate',value)
}
// 获取warning
export function getWarning(){
    return request.get('/courses/coursewarning')
}
// 更新warning
export function updateWarning(){
    return request.get('/courses/updatewarningstate')
}

// 发表share
export function sendShare(value){
    return request.post('/courses/share',value)
}
// 获取shares
export function getShares(courseId){
    return request.get(`/courses/${courseId}/share`)
}