import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'; // Assuming you are using React Router

const Mode1 = () => {
  const [formData, setFormData] = useState({
    account_number: '',
    full_name: '',
    amount: '',
    pin: ''

  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const objectToSend = {
        accountNumber: formData.account_number,
        name: formData.full_name ,
        ammount: formData.amount,
        pin: formData.pin
      }
      const response = await axios.post('http://localhost:5555/account/transaction-mode1', objectToSend);
      console.log(response.data);

      if (response.data.error) {
        alert(response.data.message)
      } else {
        alert("Transaction Successful")
      }

      setTimeout(() => {
        navigate('/modes')
      }, 200);
    } catch (error) {
      console.error('Error debiting money:', error);
      alert("Server Error");
      setTimeout(() => {
        navigate('/modes')
      }, 200);
    }
  };

  return (
    <>
      {/* Your Navbar component */}
      <div className='my-5'>
        <h3 className='text-center'>Please Enter Following Details At Mode-1</h3>
      </div>
      <div className='container contact_div'>
        <div className='row'>
          <div className='col-md-6 col-10 mx-auto'>
            <div>
              <form className='border border-2 p-5 border-black rounded-4'>
                <div className="mb-3">
                  <label htmlFor="accountNumber" className="form-label">Account No</label>
                  <input type="number" className="form-control" id="accountNumber" name="account_number" value={formData.account_number} onChange={handleChange} placeholder="Enter Your Account No." />
                </div>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Your Full Name</label>
                  <input type="text" className="form-control" id="fullName" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Enter Full Name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">Amount </label>
                  <input type="number" className="form-control" id="amount" name="amount" value={formData.amount} onChange={handleChange} placeholder="Enter Amount" />
                </div>
                <div className="mb-3">
                  <label htmlFor="pin" className="form-label">PIN</label>
                  <input type="password" className="form-control" id="pin" name="pin" value={formData.pin} onChange={handleChange} placeholder="Please Enter Your PIN" />
                </div>
                <div className=' mt-5 text-center'>
                  <button className='btn-get-started  px-5 py-3' onClick={handleSubmit}>Withdraw</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}
export default Mode1
