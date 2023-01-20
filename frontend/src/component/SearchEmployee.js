import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchEmployee = () => {

    const [empName, setEmpName] = useState('');

    let [employeeData, setEmployeeData] = useState([]);

    useEffect(() => {
        axios.get(`http://examination.24x7retail.com`)
            .then((res) =>
                setEmployeeData(res.data))
            .catch((err) => {
                console.log('Error while fetching employee data : ', err);
            });
    }, []);

    return (
        <>
            <div className="row justify-content-center mt-5 mb-4">
                <div className="col-md-4 col-10 text-center">
                    <div className='searchbar'>
                        <input type="text"
                            className='form-control mx-3 text-center'
                            placeholder='Enter Employee name to search'
                            value={empName}
                            onChange={(e) => setEmpName(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-4 col-10 text-center">
                    <h2>Employee Details</h2>
                </div>
            </div>

            <div className="row justify-content-end my-3">
                <div className="col-md-4 col-10">
                    <Link className='btn btn-warning text-white mx-3' to={'/addemployee'}>Add Employee</Link>
                    <Link className='btn btn-danger' to={'/employees'}>View Employees</Link>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-10 col-12 text-center">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Job</th>
                                <th scope="col">Email</th>
                                <th scope="col">Salary</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                employeeData.filter((val) => {
                                    if (empName == "") {
                                        return val;
                                    } else if (val.name.toLowerCase().includes(empName.toLowerCase())) {
                                        return val
                                    }
                                }).map((emp) => (
                                    <tr key={emp.id}>
                                        <td>{emp.id}</td>
                                        <td>{emp.name}</td>
                                        <td>{emp.job}</td>
                                        <td>{emp.email}</td>
                                        <td>{emp.salary}</td>
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

export default SearchEmployee