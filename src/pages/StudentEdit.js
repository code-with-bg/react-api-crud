import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/loading";

function StudentEdit() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [inputErrorList, setInputErrorList] = useState({});
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [student, setStudent] = useState({});
  const [file, setFile] = useState(null); // State for file upload

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/students/${id}`)
      .then((res) => {
        setStudent(res.data.data);
        setLoading(false);
        setInputErrorList({}); // Clear input errors
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          alert(error.response.data.message);
        } else if (error.response && error.response.status === 500) {
          alert(error.response.data);
        }
        setLoading(false);
      });
  }, [id]);

  const handleInput = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleFileInput = (e) => {
    setFile(e.target.files[0]);
  };

  const updateStudent = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", student.name);
    formData.append("email", student.email);
    formData.append("phone", student.phone);
    formData.append("address", student.address);
    if (file) {
      formData.append("image", file);
    }

    axios
      .put(`http://127.0.0.1:8000/api/students/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate("/studentlist");
        alert(res.data.message);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          setInputErrorList(error.response.data.errors);
        } else if (error.response && error.response.status === 404) {
          alert(error.response.data.message);
        } else if (error.response && error.response.status === 500) {
          alert(error.response.data);
        }
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (Object.keys(student).length === 0) {
    return (
      <div className="container">
        <h1>No Such Student Id Found !</h1>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card-header">
            <div className="card">
              <h2
                className="d-flex justify-content-between"
                style={{
                  color: "green",
                  paddingLeft: "20px",
                  paddingRight: "10px",
                }}
              >
                Edit Student{" "}
                <Link to="/students" className="btn btn-danger float-end m-2">
                  Back
                </Link>
              </h2>
            </div>
            <div className="card-body mt-5">
              <form onSubmit={updateStudent}>
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
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="phone"
                    placeholder="Enter your phone here..."
                    name="phone"
                    onChange={handleInput}
                    value={student.phone}
                  />
                  <span className="text-danger">{inputErrorList.phone}</span>
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Enter your address here..."
                    name="address"
                    onChange={handleInput}
                    value={student.address}
                  />
                  <span className="text-danger">{inputErrorList.address}</span>
                </div>

                <div className="mb-3">
                  <label htmlFor="formFileMultiple" className="form-label">
                    Image Upload
                  </label>
                  <input
                    className="form-control"
                    name="image"
                    type="file"
                    onChange={handleFileInput}
                  />
                  <span className="text-danger">{inputErrorList.image}</span>
                </div>

                <div className="col-12">
                  <button className="btn btn-primary" type="submit">
                    Update
                  </button>
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
