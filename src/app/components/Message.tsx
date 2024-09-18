import classNames from "classnames"
import { Message as MessageType } from "../shared.types"
import { PiUser, PiRobot } from "react-icons/pi";

interface MessageProps {
  message: MessageType,
  date: string
}

export const Message = ({message, date}:MessageProps) => {
  return(
    <div 
      key={message.id} 
      className={
        classNames('flex flex-col gap-2 mb-3', 
          {'items-start': message.sender === 'user'},
          {'items-end': message.sender === 'bot'},
        )
      }
    >
      <span className='text-xs'>{date}</span>
      <div className={classNames('rounded-lg  py-2 px-3 max-w-2/5', 
      {'rounded-bl-none bg-secondary': message.sender === 'user'},
      {'rounded-br-none bg-greenReflex text-white': message.sender === 'bot'},
      )}>
        <span>{message.content}</span>
      </div>
      <div className='w-10 h-10 rounded-full bg-secondary overflow-hidden flex justify-center items-center'>
        {message.sender === 'user' ? <PiUser className='text-2xl'/> : <PiRobot className='text-2xl'/>}
      </div>
    </div>
  )
}