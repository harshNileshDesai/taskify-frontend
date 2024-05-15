import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import HomeDashboard from './pages/HomeDashboard';
import AllTask from './pages/AllTask';
import DefaultAllTask from './pages/DefaultAllTask';
import TaskView from './pages/TaskView';
import Settings from './pages/Settings';
import CreateTask from './pages/CreateTask';

const App = () => {
    const router = createBrowserRouter([
        { path: "/", element: <Root /> },
        {
            path: "/home",
            element: <Home />,
            children: [
                { path: "", element: <HomeDashboard /> },
                { path: "create-task", element: <CreateTask /> },
                { 
                    path: "tasks", 
                    element: <AllTask />,
                    children: [
                        { path: "", element: <DefaultAllTask /> },
                        { path: ":taskId", element: <TaskView /> },
                    ]
                },
                { path: "settings", element: <Settings /> },
            ]
        }
    ]);
    return (
        <RouterProvider router={router} />
    )
}

export default App