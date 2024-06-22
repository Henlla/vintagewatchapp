import { Box, TextField, TextareaAutosize } from "@mui/material";
import PageHeader from "../components/PageHeader";

const Contact = () => {
    return (
        <>
            <PageHeader title={"Contact"} curPage={"contact"} />
            <div className="">
                <section className="contact-area ptb-100 pt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="contacts-info">
                                    <h2>Get In Touch</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt in fel, malesuada mollis purus id sit in aliquet. Lectus eget morbi dui felis deman malesuada mollis purus.</p>
                                    <ul className="address">
                                        <li>
                                            <span>Email: </span>
                                            <a ><span className="__cf_email__" data-cfemail="d0b8b5bcbcbf90b2b9a4a2feb3bfbd">admin@gmail.com</span></a>
                                        </li>
                                        <li>
                                            <span>Call Us: </span>
                                            <a href="tel:+84 793766086">+84 793766086</a>
                                        </li>
                                        <li className="location">
                                            <span>Our Location: </span>
                                            123 Nguyen Hue, HCM city
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="contact-form">
                                    <h2>Message Us</h2>
                                    <TextField fullWidth label="Full name" size="small" />
                                    <div className="d-flex mt-3">
                                        <TextField className="pe-2" label="Email" size="small" />
                                        <TextField label="Phone number" size="small" />
                                    </div>
                                    <TextField
                                        className="mt-3"
                                        id="outlined-multiline-static"
                                        label="Message"
                                        multiline
                                        rows={4}
                                        fullWidth
                                    />
                                    <div className="d-flex justify-content-end">
                                        <button className="mt-2 text-white lab-btn">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="started-area bg-color-ee6a3e">
                    <div className="container">
                        <div className="started-bg">
                            <div className="started-content pb-5 pt-5">
                                <h3>Ready To Get Started?</h3>
                                <p>Explore BITR Payments, or create an account instantly and start accepting payments. You can also contact us to design a custom package for your new online business.</p>
                                <div className="started-btn">
                                    {/* <a asp-controller="Account" asp-action="Login" asp-area="Customer" className="default-btn">
                                        Start Now
                                    </a> */}
                                    {/* <a asp-controller="Home" asp-action="ContactUs" asp-area="Customer" className="default-btn active">
                                        Contact Us
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;