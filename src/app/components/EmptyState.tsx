import { PiPlusBold } from "react-icons/pi";
import Button from "./shared/Button";

interface EmptyStateProps {
  action: () => void
}

export const EmptyState = ({action}:EmptyStateProps) => {
  
  return(
    <div className='h-full w-full flex justify-center items-center flex-col gap-6'>
      <div className='flex flex-col gap-2 items-center justify-center'>
        <h2 className='text-2xl font-semibold text-white'>Welcome to ReflexAI - ChatBot 🤓</h2>
        <p className='text-xl max-w-1/2'>Please select or create a new conversation to start!</p>
      </div>
      <Button
        action={action}
        text="New Conversation"
        icon={<PiPlusBold className='text-xl text-white' />}
      />
    </div>
  )
}