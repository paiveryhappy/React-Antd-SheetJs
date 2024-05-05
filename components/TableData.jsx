'use client'
import React, { useState, useEffect } from 'react'
import dataSource from '@/data/dataSource';
import { Table, Rate } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
//import 'antd/dist/antd.css'; 

function TableData({ searchTechnician, searchCustomer, searchModule, searchRequest, changeTechnicianInput, changeModuleInput, changeRequestInput, changeCustomerInput }) {

    const [data, setData] = useState(dataSource);

    const handleRefresh = () => {
        setData(dataSource);
        changeTechnicianInput('');
        changeModuleInput('');
        changeRequestInput('');
        changeCustomerInput('');
    }

    console.log(searchTechnician);
    console.log(searchCustomer);
    console.log(searchRequest);
    console.log(searchModule);

    useEffect(() => {
        let filteredData = dataSource;

        if (searchTechnician) {
            filteredData = filteredData.filter(record =>
                record.technician.toLowerCase().includes(searchTechnician.toLowerCase())
            );
        }
        if (searchCustomer) {
            filteredData = filteredData.filter(record =>
                record.customer.toLowerCase().includes(searchCustomer.toLowerCase())
            );
        }
        if (searchModule) {
            filteredData = filteredData.filter(record =>
                record.module.toLowerCase().includes(searchModule.toLowerCase())
            );
        }
        if (searchRequest) {
            filteredData = filteredData.filter(record =>
                record.requestType.toLowerCase().includes(searchRequest.toLowerCase())
            );
        } else {
            setData(dataSource)
        }

        setData(filteredData);
    }, [searchTechnician, searchCustomer, searchModule, searchRequest]);



    const columns = [
        {
            key: 'ticketId',
            title: "Ticket ID",
            dataIndex: 'ticketId',
            width: 100,
            align: "center",
            sorter: (a, b) => a.ticketId - b.ticketId,
        },
        {
            key: 'customer',
            title: "Customer",
            dataIndex: 'customer',
            align: "center",
            width: 140,
        },
        {
            key: 'subject',
            title: "Subject",
            dataIndex: 'subject',
            width: 250,
        },
        {
            key: 'module',
            title: "Module",
            dataIndex: 'module',
            align: "center",
            width: 80,
        },
        {
            key: 'requestType',
            title: "Request Type",
            dataIndex: 'requestType',
            align: "center",
            width: 150,
        },
        {
            key: 'technician',
            title: "Technician",
            dataIndex: 'technician',
            align: "center",
            width: 230,
        },
        {
            key: 'evolution',
            title: "Evolution",
            dataIndex: 'evolution',
            width: 160,
            align: "center",
            sorter: (a, b) => a.evolution - b.evolution,
            render: (rating) => <Rate disabled defaultValue={rating} />
        },
        {
            key: 'lastUpdate',
            title: "Last Update",
            dataIndex: 'lastUpdate',
            align: "center",
            width: 120,
        },
    ];


    return (
        <div className="flex flex-col">
            <div className='relative'>
                <button onClick={handleRefresh} className='absolute right-2/4 border border-solid bg-slate-50 w-44 rounded text-lg'> <ReloadOutlined /> refresh</button>

                <button className='absolute right-0 border border-solid bg-slate-50 w-32 rounded text-green-500'>Export Excel</button>

            </div>

            <div className='mt-10'>
                <Table columns={columns}
                    dataSource={data}
                    size='middle'
                    pagination={false}
                    rowKey={record => record.ticketId}
                    rowClassName={(record, index) => index % 2 === 0 ? "table-row-light" : "table-row-dark"}
                />
            </div>
        </div>
    )
}

export default TableData;