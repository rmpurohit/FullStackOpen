const Notification = ({ message }) => {
  if (!message) return null;
  const { type, text } = message; // type: 'success' | 'error'
  return (
    <div className={`notice notice--${type}`} role="status" aria-live="polite">
      {text}
    </div>
  );
};

export default Notification;