import React from 'react';
import { useNavigate } from 'react-router';
import {
  Layout,
  Menu,
  Button,
} from 'antd';
import css from './css';

const { Header } = Layout;

const Appbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Layout>
        <Header style={css.headerStyle}>
          <Menu
            // theme="dark"
            mode="horizontal"
            style={css.menuStyles}
          >
            <Button style={css.navTitle} onClick={() => navigate('/')} type='text'>Home</Button>
            <Button style={css.navTitle} onClick={() => navigate('/bocked-members')} type='text'>Blocked Members</Button>
            <Button style={css.navTitle} onClick={() => navigate('/add-member')} type='text'>Add Member</Button>
          </Menu>
        </Header>
      </Layout>
    </div>
  )
};

export default Appbar;
