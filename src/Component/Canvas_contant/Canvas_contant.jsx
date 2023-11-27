import React, { useEffect, useState, useMemo } from "react";
import "./Canvas_contant.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import mata from "../Accets/wallet.svg";
import mata1 from "../Accets/wallet-wc.svg";
import mata2 from "../Accets/close.svg";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { disconnectWallet } from "../../store/actions/logout";

import { connectWalletAction } from "../../store/actions/login";

import {
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";



function Canvas_contant({setShoww,showw, name, ...props  }) {
  let { provider, acc, providerType, web3 } = useSelector(
    (state) => state.connectWallet
  );

  const dispatch = useDispatch();
 
  const [BtTxt, setBtTxt] = useState("Connect");



  useEffect(() => {
    // alert(acc)
    if (acc != null) {
      // setcontset(true)
      setBtTxt(acc?.substring(0, 3) + "..." + acc?.substring(acc?.length - 3));
      // setBtTxt(acc);
      //   getaccount()
      // closeModal();
    }
  }, [acc]);
  const diconnectWallet = async () => {
    if (providerType == 1) {
      await provider.disconnect();
    }
    dispatch(disconnectWallet());
    setBtTxt("Connect");
    // setcontset(false)
  };
  return (
    <div>
      <Button
        variant=""
        onClick={()=>setShoww(true)}
        className=" text-light end_canvas "
      >
        {BtTxt} <MdKeyboardArrowLeft className="icon_canvas" />
      </Button>
      <Offcanvas
        show={showw}
        onHide={()=>setShoww(false)}
        {...props}
        className="h-100 canvas_back"
      >
        <Offcanvas.Header style={{borderBottom:'1px solid white'}}>
          <Offcanvas.Title className="text-start text-white  " >
            Connect Wallet
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          
      
          {BtTxt == "Connect" ? (
            <>
              <div>
                <p className="small_Status ">Status</p>
              </div>
              <div>
                <p className="dis_small px-1">DISCONNECTED</p>
              </div>
              <button
                className="btn btn-lg w-100 mata_mask "
                onClick={() => {
                  dispatch(connectWalletAction(2));
                }}
              >
                <span className="float-start">
                  <img src={mata} width="25" alt="" /> MataMask
                </span>{" "}
                <span className="px-1 mt-1 float-end popular_text">
                  {" "}
                  POPULAR
                </span>{" "}
              </button>
              <button
                className="btn btn-lg w-100 mata_mask mt-3 "
                onClick={() => {
                  dispatch(connectWalletAction(1));
                }}
              >
                <span className="float-start">
                  <img src={mata1} width="25" alt="" /> Wallet Connect
                </span>{" "}
              </button>
            </>
          ) : (
            <>
              <div>
                <div>
                  <p className="small_Status">Status</p>
                  <div className="px-1 mt-1 fs-4 float-start popular_text">
                    {" "}
                    CONNECTED
                  </div>{" "}
                  <br />
                  <div>
                    <p className="text-white fs-6 mt-3">Address</p>
                  </div>
                </div>
                <div>
                  <p className="text-white" style={{fontSize:"0.9rem",marginTop:'-1rem'}}>{acc}</p>
                </div>

                <div>
                  <p className="text-white">Connected Chain</p>
                </div>
                <div>
                  <p className="text-white" style={{marginTop:"-1rem"}}>ArchieChain Mainnet</p>
                </div>
                <button
                  className="btn btn-lg w-100 mata_mask mt-3 text-start ps-3 "
                  onClick={() => diconnectWallet()}
                >
                  Disconnect{" "}
                </button>
              </div>
            </>
          )}
        </Offcanvas.Body>
        <div className="d-flex justify-content-evenly px-3 my-2">
          <button
            className="btn   fw-bold btn-lg mata_mask w-100 "
            onClick={()=>setShoww(false)}
          >
            {" "}
            <img src={mata2} width="25" alt="" /> Close
          </button>
        </div>
      </Offcanvas>
    </div>
  );
}

export default Canvas_contant;
