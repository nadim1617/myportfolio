import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { FaTrash, FaEdit, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import FormField from './shared/FormField';
import './editors.css';

export default function CertificatesEditor() {
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
      dispatch({ type: 'ADD_CERTIFICATE', payload: { ...editForm, id: Date.now().toString() } });
    } else {
      dispatch({ type: 'UPDATE_CERTIFICATE', payload: editForm });
    }
    setToast('Certificate saved!');
    setTimeout(() => setToast(''), 3000);
    cancelEdit();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      dispatch({ type: 'DELETE_CERTIFICATE', payload: id });
    }
  };

  const startAdd = () => {
    setEditingId('new');
    setEditForm({ id: 'new', title: '', issuer: '', date: '', category: '', image: '', link: '' });
  };

  return (
    <div className="editor">
      <h2 className="editor__title">Certificates & Awards</h2>
      <p className="editor__sub">Manage your certifications and achievements.</p>

      {state.certificates.map(item => (
        <div key={item.id} className={`item-card ${editingId === item.id ? 'item-card--editing' : ''}`}>
          {editingId === item.id ? (
            <div className="item-card__form">
              <div className="field-row">
                <FormField label="Title" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
                <FormField label="Issuer" value={editForm.issuer} onChange={e => setEditForm({...editForm, issuer: e.target.value})} />
              </div>
              <div className="field-row">
                <FormField label="Date" value={editForm.date} onChange={e => setEditForm({...editForm, date: e.target.value})} placeholder="e.g. March 2024" />
                <FormField label="Category" value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})} placeholder="e.g. Development" />
              </div>
              <FormField label="Link/URL" value={editForm.link} onChange={e => setEditForm({...editForm, link: e.target.value})} />
              <FormField label="Image URL" value={editForm.image} onChange={e => setEditForm({...editForm, image: e.target.value})} />
              <div className="item-card__body" style={{display:'flex', gap:'0.5rem', justifyContent:'flex-end', paddingBottom:0, marginBottom:0, borderTop:'none'}}>
                <button className="icon-btn icon-btn--cancel" onClick={cancelEdit} title="Cancel"><FaTimes /></button>
                <button className="icon-btn icon-btn--save" onClick={handleSave} title="Save"><FaSave /></button>
              </div>
            </div>
          ) : (
            <div className="item-card__header">
              <div>
                <h3 className="item-card__title">{item.title}</h3>
                <p className="item-card__sub">{item.issuer} • {item.date}</p>
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
              <FormField label="Title" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
              <FormField label="Issuer" value={editForm.issuer} onChange={e => setEditForm({...editForm, issuer: e.target.value})} />
            </div>
            <div className="field-row">
              <FormField label="Date" value={editForm.date} onChange={e => setEditForm({...editForm, date: e.target.value})} />
              <FormField label="Category" value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})} />
            </div>
            <FormField label="Link/URL" value={editForm.link} onChange={e => setEditForm({...editForm, link: e.target.value})} />
            <FormField label="Image URL" value={editForm.image} onChange={e => setEditForm({...editForm, image: e.target.value})} />
            <div className="item-card__body" style={{display:'flex', gap:'0.5rem', justifyContent:'flex-end', paddingBottom:0, marginBottom:0, borderTop:'none'}}>
              <button className="icon-btn icon-btn--cancel" onClick={cancelEdit} title="Cancel"><FaTimes /></button>
              <button className="icon-btn icon-btn--save" onClick={handleSave} title="Save"><FaSave /></button>
            </div>
          </div>
        </div>
      )}

      {editingId !== 'new' && (
        <button className="add-btn" onClick={startAdd}>
          <FaPlus /> Add New Certificate
        </button>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
