import * as dateUtils from './dateUtils';

export function sexFilter(status) {
  if (status === 1) {
    return '男';
  } else if (status === 2) {
    return '女';
  }
  return '-';
}

export function priceFilter(price) {
  const priceNumber = parseFloat(price);
  if (isNaN(priceNumber)) return '';
  return priceNumber.toFixed(2);
}

/* eslint no-bitwise:["error", { "allow": ["~"] }] */
export function ageFilter(dateString) {
  const birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / (31557600000));
}

export function jsTimestampFilter(timestamp, parttern = 'yyyy-MM-dd') {
  if (!timestamp) {
    return '';
  }
  if (typeof timestamp === 'object') {
    return timestamp.format('yyyy-MM-dd');
  }
  const formatedtimestamp = parseInt(timestamp, 10);
  if (isNaN(formatedtimestamp)) return '';

  const day = new Date(formatedtimestamp);
  return dateUtils.format(day, parttern);
}

export function unixTimestampFilter(timestamp, parttern) {
  const formatedtimestamp = parseInt(timestamp, 10);

  if (isNaN(formatedtimestamp)) return '';
  return jsTimestampFilter(formatedtimestamp * 1000, parttern);
}

export default {};
