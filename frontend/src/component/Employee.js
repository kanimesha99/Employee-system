import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Employee = () => {

    let [employeeData, setEmployeeData] = useState([]);

    let id = useParams().id;

    useEffect(() => {
        axios.get(`http://examination.24x7retail.com/api/v1.0/Employee/${id}`)
            .then((res) =>
                setEmployeeData(res.data))
            .catch((err) => {
                console.log('Error while fetching employee data : ', err);
            });
    }, []);

    return (
        <div className='employee-container'>
            <div className='text-center'>
                <hr />
                <div>
                    <span>Employee Id : - </span>
                    <span>{employeeData.id}</span>
                </div>

                <hr />
                <div>
                    <span>Employee Name : - </span>
                    <span>{employeeData.name}</span>
                </div>
                
                <hr />
                <div>
                    <span>Employee Job : - </span>
                    <span>{employeeData.job}</span>
                </div>

                <hr />
                <div>
                    <span>Employee Email : - </span>
                    <span>{employeeData.email}</span>
                </div>

                <hr />
                <div>
                    <span>Employee Salary : - </span>
                    <span>{employeeData.salary}</span>
                </div>

                <hr />
                <div className='text-center'>
                    <Link className='btn btn-primary' to='/employees'>Return to View Employee</Link>
                </div>
                <hr />

            </div>
        </div>
    )
}

export default Employee