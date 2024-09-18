import { Conversation } from "../shared.types";

export const getConversations = async (): Promise<Conversation[]> => {
  const response = await fetch(`http://localhost:3000/api/conversations`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export const createConversations = async (): Promise<Conversation>  => {
  const response = await fetch(`http://localhost:3000/api/conversations`, {
    method: "POST"
  });
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};