import { useRef, useState, useCallback, useEffect } from 'react'

type OptionsArray = {
    label: string;
    value: string;
}[]

type SelectProps = {
    Options: OptionsArray,
    placeholder: string,
    values: Array<string> | string,
    searchable?: boolean,
    multiple?: boolean,
    setValues: React.Dispatch<React.SetStateAction<string | string[]>>

}
const DropdownSelect = ({ Options, searchable = false, multiple = false, values, setValues }: SelectProps) => {

    const toggleOptionListRef = useRef<HTMLDivElement | null>(null)
    const selectContainerRef = useRef<HTMLDivElement | null>(null)
    const inputToggleBtnRef = useRef<HTMLInputElement>(null)
    const selectedOptionsRef = useRef<HTMLElement>(null)
    const [query, setQuery] = useState({ label: "", value: "" })
    const [wrapCounter, setWrapCount] = useState<number>(0);

    const selectHandler = (e: any) => {
        const { value } = e.target
        if (query) setQuery({ label: "", value: "" })
        if (multiple && Array.isArray(values)) {
            if (values.includes(value)) return setValues([...values.filter((val) => val !== value)])
            setValues([...values, value])
            return
        }
        setValues(value)
        if (inputToggleBtnRef.current) {
            toggleOptionListRef.current?.classList.remove('open')
            inputToggleBtnRef.current.checked = false
        }
    }

    const selectDeslectAll = () => {
        if (values.length != Options.length) return setValues(Options.map(item => item.value))
        setValues([])
    }

    const removeSelectedOption = (val: any) => Array.isArray(values) && setValues(values.filter(value => value != val))

    const openCloseOptionList = (e: any) => {
        if (e.target.checked) return toggleOptionListRef.current?.classList.add('open')
        toggleOptionListRef.current?.classList.remove('open')
    }

    const onFocusOpenCloseOptionList = (e: any) => {
        if (e.target.classList.contains('selected') || e.target.classList.contains('toggle-arrow-icon')) return
        if (inputToggleBtnRef.current && !inputToggleBtnRef.current.checked) {
            toggleOptionListRef.current?.classList.add('open')
            inputToggleBtnRef.current.checked = true
            return
        }
        if (inputToggleBtnRef.current && inputToggleBtnRef.current.checked) {
            inputToggleBtnRef.current.checked = false
            toggleOptionListRef.current?.classList.remove('open')
        }
    }

    const closeOptionList = () => {
        if (inputToggleBtnRef.current) {
            toggleOptionListRef.current?.classList.remove('open')
            inputToggleBtnRef.current.checked = false
        }
    }

    const onSearch = (e: any) => {
        if (!searchable) return e.preventDefault();
        setQuery({ label: e.target.value, value: e.target.value })
    }

    const outsideContainerClickHandler = (e: any) => {
        if (selectContainerRef.current && !selectContainerRef.current.contains(e.target)) {
            toggleOptionListRef.current?.classList.remove('open')
            if (inputToggleBtnRef.current) inputToggleBtnRef.current.checked = false
        }
    };

    const containerResponsiveWidth = useCallback(() => {
        if (selectedOptionsRef.current && selectContainerRef.current) {
            const Arr = selectedOptionsRef.current.children
            const parentBoundings = selectContainerRef.current?.getBoundingClientRect()
            const renderedElem = ([...Arr].map(item => item).filter(item => item.getAttribute("class") !== "wraped-options-count"))
            renderedElem?.filter(elm => elm.getBoundingClientRect().right < parentBoundings.right - 140).map(item => item.classList.remove("wraped-selected-option"))
            renderedElem?.filter(elm => elm.getBoundingClientRect().right > parentBoundings.right - 140).map(item => item.classList.add("wraped-selected-option"))
            setWrapCount(document.getElementsByClassName("wraped-selected-option").length)
        }
    }, [selectedOptionsRef]);


    useEffect(() => {
        if (multiple) {
            containerResponsiveWidth();
            window.addEventListener('resize', containerResponsiveWidth);
        }
        return () => {
            window.removeEventListener('resize', containerResponsiveWidth);
        }
    }, [containerResponsiveWidth, values.length])

    const selected = Array.isArray(values) ? values.flatMap(val => Options.filter(item => item.value === val)) : Options.filter(item => item.value === values)[0]
    const selectedClasses = Array.isArray(selected) ? `selected ${selected.length == 1 ? "first-selected-element" : ""}` : "selected first-selected-element"
    const selectedOptions = Array.isArray(selected) ? selected.map((item, idx) => <span className={selectedClasses} key={`${idx}${item?.label}`} onClick={() => removeSelectedOption(item.value)}>{item.label}</span>) : <span className={selectedClasses}  >{selected?.label}</span>
    const counter = wrapCounter ? <span className='wraped-options-count'>{`${wrapCounter} More`}</span> : ""

    const queriedOptions = Options.filter(item => item.label.toLowerCase().includes(query.label.toLowerCase()))

    const singleOptionsList = queriedOptions.map((opt, idx) => <label className='options' htmlFor={opt?.value + idx} key={`${idx}${opt?.value}`} onClick={() => selectHandler({ target: { label: opt.label, value: opt.value } })}>{opt?.label}</label>)

    const multipleOptionsList = queriedOptions.map((opt, idx) => <label className='options' htmlFor={opt?.value + idx} key={`${idx}${opt?.value}`} >
        <input type="checkbox" className='checkbox-option-input' id={opt?.value + idx} checked={values.includes(opt?.value)} onChange={() => selectHandler({ target: { label: opt.label, value: opt.value } })} />{opt?.label}</label>)

    const optionsList = multiple ? multipleOptionsList : singleOptionsList


    if ((!query.label || ("all").includes(query.label.toLowerCase())) && multiple) {
        optionsList.unshift(<label className='options' htmlFor={'all'} key={`all001`}>
            <input type="checkbox" className='checkbox-option-input' id={'all'} checked={values.length == Options.length} onChange={selectDeslectAll} />
            All</label>)
    }

    useEffect(() => {
        document.addEventListener('mousedown', outsideContainerClickHandler);
        return () => document.removeEventListener('mousedown', outsideContainerClickHandler);
    }, [])

    return (
        <div className='select-container' ref={selectContainerRef} >
            <div className='selected-options' onClick={onFocusOpenCloseOptionList}>
                <input type="checkbox" className='toggle-arrow-icon' onChange={openCloseOptionList} ref={inputToggleBtnRef} />
                <span ref={selectedOptionsRef} className='selected-options-list'> {selectedOptions} {counter} </span>
                <span className={`selected-placeholder ${Array.isArray(selectedOptions) && selectedOptions.length ? "change-position-animation" : ""}`}>{Array.isArray(selectedOptions) ? "Categories" : "Category"}</span>
            </div>

            <div className={"options-container"} ref={toggleOptionListRef} >
                <div className="options-container-content">
                    {searchable && <div className="options-container-content-header">
                        <div className="option-list-header">
                            <div className="option-list-header-title">Categories</div>
                            <div className="option-list-header-closebtn" onClick={closeOptionList}></div>
                        </div>
                        <div className="search-input-wrapper">
                            <span className='search-icon'></span>
                            <input type='text' value={query.label} placeholder='Search' onChange={onSearch} className='search-input' />
                        </div>
                    </div>
                    }
                    {optionsList}
                </div>
            </div>
        </div>
    )
}

export default DropdownSelect