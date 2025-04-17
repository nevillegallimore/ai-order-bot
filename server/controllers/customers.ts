// import external dependencies
import { Request, Response } from "express";

// import internal dependencies
import services from '@server/services';
import { Controller } from '@server/types';
import { Customer } from "@shared/models";
import { Filter } from "@shared/types";

////////////////////////////////////////////////////////////////////////////////////////////////////

const controller: Controller = {
    getAll: (request: Request, response: Response) => {
        const customers: Customer[] = services.data.customers.fetch(request.query);
        const payload = {
            data: customers,
            status: 200,
            success: true,
        };
        response.status(payload.status).json(payload);
    },
    getOne: (request: Request, response: Response) => {
        let payload;
        const customers: Customer[] = services.data.customers.fetch(request.query);
        if (!customers.length) {
            payload = {
                error: 'Sorry, the requested resource could not be found.',
                status: 404,
                success: false,
            };
            response.status(payload.status).json(payload);
        }

        payload = { data: customers[0], status: 200, success: true };
        response.status(payload.status).json(payload);
    },
};

////////////////////////////////////////////////////////////////////////////////////////////////////

export default controller;
