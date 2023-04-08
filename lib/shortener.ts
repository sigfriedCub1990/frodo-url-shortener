import client from '../db';
import mmh3 from 'murmurhash3';

const DOMAIN = process.env.DOMAIN || 'https://frodo.sigfried.xyz';

class Shortener {
  static async urlByHash(hash: string) {
    const url = await client.get(hash);

    return url ? url : { status: 'error', reason: 'URL not found' };
  }

  static async hashUrl(url: string) {
    const hash = mmh3.murmur32HexSync(url);

    const maybeKeyValue = await this.urlByHash(hash);
    if (!maybeKeyValue) {
      await client.set(hash, url);
    }

    return {
      status: 'success',
      original_url: url,
      shortened_url: `${DOMAIN}/${hash}`,
    };
  }
}

export default Shortener;
