import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProfilUser, changeProfilUser } from "../thunks/userThunks";
import AccountCard from "../components/AccountCard";
import accountData from "../data/accountCardData.json";

/**
 * Créer le contenu de la page User
 */

export default function User() {
    // redux states
    const token = useSelector((state) => state.user.token);
    const userName = useSelector((state) => state.user.userName);
    const firstName = useSelector((state) => state.user.firstName);
    const lastName = useSelector((state) => state.user.lastName);

    //state
    const [editNameActive, setEditNameActive] = useState(false);
    const [newUserName, setNewUserName] = useState(userName);

    // Données de montant provisoires sans gestion de données par utilisateur
    const userBalances = {
        checkingBalance: "$2,082.79",
        savingsBalance: "$10,928.42",
        creditCardBalance: "$184.30",
    };

    // recupération des hooks
    const dispatch = useDispatch();

    // recupération des infos du profil qui s'est connecté
    useEffect(() => {
        dispatch(addProfilUser(token));
    });

    // affichage du formulaire
    const handleClickEditName = () => {
        setEditNameActive(true);
    };
    const handleClickCloseEditName = () => {
        setEditNameActive(false);
    };

    // envoi les données du formulaire pour changer userName et appel les nouvelles infos
    const handleClickSaveNewName = (e) => {
        e.preventDefault();
        dispatch(changeProfilUser({ token, newUserName }));
        dispatch(addProfilUser(token));
        setEditNameActive(false);
    };

    // <form onSubmit={handleClickSaveNewName}></form>
    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {userName}
                </h1>
                <button className="edit-button" onClick={handleClickEditName}>
                    Edit Name
                </button>
                {editNameActive ? (
                    <form onSubmit={handleClickSaveNewName}>
                        <div className="input-wrapper">
                            <label htmlFor="userName">User name</label>
                            <input
                                type="text"
                                id="userName"
                                value={newUserName}
                                onChange={(e) => setNewUserName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="firstName">First name</label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder={firstName}
                                readOnly
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="lastName">Last name</label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder={lastName}
                                readOnly
                            />
                        </div>
                        <button className="sign-in-button" type="submit">
                            Save
                        </button>
                        <button
                            className="sign-in-button"
                            onClick={handleClickCloseEditName}
                        >
                            Cancel
                        </button>
                    </form>
                ) : null}
            </div>

            <h2 className="sr-only">Accounts</h2>
            {accountData.map((info) => (
                <AccountCard
                    key={info.id}
                    title={info.title}
                    amount={userBalances[info.amount]}
                    description={info.description}
                />
            ))}
        </main>
    );
}
