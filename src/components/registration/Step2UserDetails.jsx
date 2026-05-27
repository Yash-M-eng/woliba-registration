import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormActions from '../forms/FormActions';
import FormField from '../forms/FormField';
import FormCard from '../ui/FormCard';
import { updateOtp, updateUser } from '../../redux/slices/registrationSlice';
import { isEmailValid, isNameValue } from '../../utils/validators';

const Step2UserDetails = ({ onNext }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.registration.user);
  const [touched, setTouched] = useState({ firstName: false, lastName: false, email: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === 'firstName' || name === 'lastName') && !isNameValue(value)) {
      return;
    }
    dispatch(updateUser({ [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const isFormValid =
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    isEmailValid(formData.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ firstName: true, lastName: true, email: true });
    if (!isFormValid) return;
    dispatch(updateOtp({ token: 'local-registration-token' }));
    onNext();
  };

  return (
    <FormCard title="Registration">
      <form onSubmit={handleSubmit}>
        <FormField
          id="email"
          label="Email ID"
          name="email"
          placeholder="Enter email id"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && !isEmailValid(formData.email) ? 'Please enter a valid email address.' : ''}
        />
        <FormField
          id="firstName"
          label="First name"
          name="firstName"
          placeholder="Enter First name"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName && !formData.firstName.trim() ? 'First name is required.' : ''}
        />
        <FormField
          id="lastName"
          label="Last name"
          name="lastName"
          placeholder="Enter Last name"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName && !formData.lastName.trim() ? 'Last name is required.' : ''}
        />
        <FormField
          id="companyName"
          label="Company name"
          name="companyName"
          value={formData.companyName}
          disabled
          className="cursor-not-allowed bg-gray-50 text-gray-400"
        />
        <FormActions primaryLabel="Verify email" disabled={!isFormValid} />
      </form>
    </FormCard>
  );
};

export default Step2UserDetails;
