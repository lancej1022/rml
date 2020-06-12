import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  property: any;
}

const SearchResultItem: React.FC<Props> = ({ property }) => {
  // destructure the relevant property pieces right here
  // const {name, address, property_id, overallRating} = property;
  // you'll want to slice up the address into pieces using something like string.split(', '); so that you can grab the address/city/etc individually

  // set the id in our state so that it's not truly visible from the page html -> fire a fetch request when clicked?
  // the fetch request can either persist information in Redux, OR we can link to the results page and fire the fetch request on THAT page so we dont need redux
  // the non-redux approach would still need to link to the right page though so youd have to deal with router parameters which might be harder than Redux?
  const hardcodedPics: any[] = [
    // 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?h=350&auto=compress&cs=tinysrgb',
    // 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?h=350&auto=compress&cs=tinysrgb',
    // 'https://images.pexels.com/photos/358636/pexels-photo-358636.jpeg?h=350&auto=compress&cs=tinysrgb',
  ];

  // generates a random placeholder image from the above array
  const pickImg = () => {
    const index = Math.floor(Math.random() * hardcodedPics.length);
    return index;
  };

  return (
    <>
      <Link to={`/property-result/${property.id}`}>
        <div className="media">
          {/* <div className="fav-box">
        <i className="fa fa-heart-o" aria-hidden="true" />
      </div> */}
          <img
            className="d-flex align-self-start"
            // src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?h=350&auto=compress&cs=tinysrgb"
            src={hardcodedPics[pickImg()]}
            alt="house"
          />
          <div className="media-body pl-3">
            <div className="price">
              {/* make this the address */}
              {/* <Link to="/property-result"> */}
              {property.address}
              {/* </Link> */}
            </div>
            <div className="stats">
              <span>
                {/* make this the name */}
                <i className="fa fa-arrows-alt" />
                {property.name}
              </span>
              {/* <span>
                <i className="fa fa-bath" />2 Beadrooms
              </span> */}
            </div>
            {/* <div className="address">4062 Walnut Hill Drive Cincinnati</div> */}
          </div>
        </div>
      </Link>
    </>
  );
};

export default SearchResultItem;
