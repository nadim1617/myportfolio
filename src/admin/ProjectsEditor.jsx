import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { FaTrash, FaEdit, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import FormField from './shared/FormField';
import './editors.css';

export default function ProjectsEditor() {
  const { state, dispatch } = usePortfolio();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [toast, setToast] = useState('');

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ ...item, tags: item.tags ? [...item.tags] : [] });
    setTagInput('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleSave = () => {
    if (editingId === 'new') {
      dispatch({ type: 'ADD_PROJECT', payload: { ...editForm, id: Date.now().toString() } });
    } else {
      dispatch({ type: 'UPDATE_PROJECT', payload: editForm });
    }
    setToast('Project saved!');
    setTimeout(() => setToast(''), 3000);
    cancelEdit();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      dispatch({ type: 'DELETE_PROJECT', payload: id });
    }
  };

  const startAdd = () => {
    setEditingId('new');
    setEditForm({ id: 'new', title: '', description: '', category: 'Personal', tags: [], image: '', liveUrl: '', repoUrl: '', featured: false });
    setTagInput('');
  };

  const addTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !editForm.tags.includes(tagInput.trim())) {
      setEditForm({ ...editForm, tags: [...editForm.tags, tagInput.trim()] });
    }
    setTagInput('');
  };

  const removeTag = (tag) => {
    setEditForm({ ...editForm, tags: editForm.tags.filter(t => t !== tag) });
  };

  return (
    <div className="editor">
      <h2 className="editor__title">Projects</h2>
      <p className="editor__sub">Manage your portfolio projects.</p>

      {state.projects.map(item => (
        <div key={item.id} className={`item-card ${editingId === item.id ? 'item-card--editing' : ''}`}>
          {editingId === item.id ? (
            <div className="item-card__form">
              <div className="field-row">
                <FormField label="Title" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
                <FormField label="Category" type="select" options={[{label:'Personal',value:'Personal'}, {label:'Career',value:'Career'}, {label:'Educational',value:'Educational'}]} value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})} />
              </div>
              <FormField type="textarea" label="Description" value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />
              
              <div className="field-group">
                <label>Tags</label>
                <form className="tags-input-row" onSubmit={addTag}>
                  <input className="field-input" placeholder="Add a tag..." value={tagInput} onChange={e => setTagInput(e.target.value)} />
                  <button type="submit" className="btn btn-outline" style={{padding:'0.4rem 1rem'}}>Add</button>
                </form>
                <div className="tags-list">
                  {editForm.tags.map(t => (
                    <div key={t} className="tag-item">{t} <button type="button" onClick={() => removeTag(t)}><FaTimes/></button></div>
                  ))}
                </div>
              </div>

              <div className="field-row">
                <FormField label="Live URL" value={editForm.liveUrl} onChange={e => setEditForm({...editForm, liveUrl: e.target.value})} />
                <FormField label="Repo URL" value={editForm.repoUrl} onChange={e => setEditForm({...editForm, repoUrl: e.target.value})} />
              </div>
              
              <div className="field-row">
                <FormField label="Image URL" value={editForm.image} onChange={e => setEditForm({...editForm, image: e.target.value})} />
                <FormField type="checkbox" label="Featured" placeholder="Show in top featured section" value={editForm.featured} onChange={e => setEditForm({...editForm, featured: e.target.checked})} />
              </div>

              <div className="item-card__body" style={{display:'flex', gap:'0.5rem', justifyContent:'flex-end', paddingBottom:0, marginBottom:0, borderTop:'none'}}>
                <button className="icon-btn icon-btn--cancel" onClick={cancelEdit} title="Cancel"><FaTimes /></button>
                <button className="icon-btn icon-btn--save" onClick={handleSave} title="Save"><FaSave /></button>
              </div>
            </div>
          ) : (
            <div className="item-card__header">
              <div>
                <h3 className="item-card__title">{item.title} {item.featured && <span style={{color:'var(--clr-accent)', fontSize:'0.8rem'}}>(Featured)</span>}</h3>
                <p className="item-card__sub">{item.category} • {item.tags.join(', ')}</p>
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
          {/* New form matches edit form */}
          <div className="item-card__form">
              <div className="field-row">
                <FormField label="Title" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
                <FormField label="Category" type="select" options={[{label:'Personal',value:'Personal'}, {label:'Career',value:'Career'}, {label:'Educational',value:'Educational'}]} value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})} />
              </div>
              <FormField type="textarea" label="Description" value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />
              
              <div className="field-group">
                <label>Tags</label>
                <form className="tags-input-row" onSubmit={addTag}>
                  <input className="field-input" placeholder="Add a tag..." value={tagInput} onChange={e => setTagInput(e.target.value)} />
                  <button type="submit" className="btn btn-outline" style={{padding:'0.4rem 1rem'}}>Add</button>
                </form>
                <div className="tags-list">
                  {editForm.tags.map(t => (
                    <div key={t} className="tag-item">{t} <button type="button" onClick={() => removeTag(t)}><FaTimes/></button></div>
                  ))}
                </div>
              </div>

              <div className="field-row">
                <FormField label="Live URL" value={editForm.liveUrl} onChange={e => setEditForm({...editForm, liveUrl: e.target.value})} />
                <FormField label="Repo URL" value={editForm.repoUrl} onChange={e => setEditForm({...editForm, repoUrl: e.target.value})} />
              </div>
              
              <div className="field-row">
                <FormField label="Image URL" value={editForm.image} onChange={e => setEditForm({...editForm, image: e.target.value})} />
                <FormField type="checkbox" label="Featured" placeholder="Show in top featured section" value={editForm.featured} onChange={e => setEditForm({...editForm, featured: e.target.checked})} />
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
          <FaPlus /> Add New Project
        </button>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
