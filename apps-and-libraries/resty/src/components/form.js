import React from 'react';

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = { request: {} }
    this.formRef = React.createRef();
  }

  changeURL = (e) => {
    let url = e.target.value;
    this.setState({ request: { ...this.state.request, url } })
  };

  changeMethod = (method) => {
    this.setState({ request: { ...this.state.request, method } })
  };

  changeBody = (e) => {
    try {
      let body = JSON.parse(e.target.value);
      this.setState({ request: { ...this.state.request, body } })
    } catch (e) { }
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.props.handler(this.state.request);
  };

  // We need to do some special things with state, based on changed props
  // This can be mitigated if we don't have the form as a separate component ... or
  // If we used a 3rd party form that's designed to redraw itself ... or
  // Or in a functional component with hooks (which we've not taught on yet)
  UNSAFE_componentWillReceiveProps(nextProps) {
    let url, method, body;
    if (nextProps.request.url !== this.props.request.url) { url = nextProps.request.url }
    if (nextProps.request.method !== this.props.request.method) { method = nextProps.request.method }
    if (nextProps.request.body !== this.props.request.body) { body = nextProps.request.body }
    if (url || method || body) {
      // Reset the form
      // this.formRef.reset(); // Would be great if a reference was able to be controlled in this way
      // But, we'll instead have to do it old school, directly
      document.getElementById('api').reset();
      // Reset the state
      this.setState({ request: { ...this.state.request, method, url, body } })
    }
  }



  render() {
    return (
      <form id="api" ref={this.formRef} onSubmit={this.handleSubmit}>
        <div>
          <input
            type="text"
            name="url"
            defaultValue={this.state.request.url}
            placeholder="http://api.url.here"
            onChange={this.changeURL}
          />
          <button>GO!</button>
        </div>
        <div className="methods">
          <span className={`method ${this.state.request.method === 'get'}`} onClick={() => this.changeMethod('get')}>
            GET
          </span>
          <span className={`method ${this.state.request.method === 'post'}`} onClick={() => this.changeMethod('post')}>
            POST
          </span>
          <span className={`method ${this.state.request.method === 'put'}`} onClick={() => this.changeMethod('put')}>
            PUT
          </span>
          <span className={`method ${this.state.request.method === 'delete'}`} onClick={() => this.changeMethod('delete')}>
            DELETE
          </span>

          <textarea name="data" onChange={this.changeBody} defaultValue={this.state.request.data} />

        </div>
      </form >
    );
  }
}

export default Form;
