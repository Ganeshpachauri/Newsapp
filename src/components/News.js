import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async newsUpdate() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b01f3118ff70465f844b7b5346bea575&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults, 
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.newsUpdate();
    }
    handlePrevious = async () => {
        this.setState({ page: this.state.page - 1 })
        this.newsUpdate();
    }
    handleNext = async () => {
        this.setState({ page: this.state.page + 1 })
        this.newsUpdate();
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1, loading: true })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b01f3118ff70465f844b7b5346bea575&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
        })
        
    };

    render() {
        return (
            <>

                <h1 className="text-center" style={{ margin: '35px 0px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {/* {this.state.loading  && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    
                   >
                    <div className="container">
                        <div className="row my-3">
                            {this.state.articles.map((element, index) => {
                                return <div key={index} className="col-md-4 mb-3">
                                    <NewsItem title={element.title ? element.title : ""} desc={element.description ? element.description : ""} imgUrl={!element.urlToImage ? "https://imgeng.jagran.com/images/2023/sep/led%20tv1695717967968.jpg" : element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} className="card-img-top" />
                                </div>
                            })}

                        </div>
                    </div>
                </InfiniteScroll>

            </>
        )
    }
}

export default News