import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Web3 from "web3";
import {
  ArchieMetaNFT,
  ArchieMetaNFT_Abi,
  Staking,
  Staking_Abi,
} from "../../utilies/constant";
import Tab from "../Tab/Tab";
import "./nftStking.css";
import logo from "../../Component/Accets/V9.png";

export default function NftStaking({ setShoww }) {
  let { provider, acc, providerType, web3 } = useSelector(
    (state) => state.connectWallet
  );
  
  const [totalUserAmount, settotalUserAmount] = useState(0)
  const [WithdrawReward, setWithdrawReward] = useState(0)

  const TotalAmount =async()=>{
    try{
      const webSupply = new Web3(
        "https://rpc-main-1.archiechain.io"
    );


    let stakingContractOf = new webSupply.eth.Contract(Staking_Abi, Staking);

    if (acc != null) {


        let UserInformation = await stakingContractOf.methods
            .UserERC20Information(acc)
            .call();
            console.log("Users",UserInformation.DepositeToken);

           let UserInformationdata=(UserInformation[0])/1000000000
           let WithdrawRewardAmount=(UserInformation[1])/1000000000

           setWithdrawReward(parseFloat(WithdrawRewardAmount).toFixed(3))
            settotalUserAmount(parseFloat(UserInformationdata).toFixed(3))
    }


    }catch(e){

    }
  }

  useEffect(() => {
    TotalAmount()
  })


  return (
    <div>
      
      <div
        class="chakra-stat css-16fwhjm"
        style={{
          padding: "1rem 2rem 0.5rem",
          width: "max-content",
          minWidth: "265px",
          margin: "1rem auto",
          boxShadow: "rgb(116, 54, 128) 0px 0px 50px 0px",
         height:"8rem"
        }}
      >
          <dl>
          <dt class="chakra-stat__label css-1mqe0od">Total Value Locked</dt>
          <dd class="chakra-stat__number css-1snxiwx">
            <p class="chakra-text css-0 text-white">{totalUserAmount} $ARCHIE</p>
          </dd>
          
          <div class="chakra-stat__label css-1mqe0od " style={{marginTop:"-1rem"}}>
            <p class="chakra-stat__label css-1mqe0od"> WithdrawAble Reward <br/>
             {WithdrawReward} $ARCHIE</p>
          </div>
        </dl>
      </div>
      <div className="container">
        <div className="row  text-white mt-5">
          <div className="text-center m-auto mt-5">
            <Tab setShoww={setShoww}  totalUserAmount={totalUserAmount} />
          </div>
        </div>
      </div>
    </div>
  );
}
