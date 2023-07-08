import { useCallback, useRef } from "react"
import Button from "./Button";
import Loader from "./Loader";

interface ModalProps {
    title?: string,
    cancelText?: string,
    OkText?: string,
    children?: JSX.Element | JSX.Element[] | string,
    contentLoading: boolean,
    requestLoading: boolean,
    footer?: boolean,
    setShowModel: (value: boolean) => void,
    onSubmit: () => void,
    onCancel: () => void,
    show: boolean,
    className?: string,
    footerLocation?: "space-between" | "left" | "right" | "right-no-bar" | "left-no-bar",
    header?: boolean,
}

export const Modal = ({
    title,
    cancelText = "Cancel",
    OkText = "Submit",
    footer = true,
    header = true,
    contentLoading,
    requestLoading,
    setShowModel,
    onSubmit,
    onCancel = () => setShowModel(false),
    show,
    children,
    className,
    footerLocation = "right"
}: ModalProps) => {

    // if click outside modal will splash
    const bubbleRef = useRef<HTMLDivElement>(null)

    const outSideClick = useCallback((e: any) => {
        e.stopPropagation()
        if (e.target.classList[0] === "modal-container") {
            if (bubbleRef.current && [...bubbleRef.current.classList].includes("bubble")) bubbleRef.current.classList.remove("bubble")
            setTimeout(() => bubbleRef.current?.classList.add("bubble"), 0)
        }
    }, [])

    // If click outside modal will be closed

    // useEffect(() => {
    //     const checkIfClickedOutside = (e: any) => {
    //         if (show && bubbleRef.current && !bubbleRef.current?.contains(e.target)) {
    //             setShowModel(false)
    //         }
    //     }

    //     document.addEventListener("mousedown", checkIfClickedOutside)
    //     return () => {
    //         document.removeEventListener("mousedown", checkIfClickedOutside)
    //     }
    // }, [show])


    const modalTitle = title && title

    const footerContent = footer && <div className={`modal-footer ${footerLocation || ""}`}>
        <Button variant="outline" onClick={() => onCancel()}>{cancelText}</Button>
        <Button variant="solid" loading={requestLoading} onClick={() => onSubmit()}>{OkText}</Button>
    </div >

    const headerContent = header && <div className="modal-header">
        <div className="modal-header_title">{modalTitle}</div>
        <div className="modal-header_icon" onClick={() => setShowModel(false)}>
        </div>
    </div>

    return (
        <div className={`modal-container ${show ? "show" : "hide"} ${className || ""}`} onClick={(e) => outSideClick(e)} ref={bubbleRef}>
            <div className={`modal`}> {/* if you want to close model by clicking outside then use useRef in modal class here and uncomment useEffect hook */}
                {headerContent}
                <div className="modal-body">
                    <Loader loading={contentLoading} overlay={true} />
                    {children}
                </div>
                {footerContent}
            </div>
        </div>
    )
}
