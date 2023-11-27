import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./Flextabs.css";
import { useSelector } from "react-redux";
import Connent from "../Connent/Connent";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({setShoww}) {
  let { provider, acc, providerType, web3 } = useSelector(
    (state) => state.connectWallet
  );
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log("acc", acc);
  return (
    <div className="container-fluid p-0">
      {acc == null ? (
        <>
          <Connent setShoww={setShoww} />
        </>
      ) : (
        <>
          <div className="row justify-content-center pb-5">
            <div className="col-lg-5 p-0">
              <Box sx={{ width: "100%" }} className="bord_clas">
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    className="httd_stk"
                  >
                    <Tab className="for_dsn" label="STAKE" {...a11yProps(0)} />
                    <Tab
                      className="for_dsn_end"
                      label="UNSTAKE"
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <div className="container-fluid p-0">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="munt_box d-flex justify-content-between">
                          <span className="">Amount</span>
                          <p className="my_balnc ">
                            <span> ~My balance:</span> <span>0.000 </span>
                          </p>
                        </div>
                        <div className="typ_area border">
                          <div className="mx_buttn str_tp_dollar text-cenetr">
                            $Archie
                          </div>
                          <input
                            className="ariia"
                            type="text"
                            inputMode="decimal"
                            placeholder="0"
                            autoComplete="off"
                            autoCorrect="off"
                            aria-aria-valuemin="0"
                            aria-valuemax="9007199254740991"
                          />
                          <button type="button" className="mx_buttn text-white">
                            Max
                          </button>
                        </div>
                        <p className="text-start min_st_rt mt-2">
                          {" "}
                          Min Stake Amount :&nbsp;8000 Archie
                        </p>
                        <button className="btn btn-md lst_btnn text-white">
                          Enable Staking
                        </button>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <div className="container-fluid p-0">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="munt_box d-flex justify-content-between">
                          <span>Amount</span>
                          <p className="my_balnc">
                            <span> ~Staked Archie:</span> <span>0</span>
                          </p>
                        </div>
                        <div className="typ_area border">
                          <div className="mx_buttn str_tp_dollar text-cenetr">
                            $Archie
                          </div>
                          <input
                            className="ariia"
                            type="text"
                            inputMode="decimal"
                            placeholder="0"
                            autoComplete="off"
                            autoCorrect="off"
                            aria-aria-valuemin="0"
                            aria-valuemax="9007199254740991"
                          />
                          <button type="button" className="mx_buttn text-white">
                            Max
                          </button>
                        </div>
                        <button className="btn btn-md lst_btnn mt-4 text-white">
                          Unstake Archie
                        </button>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </Box>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
