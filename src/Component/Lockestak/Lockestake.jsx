import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Web3 from "web3";
import {
  Staking,
  Staking_Abi,
  TokenAddress,
  Token_Abi,
  ArchieMetaNFT,
  nftTokenAddress,
  nftToken_Abi,
  ArchieMetaNFT_Abi,
  tokenStaking,
  tokenStaking_Abi,
  Ethereum_NFT_Address,
  Ethereum_NFT_Abi

} from "../../utilies/constant";
import Connent from "../Connent/Connent";
import "./Lockestake.css";
import Countdown from "react-countdown";
import moment from "moment/moment";
import { Button, Popover } from "antd";
import { Modal, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

function Lockestake({ setShoww, check }) {
  let { provider, acc, providerType, web3 } = useSelector(
    (state) => state.connectWallet
  );
  let arryNew=[]
  const [selectDays, setselectDays] = useState(0);
  const [getValue, setgetValue] = useState(0);
  const [Active, setActive] = useState(0);
  const [spinner, setspinner] = useState(false);
  const [balance, setbalance] = useState(0);
  const [selectedCard, setselectedCard] = useState(null);
  const [cradShow, setcradShow] = useState([]);
  const [stakeddata, setstakeddata] = useState();
  const [cardIndex, setcardIndex] = useState([]);
  const [slectedAllnfton, setslectedAllnfton] = useState({
    condition: false,
    walletOfOwneron: [],
  });
  const [noSelectedAll, setnoSelectedAll] = useState([])
  const [grtAPY_value, setgrtAPY_value] = useState({days30:"..",days90:"..",days180:"..",days360:".."})

  const staking_Amount = async () => {
    try {
      if (selectDays == 1) {
        toast.error("Please Select Days");
        setspinner(false);
      } else {
        if (getValue == null) {
          toast.error("Please Enter Amount First!");
          setspinner(false);
        } else {
          if (getValue < 100000) {
            toast.error("Minimum Staking Amount 100000!");
            setspinner(false);
          } else {
            if (acc == null) {
              toast.error("Please Connect Metamaske First!");
              setShoww(true);
            } else {
              setspinner(true);
              let stakingContractOf;
              let tokenContractOf;
              if (check == "one") {
                stakingContractOf = new web3.eth.Contract(
                  tokenStaking_Abi,
                  tokenStaking
                );
                tokenContractOf = new web3.eth.Contract(
                  Token_Abi,
                  TokenAddress
                );
              } else {
                stakingContractOf = new web3.eth.Contract(Staking_Abi, Staking);
                tokenContractOf = new web3.eth.Contract(
                  Token_Abi,
                  TokenAddress
                );
              }

              let stakingValue = getValue*1000000000;

              console.log("stakingValue", stakingValue);

              if (check == "one") {
                await tokenContractOf.methods
                  .approve(tokenStaking, stakingValue)
                  .send({
                    from: acc,
                  });
                toast.success("Approve Confirmed");
                await stakingContractOf.methods
                  .farm(stakingValue, selectDays)
                  .send({
                    from: acc,
                  });
                toast.success("Transaction Confirmed");
                setspinner(false);
              } else {
                if (cardIndex.length == 0) {
                  toast.error("Please Select NFT First!");
                  setspinner(false);
                } else {
                  // console.log("selectedCard",selectedCard);
                  let min_Select = await stakingContractOf.methods
                    .minimumNFT()
                    .call();

                  let max_Select = await stakingContractOf.methods
                    .maximumNFT()
                    .call();

                  if (min_Select > cardIndex.length) {
                    toast.error(`Select Minimum NFT ${min_Select}`);
                    setspinner(false);
                  } else {
                    if (max_Select < cardIndex.length) {
                      toast.error(`Maximum NFT ${max_Select}`);

                      setspinner(false);
                    } else {
                      console.log("cardIndex", cardIndex);
                      await tokenContractOf.methods
                        .approve(Staking, stakingValue)
                        .send({
                          from: acc,
                        });
                      toast.success("Approve Confirmed");
                      console.log("cardIndex", cardIndex);
                      await stakingContractOf.methods
                        .farm(stakingValue, selectDays, cardIndex)
                        .send({
                          from: acc,
                        });
                      toast.success("Transaction Confirmed");
                      setspinner(false);
                    }
                  }
                }
              }
            }
          }
        }
      }
    } catch (e) {
      console.log("Error", e);
      setspinner(false);
    }
  };
  const checkBalance = async () => {
    const webSupply = new Web3("https://rpc-main-1.archiechain.io");

    let tokenContractOf = new webSupply.eth.Contract(Token_Abi, TokenAddress);
    let stakingContractOf = new webSupply.eth.Contract(
      tokenStaking_Abi,
      tokenStaking
    );

    if (acc != null) {
      let blanceOf = await tokenContractOf.methods.balanceOf(acc).call();

      blanceOf = blanceOf.slice(0, 12);
      // console.log("blanceOf", blanceOf);
      setbalance(blanceOf);
    }
  };

  useEffect(() => {
    checkBalance();
  });

  const SelectedCard = async (id, tokenid) => {
    try {
      let change_Color = document.getElementById(id);
      change_Color.style.border = `5px solid rgb(56, 195, 207)`;
      change_Color.style.borderRadius = "35px";
      let check = [...cardIndex, tokenid];
      let array_Length = check.length;

      console.log("checkcheck", check);
      check = check.map(Number);

      setcardIndex(check);
      arryNew=check

      setselectedCard(id);
    } catch (e) {
      console.log("Error while Selected Card", e);
    }
  };

  const TotalAmount = async () => {
    try {
      const webSupply = new Web3("https://rpc-main-1.archiechain.io");
      const webSupply1 = new Web3("https://eth-mainnet.public.blastapi.io");

      let stakingContractOf = new webSupply.eth.Contract(Staking_Abi, Staking);
      let nFTContractOf = new webSupply.eth.Contract(
        ArchieMetaNFT_Abi,
        ArchieMetaNFT
      );

      let nFTContractOf1 = new webSupply1.eth.Contract(
        Ethereum_NFT_Abi,
        Ethereum_NFT_Address
      );



      let totalSupply = await nFTContractOf1.methods.totalSupply().call();
      console.log("ownerTokenCount",totalSupply);
      let ownedTokenIds = [];

      for (let i = 1; i <= totalSupply; i++) {
        console.log("currentTokenOwner", i);
        let currentTokenOwner = await nFTContractOf1.methods.ownerOf(i).call();


        if (currentTokenOwner == acc) {
          ownedTokenIds = [...ownedTokenIds, i];

        }
      }


      console.log(ownedTokenIds, "ownedTokenIds");

      let array = [];
      if (acc != null) {
        let UserNFTs = ownedTokenIds
        console.log("UserNFTs", UserNFTs);

        // setslectedAllnfton({ walletOfOwneron: UserNFTs });
        let UserNFTs_Length = UserNFTs.length;
        let nweArray = [];

        for (let i = 0; i < UserNFTs_Length; i++) {
          let nftLink = await axios.get(
            `https://teal-high-elephant-254.mypinata.cloud/ipfs/QmRN9mG46UtACjCmtwjnqz2pmDei2tUP6zB23NpFw8wk8C/${UserNFTs[i]
            }.png`
          );
          let isNFTStaked = await stakingContractOf.methods.isNFTStaked(UserNFTs[i]).call();


          if (isNFTStaked == true) {
            setstakeddata(UserNFTs[i]);
          } else {
            nweArray = [...nweArray, UserNFTs[i]];
            // console.log("TokenId",nweArray);
            setnoSelectedAll(nweArray)
            // setslectedAllnfton({ walletOfOwneron: nweArray });

          }
          let imgurl = nftLink.config.url;
          // console.log("nftLink", nftLink.config.url);
          array = [
            ...array,
            { imgurl: imgurl, tokenid: UserNFTs[i], selecteddata: isNFTStaked },
          ];
          setcradShow(array);
        }
        // setTimeout(async() => {
          
        // }, 9000);

      }
    } catch (e) {
      console.log("error While calling function", e);
    }
  };

  const selectAllNFT = async () => {
    try {
      setslectedAllnfton({ condition: true });
      console.log(
        "slectedAllnfton.walletOfOwneron",
        noSelectedAll
      );
      setcardIndex(noSelectedAll);
      arryNew=noSelectedAll
    } catch (error) {
      console.log("Error When SelectAll Nft Fuction", error);
    }
  };

  useEffect(() => {
    TotalAmount();
  }, [acc]);




  const changeAPY=async()=>{
    try {
      let length_MFT= await arryNew.length
      length_MFT=Number(length_MFT)
      console.log("length_MFT",length_MFT);
      if(length_MFT>24 && length_MFT<50){
        setgrtAPY_value({days30:15,days90:21,days180:27,days360:33})

      }else if(length_MFT>49 && length_MFT<75){
        setgrtAPY_value({days30:18,days90:24,days180:30,days360:36})

      }else if(length_MFT>74 && length_MFT<100){
        setgrtAPY_value({days30:21,days90:27,days180:33,days360:39})

      }else if(length_MFT>99 && length_MFT<150){
        setgrtAPY_value({days30:24,days90:30,days180:36,days360:42})

      }else if(length_MFT>149 && length_MFT<200){
        setgrtAPY_value({days30:27,days90:33,days180:39,days360:45})

      }else if(length_MFT>199 && length_MFT<500){
        setgrtAPY_value({days30:33,days90:39,days180:45,days360:51})

      }else if(length_MFT>500){
        setgrtAPY_value({days30:36,days90:42,days180:48,days360:54})
      }else{
        setgrtAPY_value({days30:0,days90:0,days180:0,days360:0})

      }
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {check == "one" ? (
        <>
          {/* {acc == null ? (
            <Connent setShoww={setShoww} />
          ) : ( */}
          <>
            <div className="container-fluid p-0  mt-5">
              <div className="row justify-content-center">
                <div className="col-lg-5 all_main p-0">
                  <h3 class="staking__selector__heading">Stake $ARCHIE</h3>

                  <div className="first_box mt-4  px-2">
                    <div className="munt_box d-flex justify-content-between">
                      <span className="">Amount</span>
                      <p className="my_balnc ">
                        <span> ~My balance:</span> <span>{balance} </span>
                      </p>
                    </div>
                    <div className="typ_area border ">
                      <div className="mx_buttn str_tp_dollar text-cenetr ">
                        $Archie
                      </div>
                      <input
                        className="ariia"
                        type="number"
                        inputMode="decimal"
                        placeholder="0"
                        autoComplete="off"
                        autoCorrect="off"
                        aria-aria-valuemin="0"
                        aria-valuemax="9007199254740991"
                        onChange={(e) => setgetValue(e.target.value)}
                        value={getValue}
                      />

                      <button
                        type="button"
                        className="mx_buttn text-white "
                        onClick={() => setgetValue(balance)}
                      >
                        Max
                      </button>
                    </div>
                  </div>

                  <div className="second_box mt-3 px-2">
                    <p className="text-start">Locking Time</p>
                    <div className="time_table">
                      <div className="dan_gtr text-white">
                        <div
                          className=" border des_tw p-0 "
                          style={{
                            background:
                              Active == 1
                                ? "linear-gradient(98.76deg, rgb(56, 195, 207) 0%, rgb(135, 103, 211) 100%)"
                                : "rgb(24, 22, 82)",
                          }}
                        >
                          <button
                            className="btn btn-md dates"
                            onClick={() => (setselectDays(30), setActive(1))}
                          >
                            30 Days
                          </button>
                          <div className="arp border-top">12% APY</div>
                        </div>
                        <div
                          className=" border des_tw p-0"
                          style={{
                            background:
                              Active == 2
                                ? "linear-gradient(98.76deg, rgb(56, 195, 207) 0%, rgb(135, 103, 211) 100%)"
                                : "rgb(24, 22, 82)",
                          }}
                        >
                          <button
                            className="btn btn-md dates"
                            onClick={() => (setselectDays(90), setActive(2))}
                          >
                            90 Days
                          </button>
                          <div className="arp border-top">18% APY</div>
                        </div>
                        <div
                          className=" border des_tw p-0"
                          style={{
                            background:
                              Active == 3
                                ? "linear-gradient(98.76deg, rgb(56, 195, 207) 0%, rgb(135, 103, 211) 100%)"
                                : "rgb(24, 22, 82)",
                          }}
                        >
                          <button
                            className="btn btn-md dates"
                            onClick={() => (setselectDays(180), setActive(3))}
                          >
                            180 Days
                          </button>
                          <div className="arp border-top">24% APY</div>
                        </div>
                        <div
                          className=" border des_tw p-0"
                          style={{
                            background:
                              Active == 4
                                ? "linear-gradient(98.76deg, rgb(56, 195, 207) 0%, rgb(135, 103, 211) 100%)"
                                : "rgb(24, 22, 82)",
                          }}
                        >
                          <button
                            className="btn btn-md dates"
                            onClick={() => (setselectDays(360), setActive(4))}
                          >
                            360 Days
                          </button>
                          <div className="arp border-top">30% APY</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-md lst_btnn mt-3 text-white"
                    onClick={() => staking_Amount()}
                  >
                    {spinner == true ? (
                      <>
                        <div class="spinner-border" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </>
                    ) : (
                      " Enable Staking"
                    )}
                  </button>

                  <div className="last mt-4">
                    <p className="fon m-0 py-2">
                      Locking {getValue} $ARCHIE for {selectDays} Days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
          {/* // )} */}
        </>
      ) : (
        <>
          <div className="container">
            <div class={cradShow.length > 10 ? "item-details-into" : ""}>
              <div className="row">
                {cradShow.length == 0 ? (
                  <></>
                ) : (
                  <>
                    <div className="btn_selected">
                      <button
                        className="btn end_canvas text-white me-auto"
                        onClick={() => (selectAllNFT(),changeAPY())}
                      >
                        Select All
                      </button>
                    </div>
                  </>
                )}
                {cradShow?.map((items, index) => {


                  return (
                    <>
                      <div className="col-lg-3 col-md-3 mt-3">
                        <div
                          className={
                            items.selecteddata == true
                              ? "contain game-item disabled"
                              : "game-item"
                          }
                          disabled={true}
                          // class="game-item contain"
                          style={{
                            cursor:
                              items.selecteddata == true
                                ? "default"
                                : "pointer",

                            border:
                              slectedAllnfton.condition == true &&
                                items.selecteddata != true
                                ? "5px solid rgb(56, 195, 207)"
                                : "none",
                          }}
                          id={index}
                          onClick={() => (SelectedCard(index, items.tokenid),changeAPY())}
                        >
                          <div class="game-inner">
                            <div class="game-item__thumb">
                              <img
                                src={items.imgurl}
                                alt="game"
                                style={{ zIndex: "100000" }}
                                className="image"
                              />
                              <div class="middle">
                                <div class="text">Staked</div>
                              </div>
                              <div class="game-item__content">
                                <h4 class="title">{items.tokenid}</h4>
                              </div>
                            </div>
                          </div>
                          <div class="mask"> </div>
                          <div class="ball"> </div>
                        </div>
                      </div>
                      {/* <img src={items} alt="" width="100%" className="border" /> */}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          {/* {acc == null ? (
            <Connent setShoww={setShoww} />
          ) : ( */}
          <>
            <div className="container-fluid p-0  mt-5">
              <div className="row justify-content-center">
                <div className="col-lg-5 all_main p-0">
                  <h3 class="staking__selector__heading">Stake $ARCHIE</h3>

                  <div className="first_box mt-4  px-2">
                    <div className="munt_box d-flex justify-content-between">
                      <span className="">Amount</span>
                      <p className="my_balnc ">
                        <span> ~My balance:</span> <span>{balance} </span>
                      </p>
                    </div>
                    <div className="typ_area border ">
                      <div className="mx_buttn str_tp_dollar text-cenetr ">
                        $Archie
                      </div>
                      <input
                        className="ariia"
                        type="number"
                        inputMode="decimal"
                        placeholder="0"
                        autoComplete="off"
                        autoCorrect="off"
                        aria-aria-valuemin="0"
                        aria-valuemax="9007199254740991"
                        onChange={(e) => setgetValue(e.target.value)}
                        value={getValue}
                      />

                      <button
                        type="button"
                        className="mx_buttn text-white "
                        style={{ cursor: "pointer" }}
                        onClick={() => setgetValue(balance)}
                      >
                        Max
                      </button>
                    </div>
                  </div>

                  <div className="second_box mt-3 px-2">
                    <p className="text-start">Locking Time</p>
                    <div className="time_table">
                      <div className="dan_gtr text-white">
                        <div
                          className=" border des_tw p-0 "
                          style={{
                            background:
                              Active == 1
                                ? "linear-gradient(98.76deg, rgb(56, 195, 207) 0%, rgb(135, 103, 211) 100%)"
                                : "rgb(24, 22, 82)",
                          }}
                        >
                          <button
                            className="btn btn-md dates"
                            onClick={() => (setselectDays(30), setActive(1))}
                          >
                            30 Days
                          </button>
                          <div className="arp border-top">{grtAPY_value.days30} % APY</div>
                        </div>
                        <div
                          className=" border des_tw p-0"
                          style={{
                            background:
                              Active == 2
                                ? "linear-gradient(98.76deg, rgb(56, 195, 207) 0%, rgb(135, 103, 211) 100%)"
                                : "rgb(24, 22, 82)",
                          }}
                        >
                          <button
                            className="btn btn-md dates"
                            onClick={() => (setselectDays(90), setActive(2))}
                          >
                            90 Days
                          </button>
                          <div className="arp border-top">{grtAPY_value.days90} % APY</div>
                        </div>
                        <div
                          className=" border des_tw p-0"
                          style={{
                            background:
                              Active == 3
                                ? "linear-gradient(98.76deg, rgb(56, 195, 207) 0%, rgb(135, 103, 211) 100%)"
                                : "rgb(24, 22, 82)",
                          }}
                        >
                          <button
                            className="btn btn-md dates"
                            onClick={() => (setselectDays(180), setActive(3))}
                          >
                            180 Days
                          </button>
                          <div className="arp border-top">{grtAPY_value.days180} % APY</div>
                        </div>
                        <div
                          className=" border des_tw p-0"
                          style={{
                            background:
                              Active == 4
                                ? "linear-gradient(98.76deg, rgb(56, 195, 207) 0%, rgb(135, 103, 211) 100%)"
                                : "rgb(24, 22, 82)",
                          }}
                        >
                          <button
                            className="btn btn-md dates"
                            onClick={() => (setselectDays(360), setActive(4))}
                          >
                            360 Days
                          </button>
                          <div className="arp border-top">{grtAPY_value.days360} % APY</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-md lst_btnn mt-3 text-white"
                    onClick={() => staking_Amount()}
                  >
                    {spinner == true ? (
                      <>
                        <div class="spinner-border" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </>
                    ) : (
                      " Enable Staking"
                    )}
                  </button>

                  <div className="last mt-4">
                    <p className="fon m-0 py-2">
                      Locking {getValue} $ARCHIE for {selectDays} Days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
          {/* )} */}
        </>
      )}
    </>
  );
}

export default Lockestake;
