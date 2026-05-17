import React, { useState, useEffect, useRef } from 'react'
import '../../styles/create-food.css'
import api from "../api";
import { useNavigate } from 'react-router-dom'

const CreateFood = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  // ref for clearing file input
  const fileInputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();  // to send multipart/form-data request which can include files like videos, images etc. to the backend.

    formData.append('name', name);
    formData.append('description', description);
    formData.append('video', videoFile);

    await api.post("/api/food", formData, {
      withCredentials: true,  // to include cookies in the request
    })
    .then(response => {

      alert("Food item created successfully! Now you can add another video, Name and its description.");

      // clear form fields
      setName('');
      setDescription('');
      setVideoFile(null);

      // clear preview URL safely
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setPreviewUrl(null);

      // clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    })
    .catch(error => {
      alert("Failed to create food item. " + (error.response?.data?.message));
    });

  }

  const handleFile = (e) => {
    const f = e.target.files && e.target.files[0]

    if (f) {

      // remove previous preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }

      const url = URL.createObjectURL(f)

      setVideoFile(f)
      setPreviewUrl(url)

    } else {

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }

      setVideoFile(null)
      setPreviewUrl(null)
    }
  }

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  return (
    <main className="create-food-page">
      <section className="create-food-card">

        <h1 className="cf-title">Create Food</h1>

        <p className="cf-sub">
          Add a new menu item with video, title and short description.
        </p>

        <form className="cf-form" onSubmit={handleSubmit}>

          <div className="cf-group">

            <span className="cf-label">Video</span>

            <input
              ref={fileInputRef}
              id="video-file"
              className="cf-file-input"
              type="file"
              accept="video/*"
              onChange={handleFile}
            />

            <label className="cf-uploader" htmlFor="video-file">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="cf-icon"
              >
                <rect x="2" y="6" width="15" height="12" rx="2" ry="2"></rect>
                <polygon points="22 7 22 17 17 12 22 7"></polygon>
              </svg>

              <div className="cf-uploader-text">
                <strong>Choose a video</strong>
                <span className="cf-uploader-sub">
                  MP4, MOV • Max 50MB
                </span>
              </div>

            </label>

            {previewUrl && (
              <div className="cf-preview-container">
                <video
                  className="cf-preview"
                  src={previewUrl}
                  controls
                  muted
                  playsInline
                />
              </div>
            )}

          </div>

          <label className="cf-group">

            <span className="cf-label">Name</span>

            <input
              className="cf-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dish name"
            />

          </label>

          <label className="cf-group">

            <span className="cf-label">Description</span>

            <textarea
              className="cf-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description (max 200 chars)"
              rows={4}
            />

          </label>

          <div className="cf-actions">
            <button className="btn-primary" type="submit">
              Create
            </button>
          </div>

        </form>

      </section>
    </main>
  )
}

export default CreateFood