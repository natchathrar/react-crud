import React, { useState, useEffect } from "react";
import { Table, Button, Pagination, Popconfirm, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { deleteUserRequest, getUserlistRequest } from "../Redux/action";


const DataTableComponent = () => {
    const navigate = useNavigate();
    const { userList, loading } = useSelector((state) => state.reducer);
    console.log(userList.users);
    const Alluser = userList.users;
    const [searchTerm, setSearchTerm] = useState('');
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
            sorter: (a, b) => a.gender.localeCompare(b.gender),
        },
        {
            title: "Phone",
            dataIndex: "phoneNo",
            key: "phoneNo",
            sorter: (a, b) => a.phoneNo.localeCompare(b.phoneNo),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <>
                    {" "}
                    <div className="d-flex">
                        <Button
                            type="button"
                            className="me-2 btn  justify-content-center "
                            style={{ backgroundColor: "#2CB0A5", color: "white" }}
                        >
                            <Link to={`/form/${record._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <i className='bx bxs-edit'></i>
                            </Link>

                        </Button>
                        <Popconfirm
                            title="Are you sure you want to delete this record?"
                            onConfirm={() => handleDeleteClick(record._id)}
                            style={{ width: '300px', height: '200px', textAlign: "center" }}
                        >
                            <Button
                                className="btn btn-danger justify-content-center align-items-center"
                                style={{ backgroundColor: "", color: "white" }}
                            >
                                <i className='bx bxs-trash'></i>

                            </Button>
                        </Popconfirm>
                    </div>
                </>
            ),
        },
    ];

    const dispatch = useDispatch();

    const handleDeleteClick = async (id) => {
        try {

            const response = await dispatch(deleteUserRequest(id))
            const message = response.message;
            dispatch(getUserlistRequest())
            toast.success(message);
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete doctor record");
        }
    };

    useEffect(() => {
        dispatch(getUserlistRequest());
    }, [dispatch]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const filteredData = Alluser && Alluser.filter((user) =>
        Object.values(user).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );




    return (
        <Container>

            <Row>
                <h1 className="d-flex  justify-content-center mt-1  text-center fs-2" style={{ color: "#2CB0A5", textAlign: 'center' }}>Manage User</h1>

                <div className="d-flex justify-content-between mt-2">
                    <Col className="col-md-3">
                        <div className="form-group has-search">
                            <span className="fa fa-search form-control-feedback"></span>
                            <input type="text" className="form-control" placeholder="Search here" value={searchTerm} onChange={handleSearchChange} />
                        </div>
                    </Col>
                    <button className="btn btn-primary" onClick={() => navigate('/form')}>
                        <i className="fas fa-plus me-2"></i>
                        Add User
                    </button>
                </div>
            </Row>
            <Row className="  mt-1">
                <Col>
                    <Spin size="large" spinning={loading}>
                        <Table
                            columns={columns}
                            dataSource={filteredData}
                            // dataSource={paginatedData.map(item => ({ ...item, key: item.id }))}
                            className="my-custom-table shadow bg-light rounded"
                            style={{ overflowX: "auto", overflowY: "auto" }}
                            pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
                        />
                    </Spin>
                </Col>
            </Row>

            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Container>

    );
};

export default DataTableComponent;