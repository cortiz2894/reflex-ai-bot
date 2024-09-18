import prisma from './prisma';

interface Message {
  content: string, 
  sender: 'user' | 'bot',
  conversationId: number
}

export const saveMessage = async (message: Message) => {
  return await prisma.message.create({
    data: {
      content: message.content,
      sender: message.sender,
      conversation: {
        connect: { id: message.conversationId }
      }
    },
  });
};

export const getMessages = async () => {
  return await prisma.message.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });
};

export const getMessagesByConversationId = async (conversationId: number) => {
  return await prisma.message.findMany({
    where: {
      conversationId: conversationId
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
};

export const getConversations = async () => {
  return await prisma.conversation.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const createConversation = async () => {
  return await prisma.conversation.create({
    data: {},
  });
};