
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import profile from "../images/profile.png"
const Profile = () => {
    const[users,setUsers] =useState([])

   
    useEffect(()=>{
        setUsers(JSON.parse(localStorage.getItem('registeredUsers')))
    },[])
  return (
  <div className='profile'>
     <Row className='profile-box'>
    <Col className='col-4 text-center'>
    <img src={profile } alt="ssssssssss" />
   
    </Col>
    <Col className='profile-data col-8'>
<span>اسم المستخدم :{users.map(user =>user.UserName)} </span>
<span>رقم الهاتف : {users.map(user =>user.phone)}</span>
<span>تاريخ الميلاد : {users.map(user =>user.date)}</span>
    </Col>
   </Row>
  </div>
  )
}

export default Profile