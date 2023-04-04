import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Layout,
  Modal,
  Space,
  Table,
  Tooltip,
  Button,
  Typography
} from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';
import css from './common/css';
import Appbar from './common/header';

const { Content } = Layout;
const { Title } = Typography;

const BlockedList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unBlock, setUnBlock] = useState({});

  const getMemberList = () => {
    fetch('http://localhost:3001/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.filter(item => !item.status));
      })
  };

  useEffect(() => {
    getMemberList();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      filterMode: 'tree',
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 150,
    },
    {
      title: 'Phone',
      dataIndex: "phone",
      width: 200,
    },
    {
      title: 'Actions',
      width: 200,
      render: (row) => (
        <Space size="middle">
          <Tooltip title="Unblock">
            <Button style={css.icons} onClick={() => showModal(row)}><PlusCircleTwoTone /></Button>
          </Tooltip>
        </Space>
      ),
    }
  ];

  const showModal = (data) => {
    setIsModalOpen(true);
    const SelectedData = users.filter((list) => list.id === data.id)
    setUnBlock(SelectedData[0]);
  };

  const handleOk = () => {
    const DATA = {
      ...unBlock,
      status: true
    }
    fetch(`http://localhost:3001/users/${unBlock.id}`, {
      method: 'PUT',
      body: JSON.stringify(DATA),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setIsModalOpen(false);
          setTimeout(() => {
            navigate('/');
          }, 2000)
          // getMemberList();
        }
      })
      .catch((err) => console.log(err));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={css.blockUsersStyle}>
      <Appbar />
      <Content
        style={css.contentStyle}
      >
        <Title style={css.crudStyle}>Blocked Member List</Title>
        {
          users && users.length > 0
            ? (
              <Table
                columns={columns}
                dataSource={users.map((row) => ({
                  name: row && row.name,
                  email: row && row.email,
                  id: row && row.id,
                  phone: row && row.phone
                }))}
                bordered
                style={css.tableStyle}
                pagination={false}
              />
            )
            : <Title style={css.noDataStyle}>No Data</Title>
        }
      </Content>
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure want to Unblock User ?</p>
      </Modal>
    </div>
  )
}

export default BlockedList;
