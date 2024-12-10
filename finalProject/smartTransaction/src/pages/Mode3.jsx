import React from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';

const Mode3 = () => {

  const [email, setEmail] = useState("");
  const [sendOtpClicked, setSendOtpClicked] = useState(false)

  const [formData, setFormData] = useState({
    amount: '',
    pin: ''
  });

  let navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const sendOtpClickedFunction = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please Enter Value for Email")
      return
    }

    if (!validateEmail(email)) {
      alert("Please Enter Valid Email")
      return
    }

    
    try {
      const objectToSend = {
        email: email
      }
      const response = await axios.post('http://localhost:5555/email/sendotp', objectToSend);
      console.log(response.data);

      if (response.data.error) {
        alert(response.data.message)
      } else {
        alert("Email Sent")
        setSendOtpClicked(true)
      }
    } catch (error) {
      console.error('Server Error', error);
      alert("Server Error");
    }
  }

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
      console.log({ formData });
      const objectToSend = {
        email: email,
        ammount: formData.amount,
        pin: formData.pin
      }
      const response = await axios.post('http://localhost:5555/account/transaction-mode3', objectToSend);
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
      <Navbar />
      <div className='my-5'>
        <h3 className='text-center'>Please Enter Following Details</h3>

      </div>
      <div className='container contact_div'>
        <div className='row'>
          <div className='col-md-6 col-10 mx-auto'>
            <div >
              <form className='border border-2 p-5 border-black rounded-4 '>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Email Address</label>
                  <input type="text" className="form-control" disabled={sendOtpClicked} onChange={(e) => { setEmail(e.target.value) }} id="exampleFormControlInput1" placeholder="Please Enter Your Email Address" />
                </div>

                <div className=' mt-2 mb-2 text-center'>
                  <button className='btn-get-started  px-5 py-3' disabled={sendOtpClicked} onClick={sendOtpClickedFunction}>Send OTP</button>
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Amount</label>
                  <input type="number" disabled={!sendOtpClicked} className="form-control" id="amount" name="amount" onChange={handleChange} placeholder="Please Enter Amount " />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">PIN</label>
                  <input type="number" disabled={!sendOtpClicked} className="form-control" id="pin" name="pin" onChange={handleChange} placeholder="Please Enter Your OTP as a PIN & Click on Withdraw" />
                </div>
                <div className=' mt-5 text-center'>
                  <button className='btn-get-started  px-5 py-3' onClick={handleSubmit} >Withdraw</button>
                </div>
              </form>
            </div>

          </div>

        </div>

      </div>

    </>

  )
}

export default Mode3