export const rowSelectionHandler = (alreadySelectedKeys: string[], newSelectedKey: string | string[]) => {
    if (Array.isArray(newSelectedKey)) {
        if (alreadySelectedKeys.length == newSelectedKey.length) return []
        return newSelectedKey
    }
    if (alreadySelectedKeys.includes(newSelectedKey)) return alreadySelectedKeys.filter(item => item != newSelectedKey)
    return [...alreadySelectedKeys, newSelectedKey]
}