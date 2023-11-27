

import { types } from "../type";

export const disconnectWallet =  () => (dispatch)=>{
    try {
        dispatch({
            type:types.diconnect_wallet,
            payload:{
                provider:null,
                account:null
            }
        })
    } catch (error) {
        console.error("error while disconnect wallet", error);
    }
}