import React from 'react'
import Navigation from './Navbar/Navigation'
import SideBar from './SideBar/SideBar'


import "./../../../assets/Style/Admin.css"
import "./../../../assets/Style/Font.css"
import "./../../../assets/Style/Index.css"

import "./../../../assets/JavaScript/Index.js"
import "./../../../assets/JavaScript/Jquery.js"
import "./../../../assets/JavaScript/Script.js"
import "./../../../assets/JavaScript/Bootstrap.min.js"


const Admin = () => {
  return (
    <div>
      <SideBar />
      <Navigation />
    </div>
    
  )
}

export default Admin