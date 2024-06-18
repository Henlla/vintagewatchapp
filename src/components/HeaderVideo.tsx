import "../App.css";

const HeaderVideo = () => {
  return (
    <div className="py-5 px-4">
       <section className="experience ">
      <div className="experience_title">
        <p>HOW DO WE WORKS</p>
        <h2>DIGITAL EXPERIENCE</h2>
        <p>
          We are committed to providing our customers with exceptional service
          while offering our <br />
          employees the best training.
        </p>
      </div>
      <div className="experience_content">
        <video
          controls
          poster="/image-video/home_slider.jpg"
          src="/image-video/Xwatch chia sẻ các bước thẩm định đồng hồ thật - giả.mp4"
        ></video>
      </div>
    </section>
    </div>
  )
}

export default HeaderVideo
