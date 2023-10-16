import { useState } from "react";
import transactionData from "../data/transactionData.json";
import AccountDetailCollapse from "./AccountDetailCollapse";

/**
 * Créer les cards account
 * @returns {ReactElement}
 * @param {String} title - titre de l'élément
 * @param {String} amount - référence à fournir pour le type de montant
 * @param {String} description - description de l'élément
 */

export default function AccountCard({ title, amount, description }) {
    // state
    const [viewTransactions, setViewTransaction] = useState(false);

    // gère l'ouverture de la transaction
    const toggleTransactions = () => {
        setViewTransaction(!viewTransactions);
    };

    return (
        <div>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">{title}</h3>
                    <p className="account-amount">{amount}</p>
                    <p className="account-amount-description">{description}</p>
                </div>
                <div className="account-content-wrapper cta">
                    <button
                        className="transaction-button"
                        onClick={toggleTransactions}
                    >
                        View transactions
                    </button>
                </div>
            </section>
            {viewTransactions && (
                <section className="transaction">
                    <div className="transaction-items">
                        <p>Date</p>
                        <p>Description</p>
                        <p>Amount</p>
                        <p>Balance</p>
                        <p></p>
                    </div>
                    {transactionData.map((detail) => (
                        <AccountDetailCollapse
                            key={`transaction-${detail.id}`}
                            data={detail}
                        />
                    ))}
                </section>
            )}
        </div>
    );
}
