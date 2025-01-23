import { ethers } from "ethers";
import { useState } from "react";

function Transfer({provider, signer}) {

    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState(0);
    

    async function transferFunds() {
        try {
            const tx = await signer.sendTransaction({
                to: address,
                value: ethers.parseEther(amount)
            });
            console.log("Transaction hash: ", tx.hash);
        } catch (error) {
            console.error("Error sending transaction: ", error);
        }
    }
  return (
    <>
      <div className="p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-800 max-w-md mx-auto my-12">
        {/* <!-- Section Header --> */}
        <h2 className="text-2xl font-extrabold text-center text-blue-400 mb-6">
          Transfer Funds
        </h2>

        {/* <!-- Form --> */}
        <form className="space-y-6">
          {/* <!-- Address Input --> */}
          <div>
            <label
              htmlFor="recipient-address"
              className="block text-sm font-medium text-gray-300 mb-2">
              Recipient Address
            </label>
            <input
              id="recipient-address"
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
              id="transfer-amount"
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
              className="w-full px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white font-bold tracking-wide shadow-lg">
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Transfer;
