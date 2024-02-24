import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SharedLayout from "./views/sharedLayout/SharedLayout";
import Projects from "./views/projects/Projects";

import Home from "./views/home/Home";
import Board from "./views/board/Board";
import Boards from "./views/boards/Boards";
import Account from "./views/account/Account";
import Milestones from "./views/milestones/Milestones";
import Milestone from "./views/milestone/Milestone";
import Project from "./views/project/Project";

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
          // we might want to nest another one for login, register and maybe management
        },
        {
          path: "projects/",
          element: <Projects />,
        },
        {
          path: "projects/:projectId",
          element: <Project />,
        },
        {
          path: "projects/boards/",
          element: <Boards />,
        },
        {
          path: "projects/boards/:boardId",
          element: <Board />,
          // we might want children here for tasks, lists and comments or handle it in the Board component
        },
        {
          path: "projects/milestones/",
          element: <Milestones />,
        },
        {
          path: "projects/milestones/:MilestoneId",
          element: <Milestone />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
