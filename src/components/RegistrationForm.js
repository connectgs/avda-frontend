import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MembershipTierSelector from './MembershipTierSelector';

// Correct backend connection
const BACKEND_URL = process.env.REACT_APP_API_URL;
const API = `${BACKEND_URL}/api`;

const countryCodes = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
];

const indianStates = [
  'Andhra Pradesh',
  'Telangana',
  'Karnataka',
  'Tamil Nadu',
  'Kerala',
  'Maharashtra',
];

const countries = [
  'India',
  'USA',
  'UK',
  'Australia',
  'Other',
];

const registeredCouncils = [
  'Andhra Pradesh',
  'Telangana',
  'Karnataka',
  'Tamil Nadu',
  'Delhi',
  'Overseas',
];

const RegistrationForm = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const googleUser = location.state?.user || null;

  const photoInputRef = useRef(null);
  const certificateInputRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({

    title: 'Dr',

    first_name: googleUser?.name?.split(' ')[0] || '',

    surname: googleUser?.name?.split(' ').slice(1).join(' ') || '',

    gender: 'Male',

    date_of_birth: '',

    photo_url: googleUser?.picture || '',

    photo_file: null,

    is_arya_vysya: null,

    gotram: '',

    wants_to_be_moderator: false,

    medical_stream: 'MBBS',

    current_position: '',

    degrees_completed: [],

    council_registration_number: '',

    registered_council: '',

    certificate_files: [],

    email: googleUser?.email || '',

    country_code: '+91',

    mobile_number: '',

    other_phone_numbers: '',

    state: '',

    city: '',

    pincode: '',

    country: 'India',

    country_other: '',

    home_address: '',

    office_clinic_hospital_address: '',

    areas_of_interest: '',

    specialty: '',

    sub_specialty: '',

    years_of_experience: '',

    practice_clinic_name: '',

    display_phone_publicly: true,

    display_photo_publicly: true,

    consent_downloadable_directory: false,

    terms_accepted: false,

    membership_tier: 'Basic',
  });

  const handleInputChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

  };

  const validateStep = (step) => {

    const newErrors = {};

    if (step === 1) {

      if (!formData.first_name) newErrors.first_name = 'Required';

      if (!formData.surname) newErrors.surname = 'Required';

      if (!formData.date_of_birth) newErrors.date_of_birth = 'Required';

      if (!formData.gotram) newErrors.gotram = 'Required';

    }

    if (step === 3) {

      if (!formData.mobile_number) newErrors.mobile_number = 'Required';

      if (!formData.city) newErrors.city = 'Required';

    }

    if (step === 6) {

      if (!formData.terms_accepted)
        newErrors.terms_accepted = 'Accept terms';

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  const nextStep = () => {

    if (validateStep(currentStep))
      setCurrentStep(prev => prev + 1);

  };

  const prevStep = () => {

    setCurrentStep(prev => prev - 1);

  };

  const handleSubmit = async () => {

    if (!validateStep(6)) return;

    setLoading(true);

    try {

      const payload = {

        ...formData,

        mobile_number:
          formData.country_code + ' ' + formData.mobile_number,

        country:
          formData.country === 'Other'
            ? formData.country_other
            : formData.country,

        years_of_experience:
          formData.years_of_experience
            ? parseInt(formData.years_of_experience)
            : null,

        is_vysya: formData.is_arya_vysya,

        office_address:
          formData.office_clinic_hospital_address,

      };

      delete payload.country_code;
      delete payload.country_other;
      delete payload.is_arya_vysya;
      delete payload.photo_file;
      delete payload.certificate_files;
      delete payload.office_clinic_hospital_address;

      await axios.post(
        `${API}/doctors/register`,
        payload
      );

      alert(
        'Registration successful. Await admin approval.'
      );

      navigate('/');

    }
    catch (error) {

      alert(
        error.response?.data?.detail
        || error.message
      );

    }
    finally {

      setLoading(false);

    }

  };

  return (

    <div className="max-w-3xl mx-auto">

      <h2 className="text-2xl text-white mb-4">

        Registration

      </h2>

      <input
        name="first_name"
        value={formData.first_name}
        onChange={handleInputChange}
        placeholder="First name"
      />

      <input
        name="surname"
        value={formData.surname}
        onChange={handleInputChange}
        placeholder="Surname"
      />

      <input
        name="mobile_number"
        value={formData.mobile_number}
        onChange={handleInputChange}
        placeholder="Mobile"
      />

      <button onClick={handleSubmit} disabled={loading}>

        {loading ? 'Submitting...' : 'Submit'}

      </button>

    </div>

  );

};

export default RegistrationForm;
