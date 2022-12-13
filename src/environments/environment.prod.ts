

import { env } from './environment.master';

env.production = true;

// env.firebaseConfig = {
//     apiKey,
//     appId,
//     authDomain,
//     measurementId,
//     messagingSenderId,
//     projectId,
//     storageBucket
// }

export const environment: Environment = env;
