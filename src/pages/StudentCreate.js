import { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
function StudentCreate() {
  const [student, setStudents] = useState({
     name: '',
     email: ''
  })

  const handleInput = (e) =>{
     e.persist();
     setStudents({...student,[e.target.email]: e.target.value});
     setStudents({...student,[e.target.name]: e.target.value});
  }
  const saveStudent = (e) =>{
    e.persist();
    const data = {
      email: student.email,
      name: student.name
    }
    axios.post().then();
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card-header">
            <div className="card">
              <h2 className="d-flex justify-content-between" style={{ color: 'green', paddingLeft: '20px', paddingRight: '10px' }}>
                Add Student{' '}
                <Link to="/students" className="btn btn-danger float-end m-2">
                  Back
                </Link>
              </h2>
            </div>
            <div className="card-body mt-5">
              <form onSubmit={saveStudent}>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your email address here..."
                    name="email"
                    onChange={handleInput}
                    value={student.email}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    name="name"
                    onChange={handleInput}
                    value={student.name}
                  />
                </div>
                <div class="col-12">
    <button className="btn btn-primary" type="submit">Submit</button>
  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCreate;