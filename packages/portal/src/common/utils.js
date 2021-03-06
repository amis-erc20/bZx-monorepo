import { BigNumber } from "bignumber.js";

export const fromBigNumber = (num, scale = 1) =>
  BigNumber(num.toString())
    .div(scale)
    .toNumber();

export const toBigNumber = (num, scale = 1) => BigNumber(num).times(scale);

export const getInitialCollateralRequired = async (
  loanTokenAddress,
  collateralTokenAddress,
  oracleAddress,
  loanTokenAmountFilled,
  initialMarginAmount,
  bZx
) =>
  bZx.getInitialCollateralRequired(
    loanTokenAddress,
    collateralTokenAddress,
    oracleAddress,
    toBigNumber(loanTokenAmountFilled).toFixed(0),
    initialMarginAmount
  );

export const getTokenConversionData = (sourceTokenAddress, destTokenAddress, sourceTokenAmount, oracleAddress, bZx) =>
  bZx.getConversionData(sourceTokenAddress, destTokenAddress, toBigNumber(sourceTokenAmount).toFixed(0), oracleAddress);

export const getTokenConversionAmount = async (
  sourceTokenAddress,
  destTokenAddress,
  sourceTokenAmount,
  oracleAddress,
  bZx
) => {
  const data = await getTokenConversionData(
    sourceTokenAddress,
    destTokenAddress,
    sourceTokenAmount,
    oracleAddress,
    bZx
  );

  return data.amount;
};

export const getTokenConversionRate = async (
  sourceTokenAddress,
  destTokenAddress,
  sourceTokenAmount,
  oracleAddress,
  bZx
) => {
  const data = await getTokenConversionData(
    sourceTokenAddress,
    destTokenAddress,
    sourceTokenAmount,
    oracleAddress,
    bZx
  );

  return data.rate;
};

const caughtReject = rejection => {
  try {
    rejection();
  } catch (e) {
    // console.log(e);
  }
};

export const makeCancelable = promise => {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled ? caughtReject({ isCanceled: true }) : resolve(val)),
      error => (hasCanceled ? caughtReject({ isCanceled: true }) : reject(error))
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    }
  };
};
