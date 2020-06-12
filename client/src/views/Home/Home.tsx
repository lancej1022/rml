import React, { useState } from 'react';
import Hero from '../../components/Hero';
import NavBar from '../../components/Nav';
import ResultsMap from '../../components/ResultsMap';

const Home: React.FC = () => {
  // initially our results will be empty
  const [results, setResults] = useState([]);
  // resultsFound is a boolean that allows us to display an "add property?" prompt if it becomes falsy because no results were found after searching
  const [resultFound, setResultFound] = useState(true);

  // function that will be drilled down to the HeroSearch component to fire off search requests while changing state in this Home component
  const handleSearch = (address: string) => {
    const body = JSON.stringify({ address });
    fetch('/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
        Accept: 'Application/JSON',
      },
      body,
    })
      .then((res) => res.json())
      .then((parsed) => {
        // pushed the array of results into our state
        if (parsed.length) {
          setResults(parsed);
          setResultFound(true);
        } else {
          // if no results found, wipe the search results and display an "add property" button
          setResultFound(false);
          setResults([]);
        }
      });
  };

  return (
    <div className="super_container">
      <NavBar />
      <Hero handleSearch={handleSearch} />
      <ResultsMap results={results} resultFound={resultFound} />
    </div>
  );
};
export default Home;
