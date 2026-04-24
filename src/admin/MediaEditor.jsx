import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { FaTrash, FaEdit, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import FormField from './shared/FormField';
import ImageUpload from './shared/ImageUpload';
import './editors.css';

export default function MediaEditor() {
  const { state, dispatch } = usePortfolio();
  const [activeTab, setActiveTab] = useState('photography');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [toast, setToast] = useState('');

  const currentMedia = state.media[activeTab] || [];

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
      dispatch({ type: 'ADD_MEDIA', payload: { category: activeTab, item: { ...editForm, id: Date.now().toString() } } });
    } else {
      dispatch({ type: 'UPDATE_MEDIA_ITEM', payload: { category: activeTab, item: editForm } });
    }
    setToast('Media saved!');
    setTimeout(() => setToast(''), 3000);
    cancelEdit();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this media item?')) {
      dispatch({ type: 'DELETE_MEDIA', payload: { category: activeTab, id } });
    }
  };

  const startAdd = () => {
    setEditingId('new');
    if (activeTab === 'videography') {
      setEditForm({ id: 'new', title: '', description: '', date: '', embedUrl: '', thumbnail: '' });
    } else {
      setEditForm({ id: 'new', title: '', description: '', date: '', src: '' });
    }
  };

  return (
    <div className="editor">
      <h2 className="editor__title">Media Portfolio</h2>
      <p className="editor__sub">Manage your photos, videos, and drone shots.</p>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--clr-border)', paddingBottom: '0.5rem' }}>
        {['photography', 'videography', 'drone'].map(tab => (
          <button 
            key={tab} 
            className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '0.4rem 1rem', textTransform: 'capitalize' }}
            onClick={() => { setActiveTab(tab); cancelEdit(); }}
          >
            {tab}
          </button>
        ))}
      </div>

      {currentMedia.map(item => (
        <div key={item.id} className={`item-card ${editingId === item.id ? 'item-card--editing' : ''}`}>
          {editingId === item.id ? (
            <div className="item-card__form">
              <div className="field-row">
                <FormField label="Title" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
                <FormField label="Date" value={editForm.date} onChange={e => setEditForm({...editForm, date: e.target.value})} />
              </div>
              <FormField type="textarea" label="Description" value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />
              
              {activeTab === 'videography' ? (
                <>
                  <FormField label="YouTube Embed URL" value={editForm.embedUrl} onChange={e => setEditForm({...editForm, embedUrl: e.target.value})} />
                  <ImageUpload label="Video Thumbnail" value={editForm.thumbnail} onChange={base64 => setEditForm({...editForm, thumbnail: base64})} />
                </>
              ) : (
                <ImageUpload label="Upload Image" value={editForm.src} onChange={base64 => setEditForm({...editForm, src: base64})} />
              )}

              <div className="item-card__body" style={{display:'flex', gap:'0.5rem', justifyContent:'flex-end', paddingBottom:0, marginBottom:0, borderTop:'none'}}>
                <button className="icon-btn icon-btn--cancel" onClick={cancelEdit} title="Cancel"><FaTimes /></button>
                <button className="icon-btn icon-btn--save" onClick={handleSave} title="Save"><FaSave /></button>
              </div>
            </div>
          ) : (
            <div className="item-card__header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img 
                  src={activeTab === 'videography' ? item.thumbnail : item.src} 
                  alt={item.title} 
                  style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <div>
                  <h3 className="item-card__title">{item.title}</h3>
                  <p className="item-card__sub">{item.date} • {activeTab === 'videography' ? 'Video' : 'Image'}</p>
                </div>
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
              <FormField label="Date" value={editForm.date} onChange={e => setEditForm({...editForm, date: e.target.value})} />
            </div>
            <FormField type="textarea" label="Description" value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />
            
            {activeTab === 'videography' ? (
              <>
                <FormField label="YouTube Embed URL" value={editForm.embedUrl} onChange={e => setEditForm({...editForm, embedUrl: e.target.value})} />
                <ImageUpload label="Video Thumbnail" value={editForm.thumbnail} onChange={base64 => setEditForm({...editForm, thumbnail: base64})} />
              </>
            ) : (
              <ImageUpload label="Upload Image" value={editForm.src} onChange={base64 => setEditForm({...editForm, src: base64})} />
            )}

            <div className="item-card__body" style={{display:'flex', gap:'0.5rem', justifyContent:'flex-end', paddingBottom:0, marginBottom:0, borderTop:'none'}}>
              <button className="icon-btn icon-btn--cancel" onClick={cancelEdit} title="Cancel"><FaTimes /></button>
              <button className="icon-btn icon-btn--save" onClick={handleSave} title="Save"><FaSave /></button>
            </div>
          </div>
        </div>
      )}

      {editingId !== 'new' && (
        <button className="add-btn" onClick={startAdd}>
          <FaPlus /> Add New {activeTab === 'videography' ? 'Video' : 'Photo'}
        </button>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
