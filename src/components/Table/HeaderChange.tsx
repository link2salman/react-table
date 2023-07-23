import Input from 'Components/Input'

import { HeaderChangeTypes } from './tableProps'
import Select from 'Components/Select'

const HeaderChange = ({ header, onHeadChange, dataKey }: HeaderChangeTypes) => {
  const { title, filterType, ...rest } = header

  const fields = () => {
    switch (filterType) {
      case 'input':
        return <Input placeholder="Search" onChange={(e) => onHeadChange && onHeadChange(dataKey, e)} {...rest} />
      case 'select':
        return (
          <Select
            placeholder="Search"
            setValues={(value) => onHeadChange && onHeadChange(dataKey, value as string)}
            Options={rest.Options ?? []}
            values={rest.values ?? []}
            {...rest}
          />
        )
      default:
        return ''
    }
  }

  return (
    <div className="header-component">
      <div className="header-component-title">{title as string}</div>
      <div className="header-component-component">{fields()}</div>
    </div>
  )
}

export default HeaderChange
