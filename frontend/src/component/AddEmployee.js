import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';


const AddEmployee = () => {

  let history = useNavigate();

  let [employeeData, setEmployeeData] = useState({
    name: "",
    job: "",
    email: "",
    salary: ""
  });

  let [employeeErr, setEmployeeErr] = useState({
    nameErr: "",
    jobErr: "",
    emailErr: "",
    salaryErr: ""
  });

  let { name, job, email, salary } = employeeData;
  let { nameErr, jobErr, emailErr, salaryErr } = employeeErr;

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setEmployeeData({ ...employeeData, [name]: value });
  }

  const postRequest = () => {
    axios.post('http://localhost:8082/employees', employeeData)
      .then((data) => {
        history('/employees');
      })
      .catch((err) => {
        console.log('Error while sending the employee data : ', err);
      });
  }

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const clearErr = () => {
    setEmployeeErr({
      nameErr: '',
      jobErr: '',
      emailErr: '',
      salaryErr: ''
    });
  }

  const submitData = () => {
    if(!name){
      nameErr = "** Name is required, Please enter name **"
    }else{
      nameErr = ""
    }

    if(!job){
      jobErr = "** Job is required, Please enter job **"
    }else{
      jobErr = ""
    }

    if(!email){
      emailErr = "** Email is required, Please enter email **"
    }else if(!email.match(emailRegex)){
      emailErr = "** Please enter a valid email **"
    }else{
      emailErr = ""
    }

    if(!salary){
      salaryErr = "** Salary is required, Please enter salary **"
    }else if((salary-0) <= 10000 || (salary-0) >= 200000){
      salaryErr = "Enter salary in between 10000 & 200000"
    }else{
      salaryErr = ""
    }

    if(nameErr || jobErr || emailErr || salaryErr){
      setEmployeeErr({nameErr, jobErr, emailErr, salaryErr});
      return;
    }
    clearData();
    clearErr();
    postRequest();
  }

  const clearData = () => {
    setEmployeeData({
      name: "",
      job: "",
      email: "",
      salary: ""
    });
  }

  return (
    <div className='row justify-content-center my-5'>
      <div className="col-md-4 col-10 text-center formbar bg-primary">
        <h2 className='text-white'>Add Employee</h2>
        <div className='mt-4'>
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

          <div className='mt-4 mb-3 text-center'>
            <Link className='btn btn-danger' to={'/employees'}>Cancel</Link>
            <button className='btn btn-light mx-3' onClick={clearData}>Clear</button>
            <button className='btn btn-warning' onClick={submitData}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEmployee