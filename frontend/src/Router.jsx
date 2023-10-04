import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import SignIn from "./pages/Sign-in";
import User from "./pages/User";

function Router() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/user" element={<User />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default Router;
