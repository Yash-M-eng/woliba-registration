import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dev.woliba.io/v1/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 20000,
});

const errorMessages = {
  '-419': 'Invalid OTP. Please check the code and try again.',
  '-420': 'OTP expired. Please request a new code.',
  '-430': 'Unable to send OTP. Please try again.',
  '-431': 'Your OTP session expired. Please verify again.',
  '-102': 'Email already registered.',
  '-500': 'Something went wrong. Please try again.',
};

export const getApiErrorMessage = (error, fallback = 'Something went wrong. Please try again.') => {
  const responseData = error?.response?.data;
  const code = responseData?.code ?? responseData?.error_code;
  const message = responseData?.error || responseData?.message || responseData?.data?.message;

  if (code && errorMessages[String(code)]) {
    return errorMessages[String(code)];
  }

  if (typeof message === 'string') {
    return message;
  }

  if (error?.code === 'ECONNABORTED') {
    return 'Request timed out. Please try again.';
  }

  if (!error?.isAxiosError && error?.message) {
    return error.message;
  }

  if (!error) {
    return 'Unable to connect. Please check your internet connection.';
  }

  return fallback;
};

const ensureSuccess = (response, fallback) => {
  const body = response.data;
  const succeeded = body?.status === true || body?.status === 'success';

  if (!succeeded) {
    throw new Error(body?.error || body?.message || fallback);
  }

  return body.data;
};

export const verifyCompany = async ({ companyName, password }) => {
  const response = await api.post('/verify-by-company-name-and-password', {
    company_name: companyName,
    password,
  });

  return ensureSuccess(response, 'Company verification failed.');
};

export const saveUserDetailsAndSendOtp = async ({ companyId, email, firstName, lastName }) => {
  const response = await api.post('/save-user-details-and-send-otp', {
    company_id: companyId,
    mail: email,
    fname: firstName,
    lname: lastName,
  });

  return ensureSuccess(response, 'Unable to send OTP.');
};

export const verifyRegistrationOtp = async ({ otp, token }) => {
  const response = await api.post('/verify-otp-for-user-registration', {
    otp,
    token,
  });

  return ensureSuccess(response, 'OTP verification failed.');
};

export const sendRegistrationOtp = async ({ email }) => {
  const response = await api.post('/send-otp-for-user-registration', {
    email,
  });

  return ensureSuccess(response, 'Unable to resend OTP.');
};

export const getWellnessInterests = async () => {
  const response = await api.get('/viewWellnessInterest');
  return ensureSuccess(response, 'Unable to load wellness interests.');
};

export const getWellbeingPillars = async (languageId = 1) => {
  const response = await api.get(`/get-wellbeing-pillars/${languageId}`);
  return ensureSuccess(response, 'Unable to load wellbeing pillars.');
};

export const completeUserRegistration = async (payload) => {
  const response = await api.post('/user-registration', payload);
  return ensureSuccess(response, 'Registration failed.');
};
