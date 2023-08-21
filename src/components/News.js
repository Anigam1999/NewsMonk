import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

const News = (props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1)  
    }  

    const updateNews = async ()=> {
        props.setProgress(10)
        const url = `https://gnews.io/api/v4/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}`
        setLoading(true)
        let data = await fetch(url)
        props.setProgress(40)
        let parsedData = await data.json();
        props.setProgress(70)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
        console.log("data printed")
    }
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonk`;
        updateNews()
    }, [])

    const fetchMoreData = async ()=> {
        const url = `https://gnews.io/api/v4/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}`
        setPage(page+1)
        let data = await fetch(url)
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }
    return (
        <>
            <h1 className='text-center' style={{margin: '35px 0px', marginTop: '90px'}}>NewsMonk - Top Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                // next={fetchMoreData} requires pagination(production plan)
                hasMore={articles.length != totalResults}
                loader={<Spinner />}>
                
                <div className="container">
                <div className="row">
                    {articles.map((element)=>{
                        return <div key={element.url} className="col-md-4">
                            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.image} newsUrl={element.url} date={element.publishedAt} source={element.source.name} />
                        </div>})}
                </div>
                </div>
            </InfiniteScroll>
            
        </>
    ) 
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}
News.defaultProps = {
    country: "in",
    // pageSize: 8,
    category: 'general'
}

export default News
