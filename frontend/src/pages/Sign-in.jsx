import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/UserSlice";

/**
 * Créer le contenu de la page Sign-in
 */

export default function SignIn() {
    // states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    // redux states
    const { error } = useSelector((state) => state.user);

    // recupération des hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // recupération des infos de connexion si rememberMe coché
    useEffect(() => {
        const localEmail = localStorage.getItem("email");
        const localPassword = localStorage.getItem("password");
        if (localEmail && localPassword) {
            setEmail(localEmail);
            setPassword(localPassword);
            setRememberMe(true);
        }
    }, []);

    // changement d'état de rememberMe
    const handleChangeRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    // gestion du bouton signIn
    const handleSignIn = (e) => {
        e.preventDefault();
        let userLoginData = {
            email,
            password,
        };
        dispatch(loginUser(userLoginData)).then((result) => {
            if (result.payload) {
                if (rememberMe === true) {
                    localStorage.setItem("email", email);
                    localStorage.setItem("password", password);
                    localStorage.setItem("rememberMe", true);
                } else {
                    localStorage.removeItem("email");
                    localStorage.removeItem("password");
                    localStorage.removeItem("rememberMe");
                }
                sessionStorage.setItem("isLog", "true");
                navigate("/user");
            } else {
                setEmail("");
                setPassword("");
            }
        });
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSignIn}>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-remember">
                        <input
                            type="checkbox"
                            id="remember-me"
                            checked={rememberMe}
                            onChange={handleChangeRememberMe}
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button" type="submit">
                        Sign In
                    </button>
                    {error && (
                        <div className="alert" role="alert">
                            {error}
                        </div>
                    )}
                </form>
            </section>
        </main>
    );
}
