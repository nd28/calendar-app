// src/utils/DateUtility.js
class DateUtility {
  /**
   * Formats a date to YYYY-MM-DD
   * @param {Date} date - The date to format
   * @returns {string} Formatted date string
   */
  static formatDate(date) {
    if (!(date instanceof Date) || isNaN(date)) {
      throw new Error('Invalid date');
    }
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  /**
   * Parses a YYYY-MM-DD string into a Date object
   * @param {string} dateStr - The date string to parse
   * @returns {Date} Parsed Date object
   */
  static parseDate(dateStr) {
    const [year, month, day] = dateStr.split('-').map(Number);
    if (!year || !month || !day || month < 1 || month > 12 || day < 1 || day > 31) {
      throw new Error(`Invalid date string: ${dateStr}`);
    }
    const date = new Date(year, month - 1, day); // Month is 0-based
    if (isNaN(date)) {
      throw new Error(`Invalid date string: ${dateStr}`);
    }
    return date;
  }

  /**
   * Validates if a string is a valid YYYY-MM-DD date
   * @param {string} dateStr - The date string to validate
   * @returns {boolean} True if valid, false otherwise
   */
  static isValidDate(dateStr) {
    try {
      this.parseDate(dateStr);
      return true;
    } catch {
      return false;
    }
  }
}

export default DateUtility;
