/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import img from "../assets/welcome.svg";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    batch: '',
    loading: false
  });
  const [agree, setAgree] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const [successMessage, setSuccessMessage] = useState('');
  const [submitted, setSubmitted] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
   
    if (submitted) {
      const emptyFields = Object.keys(formData).filter(key => formData[key] === '');
      if (emptyFields.length > 0) {
        setErrorMessage('Please fill in all required fields.');
        
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
    }
  }, [formData, submitted]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true); 

   
    const emptyFields = Object.keys(formData).filter(key => formData[key] === '');
    if (emptyFields.length > 0) {
      setErrorMessage('Please fill in all required fields.');
      
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    setFormData({ ...formData, loading: true });
    try {
      const res = await axios.post('http://localhost:8080/api/student/register', formData);
      if (res && res.data.success) {
        setSuccessMessage(res.data.message);
        navigate('/login');
       
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000); 
      } else {
        setErrorMessage(res.data.message);
        
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      } else {
        setErrorMessage('An unexpected error occurred');
        
        setTimeout(() => {
          setErrorMessage('');
        }, 5000);
      }
    } finally {
      setFormData({ ...formData, loading: false });
    }
  };

  return (
    <>
      <div className="container ">
        <div className="row d-flex align-items-center  ">
          <div className="col-lg-8 col-md-12">
            <img src={img} className="img-fluid" alt="Welcome" />
          </div>
          <div className="col-lg-4 col-md-12">
            <h1>Registration</h1>
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <form id="registerForm" className="mt-2" onSubmit={handleSubmit}>
             
              <div className="form-group">
                <label htmlFor="name">Name <sup className="text-danger">*</sup></label>
                <input 
                  id="name" 
                  className={`form-control ${submitted && formData.name === '' ? 'is-invalid' : ''}`} 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                />
                
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email address <sup className="text-danger">*</sup></label>
                <input 
                  id="email" 
                  className={`form-control ${submitted && formData.email === '' ? 'is-invalid' : ''}`} 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                />
          
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password <sup className="text-danger">*</sup></label>
                <input 
                  id="password" 
                  className={`form-control ${submitted && formData.password === '' ? 'is-invalid' : ''}`} 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleInputChange} 
                />
              </div>
   
              {/* Batch */}
              <div className="form-group">
                <label htmlFor="batch">Batch</label>
                <input 
                  id="batch" 
                  className={`form-control ${submitted && formData.password === '' ? 'is-invalid' : ''}`}
                  type="text" 
                  name="batch" 
                  value={formData.batch} 
                  onChange={handleInputChange} 
                />
              </div>

              {/* Agree to terms and conditions */}
              <div className="form-group form-check">
                <input 
                  id="agree" 
                  className={`form-check-input ${submitted && formData.password === '' ? 'is-invalid' : ''}`}
                  type="checkbox" 
                  name="agree" 
                  checked={agree} 
                  onChange={() => setAgree(!agree)} 
                />
                <label className="form-check-label" htmlFor="agree">I agree to terms and conditions</label>
              </div>

              {formData.loading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <button type="submit" className="btn btn-primary">
                  REGISTER
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
 
  );
};

export default Register;
