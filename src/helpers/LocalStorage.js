export function setLocalStorage(token, parameter) {
  localStorage.setItem(token, JSON.stringify(parameter));
}

export default setLocalStorage;
