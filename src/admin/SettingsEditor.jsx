import { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import FormField from './shared/FormField';
import './editors.css';

export default function SettingsEditor() {
  const { setPassword, exportData, importData, resetDefaults } = usePortfolio();
  const [newPwd, setNewPwd] = useState('');
  const [toast, setToast] = useState('');
  const fileInputRef = useRef(null);

  const handleUpdatePassword = () => {
    if (newPwd.trim().length < 4) {
      setToast('Password must be at least 4 characters.');
      setTimeout(() => setToast(''), 3000);
      return;
    }
    setPassword(newPwd);
    setNewPwd('');
    setToast('Password updated successfully!');
    setTimeout(() => setToast(''), 3000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const success = importData(event.target.result);
      if (success) {
        setToast('Data imported successfully!');
      } else {
        setToast('Failed to import data. Invalid JSON.');
      }
      setTimeout(() => setToast(''), 3000);
      e.target.value = null; // reset
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (window.confirm('Are you absolutely sure? This will erase all your changes and restore the default portfolio data. This cannot be undone unless you have a backup.')) {
      resetDefaults();
      setToast('Reset to defaults successfully.');
      setTimeout(() => setToast(''), 3000);
    }
  };

  return (
    <div className="editor">
      <h2 className="editor__title">Settings</h2>
      <p className="editor__sub">Manage admin access and data backups.</p>

      <div className="item-card">
        <h3 className="item-card__title" style={{marginBottom:'1rem'}}>Change Admin Password</h3>
        <div style={{display:'flex', gap:'1rem', alignItems:'flex-end'}}>
          <div style={{flex:1}}>
            <FormField label="New Password" type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} placeholder="Enter new password" />
          </div>
          <button className="btn btn-primary" style={{marginBottom:'1.25rem'}} onClick={handleUpdatePassword}>Update Password</button>
        </div>
      </div>

      <div className="item-card">
        <h3 className="item-card__title" style={{marginBottom:'1rem'}}>Data Management</h3>
        <p className="field-hint" style={{marginBottom:'1.5rem'}}>
          Export your portfolio data as a JSON file to keep a backup. You can import it later to restore your content.
        </p>
        
        <div style={{display:'flex', gap:'1rem', flexWrap:'wrap'}}>
          <button className="btn btn-outline" onClick={exportData}>Export JSON Backup</button>
          
          <input 
            type="file" 
            accept=".json" 
            ref={fileInputRef} 
            style={{display:'none'}} 
            onChange={handleFileChange} 
          />
          <button className="btn btn-outline" onClick={() => fileInputRef.current?.click()}>Import JSON</button>
        </div>
      </div>

      <div className="item-card" style={{borderColor: 'rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.02)'}}>
        <h3 className="item-card__title" style={{color:'#ef4444', marginBottom:'0.5rem'}}>Danger Zone</h3>
        <p className="field-hint" style={{marginBottom:'1.5rem'}}>
          Resetting will clear all your custom data and restore the initial template data from the code.
        </p>
        <button className="btn" style={{background:'#ef4444', color:'#fff'}} onClick={handleReset}>Factory Reset Data</button>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
