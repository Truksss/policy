export type Role = 'user' | 'assistant' | 'system' | 'agent';

export interface Message {
    id: string;
    role: Role;
    text: string;
    createdAt: string;
    metadata?: Record<string, unknown>;
}