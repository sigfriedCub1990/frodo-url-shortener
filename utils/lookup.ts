import { resolve } from 'dns/promises';
import CustomError from './error';

const lookup = async (address: string) => {
  try {
    const [ip] = await resolve(address);
    return ip;
  } catch (error) {
    throw new CustomError('Domain not found', 404);
  }
};

export default lookup;
