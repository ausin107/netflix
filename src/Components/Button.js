import { PlayIcon, InforIcon } from './icon'

function Button({ className, title, icon, onClick, titleClasses, iconClasses }) {
  const buttonClass = `${className} flex flex-row justify-center rounded items-center hover:opacity-75  cursor-pointer`
  return (
    <div className={buttonClass} onClick={onClick}>
      {icon == '1' ? <PlayIcon className={iconClasses} /> : <InforIcon className={iconClasses} />}
      <div className={titleClasses}>{title}</div>
    </div>
  )
}
export default Button
