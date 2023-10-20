import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProfilUser, editNameToggle } from "../thunks/userThunks";
import AccountCard from "../components/AccountCard";
import accountData from "../data/accountCardData.json";
import EditNameForm from "../components/EditNameForm";
import { Navigate } from "react-router-dom";

/**
 * Créer le contenu de la page User
 */

export default function User() {
    // redux states
    const token = useSelector((state) => state.user.token);
    const userName = useSelector((state) => state.user.userName);
    const editNameMode = useSelector((state) => state.user.editNameMode);
    const isLog = useSelector((state) => state.user.isLog);

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
        if (isLog) {
            dispatch(addProfilUser(token));
        }
    }, [dispatch, token, isLog]);

    // affichage du formulaire
    const handleClickEditName = () => {
        dispatch(editNameToggle());
    };

    return (
        <main className="main bg-dark">
            {isLog ? (
                <div>
                    {editNameMode ? (
                        <EditNameForm token={token} userName={userName} />
                    ) : (
                        <div className="header">
                            <h1>
                                Welcome back
                                <br />
                                {userName}
                            </h1>
                            <button
                                className="edit-button"
                                onClick={handleClickEditName}
                            >
                                Edit Name
                            </button>
                        </div>
                    )}
                    <h2 className="sr-only">Accounts</h2>
                    {accountData.map((info) => (
                        <AccountCard
                            key={`accountCard-${info.id}`}
                            title={info.title}
                            amount={userBalances[info.amount]}
                            description={info.description}
                        />
                    ))}
                </div>
            ) : (
                <Navigate to="/sign-in" />
            )}
        </main>
    );
}
