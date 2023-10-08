/**
 * Créer les cards account
 * @returns {ReactElement}
 * @param {String} title - titre de l'élément
 * @param {String} amount - référence à fournir pour le type de montant
 * @param {String} description - description de l'élément
 */

export default function AccountCard({ title, amount, description }) {
    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{title}</h3>
                <p className="account-amount">{amount}</p>
                <p className="account-amount-description">{description}</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">
                    View transactions
                </button>
            </div>
        </section>
    );
}
