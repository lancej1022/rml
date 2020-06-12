import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import NavBar from '../../components/Nav/Nav';
import HeroSearch from '../../components/HeroSearch';
// import Rating from '../../components/RatingModal';

import './PropertyResultStyle.scss';
import PropertyRatingItem from '../../components/PropertyRatingItem';
import { RouteProps, Route } from 'react-router-dom';

// Receives the 'match' params from React router, which can be used to grab a property id
const PropertyResult: React.FC<RouteComponentProps> = ({ match }) => {
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [topRating, setTopRating] = useState(false);

  const getDetails = () => {
    const body = JSON.stringify({ id: match.params });
    fetch('http://localhost:3000/propertyprofile', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
        Accept: 'Application/JSON',
      },
      body,
    })
      .then((res) => res.json())
      .then((parsed) => {
        setPropertyDetails(parsed);
        // setTopRating(<PropertyRatingItem rating={parsed[0]} />);
        setTopRating(true);
      })
      .catch((err) => window.alert('There was an error retrieving the results'));
  };

  useEffect(() => {
    getDetails();
  }, [propertyDetails.length]);

  return (
    <div className="super_container property-bg">
      <NavBar />

      <div className="property-result">
        <div
          className="parallax_background parallax-window property-background"
          //   className="property-background"
          data-parallax="scroll"
          //   data-image-src="images/properties.jpg"
          data-speed="0.8"
        />
        <div className="property-result__container">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="home_content d-flex flex-row align-items-end justify-content-start">
                  <div className="home_title">Search results</div>
                  <div className="breadcrumbs ml-auto">
                    <ul>
                      <li>
                        <a href="/">Home</a>
                      </li>
                      <li>Search Results</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HeroSearch />

      <div className="intro">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="intro_content d-flex flex-lg-row flex-column align-items-start justify-content-start">
                <div className="intro_title_container">
                  <div className="intro_title">Venice</div>
                  {/* The below code can be used to insert some "tags" for a property, but was deemed too much of a stretch feature for now */}
                  {/* <div className="intro_tags">
                    <ul>
                      <li>
                        <a href="#">Whiteboard Desks</a>
                      </li>
                      <li>
                        <a href="#">Floor-to-ceiling windows</a>
                      </li>
                      <li>
                        <a href="#">Nearby Scooters</a>
                      </li>
                      <li>
                        <a href="#">Lots of homeless peeps</a>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
            </div>
            {/* <div className="intro_price_container ml-lg-auto d-flex flex-column align-items-start justify-content-center"> */}
            {/* <div>For Sale</div> */}
            {/* <div className="intro_price">Leave Rating</div>
          </div> */}
          </div>
        </div>
        <div className="intro_slider_container">
          <div className="owl-carousel owl-theme intro_slider ">
            <div className="image-comment-container">
              <img
                className="property-image"
                src="http://localhost:3000/images/venice.png"
                alt=""
              />
              {topRating && <PropertyRatingItem topRating rating={propertyDetails[0]} />}
            </div>

            {/* <div class="owl-item">
                          <img src="images/intro_1.jpg" alt="" />
                      </div>

                      <div class="owl-item">
                          <img src="images/intro_1.jpg" alt="" />
                      </div> */}
          </div>

          {/* <div class="intro_slider_nav_container">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="intro_slider_nav_content d-flex flex-row align-items-start justify-content-end">
                  <div class="intro_slider_nav intro_slider_prev">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                  </div>
                  <div class="intro_slider_nav intro_slider_next">
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* </div> */}
        </div>
      </div>

      <section className="reviews-container">
        <div className="row">
          <div className="col-md-12 mt-4">
            <h3 className="ratings-heading">All reviews:</h3>
            {propertyDetails.map((rating, index) => {
              // the key = index is an anti-pattern here. the key should be tied to the rating ID but because its not serialized in our DB, we use index for now
              return (
                <PropertyRatingItem
                  topRating={false}
                  key={index}
                  // in order to avoid reversing the propertyDetails array, we just map over it backwards so that most recent reviews get displayed first
                  rating={propertyDetails[propertyDetails.length - 1 - index]}
                />
              );
            })}
          </div>
        </div>
      </section>
      {/* <Rating /> */}
    </div>
  );
};

export default PropertyResult;
