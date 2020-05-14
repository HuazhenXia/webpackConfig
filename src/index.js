import React from 'react';
import ReactDOM from 'react-dom';

import logo from './imgs/logo.jpg';
import './index.less';


class Test extends React.Component {
  render() {

    return (
      <div className='red'>hello Test
        <img src={logo}/>
      </div>
    )
  }
}

ReactDOM.render(<Test />, document.querySelector('#root'));
