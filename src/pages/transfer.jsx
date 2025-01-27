import { ethers } from "ethers";
import { useEffect, useState } from "react";

function Transfer({ provider }) {
  // let signer;

  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [isTransfering, setIsTransfering] = useState(false);

  async function transferFunds() {
    setIsTransfering(true);
    try {
      const tx = await signer.sendTransaction({
        to: address,
        value: ethers.parseEther(amount),
      });
      tx.wait(1);
      connectWallet();
      alert("Transaction sent successfully");
    } catch (error) {
      console.log("Error sending transaction: ", error);
    }

    setIsTransfering(false);
  }

  // Connect to a wallet
  async function connectWallet() {
    if (window.ethereum) {
      setSigner(await provider.getSigner());
    } else {
      console.log("No valid wallet discovered");
    }
  }

  //  Check if MetaMask is installed
  if (window.ethereum == null) {
    alert(
      "MetaMask not installed: You need to install MetaMask browser extension to use this dApp"
    );
    provider = ethers.getDefaultProvider();
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
  }

  useEffect(() => {
    connectWallet();
  }, []);
  return (
    <>
      <div className="p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-800 max-w-md mx-auto my-12">
        {/* <!-- Section Header --> */}
        <h2 className="text-2xl font-extrabold text-center text-blue-400 mb-6">
          Transfer Funds
        </h2>

        {/* <!-- Form --> */}
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            transferFunds();
          }}>
          {/* <!-- Address Input --> */}
          <div>
            <label
              htmlFor="recipient-address"
              className="block text-sm font-medium text-gray-300 mb-2">
              Recipient Address
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="0x1234...abcd"
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-200 placeholder-gray-500 shadow-md"
            />
          </div>

          {/* <!-- Amount Input --> */}
          <div>
            <label
              htmlFor="transfer-amount"
              className="block text-sm font-medium text-gray-300 mb-2">
              Amount (ETH)
            </label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              step="0.01"
              placeholder="0.00"
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-200 placeholder-gray-500 shadow-md"
            />
          </div>

          {/* <!-- Submit Button --> */}
          <div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white font-bold tracking-wide shadow-lg" disabled={isTransfering}>
              {isTransfering ? 'Processing...' : 'Transfer'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Transfer;
