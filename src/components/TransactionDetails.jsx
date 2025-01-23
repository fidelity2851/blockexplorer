
function TransactionDetails({ transaction }) {
  return (
    <div>
      <h2>Transaction Details</h2>
      <p>Amount: {transaction.amount}</p>
      <p>Vendor: {transaction.vendor}</p>
      <p>Category: {transaction.category}</p>
    </div>
  );
}