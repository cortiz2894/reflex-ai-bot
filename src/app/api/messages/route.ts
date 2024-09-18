import { NextResponse } from 'next/server';
import { getMessagesByConversationId, saveMessage } from '../../../../lib/chat';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get('conversationId');

  if (!conversationId) {
    return NextResponse.json({ error: 'Conversation ID is required' }, { status: 400 });
  }

  const messages = await getMessagesByConversationId(Number(conversationId));
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const data = await request.json();

  if (!data.conversationId) {
    return NextResponse.json({ error: 'Conversation ID is required' }, { status: 400 });
  }

  const newMessage = await saveMessage(data);

  return NextResponse.json({
    data: newMessage
  });
}
