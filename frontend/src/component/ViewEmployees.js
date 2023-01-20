import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

const ViewEmployees = () => {

  const [employeeData, setEmployeeData] = useState([]);

  const fetchEmployeeData = () => {
    axios.get('http://examination.24x7retail.com/api/v1.0/Employees')
      .then((res) =>
        setEmployeeData(res.data))
      .catch((err) => {
        console.log('Error while fetching employee data : ', err);
      });
  }

  useEffect(() => {
    fetchEmployeeData();
  }, [])

  const deleteData = (id) => {
    axios.delete(`http://examination.24x7retail.com/${id}`)
      .then(() => {
        fetchEmployeeData();
      })
      .catch((err) => {
        console.log('Error while deleting employee data : ', err);
      })
  }

  return (
    <>
      <div className="row justify-content-center mt-5 mb-2">
        <div className="col-md-5 text-center">
          <h2>Employee Details</h2>
        </div>
      </div>
      <div className="row justify-content-end my-3">
        <div className="col-md-4 col-10">
          <Link className='btn btn-dark mx-3' to={'/addemployee'}>Add Employee</Link>
          <Link className='btn btn-success' to={'/searchemployee'}>Search Employee</Link>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className="col-md-10 col-12 text-center">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Job</th>
                <th scope="col">Email</th>
                <th scope="col">Salary</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                employeeData.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.job}</td>
                    <td>{emp.email}</td>
                    <td>{emp.salary}</td>
                    <td>
                      <Link className='btn btn-warning text-white' to={`/employee/${emp.id}`}>View</Link>
                      <Link className='btn btn-primary mx-2' to={`/editemployee/${emp.id}`}>Edit</Link>
                      <button className='btn btn-danger' onClick={() => deleteData(emp.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ViewEmployees