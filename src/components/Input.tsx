import { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
    labelText?: string,
    className?: string,
    type?: "text" | "password" | "email" | "number" | "datetime-local" | "date" | "time" | "file" | "checkbox" | "radio",
    variant?: 'outline' | 'filled' | 'flushed' | 'unstyled',
    placeholder?: string,
    borderRadius?: number,
    value?: number | string,
    id?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,

}

const Input = ({ labelText, className, type = "text", variant, placeholder, borderRadius, value, onChange, id, ...rest }: InputProps) => {

    const label = labelText && <label htmlFor={id || ''}>{labelText}</label>
    const classes = `${className || ""} ${variant || ""}`
    const customeStyle = { borderRadius: `${borderRadius || 0}px` }

    return (
        <div className={`input-wrapper ${classes}`}>
            {label}
            <input type={type} id={id || ''} value={value} onChange={onChange} placeholder={placeholder} style={customeStyle} {...rest} />
        </div>
    )
}

export default Input