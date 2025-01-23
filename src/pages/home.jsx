import { useEffect, useState } from "react";
import { ethers } from "ethers";

import "../App.css";
import BlockList from "../components/BlockList";
import TransactionList from "../components/TransationList";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Home({ provider, signer }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchType, setSearchType] = useState(null);

  const [blockDetails, setBlockDetails] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [addressDetails, setAddressDetails] = useState(null);

  // Detect the type of search query
  async function detectSearchType(input) {
    if (/^0x([A-Fa-f0-9]{64})$/.test(input)) {
      // Check if it's a transaction hash
      const transaction = await provider.getTransaction(input);
      if (transaction) {
        setSearchType("transactionHash");
        return "transactionHash"; // Transaction hash (66 characters starting with 0x)
      } else {
        setSearchType("blockHash");
        return "blockHash"; // Block hash (66 characters starting with 0x)
      }
    } else if (/^0x([A-Fa-f0-9]{40})$/.test(input)) {
      setSearchType("address");
      return "address"; // Ethereum address (42 characters starting with 0x)
    } else if (/^[a-zA-Z0-9.-]+\.eth$/.test(input)) {
      setSearchType("ensName");
      return "ensName"; // ENS name
    } else {
      return "unknown"; // Could be metadata or an unsupported type
    }
  }

  async function searchBlockchain() {
    setIsSearching(true);

    const searchType = await detectSearchType(searchQuery);

    switch (searchType) {
      case "blockHash":
        const block = await provider.getBlock(searchQuery, true);
        console.log("Block Details:", block);
        setBlockDetails(block);
        break;

      case "transactionHash":
        const transaction = await provider.getTransaction(searchQuery);
        console.log("Transaction Details:", transaction);
        setTransactionDetails(transaction);
        break;

      case "address":
        const balance = await provider.getBalance(searchQuery);
        const transactionCount = await provider.getTransactionCount(
          searchQuery
        );

        setAddressDetails({
          balance: ethers.formatEther(balance),
          transactionCount,
          address: searchQuery,
        });
        break;

      case "ensName":
        const resolvedAddress = await provider.resolveName(searchQuery);
        console.log("ENS Resolved Address:", resolvedAddress);
        break;

      default:
        alert("Unknown or unsupported search type.");
        break;
    }

    setIsSearching(false);
  }

  return (
    <>
      {/* <!-- Main Content --> */}
      <main className="container mx-auto p-6">
        {/* <!-- Search Bar --> */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            searchBlockchain();
          }}
          action="p"
          className="flex justify-center mb-12">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search by Address, ENS Name, Block Number, or Hash"
            className="w-full max-w-lg p-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500 text-gray-200 placeholder-gray-500 shadow-md"
          />
          <button className="ml-4 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white font-semibold tracking-wide shadow-lg">
            Search
          </button>
        </form>

        {isSearching && (
          <>
            <div className="flex justify-center items-center mb-3">
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
              Searching
            </div>
          </>
        )}

        {/* <!-- Block Details Section --> */}
        {searchType === "blockHash" && !isSearching ? (
          <>
            {blockDetails == null ? (
              "No Record Found"
            ) : (
              <div className="my-12">
                <h2 className="text-2xl font-bold text-blue-400 mb-4">
                  Block Details
                </h2>
                <p className="text-lg text-gray-300">
                  Block Number: {blockDetails?.number}
                </p>
                <p className="text-sm text-gray-400">
                  Block Hash: {blockDetails?.hash}
                </p>
                <div className="mt-6 space-y-6">
                  {/* <!-- Transactions within the block --> */}
                  {blockDetails?.transactions.slice(0, 5).map((transaction) => {
                    return (
                      <div
                        key={transaction.hash}
                        className="p-5 bg-gray-800 rounded-lg border border-gray-700 hover:border-green-500 transition">
                        <h3 className="font-bold text-green-400">
                          Tx hash: {transaction}
                        </h3>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : null}

        {searchType === "address" && !isSearching && (
          <>
            {addressDetails == null ? (
              "No record found"
            ) : (
              <div className="container mx-auto p-6">
                {/* <!-- Address Header --> */}
                <div className="p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                  <h2 className="text-2xl font-bold text-blue-400">
                    Address Details
                  </h2>
                  <p className="text-lg text-gray-300 mt-2">
                    Address:{" "}
                    <span className="font-mono text-gray-200">
                      {addressDetails.address}
                    </span>
                  </p>
                  <p className="text-lg text-gray-300 mt-2">
                    Balance:{" "}
                    <span className="text-green-400 font-semibold">
                      {addressDetails.balance} ETH
                    </span>
                  </p>
                  <p className="text-lg text-gray-300 mt-2">
                    Transaction Count:{" "}
                    <span className="text-green-400 font-semibold">
                      {addressDetails.transactionCount}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* <!-- Transaction Details Section --> */}

        {searchType === "transactionHash" && !isSearching ? (
          <>
            {transactionDetails == null ? (
              "No record found"
            ) : (
              <div className="p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700 my-12">
                <h2 className="text-2xl font-bold text-green-400 mb-4">
                  Transaction Details
                </h2>
                <p className="text-lg text-gray-300">
                  Block Hash: {transactionDetails.blockHash}
                </p>
                <p className="text-lg text-blue-300 mb-2">
                  Transaction Hash: {transactionDetails.hash}
                </p>
                <p className="text-lg font-bold text-gray-400">
                  From: {transactionDetails.from}
                </p>
                <p className="text-lg font-bold text-gray-400">
                  To: {transactionDetails.to}
                </p>
                <p className="text-lg font-bold text-green-400">
                  Amount: {ethers.formatEther(transactionDetails.value)} ETH
                </p>
              </div>
            )}
          </>
        ) : null}

        {/* <!-- Default Block and Transaction List --> */}
        <div
          id="default-view"
          className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-4">
          {/* <!-- Block List --> */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-400 tracking-wide">
              Latest Block
            </h2>
            <BlockList provider={provider} />
          </div>

          {/* <!-- Transaction List --> */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-blue-400 tracking-wide">
              Latest Transactions
            </h2>
            <TransactionList provider={provider} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
