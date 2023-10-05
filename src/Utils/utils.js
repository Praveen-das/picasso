export const joinStrings = (...values) => values.reduce((x, y) => x + ' ' + y)
export function createRoomId(...array) {
  return array.sort().toString()
}
export const calculateDiscount = (price, discount, qty = 1) => {
  return ((price * discount) / 100) * qty
}
export function formatObject(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return {};
  }

  const formattedObj = {};

  for (const key in obj) {
    const value = obj[key];

    if (value !== null && value !== undefined && value !== '') {
      if (typeof value !== 'object') {
        // const nestedObj = formatObject(value);

        // if (Object.keys(nestedObj).length > 0) {
        //   formattedObj[key] = nestedObj;
        // }
        formattedObj[key] = value;
      }
    }
  }

  return formattedObj;
}
export function findChangedValues(oldObj, newObj) {
  const changedValues = {};

  for (let key in newObj) {
    if (newObj.hasOwnProperty(key)) {
      let newValue = newObj[key]
      let oldValue = oldObj[key]
      if (oldObj.hasOwnProperty(key) && JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        changedValues[key] = newValue
      }
    }
  }

  return changedValues;
}

