// import external dependencies
import type { RequestHandler } from 'express';

// import internal dependencies
import { Dictionary } from '@shared/types';

export type Controller = Dictionary<RequestHandler>;
