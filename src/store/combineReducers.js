import {combineReducers} from 'redux'

import connectWallet from './reducers/connectWalletReducer';
const rootReducers = combineReducers({
connectWallet
});

export default rootReducers;