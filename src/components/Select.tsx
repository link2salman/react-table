import { useRef, useState, useCallback } from 'react'

type OptionsArray = {
    label: string;
    value: string;
}[]

type SelectProps = {
    Options: OptionsArray,
    placeholder: string,
    multiple?: boolean,
    values: Array<string> | string,
    searchable?: boolean,
    setValues: React.Dispatch<React.SetStateAction<string | string[]>>

}
const Select = ({ Options, multiple = false, searchable = false, values, setValues }: SelectProps) => {

    const checkedRef = useRef<HTMLDivElement | null>(null)
    const checkboxRef = useRef<HTMLInputElement>(null)
    const inputFocused = useRef<HTMLInputElement>(null)
    const [optionsList, setOptionList] = useState(Options)
    const [query, setQuery] = useState({ label: "", value: "" })

    const selectHandler = (e: any) => {
        const { label, value } = e.target
        setValues(multiple ? [...values, value] : value)
        if (multiple) {
            setQuery({ label: "", value: "" })
            setOptionList([...optionsList.filter(item => item.value != value)])
        }
        else {
            setQuery({ label: label, value: optionsList.filter(item => item.value == value)[0].value })
            checkedRef.current?.classList.remove('open')
            if (checkboxRef.current != null) checkboxRef.current.checked = false
        }
    }

    const pressToRemoveSelection = (e: any) => {
        if (e.keyCode === 8 && Array.isArray(values) && values.length > 0 && !query.value.length) {
            let newArr = [...values]
            const removedValue = newArr.pop()
            setValues(newArr)
            setOptionList([...optionsList, ...Options.filter(item => item.value == removedValue)])
        }
    }

    const clickToRemoveSelction = (val: any) => {
        if (multiple) {
            setValues(Array.isArray(values) ? values.filter(value => value != val) : val)
            setOptionList([...optionsList, ...Options.filter(item => item.value == val)])
        }
    }

    const openList = (e: any) => {
        if (e.target.checked) {
            checkedRef.current?.classList.add('open')
        }
        else {
            checkedRef.current?.classList.remove('open')
        }
    }

    const focusHandler = (e: any) => {
        if (e.target.classList[0] != "toggle-control") {
            if (inputFocused.current)
                inputFocused.current.focus()
            checkedRef.current?.classList.add('open')
            if (checkboxRef.current)
                checkboxRef.current.checked = true
        }
    }

    const onSearch = (e: any) => {
        if (!searchable) {
            e.preventDefault();
        }
        else {
            setQuery({ label: e.target.value, value: e.target.value })
        }
    }

    const filterSingleOptions = (item: any) => {
        if (!Array.isArray(values) && values?.toLowerCase() == query.value.toLowerCase()) {
            return item.label.toLowerCase() != query.label.toLowerCase()
        }
        else {
            return item.label.toLowerCase().includes(query.label.toLowerCase())
        }
    }

    const sortedList = useCallback((list: OptionsArray) => {
        return list.sort((x, y): any => {
            let a = x?.label.toUpperCase();
            let b = y?.label.toUpperCase();
            return a == b ? 0 : a > b ? 1 : -1;
        })
    }, [optionsList, Options])

    const fitlerSelected = (multiple && Array.isArray(values)) && values.flatMap(val => Options.filter(item => item.value === val))

    const multipleSelectedOptions = fitlerSelected && fitlerSelected.map((item, idx) => <span className='selected' key={`${idx}${item?.label}`} onClick={() => clickToRemoveSelction(item.value)}>{item.label}</span>)

    const filterQueryBasedMultipleOptions = sortedList(optionsList.filter(item => item.label.toLowerCase().includes(query.label.toLowerCase())))

    const multipleOptionsForSelection = filterQueryBasedMultipleOptions.map((opt, idx) => <span className='options' key={`${idx}${opt?.value}`} onClick={() => selectHandler({ target: { label: opt.label, value: opt.value } })}>{opt?.label}</span>)

    const filterQueryBasedSingalOptions = sortedList(Options.filter(item => filterSingleOptions(item)))

    const singularOptionsForSelection = filterQueryBasedSingalOptions.map((opt, idx) => <span className='options' key={`${idx}${opt?.value}`} onClick={() => selectHandler({ target: { label: opt.label, value: opt.value } })}>{opt?.label}</span>)

    const dropDownListClasses = `multi-select ${multiple ? "" : "single-select"}`
    const searchInputWidth = values.length ? query.label.length ? query.label.length : 1 : 40
    const searchInputClass = `search-input ${!multiple ? "single-input" : ""} ${searchable ? "" : "no-search"} ${(!searchable && values.length && multiple) ? "no-width" : ""}`
    const searchInputPlaceholder = `${values.length ? "" : "Please Select Something"}`

    const isSearchAble = <input type="text" size={searchInputWidth} value={query.label} className={searchInputClass} placeholder={searchInputPlaceholder} aria-expanded onChange={onSearch} ref={inputFocused} onKeyDown={(e) => pressToRemoveSelection(e)} />

    const optionsForSelection = multiple ? multipleOptionsForSelection.length > 0 ? multipleOptionsForSelection : <span className='no-option'>No Option Left to Select</span> : singularOptionsForSelection

    return (
        <div className='select-container'>
            <div className='selection-output-container' onClick={focusHandler}>
                <input type="checkbox" className='toggle-control' onChange={openList} ref={checkboxRef} />
                {multiple ? multipleSelectedOptions : ""}{isSearchAble}
            </div>

            <div className={dropDownListClasses} ref={checkedRef}>
                <div className="content">
                    {optionsForSelection}
                </div>
            </div>
        </div>
    )
}

export default Select