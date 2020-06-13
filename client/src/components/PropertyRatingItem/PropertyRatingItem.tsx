import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faFlag } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

import './PropertyRatingItemStyle.scss';

interface Props {
  topRating: any;
  rating: any;
}

const PropertyRatingItem: React.FC = ({ topRating, rating }: Props) => {
  if (rating) {
    const months = {
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December',
    };
    // slices the created_at on the letter T so we get 'year-month-date' and then splits that segment on the dashes
    // ultimately we wind up with an array like ['year', 'month', 'date'] which we can then format
    const dbTimestap = rating.created_at.slice(0, 10).split('-');
    const prettyTimestamp = `${months[dbTimestap[1]]} ${dbTimestap[2]}, ${dbTimestap[0]}`;

    let containerClasses = 'rating-container';
    if (topRating) {
      containerClasses += ' top-rating';
    }
    return (
      <div className={containerClasses}>
        {topRating && <p className="rating-heading top-review">Top Review</p>}
        {/* this div contains the overall rating as well as a thumbs up / down options so other people can judge the review */}
        <div className="ratings">
          <div className="rating-container__left">
            <h4 className="rating-heading">Rating</h4>
            <p className="rating-number">{rating.overallRating}</p>
            <h5 className="timestamp">{prettyTimestamp}</h5>
          </div>
          {/* this div contains the comment, when it was posted, relevant images(?) */}
          <div className="rating-container__right">
            <div>
              <h5 className="rating-subheading">Respectful: {rating.res}</h5>
              <h5 className="rating-subheading">Communication: {rating.comm}</h5>
              <h5 className="rating-subheading">Flexibility: {rating.flex}</h5>
              <h5 className="rating-subheading">Transparency: {rating.tran}</h5>
              <p className="rating-comment">&quot;{rating.comment}&quot;</p>

              <div className="rating-footer">
                <div className="rating-footer__left">
                  <FontAwesomeIcon
                    className="rating-footer__icon"
                    color="#487fee"
                    icon={faThumbsUp}
                    data-tip
                    data-for="upvote"
                  />
                  <ReactTooltip id="upvote" effect="solid" place="bottom">
                    <span>Mark as helpful</span>
                  </ReactTooltip>
                  <span>0</span>

                  <FontAwesomeIcon
                    className="rating-footer__icon"
                    color="#32fa95"
                    icon={faFlag}
                    data-tip
                    data-for="flagReview"
                  />
                  <span>Flag review</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // return null;
};

export default PropertyRatingItem;
