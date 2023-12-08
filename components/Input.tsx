type Props = {
  id: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  label: string
  type?: string
}

function Input({ id, onChange, value, label, type }: Props) {
  return (
    <div className='relative'>
      <input
        id={id}
        value={value}
        type={type}
        onChange={onChange}
        className='block rounded-md p-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer'
        placeholder=' '
      />
      <label
        className='absolute text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3'
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  )
}

export default Input
