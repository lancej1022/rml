import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPencilAlt, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import HeroSearch from '../HeroSearch';

interface Props {
  handleSearch: (address: string) => void;
}

const Hero: React.FC<Props> = ({ handleSearch }) => {
  return (
    <main className="home">
      {/* used to contain the title */}
      <div className="home_slider_container">
        <div className="owl-carousel owl-theme home_slider">
          <div className="owl-item">
            <div className="home_slider_background" />
            <div className="slide_container">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="slide_content">
                      <div className="home_subtitle">
                        The #1 resource for reviewing rental property landlords
                      </div>
                      <div className="home_title">Rate My Landlord</div>
                      <div className="home_details">
                        <ul className="home_details_list d-flex flex-row align-items-center justify-content-start">
                          <li>
                            <div className="home_details_image">
                              <FontAwesomeIcon color="white" icon={faSearch} />
                            </div>
                            <span> Search</span>
                          </li>
                          <li>
                            <div className="home_details_image">
                              <FontAwesomeIcon color="white" icon={faPencilAlt} />
                            </div>
                            <span> Review</span>
                          </li>
                          <li>
                            <div className="home_details_image">
                              {/* <img src="images/icon_3.png" alt="" /> */}
                              {/* <img src={require('../../images/icon_3.png')} alt="" /> */}
                              <FontAwesomeIcon color="white" icon={faEyeSlash} />
                            </div>
                            <span> Anonymously</span>
                          </li>
                        </ul>
                      </div>
                      {/* <div className="home_price">$ 1. 245 999</div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HeroSearch handleSearch={handleSearch} />
    </main>
  );
};

export default Hero;
