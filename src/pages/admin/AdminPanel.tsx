import React, { useState } from 'react';
import { Container, Row, Col, Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import './AdminPanel.css';
import PendingUsers from './PendingUsers';

interface AdminPanelProps {
  
}

const AdminPanel: React.FC<AdminPanelProps> = () => {
  const [mainContent, setMainContent] = useState(<PendingUsers />);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handlePendingUsersClick = () => {
    setMainContent(<PendingUsers />);
  };

  const handleUsersClick = () => {
    setMainContent(<div>Users page</div>);
  };

  const handleSettingsClick = () => {
    setMainContent(<div>Settings page</div>);
  };

  const handleLogoutClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmLogout = () => {
    // Remove token or logout logic here
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="admin-panel">
      <div className="sidebar" style={{ position: 'fixed', top: 0, left: 0, width: '250px', height: '100vh' }}>
        <div className="sidebar-header">
          <h5>Admin Panel</h5>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={handlePendingUsersClick}>
              Pending Users
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={handleUsersClick}>
              Users
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link" onClick={handleSettingsClick}>
              Settings
            </a>
          </li>
        </ul>
      </div>
      <div className="main-content" style={{ marginLeft: '250px' }}>
        <Container>
          <Row>
            <Col xs="12">
              {mainContent}
            </Col>
          </Row>
        </Container>
        <button className="btn btn-danger btn-lg btn-block" onClick={handleLogoutClick} style={{ position: 'fixed', bottom: 0, left: 0, margin: '20px' }}>
          <i className="fas fa-sign-out-alt" /> Logout
        </button>
        <Modal isOpen={showConfirmModal} toggle={() => setShowConfirmModal(false)} className="modal-dialog-centered">
          <ModalBody>
            <h4>Emin misiniz?</h4>
            <p>Çıkış yapmak üzeresiniz. Emin misiniz?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={handleConfirmLogout}>
              Evet, çıkış yap
            </Button>
            <Button color="secondary" onClick={() => setShowConfirmModal(false)}>
              İptal
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default AdminPanel;