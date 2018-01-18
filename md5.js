import crypto from 'crypto';

export function getMD5(value) {
  const md5 = crypto.createHash('md5');
  md5.update(value);
  const a = md5.digest('hex');
  return a;
}

export default{};
