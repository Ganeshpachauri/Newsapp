import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, desc, imgUrl, newsUrl,author,date,source } = this.props;
    return (
      <div>
        <div className="card">
        <span className=" position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex:'1'}}> {source} </span>
          <img src={imgUrl} alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <p className="card-text"><small className="text-muted">by {author?author:"Unknown"}, {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-dark" rel="noopener noreferrer">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem