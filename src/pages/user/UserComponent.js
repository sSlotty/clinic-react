import React from 'react';
import { Table, Tag, Radio, Space, Button, Card } from 'antd';

import { Router, Link } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2'
import 'sweetalert2/dist/sweetalert2'

class UserComponent extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            staff: []
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.get('/user').then(res => {
            const user = res.data;
            this.setState({ staff: user })
        }).catch(err => {
            console.error(err)
        })
    }

    onClickDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: "Confirm to delete",
            text: "Are you sure you want to delete",
            type: "info",
            icon: "question",
            showCancelButton: true,
            buttonsStyling: true,
            confirmButtonText: "ok",
            cancelButtonText: "cancel",
        }).then((res) => {
            if (res.isConfirmed) {
                // Swal.fire({
                //     title: "Confirm to delete",
                //     text: "Are you sure you want to delete",
                //     type: "info",
                //     icon: "success",
                // })

                // Function delete
            } 
        }
        )

    }

    render() {




        const columns = [
            {
                title: '#',
                dataIndex: 'staffID',
                key: 'staffID',
                style: { textAlign: 'center' }
            },
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
                responsive: ['md'],
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                responsive: ['md'],
            },
            {
                title: 'Role',
                dataIndex: 'role',
                key: 'role',
                responsive: ['lg'],
            },
            {
                title: 'Department',
                dataIndex: 'department',
                key: 'department',
                responsive: ['lg'],
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (

                    <Space size="middle">

                        <Link to={{ pathname: `/user/edit/${record.staffID}`, query: "/user/edit" }} >
                            <Button type="primary">
                                Edit </Button>
                        </Link>
                        <Button type="text" onClick={() => { this.onClickDelete(`${record.staffID}`) }} style={{ backgroundColor: '#f5222d', color: 'white' }}>
                            Delete </Button>


                    </Space>
                ),
            },
        ];



        const data = this.state.staff

        console.log(data)

        const state = {
            bottom: 'bottomCenter',
        };

        return (

            <div className="touch">
                <Card className="card" title="ระบบสมาชิก">
                    <Table
                        columns={columns}
                        pagination={{ position: [state.bottom] }}
                        dataSource={data}
                    />

                </Card>
            </div>
        )
    }
}

export default UserComponent