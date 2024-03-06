import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SharedLayout from "./views/sharedLayout/SharedLayout";
import Projects from "./views/projects/Projects";

import Home from "./views/home/Home";
import Board from "./views/board/Board";
import Boards from "./views/boards/Boards";
import Account from "./views/account/Account";
import Milestones from "./views/milestones/Milestones";
import Milestone from "./views/milestone/Milestone";
// import Project from "./views/project/Project";
import Login from "./views/login/Login";
import Register from "./views/register/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SharedLayout />,
      errorElement: <p>error here, refactor this into own element later</p>,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "account/",
          element: <Account />,
        },
        {
          path: "account/login/",
          element: <Login />,
        },
        {
          path: "account/register/",
          element: <Register />,
        },
        {
          path: "projects/:projectId",
          element: <Boards />,
        },
        {
          path: "projects/",
          element: <Projects />,
        },
        {
          path: "projects/boards/:boardId",
          element: <Board />,
          // we might want children here for tasks, lists and comments or handle it in the Board component
        },
        {
          path: "projects/boards/",
          element: <Boards />,
        },
        {
          path: "projects/milestones/:MilestoneId",
          element: <Milestone />,
        },
        {
          path: "projects/milestones/",
          element: <Milestones />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
