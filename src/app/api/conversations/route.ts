import { NextResponse } from 'next/server';
import { createConversation, getConversations } from '../../../../lib/chat';

export async function GET() {
  const conversations = await getConversations();
  return NextResponse.json(conversations);
}

export async function POST() {
  const newConversation = await createConversation();
  return NextResponse.json({
    data: newConversation
  });
}