class Utility {
  /**
   * Generates an array of numbers in a specified range
   * @param {number} start - Starting number
   * @param {number} end - Ending number (inclusive)
   * @returns {number[]} Array of numbers in the range
   */
  static range(start, end) {
    return Array.from({length: end - start + 1}, (_, index) => start + index);
  }

  /**
   * Capitalizes the first letter of a string
   * @param {string} str - The string to capitalize
   * @returns {string} Capitalized string
   */
  static capitalize(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Generates a range and applies a lambda function to each element
   * @param {number} start - Starting number
   * @param {number} end - Ending number (inclusive)
   * @param {Function} lambda - Lambda function to apply to each element
   * @returns {Array} Array of transformed values
   */
  static rangeWithLambda(start, end, lambda) {
    return Array.from({length: end - start + 1}, (_, index) => lambda(start + index));
  }
}

export default Utility;
