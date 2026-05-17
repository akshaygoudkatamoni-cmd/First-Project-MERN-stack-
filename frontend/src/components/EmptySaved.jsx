import { Link } from "react-router-dom"
import "../styles/emptySaved.css"

function EmptySaved() {
  return (
    <div className="empty-saved-container">
      <div className="empty-saved-card">

        <div className="empty-saved-icon">
          🔖
        </div>

        <h2 className="empty-saved-title">
          Saved
        </h2>

        <small className="empty-saved-count">
          0 items
        </small>

        <p className="empty-saved-text">
          You have not saved any videos yet.
          <br />
          Start exploring and bookmark your favorites.
        </p>

        <Link
          to="/home"
          className="empty-saved-btn"
        >
          Explore Videos
        </Link>

      </div>
    </div>
  )
}

export default EmptySaved