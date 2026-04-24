import { useRef, useState } from 'react';
import { FaUpload, FaTimesCircle } from 'react-icons/fa';
import './ImageUpload.css';

const MAX_BYTES = 500 * 1024; // 500 KB

export default function ImageUpload({ label, value, onChange, hint }) {
  const inputRef = useRef(null);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);

  const processFile = (file) => {
    setError('');
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPG, PNG, WEBP, etc.).');
      return;
    }

    if (file.size > MAX_BYTES) {
      const kb = (file.size / 1024).toFixed(0);
      setError(`Image is too large (${kb} KB). Maximum allowed size is 500 KB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => onChange(e.target.result); // base64 data URL
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e) => {
    processFile(e.target.files[0]);
    e.target.value = null; // reset so same file can be re-picked
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  const handleRemove = () => {
    setError('');
    onChange('');
  };

  return (
    <div className="img-upload field-group">
      {label && <label>{label}</label>}

      {value ? (
        /* ── Preview ── */
        <div className="img-upload__preview-wrap">
          <img src={value} alt="preview" className="img-upload__preview" />
          <button
            type="button"
            className="img-upload__remove"
            onClick={handleRemove}
            title="Remove image"
          >
            <FaTimesCircle />
          </button>
        </div>
      ) : (
        /* ── Drop zone ── */
        <div
          className={`img-upload__zone ${dragging ? 'img-upload__zone--active' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        >
          <FaUpload className="img-upload__icon" />
          <p className="img-upload__text">
            {dragging ? 'Drop it here!' : 'Click or drag & drop an image'}
          </p>
          <p className="img-upload__limit">Max 500 KB · JPG, PNG, WEBP, GIF</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileInput}
      />

      {error && <p className="img-upload__error">{error}</p>}
      {hint && !error && <p className="field-hint">{hint}</p>}
    </div>
  );
}
