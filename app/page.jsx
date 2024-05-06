'use client'
import React, { useState } from 'react';
import { Tabs, Input } from 'antd';
import TableData from "../components/TableData"
import XLSX from "xlsx";

export default function Home() {

  const [searchWriter, setSearchWriter] = useState("");
  const [searchCover, setSearchCover] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");

  const setWriterInput = (newValue) => {
    setSearchWriter(newValue);
  }
  const setCoverInput = (newValue) => {
    setSearchCover(newValue);
  }
  const setCategoryInput = (newValue) => {
    setSearchCategory(newValue);
  }
  const setCustomerInput = (newValue) => {
    setSearchCustomer(newValue);
  }
  return (
    <>
      <main className="container">
        <header className="my-3">
          <h2 className="text-xl font-bold">Article</h2>
          <div className="grid-container mt-2">
            <div>
              <label htmlFor="writer" className="font-bold">Writer: </label>
              <Input id="writer"
                onChange={(e) => setSearchWriter(e.target.value)}
                value={searchWriter} />
            </div>

            <div>
              <label htmlFor="cover" className="font-bold">Cover: </label>
              <Input id="cover"
                onChange={(e) => setSearchCover(e.target.value)}
                value={searchCover} />
            </div>

            <div>
              <label htmlFor="CategoryType" className="font-bold">Category: </label>
              <Input id="CategoryType"
                onChange={(e) => setSearchCategory(e.target.value)}
                value={searchCategory} />
            </div>

            <div>
              <label htmlFor="customer" className="font-bold">Customer: </label>
              <Input id="customer"
                onChange={(e) => setSearchCustomer(e.target.value)}
                value={searchCustomer} />
            </div>
          </div>
        </header>

        {/* Table Section */}
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: "Article Detail",
              key: "1",
              children: <TableData
                searchWriter={searchWriter}
                searchCustomer={searchCustomer}
                searchCover={searchCover}
                searchCategory={searchCategory}
                changeWriterInput={setWriterInput}
                changeCoverInput={setCoverInput}
                changeCategoryInput={setCategoryInput}
                changeCustomerInput={setCustomerInput} />,
            },
          ]}

        />
      </main>
      <br />
      <br />

    </>
  );
}
