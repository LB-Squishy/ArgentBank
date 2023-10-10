import { Link } from "react-router-dom";
import argentBankLogo from "../assets/argentBankLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/UserSlice";
import { useEffect, useState } from "react";

/**
 * Créer le header
 */

export default function Header() {
    // states
    const [userIsLog, setUserIsLog] = useState(false);

    // redux states
    const { isLog } = useSelector((state) => state.user);

    // recupération des hooks
    const dispatch = useDispatch();

    // maintien du LogOut au refresh de la page
    useEffect(() => {
        const localLog = sessionStorage.getItem("isLog");
        if (localLog === "true" || isLog) {
            setUserIsLog(true);
        }
    }, [isLog]);

    // gestion du bouton signOut
    const handleLogout = () => {
        dispatch(logoutUser()); // supprime le token de redux states
        setUserIsLog(false);
        sessionStorage.setItem("isLog", false);
    };

    return (
        <header>
            <nav className="main-nav">
                <Link
                    className="main-nav-logo"
                    to="./homepage"
                    onClick={userIsLog ? handleLogout : null}
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
                    onClick={userIsLog ? handleLogout : null}
                >
                    <i className="fa fa-user-circle"></i>
                    {userIsLog ? " Sign Out" : " Sign In"}
                </Link>
            </nav>
        </header>
    );
}
