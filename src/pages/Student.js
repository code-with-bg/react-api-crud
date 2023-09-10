import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/loading.js';

function Student() {
  const [loading, setLoading] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('https://reqres.in/api/users').then((res) => {
      console.log(res);
      setStudents(res.data.data); // Use res.data.data to access the array of students
      setLoading(false);
    });
  }, []);

  if(loading){
     return(
        // <div>loading...</div>
        <Loading/>
     )
  }

  const studentDetails = students.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.email}</td>
      <td>{item.first_name} {item.last_name}</td>
      <td><img src={item.avatar} alt="Student Avatar" /></td>
      <td>
        <Link to="/" className="btn btn-success">Edit</Link>
      </td>
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card-header">
            <div className="card">
              <h2>
                Student List{' '}
                <Link to="/studentlist/create" className="btn btn-primary float-end m-2">
                  Add Student
                </Link>
              </h2>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Avatar</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>{studentDetails}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
