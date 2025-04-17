// import external dependencies
import { Request, Response } from "express";

// import internal dependencies
import config from '@server/config';
import { Controller } from '@server/types';
import customers from './customers';

////////////////////////////////////////////////////////////////////////////////////////////////////

const root: Controller = {
    index: (request: Request, response: Response) => {
        const payload = { data: config.app, status: 200, success: true };
        response.status(payload.status).json(payload);
    },
};

const controllers = { customers, root };

////////////////////////////////////////////////////////////////////////////////////////////////////

export default controllers;
