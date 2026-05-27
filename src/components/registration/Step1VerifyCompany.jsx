import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormActions from '../forms/FormActions';
import FormField from '../forms/FormField';
import FormCard from '../ui/FormCard';
import { updateCompany, updateUser } from '../../redux/slices/registrationSlice';
import { getApiErrorMessage, verifyCompany } from '../../services/registrationApi';
import { showErrorToast } from '../../utils/toast';
import { isCompanyPasswordValid } from '../../utils/validators';

const Step1VerifyCompany = ({ onNext }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.registration.company);
  const [touched, setTouched] = useState({ companyName: false, password: false });
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateCompany({ [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const isFormValid =
    formData.companyName.trim() !== '' && isCompanyPasswordValid(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ companyName: true, password: true });
    if (!isFormValid) return;

    setSubmitError('');
    setIsSubmitting(true);

    try {
      const companies = await verifyCompany({
        companyName: formData.companyName,
        password: formData.password,
      });
      const company = Array.isArray(companies) ? companies[0] : companies;

      if (!company?.id) {
        throw new Error('Company not found. Please verify the company details.');
      }

      dispatch(updateCompany({
        companyId: company.id,
        companyName: company.company_name || formData.companyName,
        details: company,
      }));
      dispatch(updateUser({ companyName: company.company_name || formData.companyName }));
      onNext();
    } catch (error) {
      const message = getApiErrorMessage(error, error.message || 'Company verification failed.');
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
          id="companyName"
          label="Company Name"
          name="companyName"
          placeholder="Enter Company Name"
          type="text"
          value={formData.companyName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.companyName && !formData.companyName.trim() ? 'Company Name is required' : ''}
        />
        <FormField
          id="password"
          label="Company Password"
          name="password"
          placeholder="Enter Company Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && !isCompanyPasswordValid(formData.password) ? 'Min 8 characters, 1 uppercase letter, 1 number.' : ''}
        />
        {submitError && <p className="-mt-2 mb-3 text-[11px] text-red-500">{submitError}</p>}
        <FormActions disabled={!isFormValid || isSubmitting} primaryLabel={isSubmitting ? 'Verifying...' : 'Next'} />
      </form>
    </FormCard>
  );
};

export default Step1VerifyCompany;
