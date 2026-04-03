import { Link } from "react-router-dom";

export default function Button({
  to,
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const buttonClass = `btn ${variant === "secondary" ? "btn-secondary" : "btn-primary"} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={buttonClass} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}
