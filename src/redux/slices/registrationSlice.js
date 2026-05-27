import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  company: {
    companyId: null,
    companyName: '',
    password: '',
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
    openCategory: 'Individual Sports',
  },
  pillars: {
    selected: [],
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
  },
});

export const {
  updateCompany,
  updateUser,
  updateOtp,
  updateProfile,
  updateInterests,
  updatePillars,
} = registrationSlice.actions;

export default registrationSlice.reducer;
