import CourseInformation from "../pages/course-study/course-information"
import CourseAnnouncement from "../pages/course-study/course-announcement"
import CourseComment from '../pages/course-study/course-comment'
import CourseTest from '../pages/course-study/course-test'
const courseRoutes = [
    {
        path: '/coursestudy/info',
        component: CourseInformation
    },
    {
        path: '/coursestudy/announce',
        component: CourseAnnouncement
    },
    {
        path: '/coursestudy/comment',
        component: CourseComment
    },
    {
        path: '/coursestudy/test',
        component: CourseTest
    },

]
export default courseRoutes