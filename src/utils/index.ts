export const fetchStorageItem = <T>(itemKey: string): Promise<T | null> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([itemKey], (result) => {
      if (result[itemKey]) {
        resolve(result[itemKey] as T);
      } else {
        resolve(null);
      }
    });
  });
};

export const saveToStorage = (itemKey: string, itemValue: string) => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [itemKey]: itemValue }, () => {
      resolve(true);
    });
  });
};

export const deleteFromSTorage = (itemKey: string) => {
  return new Promise((resolve) => {
    chrome.storage.local.remove(itemKey, () => {
      resolve(true);
    });
  });
};

export function isOneDayOld(timestamp: number): boolean {
  const now = new Date();
  const targetDate = new Date(timestamp);

  const diff = now.getTime() - targetDate.getTime();
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  return Math.abs(diff - millisecondsPerDay) < 1000 * 60 * 60;
}
