import React from 'react';
import ReactDOM from 'react-dom';

class Test extends React.Component {
  render() {

    return (
      <div>hello Test</div>
    )
  }
}

ReactDOM.render(<Test />, document.querySelector('#root'));
