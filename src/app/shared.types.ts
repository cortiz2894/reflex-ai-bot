
export type SenderType = 'user' | 'bot';

export interface Message {
  id: number,
  content: string,
  sender: SenderType,
  createdAt: string,
}

export interface Conversation {
  id: number,
  updatedAt: Date,
  createdAt: Date
}