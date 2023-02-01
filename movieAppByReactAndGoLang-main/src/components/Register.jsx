import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    await axios.post("http://localhost:8080/api/v1/users/create", values);
     navigate("/LogIn");
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
        <label>تاريخ الميلاد </label>
        <br />
        <Field name="Bdate" type="date" />
        <br />
        <ErrorMessage name="Bdate" />
        <br />

        <button type="submit">إنشاء حساب</button>
        <span>
          لديك حساب بالفعل ؟<Link to={"/LogIn"}> تسجيل الدخول</Link>
        </span>
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
      Bdate: Yup.string().required(),
    });

    return schema;
  };
  return (
    <div className="Form-style">
      <Formik
        initialValues={{ UserName: "", Password: "", phone: "", Bdate: "" }}
        onSubmit={onSubmit}
        render={form}
        validationSchema={schema()}
      />
    </div>
  );
}

export default Register;
