// import external dependencies
import ollama, { ChatRequest, Tool } from 'ollama';

// import internal dependencies
import data from '../data';

////////////////////////////////////////////////////////////////////////////////////////////////////

export interface ChatContextItem {
    role: 'assistant' | 'system' | 'user';
    content: string;
}

const getCustomers: Tool = {
    type: 'Function',
    function: {
        name: 'getCustomers',
        description: 'Returns a list of all customers',
        parameters: {},
    },
};

const getCustomersByCountry: Tool = {
    type: 'Function',
    function: {
        name: 'getCustomersByCountry',
        description: 'Returns a list of customers by country code',
        parameters: {
            type: 'object',
            properties: {
                country: {
                    type: 'string',
                    description: '2-Letter country code',
                }
            },
            required: ['country'],
        },
    },
};

const getChatRequest = (content: string, context: ChatContextItem[]): ChatRequest & { stream: false; } => ({
    model: 'llama3.2',
    messages: [...context, { content, role: 'user' }],
    stream: false,
    tools: [getCustomers, getCustomersByCountry],
});

const service = {
    chat: async (content: string, context: ChatContextItem[] = []) => {
        const request = getChatRequest(content, context);
        let response = await ollama.chat(request);
        let result: any;

        if (response.message.tool_calls?.length) {
            console.log('[DEBUG] Parsing Tool Call:', {
                request,
                response,
                message: response.message,
                calls: response.message.tool_calls.map(tool => ({
                    name: tool.function.name,
                    arguments: JSON.stringify(tool.function.arguments, undefined, 4),
                })),
            }); // DEBUG
            for (const tool of response.message.tool_calls) {
                switch (tool.function.name) {
                    case 'getCustomers':
                        result = data.customers.fetch({});
                        break;
                    case 'getCustomersByCountry':
                        result = data.customers.fetch({ country: tool.function.arguments.country });
                        break;
                }

                request.messages?.push(response.message);
                if (result) {
                    request.messages?.push({ content: JSON.stringify(result), role: 'tool' });
                }
            }
        }

        const msgs = JSON.parse(JSON.stringify(request.messages));
        console.log('[DEBUG] Calling Chat with final request:', { messages: msgs }); // DEBUG
        return await ollama.chat(request);
    },
};

////////////////////////////////////////////////////////////////////////////////////////////////////

export default service;
