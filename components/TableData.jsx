'use client'
import React, { useState, useEffect } from 'react'
import dataSource from '@/data/dataSource';
import { Table, Rate } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import * as XLSX from "xlsx";
//import 'antd/dist/antd.css'; 

function TableData({ searchWriter, searchCustomer, searchCover, searchCategory, changeWriterInput, changeCoverInput, changeCategoryInput, changeCustomerInput }) {
    const [data, setData] = useState(dataSource);

    const handleRefresh = () => {
        setData(dataSource);
        changeWriterInput('');
        changeCoverInput('');
        changeCategoryInput('');
        changeCustomerInput('');
    }

    useEffect(() => {
        let filteredData = dataSource;
        // filter data in Table part
        if (searchWriter) {
            filteredData = filteredData.filter(record =>
                record.writer.toLowerCase().includes(searchWriter.toLowerCase())
            );
        }
        if (searchCustomer) {
            filteredData = filteredData.filter(record =>
                record.customer.toLowerCase().includes(searchCustomer.toLowerCase())
            );
        }
        if (searchCover) {
            filteredData = filteredData.filter(record =>
                record.cover.toLowerCase().includes(searchCover.toLowerCase())
            );
        }
        if (searchCategory) {
            filteredData = filteredData.filter(record =>
                record.category.toLowerCase().includes(searchCategory.toLowerCase())
            );
        } else {
            setData(dataSource)
        }
        setData(filteredData);
    }, [searchWriter, searchCustomer, searchCover, searchCategory]);

    const handleExport = () => {
        const workBook = XLSX.utils.book_new()
        const workSheet = XLSX.utils.json_to_sheet(data);

        const currentDate = new Date();
        const todayDate = currentDate.toISOString().slice(0, 10);
        const fileName = `Writer Rating ${todayDate}.xlsx`

        XLSX.utils.book_append_sheet(workBook, workSheet, "sheet1");
        XLSX.writeFile(workBook, fileName)
    }

    const columns = [
        {
            key: 'id',
            title: "ID",
            dataIndex: 'id',
            width: 100,
            align: "center",
            sorter: (a, b) => a.id - b.id,
        },
        {
            key: 'customer',
            title: "Customer",
            dataIndex: 'customer',
            align: "center",
            width: 140,
        },
        {
            key: 'article',
            title: "Article",
            dataIndex: 'article',
            width: 250,
        },
        {
            key: 'cover',
            title: "Cover",
            dataIndex: 'cover',
            align: "center",
            width: 80,
        },
        {
            key: 'category',
            title: "Category",
            dataIndex: 'category',
            align: "center",
            width: 150,
        },
        {
            key: 'writer',
            title: "Writer",
            dataIndex: 'writer',
            align: "center",
            width: 230,
        },
        {
            key: 'rating',
            title: "Rating",
            dataIndex: 'rating',
            width: 160,
            align: "center",
            sorter: (a, b) => a.rating - b.rating,
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

                <button onClick={handleExport} className='absolute right-0 border border-solid bg-slate-50 w-32 rounded text-green-500'>Export Excel</button>

            </div>

            <div className='mt-10'>
                <Table columns={columns}
                    dataSource={data}
                    size='middle'
                    pagination={false}
                    rowKey={record => record.id}
                    rowClassName={(record, index) => index % 2 === 0 ? "table-row-light" : "table-row-dark"}
                />
            </div>
        </div>
    )
}

export default TableData;