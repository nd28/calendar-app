import Utility from "./Utility.js";

class DataManager {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.data = new Map();
    this.loadFromStorage();
  }

// Abstact methods (to be implemented by subclasses)
  ab() {
    throw new Error("Method 'loadFromStorage()' must be implemented.");
  }

  save() {
    const dataToSave = Object.fromEntries(this.data);
    localStorage.setItem(this.storageKey, JSON.stringify(dataToSave));
  }

  loadFromStorage() {
    const savedData = localStorage.getItem(this.storageKey);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.data = new Map(Object.entries(parsedData));
    }
  }

  getData(date) {
    const dateKey = Utility.formatDate(date);
    return this.data.get(dateKey) || null;
  }

  setData(date, value) {
    const dateKey = Utility.formatDate(date);
    this.data.set(dateKey, value);
    this.save();
  }
}

export default DataManager;
