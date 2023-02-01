import axios from "axios";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import profile from "../images/profile.png";

const Users = () => {
  const route = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [updatedUser, setUpdatedUser] = useState();
  const [ clicked,setClicked] = useState(false)
  const [ tst,setTst] = useState(false)
  // update user crud
  const updateUser = (user) => {
    setUpdatedUser(user)
    setClicked(true)
    
  };
  // delete user crud
  const DeleteUser = (user) => {
    
    axios.delete(`http://localhost:8080/api/v1/users/delete/${user.ID}`);
  };

  useEffect(() => {
    async function getData() {
      const data = await axios.get("http://localhost:8080/api/v1/users");

  
      
      setUsers(data.data.data);
      
     console.log(data.data.data);
    }

    getData();
    setTst(false)
  }, [tst]);
  const onSubmit = (values) => {
    console.log(values);
    axios.post("http://localhost:8080/api/v1/users/update",values)
     setClicked(false)
    
      };
    
      const form = (props) => {
        return (
          <form onSubmit={props.handleSubmit} className="form">
             <label> ID</label>
             <br />
            <Field name="ID"  value={updatedUser.ID} disabled className="ID"/>
            
            <ErrorMessage name="ID" />
            

            <label>اسم المستخدم</label>
            <br />
            <Field name="UserName"   />
            
            <ErrorMessage name="UserName" />
           
          
    
            <label>الرقم السري</label>
            <br />
            <Field name="Password" type="text"  />
            
            <ErrorMessage name="Password" />
            
            <label> رقم الهاتف</label>
            <br />
            <Field name="phone" />
           
            <ErrorMessage name="phone"   />
         
            <label>تاريخ الميلاد </label>
            <br />
            <Field name="Bdate" type="date"   />
            
            <ErrorMessage name="Bdate" />
           
            <br />
            <button type="submit" className="editBtn"> حفظ</button>
        
          </form>
        );
      };
      const schema = () => {
        const schema = Yup.object().shape({
          ID: Yup.string().required(),
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
    
    <div className="users">
      {clicked ?  <div className="Form-style">
      <Formik
        initialValues={{ID:`${updatedUser.ID}` ,  UserName: `${updatedUser.UserName}`, Password: `${updatedUser.Password}`,  phone: `${updatedUser.Phone}` ,Bdate:`${updatedUser.Bdate}`}}
        onSubmit={onSubmit}
        render={form}
        validationSchema={schema()}
      />
    </div> : users ? (
        users.map((user) => {
          return (
            
            <div className="profile" >
              <Row className="profile-box">
                <Col className="col-4 text-center">
                  <img src={profile} alt="ssssssssss" />
                </Col>
                <Col className="profile-data col-8">
                  <span>
                    اسم المستخدم :{user.UserName !== "" ? user.UserName : ""}{" "}
                  </span>
                  <span>
                    رقم الهاتف : {user.Phone !== "" ? user.Phone : ""}
                  </span>
                
                  <button
                    onClick={(e) => {
                      DeleteUser(user);
                      route("/users")
                      setTst(true)
                    }}
                  >
                    حذف المستخدم
                  </button>
                  <button
                    onClick={(e) => {
                      updateUser(user);
                    }}
                  >
                    {" "}
                    تعديل المستخدم
                  </button>
                  <button className="addUser" onClick={() => route("/AddUser")}>
        اضافة مستخدم
      </button>
                </Col>
              </Row>
         
            </div>
            
          );
        })
      ) : (
        <div>
        <h1>there is no users</h1>
        <button className="addUser" onClick={() => route("/AddUser")}>
        اضافة مستخدم
      </button></div>
      )}
      
    </div>
  );
};

export default Users;
