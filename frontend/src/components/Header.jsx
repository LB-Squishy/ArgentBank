import { Link } from "react-router-dom";
import argentBankLogo from "../assets/argentBankLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../thunks/userThunks";

/**
 * Créer le header
 */

export default function Header() {
    // redux states
    const isLog = useSelector((state) => state.user.userName);
    const userName = useSelector((state) => state.user.userName);

    // recupération des hooks
    const dispatch = useDispatch();

    // gestion du bouton signOut
    const handleLogout = () => {
        dispatch(logoutUser()); // supprime le token de redux states
    };

    return (
        <header>
            <nav className="main-nav">
                <Link className="main-nav-logo" to="./homepage">
                    <img
                        className="main-nav-logo-image"
                        src={argentBankLogo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    {isLog ? (
                        <Link className="main-nav-item" to="./User">
                            <span className="main-nav-text">{userName}</span>
                            <i className="fa fa-user-circle"></i>
                        </Link>
                    ) : null}
                    {isLog ? (
                        <Link className="main-nav-item" to="./User">
                            <i className="fa-sharp fa-solid fa-gear"></i>
                        </Link>
                    ) : null}
                    <Link
                        className="main-nav-item"
                        to="./sign-in"
                        onClick={isLog ? handleLogout : null}
                    >
                        {isLog ? (
                            <i className="fa-solid fa-power-off"></i>
                        ) : (
                            <i className="fa fa-user-circle"></i>
                        )}
                        {isLog ? null : " Sign In"}
                    </Link>
                </div>
            </nav>
        </header>
    );
}
