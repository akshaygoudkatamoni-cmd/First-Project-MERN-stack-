import "../styles/reelsLoading.css"

function ReelsLoading() {
  return (
    <div className="reels-loading-container">

      <div className="reels-loading-card">

        <div className="reels-spinner"></div>

        <h2 className="reels-loading-title">
          Loading Videos
        </h2>

        <p className="reels-loading-text">
          Please wait while we fetch your reels...
        </p>

      </div>

    </div>
  )
}

export default ReelsLoading