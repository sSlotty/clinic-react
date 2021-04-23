import React from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { Card, Col, Row, Button, Space, Input } from "antd";
import { Link } from 'react-router-dom'

import axios from 'axios'

import Swal from 'sweetalert2/dist/sweetalert2.all.min'
import 'sweetalert2/dist/sweetalert2.min'

class PatientComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      patient: []
    }
  }

  componentDidMount() {
    this.getData();
  }
  getData() {
    axios.get('/patent').then(res => {

      const data = res.data.map(row => ({
        key: row._id,
        staffID: row._id,
        name: row.name,
        dob: row.dob,
        email: row.email,
        tel: row.tel
      }))
      console.log(data)
      this.setState({ patient: data })
    }).catch(err => {
      console.error(err)
    })
  }


  render() {

    const { Search } = Input;


    const suffix = (
      <AudioOutlined
        style={{
          fontSize: 16,
          color: '#1890ff',
        }}
      />
    );

    const columns = [
      {
        title: "#",
        dataIndex: "staffID",
        responsive: ['sm'],
      },
      {
        title: "Name",
        dataIndex: "name",

      },
      {
        title: "DOB",
        dataIndex: "dob",
        responsive: ['md'],
      },
      {
        title: "Tel",
        dataIndex: "tel",
        responsive: ['md'],
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (

          <Space size="middle">

            <Link to={{ pathname: `/patient/edit/${record.staffID}`, query: "/user/edit" }} >
              <Button type="primary">
                Edit </Button>
            </Link>
            <Link to={{ pathname: `/patient/view-report/${record.staffID}`, query: "/user/edit" }} >
              <Button style={{backgroundColor:'green',color:'white'}}>
                View
              </Button>
            </Link>


          </Space>
        ),
      },

    ];


    const data = this.state.patient
    const onSearch = (values) => {
      console.log(values)
    }

    const state = {
      bottom: 'bottomCenter',
    };
    return (
      <div className="touch">
        <Card className="card" title="รายชื่อผู้ป่วย" bordered={true}>
          <Row>
            <Col
              style={{ padding: "15px" }}
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={16}
            >
              <Space>
                <Button type="primary">
                  <Link to={'/patient/add'}>
                    เพิ่มผู้ป่วย
                  </Link>
                </Button>

              </Space>
            </Col>

            <Col style={{ padding: "10px" }} xs={24} sm={24} md={24} lg={24} xl={8}>
              <Search placeholder="Search with telephone number" onSearch={onSearch} style={{ width: 250 }} />

            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <div className="touch">
                <Table
                  columns={columns}
                  dataSource={data}
                  size="small"
                  pagination={{
                    position: [state.bottom]
                  }} />
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    )
  }


}

export default PatientComponent;
