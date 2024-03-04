import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import Login from "../pages/Login";


export const privateRoutes = [ // только для атворизованных
    {path: '/about', component: About},
    {path: '/posts', component: Posts},
    {path: '/posts/:id', component: PostIdPage}
]

export const publicRoutes = [ // для тех кто только зашел
    {path: '/login', component: Login}
]