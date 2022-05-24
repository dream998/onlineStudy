import MyMessage from "../pages/profile/MyMessage";
// import MyCourse from "../pages/profile/MyCourse";
import MyCourses from "../pages/my-courses";
import Profile from "../pages/profile/Profile";

const profileRouter = [
    {
        component: Profile,
        path: '/profile/my'
    },
    {
        path: '/profile',
        exact: true,
        component: Profile
    },
    {
        component: MyCourses,
        path: '/profile/mycourses'
    },
    {
        component: MyMessage,
        path: '/profile/mymessage'
    }
]

export default profileRouter