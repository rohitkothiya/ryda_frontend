import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "./Card/Card.jsx";
import image1 from "../road_safety.jpg";
import image2 from "../road_safety.jpg";
import image3 from "../road_safety.jpg";

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
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };
    return (
      <div style={{ height: "500px" }}>
        <Card carousel style={{ marginTop: "0", marginBottom: "0" }}>
          <Carousel {...settings}>
            <div>
              <img src={image1} alt="First slide" style={{ width: "100%" }} />
              {/* <div className="slick-caption">
                    Going on a vacation? Don’t forget your travel vaccinations. These and regular immunizations, such as flu shots, are part of our every day services.
                    </div>   */}
              {/* <div className="slick-sub-caption">
                      
                        Yellowstone
                        National Park, United States
                      
                    </div>   */}
            </div>
            <div>
              <img src={image1} alt="Second slide" style={{ width: "100%" }} />
              {/* <div className="slick-caption">
                      
                        Somewhere Beyond,
                        United States
                      
                    </div> */}
              {/* <div className="slick-sub-caption">
                      
                        Yellowstone
                        National Park, United States
                      
                    </div>   */}
            </div>
            <div>
              <img src={image1} alt="Third slide" style={{ width: "100%" }} />
              {/* <div className="slick-caption">
                      
                        Yellowstone
                        National Park, United States
                      
                    </div> */}
              {/* <div className="slick-sub-caption">
                      
                        Yellowstone
                        National Park, United States
                      
                    </div>   */}
            </div>
          </Carousel>
        </Card>
      </div>
    );
  }
}

export default withStyles(carouselStyle)(SectionCarousel);
