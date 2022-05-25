import React from 'react';
import { withRouter } from 'react-router-dom';

function History(props) {

  function loadRequest(apiCall) {
    props.handler(apiCall);
    props.history.push('/');
  }

  return (
    <aside className="history">
      <ul>
        {
          Object.keys(props.calls).map(key =>
            <li key={key}>
              <span className={`method ${props.calls[key].method}`}>{props.calls[key].method}</span>
              <button className="url" onClick={() => loadRequest(props.calls[key])}>{props.calls[key].url}</button>
            </li>,
          )
        }
      </ul>
    </aside>
  );
}

export default withRouter(History);
