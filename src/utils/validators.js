export const isCompanyPasswordValid = (password) =>
  password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);

export const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isNameValue = (value) => /^[a-zA-Z\s]*$/.test(value);

export const isPhoneValid = (phone) => /^\d{7,15}$/.test(phone);
