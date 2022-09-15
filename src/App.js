import { WagmiConfig, createClient,defaultChains,configureChains } from 'wagmi'
import {alchemyProvider} from "wagmi/providers/alchemy";
import {publicProvider} from "wagmi/providers/public";

import {CoinbaseWalletConnector} from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from 'wagmi/connectors/injected';
import {MetaMaskConnector} from "wagmi/connectors/metaMask";
import {WalletConnectConnector} from "wagmi/connectors/walletConnect";


import Profile from "./components/Profile"
const {chains,provider,webSocketProvider} = configureChains(defaultChains,[
  alchemyProvider({apiKey: ""}),
  publicProvider()
])



const client = createClient({
  autoConnect: true,
  connectors:[
    new MetaMaskConnector({chains}),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options:{
        name: 'Injected',
        shimDisconnect: true,
      }
    })
  ],
  provider,
  webSocketProvider,
})

function App() {
  return (
    <WagmiConfig client={client}>
      <Profile />
    </WagmiConfig>
  )
}

export default App;
