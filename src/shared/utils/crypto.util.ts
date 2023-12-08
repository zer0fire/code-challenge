import * as crypto from 'crypto';

/**
 * Random salt
 * @param len
 * @returns
 */
export function makeSalt(len = 3): string {
  return crypto.randomBytes(len).toString('base64');
}

/**
 * encrypt password
 * @param password
 * @param salt
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return crypto
    .pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1')
    .toString('base64');
}

// compute md5
export function encryptFileMD5(buffer: Buffer) {
  const md5 = crypto.createHash('md5');

  return md5.update(buffer).digest('hex');
}
