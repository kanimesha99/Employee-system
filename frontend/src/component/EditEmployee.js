import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {

    const history = useNavigate();

    let [employeeData, setEmployeeData] = useState({
        id: '',
        name: '',
        job: '',
        email: '',
        salary: ''
    });

    let [employeeErr, setEmployeeErr] = useState({
        nameErr: "",
        jobErr: "",
        emailErr: "",
        salaryErr: ""
    });

    let empId = useParams().id;

    useEffect(() => {
        axios.get(`http://localhost:8082/employees/${empId}`)
            .then((res) =>
                setEmployeeData(res.data))
            .catch((err) => {
                console.log('Error while fetching employee data : ', err);
            });
    }, []);

    let { id, name, job, email, salary } = employeeData;
    let { nameErr, jobErr, emailErr, salaryErr } = employeeErr;

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setEmployeeData({ ...employeeData, [name]: value })
    }

    const putRequest = () => {
        axios.put(`http://localhost:8082/employees/${id}`, employeeData)
            .then(() => history('/employees'))
            .catch((err) => console.log('Error while updating employee data : ', err))
    }

    const editEmployee = () => {
        if (!name) {
            nameErr = "** Name is required, Please enter name **"
        } else {
            nameErr = ""
        }

        if (!job) {
            jobErr = "** Job is required, Please enter job **"
        } else {
            jobErr = ""
        }

        if (!email) {
            emailErr = "** Email is required, Please enter email **"
        } else if (!email.match(emailRegex)) {
            emailErr = "** Please enter a valid email **"
        } else {
            emailErr = ""
        }

        if (!salary) {
            salaryErr = "** Salary is required, Please enter salary **"
        } else if ((salary - 0) <= 10000 || (salary - 0) >= 200000) {
            salaryErr = "Enter salary in between 10000 & 200000"
        } else {
            salaryErr = ""
        }

        if (nameErr || jobErr || emailErr || salaryErr) {
            setEmployeeErr({ nameErr, jobErr, emailErr, salaryErr });
            return;
        }
        clearData();
        clearErr();
        putRequest();
    }

    const clearData = () => {
        setEmployeeData({
            name: '',
            job: '',
            email: '',
            salary: ''
        });
    }

    const clearErr = () => {
        setEmployeeErr({
            nameErr: '',
            jobErr: '',
            emailErr: '',
            salaryErr: ''
        });
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return (
        <div className='row justify-content-center mt-5 mb-4'>
            <div className="col-md-4 col-10 text-center editformbar bg-primary">
                <h2 className='text-white'>Edit Employee</h2>
                <div className='mt-2'>
                    <div className='my-3'>
                        <input type="text"
                            className='form-control text-center bg-info'
                            placeholder='Enter Employee Name'
                            name='id'
                            readOnly
                            value={id}
                        />
                    </div>

                    <div className='my-3'>
                        <input type="text"
                            className='form-control text-center'
                            placeholder='Enter Employee Name'
                            name='name'
                            value={name}
                            onChange={handleInput}
                        />
                        <p className='text-white my-2'>
                            {nameErr}
                        </p>
                    </div>

                    <div className='my-3'>
                        <input type="text"
                            className='form-control text-center'
                            placeholder='Enter Employee Job'
                            name='job'
                            value={job}
                            onChange={handleInput}
                        />
                        <p className='text-white my-2'>
                            {jobErr}
                        </p>
                    </div>

                    <div className='my-3'>
                        <input type="text"
                            className='form-control text-center'
                            placeholder='Enter Employee Email'
                            name='email'
                            value={email}
                            onChange={handleInput}
                        />
                        <p className='text-white my-2'>
                            {emailErr}
                        </p>
                    </div>

                    <div className='my-3'>
                        <input type="text"
                            className='form-control text-center'
                            placeholder='Enter Employee Salary'
                            name='salary'
                            value={salary}
                            onChange={handleInput}
                        />
                        <p className='text-white my-2'>
                            {salaryErr}
                        </p>
                    </div>

                    <div className='mt-4 mb-1 text-center'>
                        <button className='btn btn-success' onClick={clearData}>Clear</button>
                        <Link className='btn btn-danger mx-3' to={'/employees'}>Cancel</Link>
                        <button className='btn btn-warning text-white' onClick={editEmployee}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditEmployee