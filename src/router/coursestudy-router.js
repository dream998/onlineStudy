import CourseInformation from "../pages/course-study/course-information"
import CourseAnnouncement from "../pages/course-study/course-announcement"
import CourseComment from '../pages/course-study/course-comment'
import CourseTest from '../pages/course-study/course-test'
import CourseCommentDetail from "../pages/course-study/course-comment-detail"
import CourseShareWrite from "../pages/course-study/course-share-write"
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
    {
        path: '/coursestudy/commentdetail',
        component: CourseCommentDetail
    },
    {
        path: '/coursestudy/sharewrite',
        component: CourseShareWrite
    }

]
export default courseRoutes