import RootLayout from "./layouts/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Dashboard } from "./features/Dashboard/Dashboard";
import { Workers } from "./features/Workers/Workers";
import ErrorPage from "./layouts/components/Error/ErrorPage";
import WorkerProfile from "./features/Workers/WorkerProfile/WorkerProfile";
import {
  createNewWorker,
  deleteWorker,
  editWorker,
  getWorkerByID,
  getWorkers,
} from "./api/Worker/Worker";
import EditWorkerProfile from "./features/Workers/EditWorker/EditWorker";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "/workers",
        children: [
          { index: true, element: <Workers />, loader: getWorkers },
          {
            path: ":id",
            id: "worker-profile",
            loader: getWorkerByID,
            children: [
              {
                index: true,
                element: <WorkerProfile />,
                action: deleteWorker,
              },
              {
                path: "edit",
                element: <EditWorkerProfile />,
                action: editWorker,
              },
            ],
          },
          { path: "new", element: <WorkerProfile />, action: createNewWorker },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
