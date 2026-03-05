export type WithNull<T> = {
  [K in keyof T]: T[K] | null;
};

export const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('LocalStorage set failed:', error);
  }
}

export const getItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('LocalStorage get failed:', error);
    return null;
  }
}

export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('LocalStorage remove failed:', error);
  }
}
