import PinataSDK from '@pinata/sdk';
import env from '../env/private';

export const pinataSdk = new PinataSDK({
  pinataApiKey: env.PINATA_API_KEY,
  pinataSecretApiKey: env.PINATA_SECRET_KEY,
});
