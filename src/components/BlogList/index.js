import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'
import './index.css'

class BlogList extends Component {
  state = {BlogListItems: [], isLoading: true}

  componentDidMount() {
    this.fetchingList()
  }

  fetchingList = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const formattedData = data.map(eachItem => ({
      id: eachItem.id,
      title: eachItem.title,
      imageUrl: eachItem.image_url,
      avatarUrl: eachItem.avatar_url,
      author: eachItem.author,
      topic: eachItem.topic,
    }))
    this.setState({BlogListItems: formattedData, isLoading: false})
  }

  render() {
    const {BlogListItems, isLoading} = this.state

    return (
      <div>
        {isLoading ? (
          <div testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          BlogListItems.map(eachItem => (
            <BlogItem key={eachItem.id} itemDetails={eachItem} />
          ))
        )}
      </div>
    )
  }
}

export default BlogList