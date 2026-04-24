import { createContext, useContext, useReducer, useEffect } from 'react';
import * as defaults from '../data/portfolio';

// ── Helpers ────────────────────────────────────────────────
const STORAGE_KEY = 'portfolio_data';
const PWD_KEY     = 'portfolio_admin_pwd';
const DEFAULT_PWD = 'admin123';

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
};

const buildInitial = () => {
  const saved = loadFromStorage();
  if (saved) return saved;
  return {
    siteMeta:     defaults.siteMeta,
    profile:      defaults.profile,
    education:    defaults.education,
    experience:   defaults.experience,
    certificates: defaults.certificates,
    projects:     defaults.projects,
    media:        defaults.media,
  };
};

// ── Reducer ────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_SITE_META':     return { ...state, siteMeta: { ...state.siteMeta, ...action.payload } };
    case 'UPDATE_PROFILE':       return { ...state, profile: { ...state.profile, ...action.payload } };
    case 'SET_PROFILE_SOCIALS':  return { ...state, profile: { ...state.profile, socials: action.payload } };
    case 'SET_PROFILE_SKILLS':   return { ...state, profile: { ...state.profile, skills: action.payload } };

    case 'ADD_EDUCATION':        return { ...state, education: [...state.education, action.payload] };
    case 'UPDATE_EDUCATION':     return { ...state, education: state.education.map(e => e.id === action.payload.id ? action.payload : e) };
    case 'DELETE_EDUCATION':     return { ...state, education: state.education.filter(e => e.id !== action.payload) };
    case 'REORDER_EDUCATION':    return { ...state, education: action.payload };

    case 'ADD_EXPERIENCE':       return { ...state, experience: [...state.experience, action.payload] };
    case 'UPDATE_EXPERIENCE':    return { ...state, experience: state.experience.map(e => e.id === action.payload.id ? action.payload : e) };
    case 'DELETE_EXPERIENCE':    return { ...state, experience: state.experience.filter(e => e.id !== action.payload) };

    case 'ADD_CERTIFICATE':      return { ...state, certificates: [...state.certificates, action.payload] };
    case 'UPDATE_CERTIFICATE':   return { ...state, certificates: state.certificates.map(c => c.id === action.payload.id ? action.payload : c) };
    case 'DELETE_CERTIFICATE':   return { ...state, certificates: state.certificates.filter(c => c.id !== action.payload) };

    case 'ADD_PROJECT':          return { ...state, projects: [...state.projects, action.payload] };
    case 'UPDATE_PROJECT':       return { ...state, projects: state.projects.map(p => p.id === action.payload.id ? action.payload : p) };
    case 'DELETE_PROJECT':       return { ...state, projects: state.projects.filter(p => p.id !== action.payload) };

    case 'ADD_MEDIA':            return { ...state, media: { ...state.media, [action.payload.category]: [...state.media[action.payload.category], action.payload.item] } };
    case 'DELETE_MEDIA':         return { ...state, media: { ...state.media, [action.payload.category]: state.media[action.payload.category].filter(i => i.id !== action.payload.id) } };
    case 'UPDATE_MEDIA_ITEM':    return { ...state, media: { ...state.media, [action.payload.category]: state.media[action.payload.category].map(i => i.id === action.payload.item.id ? action.payload.item : i) } };

    case 'IMPORT_DATA':          return action.payload;
    case 'RESET_DEFAULTS':       return buildInitial();
    default:                     return state;
  }
}

// ── Context ────────────────────────────────────────────────
const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, buildInitial);

  // Auto-save to localStorage on every state change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Password helpers
  const getPassword = () => localStorage.getItem(PWD_KEY) || DEFAULT_PWD;
  const setPassword = (pwd) => localStorage.setItem(PWD_KEY, pwd);
  const checkPassword = (pwd) => pwd === getPassword();

  // Export / Import
  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'portfolio-data.json'; a.click();
    URL.revokeObjectURL(url);
  };
  const importData = (jsonStr) => {
    try {
      const data = JSON.parse(jsonStr);
      dispatch({ type: 'IMPORT_DATA', payload: data });
      return true;
    } catch { return false; }
  };
  const resetDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    dispatch({ type: 'IMPORT_DATA', payload: buildInitial() });
  };

  return (
    <PortfolioContext.Provider value={{ state, dispatch, checkPassword, setPassword, exportData, importData, resetDefaults }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used inside PortfolioProvider');
  return ctx;
};
