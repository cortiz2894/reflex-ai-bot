import { PiUser } from "react-icons/pi";
import { Conversation as ConversationType } from "../shared.types";
import classNames from "classnames"

interface ConversationProps {
  data: ConversationType,
  active: boolean,
  action: (id:number) => void
}

export const Conversation = ({data, active, action} : ConversationProps) => {
  return(
    <div 
      className={classNames('w-full p-2 flex gap-4 items-center rounded border border-secondary hover:bg-secondary cursor-pointer transition-all', {'bg-secondary' : active})}
      onClick={() => action(data.id)}
    >
      <div className={`rounded-full overflow-hidden min-w-14 w-14 h-14 flex justify-center items-center border ${!active ? 'border-secondary' : 'border-[#222]'}`}>
        <PiUser className='text-2xl'/>
      </div>
      <p className=''>Conversation {data.id}</p>
    </div>
  )
}
