import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';
import SideContents from './SideContents';
import MainContents from './MainContents';
import reportWebVitals from './reportWebVitals';

class Container extends React.Component {
  render() {
    return (
      <div id="container">
        <MainContents />
        <SideContents />
      </div>
    );
  }
}
class Wrap extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <Header />
        <Container />
      </div>
    )
  }

}

ReactDOM.render(
  <Wrap />,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
