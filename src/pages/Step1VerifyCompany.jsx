import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormActions from '../components/forms/FormActions';
import FormField from '../components/forms/FormField';
import FormCard from '../components/ui/FormCard';
import { updateCompany, updateUser } from '../redux/slices/registrationSlice';
import { isCompanyPasswordValid } from '../utils/validators';

const Step1VerifyCompany = ({ onNext }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.registration.company);
  const [touched, setTouched] = useState({ companyName: false, password: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateCompany({ [name]: value }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  const isFormValid =
    formData.companyName.trim() !== '' && isCompanyPasswordValid(formData.password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ companyName: true, password: true });
    if (!isFormValid) return;
    dispatch(updateCompany({ companyId: 1 }));
    dispatch(updateUser({ companyName: formData.companyName }));
    onNext();
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
        <FormActions disabled={!isFormValid} />
      </form>
    </FormCard>
  );
};

export default Step1VerifyCompany;
