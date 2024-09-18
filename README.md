# Chat Application

This is a real-time chat application where users can interact with a system bot. The bot responds with predefined messages, simulating a conversation. Users can create new chat conversations, send messages, and receive responses from the bot. The application also stores chat history for each conversation, and the chat system is built to support multiple conversations.

## Features

- Real-time messaging with Socket.IO
- System bot with predefined responses
- Multiple conversation management
- Message history stored in the database

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Next.js**: React framework for server-side rendering and API routes.
- **Socket.IO**: For real-time communication between the client and server.
- **Prisma**: ORM for database interaction.
- **SQLite**: Database used for storing chat messages and conversations.
- **TypeScript**: Strongly-typed programming language that builds on JavaScript.
- **GSAP**: For animations in the user interface.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

You need to have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/cortiz2894/reflex-ai-bot.git
   cd reflex-ai-bot
   ```

2. **Install the dependencies:**

   ```
   npm install
   ```

3. **Set up the environment variables:**

Create a .env file in the root of the project and add the following environment variables:

   ```
   DATABASE_URL="file:./dev.db"
   ```

4. **Run Prisma migrations:**

Initialize the database and run the migrations.

   ```
   npx prisma migrate dev
   ```

5. **Start the development server:**

This command starts both the Next.js API and the Socket.IO server.

   ```
   npm run dev
   ```


## Usage

- Visit http://localhost:3000 to access the chat application.
- New conversations can be started by clicking the "New" button.
- Type a message in the chat interface, and the system bot will respond automatically.
- The chat history will be saved and can be viewed when revisiting conversations.

