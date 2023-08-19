import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

export default class News extends React.Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);  
    }    
    constructor(props){
        super(props);
        this.state = {
            articles: [], 
            loading: false,
            page:1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonk`;
    }
    async updateNews(){
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=636e59ca0eed404d881688ddcd947162&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,
        loading: false})
    }
    async componentDidMount(){
        this.updateNews()
    }
    handlePrevClick = async ()=> {
        this.setState({page: this.state.page-1})
        this.updateNews()
    }
    handleNextClick = async ()=> {
        this.setState({page: this.state.page+1})
        this.updateNews()
    }

    render() {
        return (
        <div className="container my-3">
            <h1 className='text-center'>NewsMonk - Top Headlines</h1>
            {this.state.loading && <Spinner />}
            <div className="row">
                {!this.state.loading && this.state.articles.map((element)=>{
                    return <div key={element.url} className="col-md-4">
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                    </div>
                })}
            </div>
            <div className="container">
                <div className="d-flex justify-content-between">    
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page == (Math.ceil(this.state.totalResults/this.props.pageSize))} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        </div>
    )
  }
}