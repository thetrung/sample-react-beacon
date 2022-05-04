
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { BeaconWallet } from '@taquito/beacon-wallet';

const ParentComponent = () => {

  const options = {
    name: 'MyAwesomeDapp',
    iconUrl: 'https://tezostaquito.io/img/favicon.png',
    preferredNetwork: "ithacanet",
    eventHandlers: {
      PERMISSION_REQUEST_SUCCESS: {
        handler: async (data) => {
          console.log('PERMISSION_REQUEST_SUCCESS:', data.account);
        },
      },
    },
  };

  const beacon = new BeaconWallet(options);
  
  const [account, setAccount] = useState(undefined);
  const [wallet, setWallet] = useState(beacon);
  const [clicked, setClick] = useState(false);

  const req = async () => {
    await wallet.client.requestPermissions()
    setClick(!clicked)
  }

  return <>
          <ChildComponent wallet={wallet} setAccount={setAccount} account={account}/>
          <div wallet={wallet} />
          <button onClick={req} disabled={clicked}>
            { clicked ? 'Requested':'Click to Request'}
            </button>
          <p><b>Active Wallet = </b> {account ? account.address : ''}</p>
      </>
}
  
const ChildComponent = ({wallet, setAccount, account}) => {
  useEffect(() => {
    if(account) return;
    if(wallet){
        wallet.client.getActiveAccount().then(active => {
          setAccount(active)
          if(account) console.log(account.address)
      })
    }
  })
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <ParentComponent/>
      </header>
    </div>
  );
}

export default App;
