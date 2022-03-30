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