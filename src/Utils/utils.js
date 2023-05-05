export const joinStrings = (...values) => values.reduce((x, y) => x + ' ' + y)
export function createRoomId(...array) {
  return array.sort().toString()
}

