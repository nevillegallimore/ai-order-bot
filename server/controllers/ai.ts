// import external dependencies
import { Request, Response } from 'express';

// import internal dependencies
import services from '@server/services';
import { Controller } from '@server/types';

////////////////////////////////////////////////////////////////////////////////////////////////////

const controller: Controller = {
    index: async (request: Request, response: Response) => {
        const { content, context } = request.body;
        const data = await services.ai.chat(content, context);
        const payload = { data, status: 200, success: true };
        response.status(payload.status).json(payload);
    },
};

////////////////////////////////////////////////////////////////////////////////////////////////////

export default controller;
