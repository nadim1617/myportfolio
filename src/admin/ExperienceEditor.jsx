import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { FaTrash, FaEdit, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import FormField from './shared/FormField';
import ImageUpload from './shared/ImageUpload';
import './editors.css';

export default function ExperienceEditor() {
  const { state, dispatch } = usePortfolio();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [toast, setToast] = useState('');

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ ...item, points: item.points ? [...item.points] : [] });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleSave = () => {
    if (editingId === 'new') {
      dispatch({ type: 'ADD_EXPERIENCE', payload: { ...editForm, id: Date.now().toString() } });
    } else {
      dispatch({ type: 'UPDATE_EXPERIENCE', payload: editForm });
    }
    setToast('Experience saved!');
    setTimeout(() => setToast(''), 3000);
    cancelEdit();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this experience entry?')) {
      dispatch({ type: 'DELETE_EXPERIENCE', payload: id });
    }
  };

  const startAdd = () => {
    setEditingId('new');
    setEditForm({ id: 'new', company: '', role: '', duration: '', type: 'Full-time', location: '', logo: '', points: [''] });
  };

  const handlePointChange = (index, value) => {
    const newPoints = [...editForm.points];
    newPoints[index] = value;
    setEditForm({ ...editForm, points: newPoints });
  };

  const addPoint = () => setEditForm({ ...editForm, points: [...editForm.points, ''] });
  const removePoint = (index) => {
    const newPoints = editForm.points.filter((_, i) => i !== index);
    setEditForm({ ...editForm, points: newPoints });
  };

  return (
    <div className="editor">
      <h2 className="editor__title">Experience</h2>
      <p className="editor__sub">Manage your work history and roles.</p>

      {state.experience.map(item => (
        <div key={item.id} className={`item-card ${editingId === item.id ? 'item-card--editing' : ''}`}>
          {editingId === item.id ? (
            <div className="item-card__form">
              <div className="field-row">
                <FormField label="Company" value={editForm.company} onChange={e => setEditForm({...editForm, company: e.target.value})} />
                <FormField label="Role" value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})} />
              </div>
              <div className="field-row-3">
                <FormField label="Duration" value={editForm.duration} onChange={e => setEditForm({...editForm, duration: e.target.value})} placeholder="e.g. Jan 2022 - Present" />
                <FormField label="Type" type="select" options={[{label:'Full-time', value:'Full-time'}, {label:'Part-time', value:'Part-time'}, {label:'Freelance', value:'Freelance'}, {label:'Internship', value:'Internship'}]} value={editForm.type} onChange={e => setEditForm({...editForm, type: e.target.value})} />
                <FormField label="Location" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} />
              </div>
              
              <ImageUpload
                label="Company Logo (optional)"
                value={editForm.logo}
                onChange={(base64) => setEditForm({...editForm, logo: base64})}
              />
              <div className="field-group">
                <label>Job Points / Responsibilities</label>
                <div className="points-list">
                  {editForm.points.map((pt, i) => (
                    <div key={i} className="point-row">
                      <input className="field-input" value={pt} onChange={e => handlePointChange(i, e.target.value)} />
                      <button className="icon-btn icon-btn--delete" onClick={() => removePoint(i)}><FaTrash /></button>
                    </div>
                  ))}
                </div>
                <button className="btn btn-outline" style={{padding:'0.4rem 1rem', fontSize:'0.8rem', width:'fit-content'}} onClick={addPoint}>+ Add Point</button>
              </div>

              <div className="item-card__body" style={{display:'flex', gap:'0.5rem', justifyContent:'flex-end', paddingBottom:0, marginBottom:0, borderTop:'none'}}>
                <button className="icon-btn icon-btn--cancel" onClick={cancelEdit} title="Cancel"><FaTimes /></button>
                <button className="icon-btn icon-btn--save" onClick={handleSave} title="Save"><FaSave /></button>
              </div>
            </div>
          ) : (
            <div className="item-card__header">
              <div>
                <h3 className="item-card__title">{item.role} at {item.company}</h3>
                <p className="item-card__sub">{item.duration} • {item.type}</p>
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
          {/* Form matches the edit form above */}
          <div className="item-card__form">
              <div className="field-row">
                <FormField label="Company" value={editForm.company} onChange={e => setEditForm({...editForm, company: e.target.value})} />
                <FormField label="Role" value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})} />
              </div>
              <div className="field-row-3">
                <FormField label="Duration" value={editForm.duration} onChange={e => setEditForm({...editForm, duration: e.target.value})} />
                <FormField label="Type" type="select" options={[{label:'Full-time', value:'Full-time'}, {label:'Part-time', value:'Part-time'}, {label:'Freelance', value:'Freelance'}, {label:'Internship', value:'Internship'}]} value={editForm.type} onChange={e => setEditForm({...editForm, type: e.target.value})} />
                <FormField label="Location" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} />
              </div>
              <ImageUpload
                label="Company Logo (optional)"
                value={editForm.logo}
                onChange={(base64) => setEditForm({...editForm, logo: base64})}
              />
              <div className="field-group">
                <label>Job Points / Responsibilities</label>
                <div className="points-list">
                  {editForm.points.map((pt, i) => (
                    <div key={i} className="point-row">
                      <input className="field-input" value={pt} onChange={e => handlePointChange(i, e.target.value)} />
                      <button className="icon-btn icon-btn--delete" onClick={() => removePoint(i)}><FaTrash /></button>
                    </div>
                  ))}
                </div>
                <button className="btn btn-outline" style={{padding:'0.4rem 1rem', fontSize:'0.8rem', width:'fit-content'}} onClick={addPoint}>+ Add Point</button>
              </div>
              <div className="item-card__body" style={{display:'flex', gap:'0.5rem', justifyContent:'flex-end', paddingBottom:0, marginBottom:0, borderTop:'none'}}>
                <button className="icon-btn icon-btn--cancel" onClick={cancelEdit} title="Cancel"><FaTimes /></button>
                <button className="icon-btn icon-btn--save" onClick={handleSave} title="Save"><FaSave /></button>
              </div>
            </div>
        </div>
      )}

      {editingId !== 'new' && (
        <button className="add-btn" onClick={startAdd}>
          <FaPlus /> Add New Experience
        </button>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
