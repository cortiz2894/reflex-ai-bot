'use client';

import { useState, useEffect, FormEvent, useRef, ChangeEvent } from 'react';
import io, { Socket } from 'socket.io-client';
import gsap from 'gsap';
import { format } from "date-fns";
import { isSameDay } from 'date-fns/isSameDay';
import { PiPlusBold } from "react-icons/pi";

import { Conversation } from './Conversation';
import { Message } from './Message';
import Button from './shared/Button';

import type { Message as MessageType, Conversation as ConversationType } from '../shared.types';
import { createConversations, getConversations } from '../services/conversationService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FormInput } from './FormInput';
import TypingIndicator from './shared/TypingIndicator';
import { EmptyState } from './EmptyState';
import { scrollToBottom } from '../utils/actions';

const socketIO = io("http://localhost:3001");

export default function Chat() {

  const queryClient = useQueryClient()

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket>()
  const [openConversation, setOpenConversation] = useState<number | null>(1)

  const chatContainerRef = useRef<HTMLDivElement | null>(null)
  const typingRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setSocket(socketIO);
    if (openConversation) {
      socketIO.emit('load_messages', openConversation);

      socketIO.on('chat_history', (chatHistory: MessageType[]) => {
        setMessages(chatHistory);
      });

      socketIO.on('user_message', (message: MessageType) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socketIO.on('bot_message', (message:MessageType) => {
        if(!typingRef.current) return

        gsap.to(typingRef.current, {
          opacity: '0',
          bottom: '0%',
          ease: 'hop',
          duration: 0.6
        })
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      socketIO.off('chat_history');
      socketIO.off('user_message');
      socketIO.off('bot_message');
    };
  }, [openConversation]);
  
  const { data:conversationsResponse } = useQuery<ConversationType[]>(
    { 
      queryKey: ['conversations'],
      queryFn: getConversations,
    }
  );

  const { mutate: addConversation, isSuccess:isAddConversationSuccess, data:newConversation } = useMutation({
    mutationFn: createConversations,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations']})
    },
  });

  useEffect(() => {
    scrollToBottom(chatContainerRef)
  }, [messages])

  useEffect(() => {
    setOpenConversation(newConversation?.data.id)
  }, [isAddConversationSuccess])

  const sendMessage = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newMessage || !socket || !openConversation) return;

    const message = { content: newMessage, sender: 'user', conversationId: openConversation };
    socket.emit('user_message', message);

    setNewMessage('');

    if(!typingRef.current) return
    
    gsap.to(typingRef.current, {
      opacity: '1',
      bottom: '10vh',
      ease: 'hop',
      duration: 0.6
    })
  };

  const changeConversation = (id:number) => {
    setOpenConversation(id)
  }

  return (
    <div className='w-3/4 h-3/4 gap-4  flex rounded-xl overflow-hidden bg-backgroundDarker border border-[#333333] p-3'>
      <div className='w-1/3 flex min-h-16 flex-col rounded-lg overflow-hidden'>
        <div className='h-[10%] w-ful p-4 bg-secondary flex items-center justify-between'>
          <p className='text-lg font-semibold text-white'>Conversations</p>
          <Button
            action={() => addConversation()}
            text="New"
            icon={<PiPlusBold className='text-xl text-white' />}
          />
        </div>
        <div className='flex h-[90%] gap-4 w-full'>
          <div className='bg-[#222] flex flex-col gap-2 p-2 w-full overflow-auto'>
            {conversationsResponse && (
              <>
                {conversationsResponse.map((con) => <Conversation action={changeConversation} key={con.id} data={con} active={openConversation === con.id}/>)}
              </>
            )}
          </div>
        </div>
      </div>
      <div className='w-2/3 flex min-h-16 flex-col rounded-lg overflow-hidden'>
          {!openConversation ? (
            <EmptyState action={() => addConversation()} />
          ) : (
            <>
              <div className='w-full h-[10%] p-4 bg-secondary flex items-center'>
                <p className='text-lg font-semibold text-white'>Chat</p>
              </div>
              <div className='flex h-[90%] gap-4 w-full'>
                <div className='w-full p-4 bg-white backgroundPattern flex flex-col h-full relative'>
                  <div 
                    className='overflow-y-auto h-full' 
                    ref={chatContainerRef}
                  >
                    {messages.map((message) => {

                      const createdAt = new Date(message.createdAt);
                      const today = new Date();
                      const displayDate = isSameDay(createdAt, today)
                        ? format(createdAt, "hh:mm:ss")  
                        : format(createdAt, "MM/dd/yyyy : hh:mm:ss"); 
                        
                      return(
                        <Message key={message.id} date={displayDate} message={message}/>
                      )})}
                    <TypingIndicator typingRef={typingRef}/>
                  </div>
                  <FormInput message={newMessage} setMessage={setNewMessage} submit={sendMessage} />
                </div>
              </div>
            </>
          )}
      </div>
    </div>
  );
}
