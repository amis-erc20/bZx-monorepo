
pragma solidity 0.4.24;

import "../BaseToken.sol";


// 1 billion tokens (18 decimal places)
contract TestToken1 is BaseToken( // solhint-disable-line no-empty-blocks
    10**(50+18),
    "TestToken1", 
    18,
    "TEST1"
) {}
