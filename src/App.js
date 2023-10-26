import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'



export default class App extends Component {
  pageNo = 6;
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            height={5}
            color='#035efc'
            progress={ this.state.progress}

          />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress}  key="general" pageSize={this.pageNo} country="in" category="general" />} />
            <Route path="/business" element={<News setProgress={this.setProgress}  key="business" pageSize={this.pageNo} country="in" category="business" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress}  key="entertainment" pageSize={this.pageNo} country="in" category="entertainment" />} />
            <Route path="/general" element={<News setProgress={this.setProgress}  key="general" pageSize={this.pageNo} country="in" category="general" />} />
            <Route path="/health" element={<News setProgress={this.setProgress}  key="health" pageSize={this.pageNo} country="in" category="health" />} />
            <Route path="/science" element={<News setProgress={this.setProgress}  key="science" pageSize={this.pageNo} country="in" category="science" />} />
            <Route path="/sports" element={<News setProgress={this.setProgress}  key="sports" pageSize={this.pageNo} country="in" category="sports" />} />
            <Route path="/technology" element={<News setProgress={this.setProgress}  key="technology" pageSize={this.pageNo} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

