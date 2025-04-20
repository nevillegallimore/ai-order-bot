// import external dependencies
import React, { KeyboardEvent, useRef, useState } from 'react';

// import internal dependencies

////////////////////////////////////////////////////////////////////////////////////////////////////

export type ChatbotMessageRole = 'assistant' | 'system' | 'user';

export interface ChatbotMessage {
    content: string;
    role: ChatbotMessageRole;
}

export interface ChatbotProps {}

export const Chatbot = ({}: ChatbotProps) => {
    const [isThinking, setThinking] = useState<boolean>(false);
    const [isOpen, setOpen] = useState<boolean>(true);
    const [messages, setMessages] = useState<ChatbotMessage[]>([]);
    const nullMessage = useRef<HTMLLIElement | null>(null);

    const onToggleOpen = () => {
        setOpen((prevState: boolean) => {
            return !prevState;
        });
    };

    const getAiResponse = async (content: string) => {
        setThinking(true);
        const payload = await (await fetch('http://localhost:3000/api/ai', {
            body: JSON.stringify({ content, context: messages }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        })).json();
        setThinking(false);
        setMessages((prevState: ChatbotMessage[]) => {
            return [...prevState, { role: payload.data.message.role, content: payload.data.message.content }];
        });
        nullMessage.current?.scrollIntoView();
    };

    const onChatbotInput = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.code === 'Enter') {
            event.preventDefault();
            event.stopPropagation();

            if (event.currentTarget.value) {
                const content: string = event.currentTarget.value;
                event.currentTarget.value = '';
                setMessages((prevState: ChatbotMessage[]) => {
                    return [...prevState, { content, role: 'user' }];
                });
                nullMessage.current?.scrollIntoView();
                getAiResponse(content);
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
                    {messages.map(({ content, role }: ChatbotMessage, index: number) => (
                        <li className="chatbot__message-line" data-message-role={role} key={index}>
                            {content}
                        </li>
                    ))}
                    <li className="chatbot__message-line--null" ref={nullMessage}></li>
                </ul>
                {isThinking && (
                    <div className="chatbot__message-thinking">AI Chatbot is typing...</div>
                )}
            </div>
            <div className="chatbot__foot">
                <input className="chatbot__input" onKeyDown={onChatbotInput} type="text" />
            </div>
        </div>
    );
};

Chatbot.displayName = 'Chatbot';
