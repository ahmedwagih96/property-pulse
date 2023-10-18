import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  About,
  Profile,
  SignIn,
  SignUp,
  CreateListing,
  UpdateListing,
  Listing,
  Search,
} from "./pages";
import { Header } from "./components";
import { useAppSelector } from "./redux/hooks";
function App() {
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/profile"
          element={currentUser ? <Profile /> : <Navigate to="/" />}
        />
        <Route path="/listing/:id" element={<Listing />} />
        <Route
          path="/create-listing"
          element={currentUser ? <CreateListing /> : <Navigate to="/" />}
        />
        <Route
          path="/update-listing/:id"
          element={currentUser ? <UpdateListing /> : <Navigate to="/" />}
        />
        <Route
          path="/sign-in"
          element={!currentUser ? <SignIn /> : <Navigate to="/" />}
        />
        <Route
          path="/sign-up"
          element={!currentUser ? <SignUp /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
