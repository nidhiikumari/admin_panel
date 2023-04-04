import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Input, Typography, message } from 'antd';
import css from '../common/css';

const { Title } = Typography;

const EditMember = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [address, setAddress] = useState('');
  const [organization, setOrganization] = useState('');
  const [designation, setDesignation] = useState('');
  const [contact, setContact] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const success = useCallback(() => {
    messageApi.open({
      type: 'success',
      content: 'Member Updated Successfully',
    });
  }, [messageApi]);

  const updateMember = (data) => {
    fetch(`http://localhost:3001/users/${state.editData.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          success();
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const DATA = {
      name,
      email: userEmail,
      address,
      organization,
      designation,
      phone: contact,
      status: true
    }
    if (state.editData.id && name && userEmail && address && organization && designation && contact) {
      updateMember(DATA);
    }
  };

  useEffect(() => {
    setName(state.editData.name);
    setUserEmail(state.editData.email);
    setAddress(state.editData.address);
    setOrganization(state.editData.organization);
    setDesignation(state.editData.designation);
    setContact(state.editData.phone);
  }, [state.editData]);

  return (
    <div>
      {contextHolder}
      <Layout style={css.addUserBox}>
        <Title style={css.updateStyle}>Update Member</Title>
        <form onSubmit={handleSubmit}>
          <div style={css.userContent}>
            <Title style={css.inputTitle} level={5}>Member_id</Title>
            <Input
              style={css.userInput}
              placeholder="Name"
              value={state.editData.id}
              readOnly
            />
            <Title style={css.inputTitle} level={5}>Name</Title>
            <Input
              style={css.userInput}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Title style={css.inputTitle} level={5}>Email</Title>
            <Input
              style={css.userInput}
              type='email'
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
            <Title style={css.inputTitle} level={5}>Address</Title>
            <Input
              style={css.userInput}
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <Title style={css.inputTitle} level={5}>Organization</Title>
            <Input
              style={css.userInput}
              placeholder="Organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
            />
            <Title style={css.inputTitle} level={5}>Designation</Title>
            <Input
              style={css.userInput}
              placeholder="Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
            <Title style={css.inputTitle} level={5}>Contact</Title>
            <Input
              type='number'
              style={css.userInput}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Contact"
              required
            />
            <button style={css.submitBtn} type="submit">Update</button>
          </div>
        </form>
      </Layout>
    </div >
  )
}

export default EditMember;
