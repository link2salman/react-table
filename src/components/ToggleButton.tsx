type ToggleButton = {
    label?: string,
    reverse?: boolean,
    checked?: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const ToggleButton = ({ label, reverse, checked, onChange }: ToggleButton) => {
    const buttonLabel = label && <span className="label">{label}</span>
    const reversePosition = reverse ? "check-first" : ""
    return (
        <div className={`switch-container ${reversePosition}`}>
            {buttonLabel}
            <div className="switch">
                <input className="toggle-input" id="toggle" type="checkbox" value={""} checked={checked} onChange={onChange} />
                <label className="slider" htmlFor="toggle"></label>
            </div>
        </div>


    )
}

export default ToggleButton