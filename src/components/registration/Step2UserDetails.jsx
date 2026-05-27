import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormActions from '../forms/FormActions';
import FormField from '../forms/FormField';
import FormCard from '../ui/FormCard';
import { updateOtp, updateUser } from '../../redux/slices/registrationSlice';
import { getApiErrorMessage, saveUserDetailsAndSendOtp } from '../../services/registrationApi';
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import { isEmailValid, isNameValue } from '../../utils/validators';

const Step2UserDetails = ({ onNext }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.registration.user);
  const companyId = useSelector((state) => state.registration.company.companyId);
  const [touched, setTouched] = useState({ firstName: false, lastName: false, email: false });
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ firstName: true, lastName: true, email: true });
    if (!isFormValid) return;

    if (!companyId) {
      const message = 'Please verify your company before continuing.';
      setSubmitError(message);
      showErrorToast(message);
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);

    try {
      const data = await saveUserDetailsAndSendOtp({
        companyId,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });

      dispatch(updateOtp({
        token: data?.token || '',
        value: ['', '', '', '', '', ''],
        verified: false,
      }));
      showSuccessToast(data?.message || 'OTP sent successfully.');
      onNext();
    } catch (error) {
      const message = getApiErrorMessage(error, error.message || 'Unable to send OTP.');
      setSubmitError(message);
      showErrorToast(message);
    } finally {
      setIsSubmitting(false);
    }
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
        {submitError && <p className="-mt-2 mb-3 text-[11px] text-red-500">{submitError}</p>}
        <FormActions
          primaryLabel={isSubmitting ? 'Sending...' : 'Verify email'}
          disabled={!isFormValid || isSubmitting}
        />
      </form>
    </FormCard>
  );
};

export default Step2UserDetails;
