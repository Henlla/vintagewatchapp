import "../App.css";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const CaroselComponent = () => {
   var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    
  };

  return (
    <div className="carousel_list py-4 px-10 ">
      <Slider {...settings}>
        <div className="image-container">
          <img src="https://thumuadonghohieu.com/wp-content/uploads/2019/03/Logo-Rolex.jpg" alt="Item 1" />
        </div>
        <div className="image-container">
          <img src="https://thietkelogo.mondial.vn/wp-content/uploads/2024/01/Piaget-Logo.jpg" alt="Item 2" />
        </div>
        <div className="image-container">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Omega_Logo.svg/2560px-Omega_Logo.svg.png" alt="Item 3" />
        </div>
        <div className="image-container">
          <img src="https://i.pinimg.com/originals/c3/88/1d/c3881d388a8d2bf72550d0254d16f8bc.png" alt="Item 4" />
        </div>
        <div className="image-container">
          <img src="https://1000logos.net/wp-content/uploads/2016/10/Cartier-Logo-History.jpg" alt="Item 5" />
        </div>
        <div className="image-container">
          <img src="https://shop.baselwatch.com/cdn/shop/collections/casio-logo_1200x1200.webp?v=1697544494" alt="Item 6" />
        </div>
        <div className="image-container">
          <img src="https://1000logos.net/wp-content/uploads/2018/10/Orient-Logo.png" alt="Item 7" />
        </div><div className="image-container">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVAqSUlF8zCXLf0zp0jwcd9RIueLyRtjD8YQ&s" alt="Item 6" />
        </div>
      </Slider>
    </div>
  );
};

export default CaroselComponent
