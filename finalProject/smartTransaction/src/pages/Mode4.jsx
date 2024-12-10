import React, { useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import QRCodeModal from '../components/QrCodeModal';

const Mode4 = () => {
  const [email, setEmail] = useState("");
  const [ammount, setAmmount] = useState("");
  const [otp, setOtp] = useState(0);
  const [sendOtpClicked, setSendOtpClicked] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [qrCodeLink, setQrCodeLink] = useState("");
  const [showQrCodeModal, setShowQrCodeModal] = useState(false);

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

    setSendOtpClicked(true)
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
      }
    } catch (error) {
      console.error('Server Error', error);
      alert("Server Error");
    }
  }

  const verifyOtpClickedFunction = async (e) => {
    e.preventDefault();

    try {
      const objectToSend = {
        email: email,
        otp: parseInt(otp)
      }

      if (!otp) {
        alert("Please Enter Value for Otp")
        return
      }


      const response = await axios.post('http://localhost:5555/email/verifyOtp', objectToSend);
      console.log(response.data);

      if (response.data.error) {
        alert(response.data.message)
      } else {
        alert("Otp Verified")
        setOtpVerified(true)
      }
    } catch (error) {
      console.error('Server Error', error);
      alert("Server Error");
    }

    setSendOtpClicked(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (!ammount) {
        alert("Please Enter Ammount")
        return
      }

      const objectToSend = {
        ammount: ammount
      }
      const response = await axios.post('http://localhost:5555/account/generate-qr-code', objectToSend);
      console.log(response.data);

      if (response.data.error) {
        alert(response.data.message)
      } else {
        setQrCodeLink(response.data.url);
        setShowQrCodeModal(true)
      }

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
                  <input type="text" className="form-control" disabled={otpVerified} onChange={(e) => { setEmail(e.target.value) }} id="exampleFormControlInput1" placeholder="Please Enter Your Email Address" />
                </div>
                <div className=' mt-2 mb-2 text-center'>
                  <button className='btn-get-started  px-5 py-3' disabled={otpVerified} onClick={sendOtpClickedFunction}>Send OTP</button>
                </div>


                <div className="mb-3">
                  <input type="number" className="form-control" disabled={!sendOtpClicked} onChange={(e) => { setOtp(e.target.value) }} id="exampleFormControlInput1" placeholder="Please Enter OTP" />
                </div>

                <div className=' mt-2 mb-2 text-center'>
                  <button className='btn-get-started  px-5 py-3' disabled={!sendOtpClicked} onClick={verifyOtpClickedFunction}>Verify OTP</button>
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Amount</label>
                  <input type="number" disabled={!otpVerified} className="form-control" id="amount" name="amount" onChange={(e) => { setAmmount(e.target.value) }} placeholder="Please Enter Amount " />
                </div>

                <div className=' mt-5 text-center'>
                  <button className='btn-get-started  px-5 py-3' disabled={!otpVerified} onClick={handleSubmit} >Withdraw</button>
                </div>
              </form>
            </div>

          </div>

        </div>

      </div>

      {qrCodeLink && <QRCodeModal url={qrCodeLink} show={showQrCodeModal} onHide={() => setShowQrCodeModal(false)} />}



    </>
  )
}

export default Mode4