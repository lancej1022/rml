import React, { useState, SyntheticEvent } from 'react';

interface Props {
  handleSearch: (address: string) => void;
}

const HeroSearch: React.FC<Props> = ({ handleSearch }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    handleSearch(search);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="home_search_container">
            <div className="home_search_content">
              <form
                action="#"
                className="search_form d-flex flex-row align-items-start justfy-content-start"
                onSubmit={handleSubmit}
              >
                <div className="search_form_content d-flex flex-row align-items-start justfy-content-start flex-wrap">
                  <input
                    className="search_form_input"
                    placeholder="Enter an address, city, or name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <button type="submit" className="search_form_button ml-auto">
                  search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSearch;
