import React, { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { Layout, Input, Typography, message } from 'antd';
import css from '../common/css';

const { Title } = Typography;

const AddMember = () => {
  const navigate = useNavigate();
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
      content: 'Member added Successfully',
    });
  }, [messageApi]);

  let counter = 0;
  function generateId() {
    const length = 5;
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    counter++;
    return result + counter;
  };

  const userListId = generateId();

  const addMember = (data) => {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        success();
        setTimeout(() => {
          navigate('/');
        }, 1000);
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
      id: userListId,
      status: true
    }
    if (name && userEmail && address && organization && designation && contact) {
      addMember(DATA);
    }
  };

  return (
    <div>
      {contextHolder}
      <Layout style={css.addUserBox}>
        <Title>Add Member</Title>
        <form onSubmit={handleSubmit}>
          <div style={css.userContent}>
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
            <button style={css.submitBtn} type="submit">Add Member</button>
          </div>
        </form>
      </Layout>
    </div >
  )
}

export default AddMember;
