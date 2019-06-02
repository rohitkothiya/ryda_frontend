import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "./Card/Card.jsx";
import image1 from "../images/slideshow1.jpg";
import image3 from "../images/slideshow3.jpg";
import image4 from "../images/slideshow4.jpg";

const carouselStyle = {
  section: {
    padding: "70px 0"
  },
  marginAuto: {
    marginLeft: "auto !important",
    marginRight: "auto !important"
  }
};

class SectionCarousel extends React.Component {
  render() {
    const { classes } = this.props;
    const settings = {
      arrows: false,
      fade: true,
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };
    return (
      <div>
        <Card carousel style={{ marginTop: "0", marginBottom: "0", boxShadow: 'unset', borderRadius: '0' }}>
          <Carousel {...settings}>
              <img src={image1} alt="First slide" style={{ width: "100%" }} />
              <img src={image3} alt="Third slide" style={{ width: "100%" }} />
              <img src={image4} alt="Third slide" style={{ width: "100%" }} />
          </Carousel>
        </Card>
      </div>
    );
  }
}

export default withStyles(carouselStyle)(SectionCarousel);
