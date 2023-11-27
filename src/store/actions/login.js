import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { BRIDGE_URL, RPC_URL, CHAIN_ID } from '../../config/index';
import { types } from "../type";
import { loadWeb3 } from "../../apis/api";

export const connectWalletAction = (chose) => async (dispatch) => {
  try {
    // chose 1 for walletConnect && 2 for metamask
    if (chose === 1) {
      let provider = new WalletConnectProvider({
        infuraId: "6caa6ac543a94eacaf54e0ca062fcc99",
        bridge: BRIDGE_URL,
        rpc: {
            [CHAIN_ID]: RPC_URL,
          },
        });
        
        console.log("chose",provider);
      //subscribe to account changed
      provider.on("accountChanged", (accounts) => {
        console.log("accounts changed", accounts);

      });

      //subscribe to chainId changed
      provider.on("chainChanged", (chainId) => {
        console.log("accounts changed", chainId);
      });

      //subscribe to session disconnect
      provider.on("disconnect", (code, reason) => {
        console.log("reason code", code, reason);
      });
      await provider.enable();
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();
      console.log("accounts", accounts[0]);
      dispatch({
        type: types.connect_wallet,
        payload: {
          providerType: 1,
          provider: provider,
          web3: web3,
          account: accounts[0]

        }
      })
    } else if (chose === 2) {
      let acc = await loadWeb3();
      const web3 = window.web3;
      dispatch({
        type: types.connect_wallet,
        payload: {
          providerType: 2,
          provider: web3,
          web3: web3,
          account: acc
        }
      })
    }
    

  } catch (error) {
    console.error("error while connect wallet", error);
  }
}