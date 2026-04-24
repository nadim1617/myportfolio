import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { FaUser, FaGraduationCap, FaBriefcase, FaCertificate, FaCode, FaCamera, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './AdminDashboard.css';

import ProfileEditor from '../admin/ProfileEditor';
import EducationEditor from '../admin/EducationEditor';
import ExperienceEditor from '../admin/ExperienceEditor';
import CertificatesEditor from '../admin/CertificatesEditor';
import ProjectsEditor from '../admin/ProjectsEditor';
import MediaEditor from '../admin/MediaEditor';
import SettingsEditor from '../admin/SettingsEditor';

const tabs = [
  { id: 'profile', label: 'Profile', icon: FaUser, comp: ProfileEditor },
  { id: 'education', label: 'Education', icon: FaGraduationCap, comp: EducationEditor },
  { id: 'experience', label: 'Experience', icon: FaBriefcase, comp: ExperienceEditor },
  { id: 'certificates', label: 'Certificates', icon: FaCertificate, comp: CertificatesEditor },
  { id: 'projects', label: 'Projects', icon: FaCode, comp: ProjectsEditor },
  { id: 'media', label: 'Media', icon: FaCamera, comp: MediaEditor },
  { id: 'settings', label: 'Settings', icon: FaCog, comp: SettingsEditor },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { state } = usePortfolio();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (sessionStorage.getItem('admin_authenticated') !== '1') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated');
    navigate('/admin');
  };

  if (!state) return <div className="admin-loading">Loading...</div>;

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.comp || ProfileEditor;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                className={`admin-nav__item ${activeTab === t.id ? 'active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                <Icon className="admin-nav__icon" /> {t.label}
              </button>
            );
          })}
        </nav>
        <div className="admin-sidebar__footer">
          <a href="/" target="_blank" rel="noreferrer" className="btn btn-outline" style={{marginBottom:'10px', width:'100%', textAlign:'center'}}>View Site</a>
          <button className="admin-nav__item admin-nav__item--danger" onClick={handleLogout}>
            <FaSignOutAlt className="admin-nav__icon" /> Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-content">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
