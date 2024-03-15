import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/loading.js';

function Student() {
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/students/')
      .then((res) => {
        console.log(res);
        setStudents(res.data.data); // Use res.data.data to access the array of students
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  const deleteStudent = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete the data?");
   if(confirmDelete){
    axios.delete(`http://127.0.0.1:8000/api/students/${id}`)
      .then((res) => {
        // alert(res.data.message);
        // Remove the deleted student from the students array
        setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
      })
      .catch((error) => {
        console.error(error);
        alert(error.response.data.message);
      });
    }

  }

  if (loading) {
    return <Loading />;
  }

  const studentDetails = students.map((item) => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.address}</td>
      <td>
  <img 
    src={"http://127.0.0.1:8000/uploads/students/" + item.image} 
    alt={item.image} 
    width={'100px'} 
    height={'100px'}
  />
</td>
      <td>
        <Link to={`/studentlist/${item.id}/edit`} className="btn btn-success">Edit</Link>
      </td>
      <td>
        {/* Pass the student ID to the deleteStudent function */}
        <button type="button" onClick={() => deleteStudent(item.id)} className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Image</th>
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
