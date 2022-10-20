import "./App.css";
import Signup from "./signup/Signup";
import TodoApp from "./TodoApp";
import Login from "./login/Login";
import Error from "./Error/Error";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./privateRoutes/PrivateRoute";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error />} />
        {/* /todo this route is a private route in a sense that without login to this application, we want that user have no right to visit this path, so implement this scenario we use private routing and make this path (/todo)private */}
        {/* // Implementation of private route */}
        <Route element={<PrivateRoute />}>
          <Route path="/todo" element={<TodoApp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
