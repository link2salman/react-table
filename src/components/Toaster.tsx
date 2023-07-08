import SuccessIcon from "Assets/icons/success.svg"
import ErrorIcon from "Assets/icons/error.svg"
import InfoIcon from "Assets/icons/info.svg"
import WarningIcon from "Assets/icons/warning.svg"
import { useRef } from "react"

interface ToasterTypes {
    type?: string,
    message: string,
    direction?: string,
    delay?: number
}

const Toaster = ({ type = "success", message, direction = "topright", delay = 2 }: ToasterTypes) => {

    const toasterRef = useRef<HTMLDivElement>(null)

    const Icons: any = {
        success: SuccessIcon,
        warning: WarningIcon,
        info: InfoIcon,
        error: ErrorIcon
    }

    const toasterTiming = {
        animationName: `isvisible, ${direction}, ${direction}disappear`,
        animationDuration: `${delay + 0.5}s, 0.2s, 0.5s`,
        animationDelay: `0s, 0s, ${delay + 0.1}s`
    }
    const flasTiming = { animationDuration: `${delay}s` }

    const closeHandler = () => {
        if (toasterRef.current) toasterRef.current.style.display = "none"
    }

    return (
        <div ref={toasterRef} className={`toaster-container ${direction}`} style={toasterTiming}>
            <span className="close-btn" onClick={closeHandler}></span>
            <img src={Icons[type]} alt="" className="icons" /> {message}
            <span className={`pellete ${type}`} style={flasTiming}></span>
        </div >
    )
}

export default Toaster