import SpinnerIcon from "Assets/icons/spinner.svg"

interface LoaderProps {
    loading: boolean,
    overlay?: boolean,
    children?: JSX.Element | JSX.Element[] | string,
}

const Loader = ({ loading, overlay, children }: LoaderProps) => {

    if (!loading) {
        return <>{children}</>
    }

    return (
        <div className={`loader-container ${overlay ? "overlay" : "underlay"}`}>
            <div className="loader"><img src={SpinnerIcon} alt="" /></div>
        </div>
    )
}
export default Loader