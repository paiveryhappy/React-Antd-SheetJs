'use client'
import React, { useState } from 'react';
import { Tabs, Input } from 'antd';
import TableData from "../components/TableData"

export default function Home() {

  const [searchTechnician, setSearchTechnician] = useState("");
  const [searchModule, setSearchModule] = useState("");
  const [searchRequest, setSearchRequest] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");

  const setTechnicianInput = (newValue) => {
    setSearchTechnician(newValue);
  }
  const setModuleInput = (newValue) => {
    setSearchModule(newValue);
  }
  const setRequestInput = (newValue) => {
    setSearchRequest(newValue);
  }
  const setCustomerInput = (newValue) => {
    setSearchCustomer(newValue);
  }
  return (
    <>
      <main className="container">
        <header className="my-3">
          <h2 className="text-xl font-bold">Ticket Evolution</h2>
          <div className="grid-container mt-2">
            <div>
              <label htmlFor="technician" className="font-bold">Technician: </label>
              <Input id="technician"
                onChange={(e) => setSearchTechnician(e.target.value)}
                value={searchTechnician} />
            </div>

            <div>
              <label htmlFor="sapModule" className="font-bold">SAP Moduls: </label>
              <Input id="sapModule"
                onChange={(e) => setSearchModule(e.target.value)}
                value={searchModule} />
            </div>

            <div>
              <label htmlFor="requestType" className="font-bold">Request Type: </label>
              <Input id="requestType"
                onChange={(e) => setSearchRequest(e.target.value)}
                value={searchRequest} />
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
              label: "Evolution",
              key: "1",
              children: <TableData
                searchTechnician={searchTechnician}
                searchCustomer={searchCustomer}
                searchModule={searchModule}
                searchRequest={searchRequest}
                changeTechnicianInput={setTechnicianInput}
                changeModuleInput={setModuleInput}
                changeRequestInput={setRequestInput}
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
