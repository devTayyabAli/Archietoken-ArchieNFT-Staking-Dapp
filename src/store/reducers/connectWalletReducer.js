import { types } from "../type";

const INITIAL_STATE = {
    provider: null,
    acc: null,
    providerType:null,
    web3:null
};

const connectWallet = (state= INITIAL_STATE, {type, payload}) => {
    try {
        switch (type) {
            case types.connect_wallet:
            return {
                ...state,
                provider:payload.provider,
                acc:payload.account,
                providerType:payload.providerType,
                web3:payload.web3
            }
            case types.diconnect_wallet:
                return{
                    ...state,
                    acc:payload.account,
                    providerType:payload.providerType
                }
            default:
                return{
                    ...state
                }
        }
    } catch (error) {
        console.error("erro while connect Wllet reducer", error);
    }
}

export default connectWallet;