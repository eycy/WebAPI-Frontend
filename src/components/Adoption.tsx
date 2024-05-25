import React, { useEffect, useState } from 'react';
import { Table, Modal, Input, Button, message } from 'antd';
import { dogAPI } from "../commons/http-commons";

const Adoption = ({ isLoggedIn, isStaff, credentials }) => {
    const [adoptions, setAdoptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedAdoption, setSelectedAdoption] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [refreshTable, setRefreshTable] = useState(false);

    useEffect(() => {
        const fetchAdoptions = async () => {
            try {
                setLoading(true);
                const endpoint = isStaff ? '/api/v1/users/getAllAdoptions' : '/api/v1/users/getAdoptions';
                const response = await fetch(`${dogAPI.url}${endpoint}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `${credentials}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setAdoptions(data.result.messages);
                } else {
                    console.error('Failed to fetch adoption messages:', data.error);
                }
            } catch (error) {
                console.error('An error occurred while fetching adoption messages:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdoptions();
    }, [isStaff, credentials, refreshTable]);

    const handleReply = async (adoptionId, isAccept) => {

        try {
            const response = await fetch(`${dogAPI.url}/api/v1/users/replyAdoption`, {
                method: 'POST',
                headers: {
                    'Authorization': `${credentials}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    adoptionId: adoptionId,
                    message: responseMessage,
                    isAccept
                })
            });
            const data = await response.json();
            if (response.ok) {
                message.success(data.message);
                setModalVisible(false);
                setRefreshTable(!refreshTable);
                setResponseMessage('');
            } else {
                console.error('Failed to reply to adoption message:', data.error);
            }

        } catch (error) {
            console.error('An error occurred while replying to adoption message:', error);
        }
    };

    const showReplyModal = (adoption) => {
        console.log(adoption);
        setSelectedAdoption(adoption);
        setModalVisible(true);
    };

    const handleCancel = () => {
        setSelectedAdoption(null);
        setResponseMessage('');
        setModalVisible(false);
    };

    const handleDelete = async (adoptionId) => {
        try {
            const response = await fetch(`${dogAPI.url}/api/v1/users/deleteAdoption`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${credentials}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    adoptionid: adoptionId
                })
            });
            const data = await response.json();
            if (response.ok) {
                message.success('Delete successful.');
                setRefreshTable(!refreshTable);
            } else {
                console.error('Failed to delete adoption message:', data.error);
            }
        } catch (error) {
            console.error('An error occurred while deleting adoption message:', error);
        }
    };

    const columns = [
        {
            title: 'Dog Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Date Submitted',
            dataIndex: 'datecreated',
            key: 'datecreated',
            render: (date) => {
                const formattedDate = new Date(date).toISOString().slice(0, 19).replace("T", " ");
                return formattedDate;
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },

        {
            title: 'User Message',
            dataIndex: 'user_message',
            key: 'user_message',
        },

        {
            title: 'Staff Message',
            dataIndex: 'staff_message',
            key: 'staff_message',
        },
    ];

    if (!isLoggedIn) {
        return <h1>Login and adopt a dog!</h1>;
    }

    if (isStaff) {
        columns.push(
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: 'Actions',
                key: 'actions',
                render: (_, adoption) => {
                    if (adoption.status === 'Pending') {
                        return (
                            <Button type="primary" onClick={() => showReplyModal(adoption)}>
                                Reply
                            </Button>
                        );
                    } else if (adoption.status === 'Accepted' || adoption.status === 'Rejected') {
                        return (
                            <Button type="primary" danger onClick={() => handleDelete(adoption.id)}>
                                Delete
                            </Button>
                        );
                    } else {
                        return null;
                    }
                },
            },
        );
    }

    return (
        <>
            <div>
                <h1>Adoptions</h1>
                <Table
                    dataSource={adoptions}
                    columns={columns}
                    loading={loading}
                    rowKey="id"
                    key={refreshTable}
                />
            </div>
            <Modal
                title="Enter a message"
                visible={modalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>Cancel</Button>,
                    <Button key="accept" type="primary" onClick={() => handleReply(selectedAdoption.id, true)}>Accept</Button>,
                    <Button key="decline" type="primary" danger onClick={() => handleReply(selectedAdoption.id, false)}>Decline</Button>
                ]}
            >
                <Input.TextArea
                    placeholder="Enter your message"
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    rows={4}
                />
            </Modal>
        </>
    );
};

export default Adoption;