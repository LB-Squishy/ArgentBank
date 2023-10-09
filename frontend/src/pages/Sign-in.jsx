import { useState } from "react";
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

    //redux states
    const { error } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignIn = (e) => {
        e.preventDefault();
        let userLoginData = {
            email,
            password,
        };
        dispatch(loginUser(userLoginData)).then((result) => {
            if (result.payload) {
                setEmail("");
                setPassword("");
                navigate("/user");
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
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
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
