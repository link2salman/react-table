import { ComponentProps } from "react"

import SpinnerIcon from "Assets/icons/spinner.svg"

interface ButtonProps extends ComponentProps<"button"> {
    variant?: 'outline' | 'solid' | 'ghost' | 'link',
    size?: 'lg' | 'md' | 'sm',
    disabled?: boolean,
    loading?: boolean,
    children?: string,
    icon?: string,
    iconReverse?: 'flex' | 'flex-reverse',
    clickHandler?: () => void,
}

const Button = ({ variant = "outline", size = "lg", disabled = false, children, loading = false, icon, iconReverse, clickHandler, ...rest }: ButtonProps) => {

    const spinner = loading && !disabled && <img src={SpinnerIcon} alt="" className='btn-spinner' />
    const btnIcon = icon && !disabled && <img src={icon} alt="" className='btn-spinner' />

    return (
        <button onClick={clickHandler} className={`btn ${variant} ${variant !== "link" ? size : ""} ${iconReverse ? "reverse" : ""}`} disabled={disabled} {...rest}>
            {children || ""} {spinner} {btnIcon}
        </button>
    )
}
export default Button