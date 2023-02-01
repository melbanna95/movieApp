import React from 'react'
import {Formik,Field,ErrorMessage} from "formik"
import * as Yup from "yup"
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'

const LogIn = () => {
    const navigate = useNavigate()
   
    
   
  const  onSubmit = async (values) => {
  const data = await axios.post("http://localhost:8080/api/v1/users/login",values)
  localStorage.setItem("loginUser",JSON.stringify([data.data.user]))
  localStorage.setItem("token",JSON.stringify(data.data.token))
  const token = data.data.token

   await axios.get("http://localhost:8080/api/v1/users/validate",{headers:{"Authorization":`Bearer${token}`}})
 navigate('/')
        
      }
    const form = (props) => {
    
        return <form onSubmit={props.handleSubmit} className='form'>
          <label>اسم المستخدم</label><br />
          <Field name="UserName" /><br />
          <ErrorMessage name="UserName" /><br />
    
          <label>الرقم السري</label><br />
          <Field name="Password" type="password" /><br />
          <ErrorMessage name="Password" /><br />
    
          <span>ليس لديك حساب ؟ <Link to={"/register"}> إنشاء حساب</Link></span> 
          <button type="submit">تسجيل الدخول</button>
          
        </form>
      }
    const  schema = ()=>{
        const schema = Yup.object().shape({
          UserName: Yup.string().required().min(4),
        
          Password: Yup.number().required(),
     
        });
    
        return schema;
      }
  return (
    <div className='Form-style'>
    <Formik 
          initialValues={{UserName: "", Password: ""}}
          onSubmit={onSubmit}
          render={form}
          validationSchema={schema()}
          />
    </div>
  )
}

export default LogIn