import BigNumber from 'bignumber.js';
import Decimal from 'decimal.js-light';

const DP = 40;
BigNumber.config({ DECIMAL_PLACES : DP, POW_PRECISION : DP});
Decimal.config({ precision : DP });

let big = new BigNumber('355').div(113);
let dec = new Decimal('355').div(113);
console.log(big.toFixed());
console.log(dec.toFixed());