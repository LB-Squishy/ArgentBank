import { Link } from "react-router-dom";
import argentBankLogo from "../assets/argentBankLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/UserSlice";

/**
 * Créer le header
 */

export default function Header() {
    // redux states
    const { isLog } = useSelector((state) => state.user);

    // recupération des hooks
    const dispatch = useDispatch();

    // gestion du bouton signOut
    const handleLogout = () => {
        dispatch(logoutUser()); // supprime le token de redux states
    };

    return (
        <header>
            <nav className="main-nav">
                <Link
                    className="main-nav-logo"
                    to="./homepage"
                    onClick={isLog ? handleLogout : null}
                >
                    <img
                        className="main-nav-logo-image"
                        src={argentBankLogo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <Link
                    className="main-nav-item"
                    to="./sign-in"
                    onClick={isLog ? handleLogout : null}
                >
                    <i className="fa fa-user-circle"></i>
                    {isLog ? " Sign Out" : " Sign In"}
                </Link>
            </nav>
        </header>
    );
}
