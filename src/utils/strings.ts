import BigNumber from 'bignumber.js';

export const cutString = (str: string, takeFirst: number, takeLast: number) => {
  if (!str || str.length <= takeFirst + takeLast) {
    return str;
  }

  return (
    str.substring(0, takeFirst) +
    '...' +
    str.substring(str.length - takeLast, str.length)
  );
};

const trillion = 1e12;
const billion = 1e9;
const million = 1e6;
const thousand = 1e3;
const hundred = 1e2;

type ShortNotationProps = {
  decimals: number;
  divideBy?: number;
  suffix?: string;
};

const getShortNotationProps = (
  number: BigNumber,
  decimalPlaces: number
): ShortNotationProps => {
  const absValue = number.abs();

  if (absValue.isLessThan(hundred)) {
    return { decimals: decimalPlaces };
  }

  if (absValue.isLessThan(thousand)) {
    return { decimals: 1 };
  }

  if (absValue.isLessThan(million)) {
    return { decimals: 0 };
  }

  if (absValue.isGreaterThanOrEqualTo(trillion)) {
    return {
      divideBy: trillion,
      suffix: 'T',
      decimals: 1,
    };
  }

  if (absValue.isGreaterThanOrEqualTo(billion)) {
    return {
      divideBy: billion,
      suffix: 'B',
      decimals: 2,
    };
  }

  return {
    divideBy: million,
    suffix: 'M',
    decimals: 3,
  };
};

const defaultBigNumberFormat = {
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
};

export const bigNumberToStr = (
  number: BigNumber,
  decimalPlaces: number,
  params?: { useShortNotation?: boolean }
) => {
  if (params?.useShortNotation !== true) {
    return number
      .decimalPlaces(decimalPlaces, BigNumber.ROUND_DOWN)
      .toFormat(defaultBigNumberFormat);
  }

  const shortNotation = getShortNotationProps(number, decimalPlaces);

  if (shortNotation.divideBy) {
    number = number.dividedBy(shortNotation.divideBy);
  }

  return number
    .decimalPlaces(shortNotation.decimals, BigNumber.ROUND_DOWN)
    .toFormat({
      ...defaultBigNumberFormat,
      suffix: shortNotation.suffix,
    });
};
