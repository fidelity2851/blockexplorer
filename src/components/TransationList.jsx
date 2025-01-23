import { ethers } from "ethers";
import { useEffect, useState } from "react";

function TransactionList({ provider }) {
  const [isLoading, setIsLoading] = useState([]);
  const [transactions, setTransactions] = useState([]);

  async function getTransactions() {
    setIsLoading(true);

    // Fetch the latest block with transaction hashes
    const block = await provider.getBlock("latest", true);

    // Check if transactions are already complete objects
    if (block.transactions && block.transactions.length > 0) {
      if (typeof block.transactions[0] === "object") {
        setTransactions(block.transactions); // Transactions already include details
      } else {
        // Fetch full transaction details manually
        const transactions = await Promise.all(
          block.transactions.map((hash) => provider.getTransaction(hash))
        );
        setTransactions(transactions);
        
      }
    }

    setIsLoading(false);
  }

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      {/* Is loading spinner */}
      {isLoading && (
        <>
          <div className="flex justify-start items-center mb-3">
            <svg
              className="me-3"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24">
              <circle cx="12" cy="2" r="0" fill="#16829d">
                <animate
                  attributeName="r"
                  begin="0"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
              <circle
                cx="12"
                cy="2"
                r="0"
                fill="#16829d"
                transform="rotate(45 12 12)">
                <animate
                  attributeName="r"
                  begin="0.125s"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
              <circle
                cx="12"
                cy="2"
                r="0"
                fill="#16829d"
                transform="rotate(90 12 12)">
                <animate
                  attributeName="r"
                  begin="0.25s"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
              <circle
                cx="12"
                cy="2"
                r="0"
                fill="#16829d"
                transform="rotate(135 12 12)">
                <animate
                  attributeName="r"
                  begin="0.375s"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
              <circle
                cx="12"
                cy="2"
                r="0"
                fill="#16829d"
                transform="rotate(180 12 12)">
                <animate
                  attributeName="r"
                  begin="0.5s"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
              <circle
                cx="12"
                cy="2"
                r="0"
                fill="#16829d"
                transform="rotate(225 12 12)">
                <animate
                  attributeName="r"
                  begin="0.625s"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
              <circle
                cx="12"
                cy="2"
                r="0"
                fill="#16829d"
                transform="rotate(270 12 12)">
                <animate
                  attributeName="r"
                  begin="0.75s"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
              <circle
                cx="12"
                cy="2"
                r="0"
                fill="#16829d"
                transform="rotate(315 12 12)">
                <animate
                  attributeName="r"
                  begin="0.875s"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
            </svg>
            Loading
          </div>
        </>
      )}

      <div className="space-y-6">
        {transactions.slice(0, 5).map((transaction) => {
          return (
            <div
              key={transaction.hash}
              className="p-5 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 cursor-pointer transition">
              <h3 className="font-bold text-sm text-green-400">
                Tx: {transaction.hash}
              </h3>
              <p className="text-sm text-gray-400 mt-1">From: {transaction.from}</p>
              <p className="text-sm text-gray-400">To: {transaction.to}</p>
              <p className="text-sm text-gray-400">
                Amount: {ethers.formatEther(transaction.value)} ETH
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TransactionList;
