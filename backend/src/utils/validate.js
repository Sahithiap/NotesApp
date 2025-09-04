// 📂 backend/utils/validate.js

/**
 * Validate if string is a valid email
 * @param {string} email
 * @returns {boolean}
 */
export const isEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validate password strength
 * - Minimum 6 characters
 * - At least 1 letter and 1 number
 * @param {string} password
 * @returns {boolean}
 */
export const isStrongPassword = (password) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return re.test(password);
};

/**
 * Validate if string is non-empty
 * @param {string} str
 * @returns {boolean}
 */
export const isNonEmpty = (str) => {
  return str && str.trim().length > 0;
};
