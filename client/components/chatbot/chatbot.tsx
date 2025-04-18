// import external dependencies
import React, { KeyboardEvent, useState } from 'react';

// import internal dependencies

////////////////////////////////////////////////////////////////////////////////////////////////////

export type ChatbotMessageType = 'System' | 'Tool' | 'User';

export interface ChatbotMessage {
    message: string;
    meta?: {
        tool: string;
        parameters: Array<{
            name: string;
            value: string;
        }>;
    };
    type: ChatbotMessageType;
}

export interface ChatbotProps {}

export const Chatbot = ({}: ChatbotProps) => {
    const [isOpen, setOpen] = useState<boolean>(true);
    const [messages, setMessage] = useState<ChatbotMessage[]>([
        { type: 'User', message: 'Why is the sky blue?' },
        { type: 'System', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.' },
        { type: 'User', message: 'Thanks!' },
        { type: 'System', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.' },
        { type: 'System', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.' },
        { type: 'System', message: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.' },
    ]);

    const onToggleOpen = () => {
        setOpen((prevState: boolean) => {
            return !prevState;
        });
    };

    const onChatbotInput = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.code === 'Enter') {
            event.preventDefault();
            event.stopPropagation();

            if (event.currentTarget.value) {
                const message: string = event.currentTarget.value;
                event.currentTarget.value = '';
                setMessage((prevState: ChatbotMessage[]) => {
                    return [...prevState, { message, type: 'User' }];
                });
            }
        }
    }

    return (
        <div className="chatbot" data-component="chatbot" data-chatbot-open={isOpen}>
            <div className="chatbot__head">
                <div className="chatbot__title">AI Chatbot</div>
                <div className="chatbot__controls">
                    <button className="chatbot__control-toggle" onClick={onToggleOpen}>
                        {isOpen ? 'Close' : 'Open'}
                    </button>
                </div>
            </div>
            <div className="chatbot__body">
                <ul className="chatbot__messages">
                    {messages.map(({ message, type }: ChatbotMessage, index: number) => (
                        <li className="chatbot__message-line" data-message-type={type} key={index}>
                            {message}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chatbot__foot">
                <input className="chatbot__input" onKeyDown={onChatbotInput} type="text" />
            </div>
        </div>
    );
};

Chatbot.displayName = 'Chatbot';
