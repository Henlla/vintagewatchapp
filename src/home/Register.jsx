import React from 'react'
const subTitle = "Save The Day"
const title =(
    <h2 className='title'>Join for <b>All Vintage <span>Watch</span></b> for Sales</h2>
)
const desc = "Limidted Time Offer! Hurry Up";

const Register = () => {
  return (
    <div>
        <section className='register-section padding-tb pb-0'>
            <div className='container'>
                <div className='row g-4 row-cols-lg-2 row-cols-1 align-items-center'>
                    <div className='col'>
                        <div className='section-header'>
                            <span className='subtitle'>{subTitle}</span>
                            {title}
                            <p>{desc}</p>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='section-wrapper'>
                            <h4>Register now</h4>
                            <form className="register-form">
                                <input type="text" name='name' placeholder='Username' className='reg-input' />
                                <input type="email" name='email' placeholder='Email' className='reg-input' />
                                <input type="number" name='number' placeholder='Phone' className='reg-input' />
                                <button type='submit' className='lab-btn'>
                                    Register Now
                                     
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </div>
  )
}

export default Register