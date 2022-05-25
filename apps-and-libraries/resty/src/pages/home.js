import React from 'react';
import md5 from 'md5';
import axios from 'axios';

import Form from '../components/form.js';
import Results from '../components/results.js';
import History from '../components/history-sidebar.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      loading: false,
      request: {},
      history: {},
    };
  }

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  }

  updateHistory(options) {
    let hash = md5(JSON.stringify(options));
    this.setState({ history: { ...this.state.history, [hash]: options } }, () => {
      localStorage.setItem('history', JSON.stringify(this.state.history));
    });
  }

  updateResults = (headers, results) => {
    this.setState({ headers, results });
  };

  updateRequest = (request) => {
    console.log('update', request);
    this.setState({ request });
  }

  fetchResults = async (request) => {

    try {

      this.toggleLoading();

      // apply default
      if (!request.method) { request.method = "get"; }

      this.updateRequest(request);

      console.log('running', request);
      let response = await axios(request);

      this.toggleLoading();

      request.data = response.data;
      this.updateHistory(request);
      this.updateResults(response.headers, response.data);

    }
    catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    let history = JSON.parse(localStorage.getItem('history'));
    history && this.setState({ history });
  }

  render() {
    console.log('render', this.state.request);
    return (
      <>
        <Form request={this.state.request} handler={this.fetchResults} />
        <main>
          <History handler={this.updateRequest} calls={this.state.history} />
          <Results loading={this.state.loading} headers={this.state.headers} results={this.state.results} />
        </main>
      </>
    );
  }
}

export default App;
