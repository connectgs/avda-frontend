import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MembershipTierSelector from './MembershipTierSelector';

const BACKEND_URL = process.env.REACT_APP_API_URL;
const API = `${BACKEND_URL}/api`;

// Country codes data
const countryCodes = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'USA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+968', country: 'Oman', flag: '🇴🇲' },
  { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
];

// Indian states list
const indianStates = [
  'Andhra Pradesh',
  'Telangana',
  'Karnataka',
  'Tamil Nadu',
  'Kerala',
  'Maharashtra',
  'Gujarat',
  'Rajasthan',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Bihar',
  'West Bengal',
  'Odisha',
  'Punjab',
  'Haryana',
  'Himachal Pradesh',
  'Uttarakhand',
  'Jharkhand',
  'Chhattisgarh',
  'Assam',
  'Goa',
  'Tripura',
  'Meghalaya',
  'Manipur',
  'Nagaland',
  'Arunachal Pradesh',
  'Mizoram',
  'Sikkim',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Puducherry',
  'Chandigarh',
  'Andaman and Nicobar Islands',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Lakshadweep',
];

// Countries list
const countries = [
  'India',
  'USA',
  'UK',
  'Australia',
  'New Zealand',
  'UAE',
  'Saudi Arabia',
  'Qatar',
  'Oman',
  'Bahrain',
  'Kuwait',
  'Singapore',
  'Malaysia',
  'Germany',
  'France',
  'Italy',
  'Canada',
  'Japan',
  'South Korea',
  'South Africa',
  'Other',
];

// Registered Council dropdown options
const registeredCouncils = [
  'Andhra Pradesh',
  'Telangana',
  'Karnataka',
  'Tamil Nadu',
  'Kerala',
  'Maharashtra',
  'Gujarat',
  'Rajasthan',
  'Uttar Pradesh',
  'Madhya Pradesh',
  'Bihar',
  'West Bengal',
  'Odisha',
  'Punjab',
  'Haryana',
  'Himachal Pradesh',
  'Uttarakhand',
  'Jharkhand',
  'Chhattisgarh',
  'Assam',
  'Goa',
  'Delhi',
  'Other Indian States',
  'Overseas',
];

const RegistrationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const photoInputRef = useRef(null);
  const certificateInputRef = useRef(null);
  
  // Get user data from Google login
  const googleUser = location.state?.user || null;
  
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
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
    
    // Step 2: Medical Stream & Credentials
    medical_stream: 'MBBS',
    current_position: '',
    degrees_completed: [],
    council_registration_number: '',
    registered_council: '',
    certificate_files: [],
    
    // Step 3: Contact & Location
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
    
    // Step 4: Professional Details
    attached_to_teaching_institute: false,
    teaching_institute_details: '',
    areas_of_interest: '',
    specialty: '',
    sub_specialty: '',
    years_of_experience: '',
    practice_clinic_name: '',
    
    // Step 5: Optional Information
    ancestral_place: '',
    ug_year: '',
    ug_institute: '',
    pg_year: '',
    pg_institute: '',
    associations: '',
    spouse_name: '',
    spouse_profession: '',
    children_details: '',
    hobbies: '',
    post_graduation_level: '',
    
    // Step 6: Privacy & Consent
    display_phone_publicly: true,
    display_photo_publicly: true,
    consent_downloadable_directory: false,
    terms_accepted: false,
    
    // Membership Tier
    membership_tier: 'Basic',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const streamDegrees = {
    'MBBS': ['MBBS', 'MD/DNB', 'MS/DNB', 'MCh/DNB Super-Speciality', 'DM/DNB Super-Speciality', 'Diploma', 'PhD', 'Fellowship'],
    'Dental': ['BDS', 'MDS'],
    'Ayurveda': ['BAMS', 'MD', 'MS'],
    'Homeo': ['BHMS', 'MD (Hom)'],
    'Veterinary': ['BVSC', 'MVSC', 'PhD']
  };

  const councilNames = {
    'MBBS': 'Medical Council Registration Number',
    'Dental': 'Dental Council of India Registration Number',
    'Ayurveda': 'Central Council for Indian Medicine Registration Number',
    'Homeo': 'Central Council for Research in Homoeopathy Registration Number',
    'Veterinary': 'Veterinary Council of India Registration Number'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDegreeToggle = (degree) => {
    setFormData(prev => ({
      ...prev,
      degrees_completed: prev.degrees_completed.includes(degree)
        ? prev.degrees_completed.filter(d => d !== degree)
        : [...prev.degrees_completed, degree]
    }));
  };

  // Handle file upload for photos
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo_file: file,
        photo_url: URL.createObjectURL(file)
      }));
    }
  };

  // Handle certificate file upload
  const handleCertificateUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      certificate_files: [...prev.certificate_files, ...files]
    }));
  };

  // Remove certificate file
  const removeCertificate = (index) => {
    setFormData(prev => ({
      ...prev,
      certificate_files: prev.certificate_files.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
      if (!formData.surname.trim()) newErrors.surname = 'Surname is required';
      if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';
      if (formData.is_arya_vysya === null) newErrors.is_arya_vysya = 'Please select if you are an Arya Vysya';
      if (!formData.gotram.trim()) newErrors.gotram = 'Gotram is required';
    }
    
    if (step === 2) {
      if (!formData.current_position.trim()) newErrors.current_position = 'Current position is required';
      if (formData.degrees_completed.length === 0) newErrors.degrees_completed = 'Select at least one degree';
      if (!formData.council_registration_number.trim()) newErrors.council_registration_number = 'Council registration number is required';
      if (!formData.registered_council) newErrors.registered_council = 'Registered council is required';
    }
    
    if (step === 3) {
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.mobile_number.trim()) newErrors.mobile_number = 'Mobile number is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.city.trim()) newErrors.city = 'City/Town is required';
      if (!formData.pincode.trim()) newErrors.pincode = 'Pincode/Zipcode is required';
      if (!formData.country) newErrors.country = 'Country is required';
      if (formData.country === 'Other' && !formData.country_other.trim()) newErrors.country_other = 'Please specify country';
    }
    
    if (step === 4) {
      if (!formData.areas_of_interest.trim()) newErrors.areas_of_interest = 'Areas of interest is required';
    }
    
    if (step === 6) {
      if (!formData.terms_accepted) newErrors.terms_accepted = 'You must accept terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
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
        mobile_number: formData.country_code + ' ' + formData.mobile_number,
        country: formData.country === 'Other' ? formData.country_other : formData.country,
        years_of_experience: formData.years_of_experience ? parseInt(formData.years_of_experience) : null,
        is_vysya: formData.is_arya_vysya,
        office_address: formData.office_clinic_hospital_address,
      };
      
      // Remove temporary fields
      delete payload.country_code;
      delete payload.country_other;
      delete payload.is_arya_vysya;
      delete payload.photo_file;
      delete payload.certificate_files;
      delete payload.office_clinic_hospital_address;
      
      const response = await axios.post(`${API}/doctors/register`, payload);
      alert('Registration successful! Your profile is pending admin approval.');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed: ' + (error.response?.data?.detail || error.message));
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-4">Step 1: Basic Information</h3>
      
      {googleUser && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
          <p className="text-green-300 text-sm">
            ✓ Signed in with Google as <strong>{googleUser.email}</strong>
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Some fields are pre-filled from your Google account
          </p>
        </div>
      )}

      {/* Email - First field for autofill */}
      <div>
        <label className="block text-gray-300 mb-2">Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          autoComplete="email"
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="your.email@example.com"
          data-testid="email-input"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        {googleUser && formData.email && (
          <p className="text-green-400 text-xs mt-1">✓ Pre-filled from Google</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 mb-2">Title / Prefix *</label>
          <select
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%239ca3af%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
            data-testid="title-select"
          >
            <option value="Dr">Dr</option>
            <option value="Prof">Prof</option>
            <option value="Mr">Mr</option>
            <option value="Ms">Ms</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Gender *</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%239ca3af%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
            data-testid="gender-select"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Date of Birth *</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleInputChange}
            autoComplete="bday"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
            data-testid="dob-input"
          />
          {errors.date_of_birth && <p className="text-red-400 text-sm mt-1">{errors.date_of_birth}</p>}
        </div>

        <div>
          <label className="block text-gray-300 mb-2">First Name (without title) *</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            autoComplete="given-name"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
            placeholder="e.g., Krishna Rao"
            data-testid="first-name-input"
          />
          {errors.first_name && <p className="text-red-400 text-sm mt-1">{errors.first_name}</p>}
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Surname / Family Name *</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            autoComplete="family-name"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
            placeholder="Example: GV or Garlapati"
            data-testid="surname-input"
          />
          {errors.surname && <p className="text-red-400 text-sm mt-1">{errors.surname}</p>}
        </div>
      </div>

      {/* Are you an Arya Vysya? - Before Gotram */}
      <div>
        <label className="block text-gray-300 mb-2">Are you an Arya Vysya? *</label>
        <select
          name="is_arya_vysya"
          value={formData.is_arya_vysya === null ? '' : formData.is_arya_vysya.toString()}
          onChange={(e) => setFormData(prev => ({ ...prev, is_arya_vysya: e.target.value === '' ? null : e.target.value === 'true' }))}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%239ca3af%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
          data-testid="arya-vysya-select"
        >
          <option value="">Select...</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        {errors.is_arya_vysya && <p className="text-red-400 text-sm mt-1">{errors.is_arya_vysya}</p>}
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Gotram / Gotra *</label>
        <input
          type="text"
          name="gotram"
          value={formData.gotram}
          onChange={handleInputChange}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
          placeholder="Enter your Gotram / Gotra"
          data-testid="gotram-input"
        />
        {errors.gotram && <p className="text-red-400 text-sm mt-1">{errors.gotram}</p>}
        <p className="text-gray-400 text-sm mt-1">Required for Arya Vysya verification</p>
      </div>

      {/* Profile Photo Upload */}
      <div>
        <label className="block text-gray-300 mb-2">Profile Photo (optional)</label>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <input
              type="file"
              ref={photoInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden"
              data-testid="photo-upload-input"
            />
            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              className="w-full bg-white/10 border border-white/20 border-dashed rounded-lg px-4 py-6 text-gray-300 hover:bg-white/15 hover:border-blue-400 transition flex flex-col items-center justify-center gap-2"
              data-testid="photo-upload-btn"
            >
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Click to upload profile photo</span>
              <span className="text-xs text-gray-500">Clear passport photo or professional headshot</span>
            </button>
          </div>
          {formData.photo_url && (
            <div className="flex-shrink-0">
              <img 
                src={formData.photo_url} 
                alt="Preview" 
                className="h-24 w-24 rounded-full border-2 border-white/20 object-cover"
                data-testid="photo-preview"
              />
              {googleUser && !formData.photo_file && (
                <p className="text-green-400 text-xs mt-1 text-center">From Google</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Moderator Option */}
      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="wants_to_be_moderator"
            checked={formData.wants_to_be_moderator}
            onChange={handleInputChange}
            className="w-5 h-5 mt-1"
            data-testid="moderator-checkbox"
          />
          <span className="text-gray-300">
            <strong>I would like to be a Moderator</strong><br/>
            <small className="text-gray-400">Moderators help manage regional chapters and assist with member approvals. Subject to admin approval.</small>
          </span>
        </label>
      </div>
    </div>
  );

  const renderStep2 = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white mb-4">Step 2: Medical Stream & Credentials</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Medical Stream *</label>
            <select
              name="medical_stream"
              value={formData.medical_stream}
              onChange={handleInputChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%239ca3af%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
              data-testid="medical-stream-select"
            >
              <option value="MBBS">MBBS Stream</option>
              <option value="Dental">Dental Stream</option>
              <option value="Ayurveda">Ayurveda Stream</option>
              <option value="Homeo">Homeopathy Stream</option>
              <option value="Veterinary">Veterinary Stream</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Current Position *</label>
            <input
              type="text"
              name="current_position"
              value={formData.current_position}
              onChange={handleInputChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
              placeholder="e.g., Senior Consultant, Professor, General Practitioner"
              data-testid="current-position-input"
            />
            {errors.current_position && <p className="text-red-400 text-sm mt-1">{errors.current_position}</p>}
          </div>
        </div>

      <div>
        <label className="block text-gray-300 mb-2">Degrees Completed * (Select all that apply)</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {streamDegrees[formData.medical_stream].map(degree => (
            <label key={degree} className="flex items-center space-x-2 text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.degrees_completed.includes(degree)}
                onChange={() => handleDegreeToggle(degree)}
                className="w-4 h-4"
                data-testid={`degree-${degree}`}
              />
              <span>{degree}</span>
            </label>
          ))}
        </div>
        {errors.degrees_completed && <p className="text-red-400 text-sm mt-1">{errors.degrees_completed}</p>}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <p className="text-blue-300 font-semibold mb-2">
          {councilNames[formData.medical_stream]} *
        </p>
        <input
          type="text"
          name="council_registration_number"
          value={formData.council_registration_number}
          onChange={handleInputChange}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
          placeholder="Enter your registration number"
          data-testid="council-reg-number-input"
        />
        {errors.council_registration_number && <p className="text-red-400 text-sm mt-1">{errors.council_registration_number}</p>}
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Registered Council (State/Location) *</label>
        <select
          name="registered_council"
          value={formData.registered_council}
          onChange={handleInputChange}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%239ca3af%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
          data-testid="registered-council-select"
        >
          <option value="">Select Council...</option>
          {registeredCouncils.map(council => (
            <option key={council} value={council}>{council}</option>
          ))}
        </select>
        {errors.registered_council && <p className="text-red-400 text-sm mt-1">{errors.registered_council}</p>}
      </div>

      {/* Certificate Upload */}
      <div>
        <label className="block text-gray-300 mb-2">Upload Certificates (optional)</label>
        <input
          type="file"
          ref={certificateInputRef}
          onChange={handleCertificateUpload}
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          className="hidden"
          data-testid="certificate-upload-input"
        />
        <button
          type="button"
          onClick={() => certificateInputRef.current?.click()}
          className="w-full bg-white/10 border border-white/20 border-dashed rounded-lg px-4 py-4 text-gray-300 hover:bg-white/15 hover:border-blue-400 transition flex items-center justify-center gap-2"
          data-testid="certificate-upload-btn"
        >
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span>Click to upload certificates (PDF, JPG, PNG)</span>
        </button>
        {formData.certificate_files.length > 0 && (
          <div className="mt-3 space-y-2">
            {formData.certificate_files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                <span className="text-gray-300 text-sm truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeCertificate(index)}
                  className="text-red-400 hover:text-red-300 ml-2"
                  data-testid={`remove-cert-${index}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-4">Step 3: Contact & Location</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* State - First */}
        <div>
          <label className="block text-gray-300 mb-2">State / Province *</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%239ca3af%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
            data-testid="state-select"
          >
            <option value="">Select State...</option>
            {indianStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
            <option value="Overseas">Overseas</option>
          </select>
          {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
        </div>

        {/* City/Town - Second */}
        <div>
          <label className="block text-gray-300 mb-2">City / Town *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            autoComplete="address-level2"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
            placeholder="e.g., Guntur"
            data-testid="city-input"
          />
          {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
        </div>

        {/* Pincode/Zipcode - After Town */}
        <div>
          <label className="block text-gray-300 mb-2">Pincode / Zipcode *</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            autoComplete="postal-code"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
            placeholder="e.g., 522001"
            data-testid="pincode-input"
          />
          {errors.pincode && <p className="text-red-400 text-sm mt-1">{errors.pincode}</p>}
        </div>

        {/* Country Dropdown */}
        <div>
          <label className="block text-gray-300 mb-2">Country *</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%239ca3af%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
            data-testid="country-select"
          >
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country}</p>}
        </div>

        {/* Other Country Text Field */}
        {formData.country === 'Other' && (
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-2">Please specify country *</label>
            <input
              type="text"
              name="country_other"
              value={formData.country_other}
              onChange={handleInputChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
              placeholder="Enter country name"
              data-testid="country-other-input"
            />
            {errors.country_other && <p className="text-red-400 text-sm mt-1">{errors.country_other}</p>}
          </div>
        )}

        {/* Mobile Number with Country Code */}
        <div className="md:col-span-2">
          <label className="block text-gray-300 mb-2">Mobile Number (WhatsApp preferred) *</label>
          <div className="flex gap-2">
            <select
              name="country_code"
              value={formData.country_code}
              onChange={handleInputChange}
              className="w-32 bg-white/10 border border-white/20 rounded-lg px-2 py-3 text-white appearance-none cursor-pointer text-sm"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%239ca3af%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em 1.25em' }}
              data-testid="country-code-select"
            >
              {countryCodes.map(({ code, country, flag }) => (
                <option key={code} value={code}>{flag} {code}</option>
              ))}
            </select>
            <input
              type="tel"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleInputChange}
              autoComplete="tel-national"
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
              placeholder="9876543210"
              data-testid="mobile-number-input"
            />
          </div>
          {errors.mobile_number && <p className="text-red-400 text-sm mt-1">{errors.mobile_number}</p>}
        </div>

        {/* Other Phone Numbers */}
        <div className="md:col-span-2">
          <label className="block text-gray-300 mb-2">Other Phone Numbers (optional)</label>
          <input
            type="text"
            name="other_phone_numbers"
            value={formData.other_phone_numbers}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
            placeholder="Add 1 or more numbers, separated by comma"
            data-testid="other-phones-input"
          />
          <p className="text-gray-400 text-sm mt-1">You can add multiple numbers separated by commas</p>
        </div>
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Home Address</label>
        <textarea
          name="home_address"
          value={formData.home_address}
          onChange={handleInputChange}
          autoComplete="street-address"
          rows="2"
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
          placeholder="Your residential address"
          data-testid="home-address-input"
        />
      </div>

      {/* Single combined Office/Clinic/Hospital address field */}
      <div>
        <label className="block text-gray-300 mb-2">Office / Clinic / Hospital Address (optional)</label>
        <textarea
          name="office_clinic_hospital_address"
          value={formData.office_clinic_hospital_address}
          onChange={handleInputChange}
          rows="2"
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
          placeholder="Your practice/clinic/hospital address (if applicable)"
          data-testid="office-address-input"
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-4">Step 4: Professional Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 mb-2">Practice / Clinic Name</label>
          <input
            type="text"
            name="practice_clinic_name"
            value={formData.practice_clinic_name}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
            placeholder="Your clinic/practice name"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Years of Experience</label>
          <input
            type="number"
            name="years_of_experience"
            value={formData.years_of_experience}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
            placeholder="e.g., 10"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Specialty</label>
          <input
            type="text"
            name="specialty"
            value={formData.specialty}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
            placeholder="e.g., Cardiology"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Sub-specialty (if any)</label>
          <input
            type="text"
            name="sub_specialty"
            value={formData.sub_specialty}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
            placeholder="e.g., Interventional Cardiology"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Areas of Interest / Practice * (Use commas to separate)</label>
        <textarea
          name="areas_of_interest"
          value={formData.areas_of_interest}
          onChange={handleInputChange}
          rows="3"
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
          placeholder="e.g., Cardiac Surgery, Pacemaker Implantation, Heart Failure Management"
        />
        {errors.areas_of_interest && <p className="text-red-400 text-sm mt-1">{errors.areas_of_interest}</p>}
      </div>

      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="attached_to_teaching_institute"
            checked={formData.attached_to_teaching_institute}
            onChange={handleInputChange}
            className="w-5 h-5"
          />
          <span className="text-gray-300">Attached to Teaching Institute?</span>
        </label>
        
        {formData.attached_to_teaching_institute && (
          <div className="mt-4">
            <label className="block text-gray-300 mb-2">Teaching Institute Details</label>
            <input
              type="text"
              name="teaching_institute_details"
              value={formData.teaching_institute_details}
              onChange={handleInputChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
              placeholder="Institute name and your role"
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderStep5 = () => {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white mb-4">Step 5: Optional Information</h3>
        <p className="text-gray-400 mb-6">All fields in this step are optional</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 mb-2">Ancestral Place</label>
          <input
            type="text"
            name="ancestral_place"
            value={formData.ancestral_place}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
            data-testid="ancestral-place-input"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Under-graduation Year</label>
          <input
            type="text"
            name="ug_year"
            value={formData.ug_year}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
            placeholder="e.g., 2005"
            data-testid="ug-year-input"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Under-graduation Institute</label>
          <input
            type="text"
            name="ug_institute"
            value={formData.ug_institute}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
            data-testid="ug-institute-input"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Post-graduation Year</label>
          <input
            type="text"
            name="pg_year"
            value={formData.pg_year}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
            placeholder="e.g., 2010"
            data-testid="pg-year-input"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Post-graduation Institute</label>
          <input
            type="text"
            name="pg_institute"
            value={formData.pg_institute}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
            data-testid="pg-institute-input"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Post-graduation Level</label>
          <select
            name="post_graduation_level"
            value={formData.post_graduation_level}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white appearance-none cursor-pointer"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%239ca3af%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")', backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
            data-testid="pg-level-select"
          >
            <option value="">Select...</option>
            <option value="in under-graduation">In Under-graduation</option>
            <option value="in post-graduation">In Post-graduation</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Spouse Name</label>
          <input
            type="text"
            name="spouse_name"
            value={formData.spouse_name}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
            data-testid="spouse-name-input"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Spouse Profession</label>
          <input
            type="text"
            name="spouse_profession"
            value={formData.spouse_profession}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
            data-testid="spouse-profession-input"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Children Details</label>
        <textarea
          name="children_details"
          value={formData.children_details}
          onChange={handleInputChange}
          rows="2"
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
          placeholder="If doctors/medicos, please provide details"
          data-testid="children-details-input"
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Membership in Associations</label>
        <textarea
          name="associations"
          value={formData.associations}
          onChange={handleInputChange}
          rows="2"
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
          placeholder="Professional associations you're member of"
          data-testid="associations-input"
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Hobbies / Other Information</label>
        <textarea
          name="hobbies"
          value={formData.hobbies}
          onChange={handleInputChange}
          rows="2"
          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
          placeholder="Your interests and hobbies"
          data-testid="hobbies-input"
        />
      </div>
    </div>
  );
  };

  const renderStep6 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-4">Step 6: Membership Tier & Privacy</h3>
      
      {/* Membership Tier Selection */}
      <MembershipTierSelector
        selectedTier={formData.membership_tier}
        onTierSelect={(tier) => setFormData(prev => ({ ...prev, membership_tier: tier }))}
      />

      {/* Privacy & Consent */}
      <div className="bg-white/5 rounded-lg p-6 border border-white/10 space-y-4 mt-8">
        <h4 className="text-lg font-semibold text-white mb-4">Privacy Settings</h4>
        
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="display_phone_publicly"
            checked={formData.display_phone_publicly}
            onChange={handleInputChange}
            className="w-5 h-5 mt-1"
            data-testid="display-phone-checkbox"
          />
          <span className="text-gray-300">
            <strong>Display phone number publicly</strong><br/>
            <small className="text-gray-400">Allow others to see your contact number in your profile</small>
          </span>
        </label>

        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="display_photo_publicly"
            checked={formData.display_photo_publicly}
            onChange={handleInputChange}
            className="w-5 h-5 mt-1"
            data-testid="display-photo-checkbox"
          />
          <span className="text-gray-300">
            <strong>Display profile photo?</strong><br/>
            <small className="text-gray-400">Show your profile photo to all visitors</small>
            <br/>
            <small className="text-amber-300">Note: Only Premium and VIP members are eligible for profile photo display</small>
          </span>
        </label>

        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            name="consent_downloadable_directory"
            checked={formData.consent_downloadable_directory}
            onChange={handleInputChange}
            className="w-5 h-5 mt-1"
            data-testid="consent-directory-checkbox"
          />
          <span className="text-gray-300">
            <strong>Include in downloadable directory</strong><br/>
            <small className="text-gray-400">Allow your details in exported/downloadable formats (PDF, Excel) for authorized AVDA members</small>
          </span>
        </label>

        <div className="border-t border-white/10 pt-4 mt-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="terms_accepted"
              checked={formData.terms_accepted}
              onChange={handleInputChange}
              className="w-5 h-5 mt-1"
              data-testid="terms-checkbox"
            />
            <span className="text-gray-300">
              <strong className="text-red-400">* I accept Terms and Conditions</strong><br/>
              <small className="text-gray-400">
                I confirm that all information provided is accurate. I understand my details will be used for AVDA directory purposes. 
                Membership is annual and contributions support Dr GV Krishna Rao Trust charitable activities.
              </small>
            </span>
          </label>
          {errors.terms_accepted && <p className="text-red-400 text-sm mt-2">{errors.terms_accepted}</p>}
        </div>
      </div>
    </div>
  );

  const steps = [
    { number: 1, title: 'Basic Info', component: renderStep1 },
    { number: 2, title: 'Credentials', component: renderStep2 },
    { number: 3, title: 'Contact', component: renderStep3 },
    { number: 4, title: 'Professional', component: renderStep4 },
    { number: 5, title: 'Optional', component: renderStep5 },
    { number: 6, title: 'Privacy', component: renderStep6 },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                currentStep === step.number 
                  ? 'bg-blue-500 text-white' 
                  : currentStep > step.number 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/10 text-gray-400'
              }`}>
                {currentStep > step.number ? '✓' : step.number}
              </div>
              <span className={`text-xs mt-2 ${
                currentStep === step.number ? 'text-white' : 'text-gray-400'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
        {steps[currentStep - 1].component()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
            >
              ← Previous
            </button>
          )}
          
          {currentStep < 6 ? (
            <button
              onClick={nextStep}
              className="ml-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="ml-auto px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition font-semibold disabled:opacity-50"
            >
              {loading ? 'Submitting...' : '✓ Submit Registration'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
