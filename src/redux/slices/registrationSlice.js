import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  company: {
    companyId: null,
    companyName: '',
    password: '',
    details: null,
  },
  user: {
    firstName: '',
    lastName: '',
    email: '',
    companyName: 'Woliba',
  },
  otp: {
    value: ['', '', '', '', '', ''],
    token: '',
    verified: false,
  },
  profile: {
    password: '',
    confirmPassword: '',
    dob: '',
    phone: '',
    workAnniversary: '',
    termsAccepted: false,
  },
  interests: {
    selected: [],
    options: [],
    openCategory: 'Individual Sports',
  },
  pillars: {
    selected: [],
    options: [],
  },
  result: {
    token: '',
    user: null,
  },
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    updateCompany: (state, action) => {
      state.company = { ...state.company, ...action.payload };
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateOtp: (state, action) => {
      state.otp = { ...state.otp, ...action.payload };
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    updateInterests: (state, action) => {
      state.interests = { ...state.interests, ...action.payload };
    },
    updatePillars: (state, action) => {
      state.pillars = { ...state.pillars, ...action.payload };
    },
    updateRegistrationResult: (state, action) => {
      state.result = { ...state.result, ...action.payload };
    },
  },
});

export const {
  updateCompany,
  updateUser,
  updateOtp,
  updateProfile,
  updateInterests,
  updatePillars,
  updateRegistrationResult,
} = registrationSlice.actions;

export default registrationSlice.reducer;
