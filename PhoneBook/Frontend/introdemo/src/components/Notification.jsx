const Notification = ({ message }) => {
    if (!message) return null
    const { type, text } = message
    return (
      <div className={`notice notice--${type}`}>
        {text}
      </div>
    )
  }
  
  export default Notification
  