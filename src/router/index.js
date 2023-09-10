import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home.js';
import About from '../pages/About.js';
import Contact from '../pages/Contact.js';
import Student from '../pages/Student.js';
import StudentCreate from '../pages/StudentCreate.js';
function MyRouter(){
     return(
         <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/about-us" element={<About/>}></Route>
            <Route path="/contact-us" element={<Contact/>}></Route>
            <Route path="/studentlist" element={<Student/>}></Route>
            <Route path="/studentlist/create" element={<StudentCreate/>}></Route>
         </Routes>
     )
}

export default MyRouter;