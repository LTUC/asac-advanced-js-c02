import React from 'react';

import { If, Then, Else, When } from './if';
import ReactJson from 'react-json-view';

import loading from '../images/loading.gif';

const Results = (props) => {

  return (
    <section className="results">
      <If condition={props.loading}>
        <Then>
          <div className="loading">
            <img src={loading} alt="Loading" />
          </div>
        </Then>
        <Else>
          <When condition={props.results}>
            <h2>Headers</h2>
            <ReactJson src={props.headers} />
            <h2>Results</h2>
            <ReactJson src={props.results} />
          </When>
        </Else>
      </If>
    </section>
  );

};

export default Results;
