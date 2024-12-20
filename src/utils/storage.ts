export const storage = {
  async get<T>(key: string): Promise<T | null> {
    return new Promise((resolve) => {
      chrome.storage.local.get([key], (result) => {
        resolve(result[key] || null);
      });
    });
  },

  async set(key: string, value: any): Promise<void> {
    return chrome.storage.local.set({ [key]: value });
  },

  async remove(key: string): Promise<void> {
    return chrome.storage.local.remove(key);
  },
};
