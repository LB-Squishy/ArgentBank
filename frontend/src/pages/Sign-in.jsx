import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Créer le contenu de la page Sign-in
 */

export default function SignIn() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        event.preventDefault();
        const userData = {
            email: username,
            password: password,
        };
        try {
            const response = await fetch(
                "http://localhost:3001/api/v1/user/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                }
            );
            if (response.ok) {
                const result = await response.json();
                const token = result.body.token;
                localStorage.setItem("token", token);
                // console.log(token);
                navigate("/user");
            } else {
                console.error("Erreur lors de la connexion");
                alert(
                    "Echec de connexion. Saisissez un nom d'utilisateur et un mot de passe valide"
                );
            }
        } catch (error) {
            console.error("Erreur lors de la connexion", error);
            alert("Echec de connexion.");
        }
    };
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
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
                    <button className="sign-in-button" onClick={handleSignIn}>
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    );
}
