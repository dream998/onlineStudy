import CourseClassify from "../pages/course-classify"
import Home from "../pages/home"
import Login from "../pages/login"
import Message from "../pages/message"
import MyCourses from "../pages/my-courses"
import Profile from "../pages/profile"
import CourseDetail from "../pages/course-detail"
import CourseStudy from "../pages/course-study"
import CourseInformation from "../pages/course-study/course-information"
import CourseAnnouncement from "../pages/course-study/course-announcement"
import BeforeRouter from "./beforeRouter"
import CourseVideo from "../pages/course-video"
const routes = [
    {
        path: '/',
        exact: true,
        component: BeforeRouter(Home)
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/courseclassify',
        component: CourseClassify
    },
    {
        path: '/mycourses',
        component: MyCourses
    },
    {
        path: '/message',
        component: Message
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/coursedetail',
        component: CourseDetail
    },
    {
        path: '/coursestudy',
        component: CourseStudy
    },
   {
       path: '/coursevideo',
       component: CourseVideo
   }
]
export default routes