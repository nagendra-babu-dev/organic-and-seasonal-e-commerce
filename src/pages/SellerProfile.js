import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { userService } from '../services/userService';

const SellerProfile = () => {
  const [busyKey, setBusyKey] = useState('');
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await userService.getProfile();
        setProfileForm({
          name: profile.name || '',
          phone: profile.phone || '',
          address: profile.address || '',
          city: profile.city || '',
          state: profile.state || '',
          pincode: profile.pincode || ''
        });
      } catch (error) {
        toast.error(error.message || 'Failed to load profile');
      }
    };

    loadProfile();
  }, []);

  const handleProfileSave = async (event) => {
    event.preventDefault();
    try {
      setBusyKey('profile-save');
      await userService.updateProfile(profileForm);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setBusyKey('');
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      toast.error('Please fill current and new password');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }

    try {
      setBusyKey('password-save');
      await userService.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      toast.success('Password changed successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      setBusyKey('');
    }
  };

  return (
    <Container className="py-5">
      <h4 className="fw-bold mb-4">Seller Profile</h4>
      <Row>
        <Col md={7}>
          <Card className="border-0 bg-light mb-4 shadow-sm rounded-4">
            <Card.Body>
              <h5 className="fw-bold mb-3">Update Profile</h5>
              <Form onSubmit={handleProfileSave}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={profileForm.name}
                    onChange={(event) => setProfileForm((current) => ({ ...current, name: event.target.value }))}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. 07123 456789"
                    value={profileForm.phone}
                    onChange={(event) => setProfileForm((current) => ({ ...current, phone: event.target.value }))}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={profileForm.address}
                    onChange={(event) => setProfileForm((current) => ({ ...current, address: event.target.value }))}
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        value={profileForm.city}
                        onChange={(event) => setProfileForm((current) => ({ ...current, city: event.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>County</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="County"
                        value={profileForm.state}
                        onChange={(event) => setProfileForm((current) => ({ ...current, state: event.target.value }))}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Postcode</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="SW1A 1AA"
                    value={profileForm.pincode}
                    onChange={(event) => setProfileForm((current) => ({ ...current, pincode: event.target.value }))}
                  />
                </Form.Group>
                <Button type="submit" className="btn-organic" disabled={busyKey === 'profile-save'}>
                  {busyKey === 'profile-save' ? 'Saving...' : 'Save Profile'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5}>
          <Card className="border-0 bg-light shadow-sm rounded-4">
            <Card.Body>
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <FaLock /> Change Password
              </h5>
              <Form onSubmit={handlePasswordChange}>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(event) => setPasswordForm((current) => ({ ...current, currentPassword: event.target.value }))}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(event) => setPasswordForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                  />
                </Form.Group>
                <Button type="submit" variant="outline-success" disabled={busyKey === 'password-save'}>
                  {busyKey === 'password-save' ? 'Updating...' : 'Update Password'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SellerProfile;
