import Navbar from "./components/navbar.component";
import { Route, Routes } from "react-router-dom";
import UserAuthForm from "./pages/userAuthForm.page";
import HomePage from "./pages/home.page";
import UserDashboard from "./pages/userDashboard.page";
import NGODashboard from "./pages/ngoDashboard.page";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path="signin" element={<UserAuthForm type="sign-in" />} />
        <Route path="signup" element={<UserAuthForm type="sign-up" />} />
        <Route path="user-dashboard" element={<UserDashboard />} />
        <Route path="ngo-dashboard" element={<NGODashboard />} />
      </Route>
    </Routes>
  );
};

export default App;