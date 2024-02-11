import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingSkeleton from "./components/LoadingSkeleton";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/login";
import About from "./pages/About";

import UpdateProfile from "./pages/UpdateProfile";
import CreateResolve from "./pages/CreateResolve";
import ResolvePage from "./pages/ResolvePage";
import UserProfile from "./pages/UserProfile";
const User_Dashboard = lazy(() => import("./pages/User_Dashboard"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="about" element={<About />} />
            <Route path="update-profile" element={<UpdateProfile />} />
            <Route path="user-profile" element={<UserProfile />} />
            <Route
              path="user/:userId"
              element={
                <Suspense fallback={<LoadingSkeleton />}>
                  <User_Dashboard />
                </Suspense>
              }
            />

            <Route path="create-resolve" element={<CreateResolve />} />
            <Route path="resolve/:resolveSlug" element={<ResolvePage />} />
            <Route path="*" element={<h2>Page not found</h2>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
