import App from './App'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Restore from '@/pages/Restore'
import Upload from './pages/Upload'
import Results from '@/pages/Results'
import Contact from '@/pages/Contact'

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/restore',
                element: <Restore />
            },
            {
                path: '/upload',
                element: <Upload />
            },
            {
                path: '/results/:id',
                element: <Results />
            },
            {
                path: '/about-us',
                element: <Contact />
            }
        ]
    },
]

export default routes