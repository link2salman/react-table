export const rowSelectionHandler = (alreadySelectedKeys: string[], newSelectedKey: string | string[]) => {
  if (Array.isArray(newSelectedKey)) {
    if (alreadySelectedKeys.length == newSelectedKey.length) return []
    return newSelectedKey
  }
  if (alreadySelectedKeys.includes(newSelectedKey)) return alreadySelectedKeys.filter((item) => item != newSelectedKey)
  return [...alreadySelectedKeys, newSelectedKey]
}

export const filterData = (data: any[], key: string, value: string) => {
  if (!key) return data
  return data.filter((item) => item[key].includes(value))
}

let ordeStore: Record<string, number> = {}

export const orderMapper = (sortKey: string) => {
  if (ordeStore[sortKey]) {
    if (ordeStore[sortKey] === 1) ordeStore[sortKey] = 2
    else if (ordeStore[sortKey] === 2) ordeStore[sortKey] = 0
  } else {
    ordeStore[sortKey] = 1
  }
  const orderStore: Record<number, string | null> = {
    0: null,
    1: 'desc',
    2: 'asc',
  }
  const order = orderStore[ordeStore[sortKey]]
  return order
}


export const classNames = (...args: any) => {
  const classesObject = new Map();

  args.forEach((className: string | Record<string, boolean>) => {
    if (typeof className === "string") !classesObject.has(className) && classesObject.set(className, true);

    if (typeof className === "object")
      Object.entries(className).forEach(([key, value]) => {
        if (!value) return;
        classesObject.set(key, true);
      });
  });

  const classes: string[] = [];

  classesObject.forEach((_value, key) => classes.push(key));

  return classes.join(" ");
};