import { PlayIcon, InforIcon } from '../Components/icon'

function Button({ className, title, icon, onClick }) {
    const buttonClass = `${className}  pl-5 pr-7  flex flex-row p-2 justify-between rounded items-center hover:opacity-75  cursor-pointer`
    return (
            <div className={buttonClass} onClick={onClick}>
                {icon == '1' ? <PlayIcon /> : <InforIcon />}
                <div className=' w-3 h-0'></div>
                <div className='text-xl opacity-100'>{title}</div>
            </div>
    )
}
export default Button