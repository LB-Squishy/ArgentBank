import { useState } from "react";

/**
 * Créer les collapses du détail des comptes
 * @returns {ReactElement}
 */

export default function AccountDetailCollapse({ data }) {
    // state
    const [viewTransactionsDetail, setViewTransactionDetail] = useState(false);

    // gère l'ouverture du détail de transaction
    const toggleTransactionsDetail = () => {
        setViewTransactionDetail(!viewTransactionsDetail);
    };

    return (
        <div className="transaction-collapse">
            <div
                className={`transaction-items transaction-collapse-close ${
                    viewTransactionsDetail ? "rotated" : ""
                }`}
                onClick={toggleTransactionsDetail}
            >
                <p>{data.Date}</p>
                <p>{data.Description}</p>
                <p>{data.Amount}</p>
                <p>{data.Balance}</p>
                <p>
                    <i
                        className={`fa-solid fa-chevron-up ${
                            viewTransactionsDetail ? "rotated" : ""
                        }`}
                    ></i>
                </p>
            </div>
            {viewTransactionsDetail && (
                <div className="transaction-collapse-open">
                    <div className="transaction-extrainfo-title">
                        <p>Transaction Type</p>
                        <p>Category</p>
                        <p>Note</p>
                    </div>
                    <div className="transaction-extrainfo-detail">
                        <p>{data.Transactiontype}</p>
                        <p>{data.Category}</p>
                        <p>{data.Note}</p>
                    </div>
                    <div className="transaction-extrainfo-other"></div>
                </div>
            )}
        </div>
    );
}
