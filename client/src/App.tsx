import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Search = lazy(() => import("./pages/Search"));
const Profile = lazy(() => import("./pages/Profile"));
const Listing = lazy(() => import("./pages/Listing"));
const CreateListing = lazy(() => import("./pages/CreateListing"));
const UpdateListing = lazy(() => import("./pages/UpdateListing"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const User = lazy(() => import("./pages/User"));
const NotFound = lazy(() => import("./pages/NotFound"));
import { Header, LoadingSpinner } from "./components";
import { useAppSelector } from "./redux/hooks";
function App() {
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/profile"
            element={currentUser ? <Profile /> : <Navigate to="/sign-in" />}
          />
          <Route path="/users/:id" element={<User />} />
          <Route path="/listing/:id" element={<Listing />} />
          <Route
            path="/create-listing"
            element={
              currentUser ? <CreateListing /> : <Navigate to="/sign-in" />
            }
          />
          <Route
            path="/update-listing/:id"
            element={
              currentUser ? <UpdateListing /> : <Navigate to="/sign-in" />
            }
          />
          <Route
            path="/sign-in"
            element={!currentUser ? <SignIn /> : <Navigate to="/" />}
          />
          <Route
            path="/sign-up"
            element={!currentUser ? <SignUp /> : <Navigate to="/" />}
          />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
export default App;
