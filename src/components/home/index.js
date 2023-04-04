import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Layout,
  Modal,
  Typography,
  Space,
  Table,
  Tooltip,
  Button,
  Spin,
  Input
} from 'antd';
import { LoadingOutlined, EditTwoTone, MinusCircleTwoTone } from '@ant-design/icons';
import css from '../common/css';
import Appbar from '../common/header';

const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Index = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blockUser, setBlockUser] = useState({});

  const showModal = (data) => {
    setIsModalOpen(true);
    const SelectedData = filteredData.filter((list) => list.id === data.id)
    setBlockUser(SelectedData[0]);
  };

  const handleOk = () => {
    const DATA = {
      ...blockUser,
      status: false
    }

    fetch(`http://localhost:3001/users/${blockUser.id}`, {
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
          getMemberList();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getMemberList = () => {
    setLoading(true);
    fetch('http://localhost:3001/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.filter(item => item.status));
        setFilteredData(data.filter(item => item.status));
        setLoading(false);
      })
  };

  useEffect(() => {
    getMemberList();
  }, []);

  const handleEdit = (data) => {
    if (users && users.length > 0) {
      users.filter((list) => list.id === data.id
        && navigate(`/edit`, { state: { editData: list } }))
    }
  };

  const onSearch = (value) => {

    if (value) {
      const newData = filteredData.filter((record) => {
        const name = record.name.toLowerCase();
        return name.includes(value.toLowerCase());
      });
      setUsers(newData);
    } else if (value === '') {
      setUsers(filteredData);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ['ascend', 'descend'],
      width: 150,
    },
    {
      title: 'Phone',
      dataIndex: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
      sortDirections: ['ascend', 'descend'],
      width: 200,
    },
    {
      title: 'Actions',
      width: 200,
      render: (text, row) => (
        <Space size="middle">
          <Tooltip title="Block">
            <Button style={css.icons} onClick={() => showModal(row)}><MinusCircleTwoTone /></Button>
          </Tooltip>
          <Tooltip title="Edit">
            <Button style={css.icons} onClick={() => handleEdit(row)}><EditTwoTone /></Button>
          </Tooltip>
        </Space>
      ),
    }
  ];

  return (
    <div style={css.root}>
      <Layout>
        <Appbar />
      </Layout>
      <Title style={css.crudStyle}>Members List</Title>
      {
        loading ? <Spin style={css.spinner} indicator={antIcon} />
          : (
            <Content
              style={{ padding: '0 210px' }}
            >
              <Search
                placeholder="Search Member"
                onSearch={onSearch}
                style={css.searchStyle}
              />
              <p></p>
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
                pagination={{ pageSize: 12 }}
              />
            </Content>
          )
      }
      <Modal
        title=""
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure want to Block User ?</p>
      </Modal>
    </div>
  )
}

export default Index;
