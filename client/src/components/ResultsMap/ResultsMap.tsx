import React from 'react';
import { Link } from 'react-router-dom';

import './ResultsMapStyle.scss';
import SearchResultItem from '../SearchResultItem/searchResultItem';

interface Props {
  results: any[];
  resultFound: boolean;
}

const ResultsMap: React.FC<Props> = ({ results, resultFound }) => {
  return (
    <section className="search-box">
      <h2 className="text-center">
        {resultFound ? 'Search Results' : 'No Results Found'}
      </h2>
      <div className="container-fluid">
        <div className="row">
          <div className="slim-scroll">
            <div className="col-md-12 listing-block">
              {results.map((property) => {
                return <SearchResultItem property={property} key={property.id} />;
              })}
              {/* if resultFound becomes falsy, display the option to add a rating for the missing property */}
              {!resultFound && (
                <div>
                  <h4>Would you like to add the first review for this property?</h4>
                  <Link to="/add-property">Add Review</Link>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-7 map-box mx-0 px-0">
            <iframe
              title="map"
              width="100%"
              height="495"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src="https://maps.google.co.uk/maps?f=q&source=s_q&hl=en&geocode=&815&sspn=8.047465,13.666992&ie=UTF8&hq=&hnear=15+Springfield+Way,+Hythe+CT21+5SH,+United+Kingdom&t=m&z=14&ll=51.077429,1.121722&output=embed"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsMap;
