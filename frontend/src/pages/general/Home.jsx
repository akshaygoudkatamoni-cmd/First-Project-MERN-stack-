import React, { useState, useRef, useEffect } from 'react'
import '../../styles/reels.css'
import api from "../api";
import { Link } from 'react-router-dom'
import ReelItem from "../../components/ReelItem"
import ReelsLoading from "../../components/ReelsLoading"


const Home = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const videoRefs = useRef(new Map())
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const options = { root: null, threshold: 0.6 }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.dataset.id
        const vid = videoRefs.current.get(id)
        if (!vid) return

        if (entry.isIntersecting) {
          vid.play && vid.play().catch(() => {})
        } else {
          try { vid.pause && vid.pause() } catch (e) {}
        }
      })
    }, options)

    const items = containerRef.current.querySelectorAll('.reel-item')
    items.forEach(item => observer.observe(item))

    return () => observer.disconnect()
  }, [videos])

  useEffect(() => {
    let mounted = true
    api.get('/api/food', { withCredentials: true })
      .then(response => {

        if (mounted) {
          setVideos(response.data.foodItems || [])
        }

      })
      .catch((error) => {
        if (mounted) {
          setVideos([])
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false)
        }
      })

    return () => { mounted = false }
  }, [])

  async function likeVideo(item) {

    const response = await api.post(`/api/food/like`, {foodId: item._id}, { withCredentials: true })

    if(response.data.like) { // liked the video
        setVideos(prev => prev.map(v => v._id === item._id ? {...v, likeCount: (v.likeCount ?? 0) + 1} : v))
    }else { // unliked the video
        setVideos(prev => prev.map(v => v._id === item._id ? {...v, likeCount: (v.likeCount ?? 0) - 1} : v))
    }

  }

  async function bookmarkVideo(item) {
    const response = await api.post(`/api/food/save`, {foodId: item._id}, { withCredentials: true })

    if(response.data.save) {
        // Bookmarked the video
        setVideos(prev => prev.map(v => v._id === item._id ? {...v, saveCount: (v.saveCount ?? 0) + 1} : v))
    }else {
        // Unbookmarked the video
        setVideos(prev => prev.map(v => v._id === item._id ? {...v, saveCount: (v.saveCount ?? 0) - 1} : v))
    }
  }

  if(loading) {
    return (
      <ReelsLoading />
    )
  }

  return (
    <div className="reels-root" ref={containerRef}>
      {videos.map(v => (
        <ReelItem key={v._id} v={v} videoRefs={videoRefs} likeVideo={likeVideo} bookmarkVideo={bookmarkVideo}/> // rendering each food item as a ReelItem component and passing necessary props to it.
     ))}
    </div>
  )
}

export default Home