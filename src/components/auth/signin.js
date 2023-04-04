import React, { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Layout, Input, Typography, Alert, message } from 'antd';
import css from '../common/css';

const { Title } = Typography;

const Signin = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [flag, setFlag] = useState(false);
  const [formError, setFormError] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const success = useCallback(() => {
    messageApi.open({
      type: 'success',
      content: 'Login Successfully',
    });
  }, [messageApi]);

  const handleSubmit = (e) => {
    e.preventDefault();
    validate(userEmail, userPassword);
  };

  const validate = (email, pass) => {
    const Value = pass.trim();
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    if (!email) {
      errors.email = 'Email is required!';
      setFlag(true);
    } else if (!regex.test(email)) {
      errors.email = 'This is not a valid email!';
      setFlag(true);
    }
    if (!pass.length) {
      errors.password = 'Password is required!';
      setFlag(true);
    } else if (pass.length < 5) {
      errors.password = 'Password must be more than 5 characters';
      setFlag(true);
    } else if (pass.length > 16) {
      errors.password = 'Password cannot exceed more than 16 charaters';
      setFlag(true);
    } else if (!uppercaseRegExp.test(Value)) {
      errors.password = 'At least one Uppercase';
      setFlag(true);
    } else if (!lowercaseRegExp.test(Value)) {
      errors.password = 'At least one Lowercase';
      setFlag(true);
    } else if (!digitsRegExp.test(Value)) {
      errors.password = 'At least one digit';
      setFlag(true);
    } else if (!specialCharRegExp.test(Value)) {
      errors.password = 'At least one Special Characters';
      setFlag(true);
    }
    else {
      success();
      localStorage.setItem("Email", JSON.stringify(userEmail));
      localStorage.setItem("Password", JSON.stringify(userPassword));
      setTimeout(() => {
        navigate('/add-member');
      }, 1000);
    }
    setFormError(errors);
    return errors;
  };

  return (
    <div>
      {contextHolder}
      <Layout style={css.addUserBox}>
        <Title style={css.authStyle}>SIGN IN</Title>
        <form onSubmit={handleSubmit}>
          <div style={css.userContent}>
            <Title style={css.inputTitle} level={5}>Email</Title>
            <Input
              style={css.userInput}
              placeholder="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            {
              flag && formError && formError && formError.email && (
                <Alert style={css.errorStyle} message={formError.email} type="error" />
              )
            }
            <Title style={css.inputTitle} level={5}>Password</Title>
            <Input.Password
              style={css.userInput}
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="Password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            {
              flag && formError && formError && formError.password && (
                <Alert style={css.errorStyle} message={formError.password} type="error" />
              )
            }
            <button style={css.signInBtn} type="submit">Create Account</button>
          </div>
        </form>
      </Layout>
    </div >
  )
}

export default Signin;