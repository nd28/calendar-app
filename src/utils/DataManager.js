// src/utils/DataManager.js
import DateUtility from '@/utils/DateUtility.js';

class DataManager {
  constructor(storageKey) {
    this.storageKey = storageKey;
    this.data = new Map();
    this.loadFromStorage();
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
    const dateKey = DateUtility.formatDate(date);
    return this.data.get(dateKey) || null;
  }

  setData(date, value) {
    const dateKey = DateUtility.formatDate(date);
    this.data.set(dateKey, value);
    this.save();
  }

  getAll() {
    return Object.fromEntries(this.data);
  }

  clear() {
    this.data.clear();
    this.save();
  }

  /**
   * Merges new data into existing data, preserving existing entries unless overwritten
   * @param {Object} newData - Data to merge (key-value pairs)
   */
  mergeData(newData) {
    Object.entries(newData).forEach(([key, value]) => {
      if (DateUtility.isValidDate(key) && this.validateData(value)) {
        // Validate key as date
        this.data.set(key, value);
      }
    });
    this.save();
  }

  /**
   * Replaces all existing data with new data
   * @param {Object} newData - Data to replace with (key-value pairs)
   */
  replaceData(newData) {
    this.data.clear();
    Object.entries(newData).forEach(([key, value]) => {
      if (DateUtility.isValidDate(key) && this.validateData(value)) {
        // Validate key as date
        this.data.set(key, value);
      }
    });
    this.save();
  }

  // Abstract method - must be overridden by subclasses
  validateData(value) {
    throw new Error('Subclasses must implement validateData');
  }
}

export default DataManager;
