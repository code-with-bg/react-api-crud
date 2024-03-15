// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Loading from "../components/loading";

// function StudentCreate() {
//   const navigate = useNavigate();
//   const [inputErrorList, setInputErrorList] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [student, setStudent] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     image: "",
//   });

//   const handleInput = (e) => {
//     e.persist();
//     setStudent({ ...student, [e.target.name]: e.target.value });
//   };

//   const handleFileInput = (e) => {
//     setStudent({ ...student, image: e.target.files[0] });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("name", student.name);
//     formData.append("email", student.email);
//     formData.append("phone", student.phone);
//     formData.append("address", student.address);
//     formData.append("image", student.image);

//     axios
//       .post(`http://127.0.0.1:8000/api/students/`, formData)
//       .then((res) => {
//         alert(res.data.message);
//         setLoading(false);
//         navigate("/studentlist");
//       })
//       .catch((error) => {
//         setLoading(false);
//         if (error.response && error.response.status === 422) {
//           setInputErrorList(error.response.data.errors);
//         } else {
//           alert("An error occurred while submitting the form.");
//         }
//       });
//   };
//   if (loading) {
//     return (
//       // <div>loading...</div>
//       <Loading />
//     );
//   }
//   return (
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-12">
//           <div className="card">
//             <h2 className="card-header" style={{ color: "green" }}>
//               Add Student{" "}
//               <Link to="/studentlist" className="btn btn-danger float-end m-2">
//                 Back
//               </Link>
//             </h2>
//             <div className="card-body mt-5">
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="fullName" className="form-label">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="name"
//                     placeholder="Enter your full name here..."
//                     name="name"
//                     onChange={handleInput}
//                     value={student.name}
//                   />
//                   <span className="text-danger">{inputErrorList.name}</span>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="email" className="form-label">
//                     Email address
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     id="email"
//                     placeholder="Enter your email address here..."
//                     name="email"
//                     onChange={handleInput}
//                     value={student.email}
//                   />
//                   <span className="text-danger">{inputErrorList.email}</span>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="phone" className="form-label">
//                     Phone
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id="phone"
//                     placeholder="Enter your phone here..."
//                     name="phone"
//                     onChange={handleInput}
//                     value={student.phone}
//                   />
//                   <span className="text-danger">{inputErrorList.phone}</span>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="address" className="form-label">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="address"
//                     placeholder="Enter your address here..."
//                     name="address"
//                     onChange={handleInput}
//                     value={student.address}
//                   />
//                   <span className="text-danger">{inputErrorList.address}</span>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="formFileMultiple" className="form-label">
//                     Image Upload
//                   </label>
//                   <input
//                     className="form-control"
//                     name="image"
//                     type="file"
//                     onChange={handleFileInput}
//                   />
//                   <span className="text-danger">{inputErrorList.image}</span>
//                 </div>
//                 <div className="col-12">
//                   <button className="btn btn-primary" type="submit">
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default StudentCreate;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/loading";

function StudentCreate() {
  const navigate = useNavigate();
  const [inputErrors, setInputErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: "",
  });

  const handleInput = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "", // Clear the error message when user types
    }));
  };

  const handleFileInput = (e) => {
    setStudent({ ...student, image: e.target.files[0] });
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      image: "", // Clear the error message when user selects a file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for required fields
    const requiredFields = ["name", "email", "phone", "address", "image"];
    const errors = {};
    let hasErrors = false;
    requiredFields.forEach((field) => {
      if (!student[field]) {
        errors[field] = "This field is required.";
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setInputErrors(errors);
      return; // Prevent form submission
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", student.name);
    formData.append("email", student.email);
    formData.append("phone", student.phone);
    formData.append("address", student.address);
    formData.append("image", student.image);

    axios
      .post(`http://127.0.0.1:8000/api/students/`, formData)
      .then((res) => {
        alert(res.data.message);
        setLoading(false);
        navigate("/studentlist");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 422) {
          setInputErrors(error.response.data.errors);
        } else {
          alert("An error occurred while submitting the form.");
        }
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <h2 className="card-header" style={{ color: "green" }}>
              Add Student{" "}
              <Link to="/studentlist" className="btn btn-danger float-end m-2">
                Back
              </Link>
            </h2>
            <div className="card-body mt-5">
              <form onSubmit={handleSubmit}>
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
                  {inputErrors.name && (
                    <span className="text-danger">{inputErrors.name}</span>
                  )}
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
                  {inputErrors.email && (
                    <span className="text-danger">{inputErrors.email}</span>
                  )}
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
                  {inputErrors.phone && (
                    <span className="text-danger">{inputErrors.phone}</span>
                  )}
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
                  {inputErrors.address && (
                    <span className="text-danger">{inputErrors.address}</span>
                  )}
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
                  {inputErrors.image && (
                    <span className="text-danger">{inputErrors.image}</span>
                  )}
                </div>
                <div className="col-12">
                  <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
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

export default StudentCreate;

