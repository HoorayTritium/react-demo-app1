import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

function Contents(props) {
  let createInnerHTML = (str) => {
    return { __html: str };
  }

  return (
    <div className="content" id={props.id}>
      <h2 className="entry_header">{props.title}</h2>
      <div className="entry_body"
        dangerouslySetInnerHTML={createInnerHTML(props.text + "<hr/>")}>
      </div>
      <div className="entry_footer">
        <div className="pagetop">
          <p>{props.date}</p>
          <a href="#header" title="ページのトップへ">ページのトップへ</a>
        </div>
      </div>
    </div>);
}

class Header extends React.Component {
  render() {
    return (
      <a href="?#">
        <div id="header">
          <h1 className="noDecoration">pon&nbsp;suke人生リークBlog</h1>
        </div>
      </a>
    );
  }
}

class MainContents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    const key = {
      headers: { 'X-API-KEY': '9b30e206-4b28-4453-91f5-5d39d40d15a3' },
    };
    return fetch('https://ponsuke.microcms.io/api/v1/diary', key)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: true,
          data: responseJson.contents,
        });
        console.log(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
  }
  renderContents(i) {
    return <Contents
      title={i.title}
      text={i.main}
      date={i.updatedAt}
    />;
  }

  render() {
    if (this.state.loading) {
      return (
        <div id="main" >
          {this.state.data.map(d => {
            return this.renderContents(d)
          })}
        </div>
      );
    } else {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
  }
}

class SideContents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  componentDidMount() {
    const key = {
      headers: { 'X-API-KEY': '9b30e206-4b28-4453-91f5-5d39d40d15a3' },
    };
    return fetch('https://ponsuke.microcms.io/api/v1/side', key)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: true,
          data: responseJson.contents,
        });
        console.log(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
  }
  renderContents(d) {
    console.log(d);
    return <Contents
      title={d.title}
      text={d.content}
      id="profile"
    />;
  }
  render() {
    if (this.state.loading) {
      return (
        <div id="side" >
          {this.state.data.map(d => {
            return this.renderContents(d)
          })}
        </div>
      );
    } else {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
  }
}

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
