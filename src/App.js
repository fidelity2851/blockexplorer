import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ethers } from "ethers";

import './App.css';
import BlockList from './components/BlockList';
import TransactionList from './components/TransationList';

import Home from './pages/home';
import Transfer from './pages/transfer';

function App() {

  let provider;
  let signer;

  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  // Connect to a wallet
  async function connectWallet() {
    if (window.ethereum) {
      signer = await provider.getSigner();
      const bal = await provider.getBalance(signer.address);

      setIsConnected(true);
      setAddress(signer.address)
      setBalance(ethers.formatEther(bal));
    } else {
      console.log('We need a valid Signer');
    }
  }

  //  Check if MetaMask is installed
  if (window.ethereum == null) {
    alert("MetaMask not installed: You need to install MetaMask browser extension to use this dApp");
    provider = ethers.getDefaultProvider()

  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
  }

  useEffect(() => {

    connectWallet();
  }, []);

  return (
    <>
      {/* <!-- Header --> */}
      <header className="p-6 bg-gray-900 flex shadow-md border-b border-gray-800">
        <a href='/'>
          <h1 className="text-4xl font-extrabold text-center text-blue-400 tracking-wide uppercase">
            Ethereum Block Explorer
          </h1>
        </a>

        <div className="ml-auto">
          <a href='/transfer' className="me-3">
            <button type='button' className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white font-semibold tracking-wide shadow-lg">
              Transfer
            </button></a>
          {
            isConnected ?
              <>
                <span className="text-gray-400 text-sm me-4">{address}</span>
                <button type='button' className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition text-white font-semibold tracking-wide shadow-lg">
                  {balance} ETH
                </button>
              </> :
              <button type='button' onClick={() => connectWallet()} className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition text-white font-semibold tracking-wide shadow-lg">
                Connect
              </button>
          }
        </div>
      </header>

      <Router>
        <Route path="/" exact render={(props) => <Home {...props} provider={provider} signer={signer} />} />
        <Route path="/transfer" exact render={(props) => <Transfer {...props} provider={provider} signer={signer} />} />
      </Router>


      {/* <!-- Footer --> */}
      <footer className="p-6 bg-gray-900 border-t border-gray-800 text-center mt-12">
        <p className="text-sm text-gray-400">
          © 2025 Ethereum Block Explorer. Built with Web3 in mind.
        </p>
      </footer>
    </>

  );
}

export default App;
