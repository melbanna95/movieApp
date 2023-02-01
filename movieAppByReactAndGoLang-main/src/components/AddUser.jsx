import React from 'react'
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {  useNavigate } from "react-router-dom";
import axios from 'axios';
const AddUser = () => {
    const navigate = useNavigate();

  const onSubmit = (values) => {
    
    if(    localStorage.getItem("registeredUsers")) {
      const user = JSON.parse(localStorage.getItem("registeredUsers")) // eslint-disable-next-line
      user.map((use) => {if(use.UserName != values.UserName)
        {localStorage.setItem("registeredUsers", JSON.stringify([...user, values]))
        axios.post("http://localhost:8080/api/v1/users/create",values)
        navigate("/Users");
      }
        else{alert("duplicated user name")}
      } );
    }  else {localStorage.setItem("registeredUsers", JSON.stringify([values]));
    axios.post("http://localhost:8080/api/v1/users/create",values)
    navigate("/Users");
    }


  };

  const form = (props) => {
    return (
      <form onSubmit={props.handleSubmit} className="form">
        <label>اسم المستخدم</label>
        <br />
        <Field name="UserName" />
        <br />
        <ErrorMessage name="UserName" />
        <br />

        <label>الرقم السري</label>
        <br />
        <Field name="Password" type="password" />
        <br />
        <ErrorMessage name="Password" />
        <br />
        <label> رقم الهاتف</label>
        <br />
        <Field name="phone" />
        <br />
        <ErrorMessage name="phone" />
        <br />
        <label> تاريخ الميلاد</label>
        <br />
        <Field name="date" type="date" />
        <br />
        <ErrorMessage name="date" />
        <br />

        <button type="submit">إنشاء حساب</button>
       
      </form>
    );
  };
  const schema = () => {
    const schema = Yup.object().shape({
      UserName: Yup.string().required().min(4, "يجب ان يكون 4 احرف علي الاقل"),
      Password: Yup.string()
        .min(6, "يجب الا يقل عن 6 احرف او ارقام")
        .required(),
      phone: Yup.string()
        .matches(/(0)\d{10}/gi, "رقم هاتف غير صحيح")
        .required(),
      date: Yup.date().required(),
    });

    return schema;
  };
  return (
    <div className="Form-style">
      <Formik
        initialValues={{ UserName: "", Password: "", date: "", phone: "" }}
        onSubmit={onSubmit}
        render={form}
        validationSchema={schema()}
      />
    </div>
  );
}

export default AddUser