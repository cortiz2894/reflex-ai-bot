import { ChangeEvent, FormEvent, SetStateAction } from "react"
import { IoIosSend } from "react-icons/io"

interface FormInputProps {
  submit: (e: FormEvent<HTMLFormElement>) => void
  setMessage: (value: SetStateAction<string>) => void
  message: string
}

export const FormInput = ({submit, setMessage, message}:FormInputProps) => {

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target

    setMessage(value)
  }

  return(
    <form onSubmit={(e) => submit(e)} className='bg-secondary p-3 flex gap-3 z-10 shadow-lg rounded'>
      <input
        type="text"
        value={message}
        className='w-full bg-transparent outline-none'
        onChange={(e) => handleChange(e)}
        placeholder="Type your message and press enter..."
      />
      <button type='submit'>
        <IoIosSend className='text-xl'/>
      </button>
    </form>
  )
}