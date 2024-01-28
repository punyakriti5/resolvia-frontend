import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingSkeleton from "./components/LoadingSkeleton";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/login";
import About from "./pages/About";
import SetupProfile from "./pages/SetupProfile";
import CreateResolve from "./pages/CreateResolve";
import ResolvePage from "./pages/ResolvePage";
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
            <Route path="setupProfile" element={<SetupProfile />} />

            <Route
              path="user/:username"
              element={
                <Suspense fallback={<LoadingSkeleton />}>
                  <User_Dashboard />
                </Suspense>
              }
            />
           
            <Route path="createResolve" element={ <CreateResolve />}/>
            <Route path="resolvePage" element={<ResolvePage/>}/>
            <Route path="*" element={<h2>Page not found</h2>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
