import React from 'react';
import ReactDOM from 'react-dom';

import './index.less';


class Test extends React.Component {
  render() {

    return (
      <div className='red'>hello Test</div>
    )
  }
}

ReactDOM.render(<Test />, document.querySelector('#root'));
