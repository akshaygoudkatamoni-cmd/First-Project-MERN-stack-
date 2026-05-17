import React from 'react'
import '../../styles/profile.css'
import { useParams } from 'react-router-dom'
import api from "../api";
import { useState,useEffect } from 'react'

const sampleTiles = new Array(9).fill(0).map((_,i)=>({id:i+1}))

const Profile = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [ videos, setVideos ] = useState([])

  useEffect(() => {
    api.get(`/api/food-partner/${id}`, { withCredentials: true })
      .then(response => {
        setProfile(response.data.foodPartner)
        setVideos(response.data.foodPartner.foodItems || [])
      })  
  }, [id])


  return (
    <div className="partner-profile">
      <section className="partner-card">
        <div className="partner-top">
            <img className="avatar" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Avatar"
            />          
          <div className="partner-info">
            <div style={{marginBottom:'0.5rem', fontWeight:700, fontSize:'1.05rem'}}>Business name</div>
            <div className="partner-buttons">
              <button className="pill">{profile?.name}</button>
              <button className="pill">{profile?.address}</button>
            </div>
          </div>
        </div>

        <div className="partner-stats">
          <div className="stat">
            <div className="label">Total Meals</div>
            <div className="value">{videos.length || 0}</div>
          </div>

          <div className="stat">
            <div className="label">Customers Served</div>
            <div className="value">{profile?.customersServed || 0}</div>
          </div>
        </div>

        <div className="divider" />

        <div className="video-grid">
          {videos.map(video => (
            <div className="video-tile" key={video._id}>
                <video
                style={{width:'100%', height:'100%', objectFit:'cover'}}
                src={video.videoUrl} muted> </video>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Profile