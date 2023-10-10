import AccountCard from "../components/AccountCard";
import accountData from "../data/accountCardData.json";

/**
 * Créer le contenu de la page User
 */

export default function User() {
    // Données de montant provisoires sans gestion de données par utilisateur
    const userBalances = {
        checkingBalance: "$2,082.79",
        savingsBalance: "$10,928.42",
        creditCardBalance: "$184.30",
    };

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    Tony Jarvis!
                </h1>
                <button className="edit-button">Edit Name</button>
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
