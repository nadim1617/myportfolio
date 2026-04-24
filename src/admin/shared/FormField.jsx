import React from 'react';

export default function FormField({ label, type = 'text', value, onChange, placeholder, hint, options }) {
  return (
    <div className="field-group">
      <label>{label}</label>
      {type === 'textarea' ? (
        <textarea className="field-textarea" value={value} onChange={onChange} placeholder={placeholder} />
      ) : type === 'select' ? (
        <select className="field-select" value={value} onChange={onChange}>
          {options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : type === 'checkbox' ? (
        <label className="field-checkbox">
          <input type="checkbox" checked={value} onChange={onChange} />
          {placeholder}
        </label>
      ) : (
        <input className="field-input" type={type} value={value} onChange={onChange} placeholder={placeholder} />
      )}
      {hint && <p className="field-hint">{hint}</p>}
    </div>
  );
}
