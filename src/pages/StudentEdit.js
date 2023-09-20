import React, { useState, useEffect } from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/loading';

function StudentEdit() {

    let {id} = useParams();
  const navigate = useNavigate();
  const [inputErrorList, setInputErrorList] = useState({});
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({});

  
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/users/${id}`).then((res) => {
      console.log(res);
      setStudent(res.data.data); // Use res.data.data to access the array of students
      setLoading(false);
    })
    .catch((error) => {
        // if (error.response && error.response.status === 422) {
        //   setLoading(false);
        //   setInputErrorList(error.response.data.errors);
        // } 
        if (error.response && error.response.status === 404) {
            setLoading(false);
           alert(error.response.data.message);
          } 
        if(error.response.status === 500){
           alert(error.response.data)
        }
      });
  }, [id]);

  const handleInput = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const updateStudent = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      email: student.email,
      name: student.name,
      password: student.password
    };
    
    axios.put(`http://127.0.0.1:8000/api/users/${id}`, data)
      .then((res) => {
        navigate('/studentlist');
        alert(res.data.message);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          setLoading(false);
          setInputErrorList(error.response.data.errors);
        } 
        if (error.response && error.response.status === 404) {
            setLoading(false);
           alert(error.response.data.message);
          } 
        if(error.response.status === 500){
           alert(error.response.data)
        }
      });
  };
  if(loading){
    return(
       // <div>loading...</div>
       <Loading/>
    )
 }

 if(Object.keys(student).length === 0){
    return(
     <div className="container">
        <h1>No Such Student Id Found !</h1>
     </div>
    )
 }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card-header">
            <div className="card">
              <h2 className="d-flex justify-content-between" style={{ color: 'green', paddingLeft: '20px', paddingRight: '10px' }}>
                Edit Student{' '}
                <Link to="/students" className="btn btn-danger float-end m-2">
                  Back
                </Link>
              </h2>
            </div>
            <div className="card-body mt-5">
              <form onSubmit={updateStudent}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email address here..."
                    name="email"
                    onChange={handleInput}
                    value={student.email}
                  />
                  <span className="text-danger">{inputErrorList.email}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your full name here..."
                    name="name"
                    onChange={handleInput}
                    value={student.name}
                  />
                  <span className="text-danger">{inputErrorList.name}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                   Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password here..."
                    name="password"
                    onChange={handleInput}
                    value={student.password}
                  />
                  <span className="text-danger">{inputErrorList.password}</span>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary" type="submit">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentEdit;
