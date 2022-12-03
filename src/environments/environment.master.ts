
import config from '../config.json';

export const env: Environment = {
    production: false,
    firebaseConfig: (config as {firebaseConfig: FireBaseConfig}).firebaseConfig
};