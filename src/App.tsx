import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes/route";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
