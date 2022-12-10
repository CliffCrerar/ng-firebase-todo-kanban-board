

import { env } from "./environment.master";

env.production = false;

export const environment = env;
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.