import React from "react";
import "./Connect.css";

function Connent({setShoww}) {
  return (
    <section
      class="staking__container staking__selector gradient-2 pb-5 hdr_cl mt-5"
      style={{
        padding: "5rem max(9vw, 2rem)",
        width: "max-content",
        margin: "auto",
        
      }}
    >
      <p class="chakra-text css-0">Connect your wallet to stake Archie tokens!</p>
      <button
        type="button"
        class="chakra-button btn btn__connect_wallet btn-gradient-2 btn__connect_wallet--staking css-g1kjpk"
        onClick={()=>setShoww(true)}
      >
        Connect Wallet
      </button>
    </section>
  );
}

export default Connent;
