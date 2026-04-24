import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import FormField from './shared/FormField';
import ImageUpload from './shared/ImageUpload';
import './editors.css';

export default function ProfileEditor() {
  const { state, dispatch } = usePortfolio();
  const [data, setData] = useState(state.profile);
  const [toast, setToast] = useState('');

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    dispatch({ type: 'UPDATE_PROFILE', payload: data });
    setToast('Profile updated successfully!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="editor">
      <h2 className="editor__title">Profile Information</h2>
      <p className="editor__sub">Update your personal details and bio.</p>

      <div className="field-row">
        <FormField label="Full Name" value={data.name} onChange={e => handleChange('name', e.target.value)} />
        <FormField label="Tagline" value={data.tagline} onChange={e => handleChange('tagline', e.target.value)} />
      </div>

      <FormField type="textarea" label="Bio" value={data.bio} onChange={e => handleChange('bio', e.target.value)} />

      <div className="field-row">
        <FormField label="Location" value={data.location} onChange={e => handleChange('location', e.target.value)} />
        <FormField label="Email" value={data.email} onChange={e => handleChange('email', e.target.value)} />
      </div>

      <ImageUpload
        label="Profile Photo"
        value={data.avatar}
        onChange={(base64) => handleChange('avatar', base64)}
        hint="Upload your profile photo · Max 500 KB"
      />

      <div className="save-bar">
        <button className="btn btn-primary" onClick={handleSave}>Save Profile</button>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

