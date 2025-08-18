// Accessible, auto-dismissed notification
const Notification = ({ message }) => {
  if (!message) return null;
  const { type, text } = message; // type: 'success' | 'error' | 'info'
  const role = type === 'error' ? 'alert' : 'status'; // errors are more urgent
  const live = type === 'error' ? 'assertive' : 'polite';

  return (
    <div
      className={`notice notice--${type}`}
      role={role}
      aria-live={live}
      aria-atomic="true"
    >
      {text}
    </div>
  );
};

export default Notification;
