import { Link } from "react-router-dom"

function ReelItem({
  v,
  videoRefs,
  likeVideo,
  bookmarkVideo
}) {
  return (
    <section key={v._id} className="reel-item" data-id={v._id}>
      <video
        className="reel-video"
        src={v.videoUrl || v.url || v.mediaUrl}
        muted
        loop
        playsInline
        autoPlay
        ref={el => {
          if (el) videoRefs.current.set(String(v._id), el)
          else videoRefs.current.delete(String(v._id))
        }}
      />

      <div className="reel-overlay">
        <div className="reel-desc" title={v.description}>
          {v.description}
        </div>

        <Link
          to={`/food-partner/${v.foodPartner}`}
          className="reel-cta"
        >
          Visit store
        </Link>
      </div>

      <div className="reel-actions">
        <button
          onClick={() => likeVideo(v)}
          className="action-btn"
          aria-label="likes"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21s-7-4.35-9-6.5C-1 10.5 3 6 7 6c2.2 0 3.5 1.5 5 3 1.5-1.5 2.8-3 5-3 4 0 8 4.5 4 8.5C19 16.65 12 21 12 21z"
              stroke="white"
              strokeWidth="1.2"
              fill="rgba(255,255,255,0.02)"
            />
          </svg>

          <div className="action-count">
            {v.likeCount ?? (v.likes ? v.likes.length : 0)}
          </div>
        </button>

        <button
          onClick={() => bookmarkVideo(v)}
          className="action-btn"
          aria-label="save"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 2h9l3 3v16l-8-4-8 4V2z"
              stroke="white"
              strokeWidth="1.2"
              fill="rgba(255,255,255,0.02)"
            />
          </svg>

          <div className="action-count">
            {v.saveCount ?? (v.saves ? v.saves.length : 0)}
          </div>
        </button>

        <button
          className="action-btn"
          aria-label="comments"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              stroke="white"
              strokeWidth="1.2"
              fill="rgba(255,255,255,0.02)"
            />
          </svg>

          <div className="action-count">
            {v.commentsCount ?? (v.comments ? v.comments.length : 0)}
          </div>
        </button>
      </div>
    </section>
  )
}

export default ReelItem