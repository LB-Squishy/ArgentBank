import { Link } from "react-router-dom";
import argentBankLogo from "../assets/argentBankLogo.png";
import { useSelector } from "react-redux";

/**
 * Créer le header
 */

export default function Header() {
    const { log } = useSelector((state) => state.user);
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
                <Link
                    className="main-nav-item"
                    to={log ? "./homepage" : "./sign-in"}
                >
                    <i className="fa fa-user-circle"></i>
                    {log ? " Sign Out" : " Sign In"}
                </Link>
            </nav>
        </header>
    );
}
