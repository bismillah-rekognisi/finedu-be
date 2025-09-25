export const toTransactionResponse = (transaction) => {
    return {
        id: transaction.id,
        business: transaction.business,
        date: transaction.date,
        type: transaction.type,
        category: transaction.category,
        amount: transaction.amount,
        notes: transaction.notes,
    };
};

export const toTransactionListResponse = (transactions) => {
    return transactions.map(transaction => toTransactionResponse(transaction));
};
