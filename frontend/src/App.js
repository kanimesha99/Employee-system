import React from 'react'
import Navbar from './component/Navbar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './component/Home'
import PageNotFound from './component/PageNotFound'
import AddEmployee from './component/AddEmployee'
import ViewEmployees from './component/ViewEmployees'
import Employee from './component/Employee'
import EditEmployee from './component/EditEmployee'
import SearchEmployee from './component/SearchEmployee'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addemployee' element={<AddEmployee />} />
          <Route path='employees' element={<ViewEmployees />} />
          <Route path='/employee/:id' element={<Employee />} />
          <Route path='/editemployee/:id' element={<EditEmployee />} />
          <Route path='/searchemployee' element={<SearchEmployee />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App