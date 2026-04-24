import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { FaTrash, FaEdit, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import FormField from './shared/FormField';
import './editors.css';

export default function EducationEditor() {
  const { state, dispatch } = usePortfolio();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [toast, setToast] = useState('');

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleSave = () => {
    if (editingId === 'new') {
      dispatch({ type: 'ADD_EDUCATION', payload: { ...editForm, id: Date.now().toString() } });
    } else {
      dispatch({ type: 'UPDATE_EDUCATION', payload: editForm });
    }
    setToast('Education saved!');
    setTimeout(() => setToast(''), 3000);
    cancelEdit();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      dispatch({ type: 'DELETE_EDUCATION', payload: id });
    }
  };

  const startAdd = () => {
    setEditingId('new');
    setEditForm({ id: 'new', institution: '', degree: '', duration: '', location: '', logo: '', description: '' });
  };

  return (
    <div className="editor">
      <h2 className="editor__title">Education</h2>
      <p className="editor__sub">Manage your educational background.</p>

      {state.education.map(item => (
        <div key={item.id} className={`item-card ${editingId === item.id ? 'item-card--editing' : ''}`}>
          {editingId === item.id ? (
            <div className="item-card__form">
              <div className="field-row">
                <FormField label="Institution" value={editForm.institution} onChange={e => setEditForm({...editForm, institution: e.target.value})} />
                <FormField label="Degree" value={editForm.degree} onChange={e => setEditForm({...editForm, degree: e.target.value})} />
              </div>
              <div className="field-row">
                <FormField label="Duration" value={editForm.duration} onChange={e => setEditForm({...editForm, duration: e.target.value})} placeholder="e.g. 2021 - Present" />
                <FormField label="Location" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} />
              </div>
              <FormField type="textarea" label="Description" value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />
              <FormField label="Logo URL" value={editForm.logo} onChange={e => setEditForm({...editForm, logo: e.target.value})} />
              <div className="item-card__body" style={{display:'flex', gap:'0.5rem', justifyContent:'flex-end', paddingBottom:0, marginBottom:0, borderTop:'none'}}>
                <button className="icon-btn icon-btn--cancel" onClick={cancelEdit} title="Cancel"><FaTimes /></button>
                <button className="icon-btn icon-btn--save" onClick={handleSave} title="Save"><FaSave /></button>
              </div>
            </div>
          ) : (
            <div className="item-card__header">
              <div>
                <h3 className="item-card__title">{item.degree}</h3>
                <p className="item-card__sub">{item.institution} • {item.duration}</p>
              </div>
              <div className="item-card__actions">
                <button className="icon-btn icon-btn--edit" onClick={() => startEdit(item)} title="Edit"><FaEdit /></button>
                <button className="icon-btn icon-btn--delete" onClick={() => handleDelete(item.id)} title="Delete"><FaTrash /></button>
              </div>
            </div>
          )}
        </div>
      ))}

      {editingId === 'new' && (
        <div className="item-card item-card--editing">
          <div className="item-card__form">
              <div className="field-row">
                <FormField label="Institution" value={editForm.institution} onChange={e => setEditForm({...editForm, institution: e.target.value})} />
                <FormField label="Degree" value={editForm.degree} onChange={e => setEditForm({...editForm, degree: e.target.value})} />
              </div>
              <div className="field-row">
                <FormField label="Duration" value={editForm.duration} onChange={e => setEditForm({...editForm, duration: e.target.value})} placeholder="e.g. 2021 - Present" />
                <FormField label="Location" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} />
              </div>
              <FormField type="textarea" label="Description" value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />
              <FormField label="Logo URL" value={editForm.logo} onChange={e => setEditForm({...editForm, logo: e.target.value})} />
              <div className="item-card__body" style={{display:'flex', gap:'0.5rem', justifyContent:'flex-end', paddingBottom:0, marginBottom:0, borderTop:'none'}}>
                <button className="icon-btn icon-btn--cancel" onClick={cancelEdit} title="Cancel"><FaTimes /></button>
                <button className="icon-btn icon-btn--save" onClick={handleSave} title="Save"><FaSave /></button>
              </div>
            </div>
        </div>
      )}

      {editingId !== 'new' && (
        <button className="add-btn" onClick={startAdd}>
          <FaPlus /> Add New Education
        </button>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
