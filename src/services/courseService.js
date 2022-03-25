import request from './axios'
export function getNewCourses(){
    return request.get('/courses/newcourses')
}
export function getCourseCatalog(courseId){
    return request.get(`/courses/${courseId}/catalog`)
}