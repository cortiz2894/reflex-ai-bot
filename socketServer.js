const { Server } = require('socket.io');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const io = new Server(3001, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  const loadMessages = async (conversationId) => {
    const chatHistory = await prisma.message.findMany({
      where: { conversationId: conversationId },
      orderBy: { createdAt: 'asc' },
    });
    socket.emit('chat_history', chatHistory);
  };
  

  socket.on('user_message', async ({ content, sender, conversationId }) => {
    console.log('Message from user:', { content, sender, conversationId });

    const savedMessage = await prisma.message.create({
      data: {
        content,
        sender,
        conversationId,
      },
    });

    io.emit('user_message', savedMessage);

    const botResponses = [
      'Hello, how can I assist you today?',
      'I am here to help you with your questions.',
      'What would you like to know more about?',
      'Feel free to ask me anything!',
      'I can assist with a variety of topics. What would you like to talk about?',
    ];

    const randomResponse =
      botResponses[Math.floor(Math.random() * botResponses.length)];

    setTimeout(async () => {
      const botMessage = await prisma.message.create({
        data: {
          content: randomResponse,
          sender: 'bot',
          conversationId,
        },
      });

      io.emit('bot_message', botMessage);
    }, 1000);
  });

  socket.on('load_messages', (conversationId) => {
    loadMessages(conversationId);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

console.log('Socket.IO server running on http://localhost:3001');
