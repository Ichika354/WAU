import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Login from './Pages/Login/Login.jsx'
import Registration from './Pages/Registration/Registration.jsx'
import Home from './Pages/Home/Home.jsx'
import Admin from "./Pages/Dashboard/Admin/Admin.jsx"
import AdminCategory from './Pages/Dashboard/Admin/Category/AdminCategory.jsx';
import AddAdminCategory from './Pages/Dashboard/Admin/Category/AddAdminCategory.jsx';
import UpdateAdminCategory from './Pages/Dashboard/Admin/Category/UpdateAdminCategory.jsx';
import Seller from './Pages/Dashboard/Seller/Seller.jsx';
import Access from './Pages/Error/Access.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/registration' element={<Registration />}/>
        <Route path='/admin' element={<Admin />}/>
        <Route path='/admin-category' element={<AdminCategory />}/>
        <Route path='/add-admin-category' element={<AddAdminCategory />}/>
        <Route path='/update-admin-category/:id' element={<UpdateAdminCategory />}/>
        <Route path='/seller' element={<Seller />}/>
        <Route path='/access' element={<Access />}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
