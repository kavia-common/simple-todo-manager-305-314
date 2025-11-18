import React from "react";

/**
 * PUBLIC_INTERFACE
 * Header component for the Todo Manager app.
 * 
 * - Modern light theme; #3b82f6 primary, #06b6d4 success accents
 * - Subtle blue to gray gradient background
 * - App title ("Todo Manager"), optional subtitle, and optional remaining count badge
 * - Semantic <header> with accessibility roles/labels
 * - Responsive and accessible (focus-visible for badge, proper spacing)
 * 
 * @param {Object} props
 * @param {string} [props.subtitle]
 * @param {number} [props.remainingCount]
 */
export default function Header({ subtitle, remainingCount }) {
  return (
    <header
      className="todo-header modern-header"
      role="banner"
      aria-label="Todo Manager app header"
      tabIndex={-1}
    >
      <div className="header-content">
        <h1 className="app-title">
          Todo Manager
          {typeof remainingCount === "number" && (
            <span
              className="remaining-badge"
              tabIndex={0}
              aria-label={`You have ${remainingCount} todos remaining`}
            >
              {remainingCount} remaining
            </span>
          )}
        </h1>
        {subtitle && (
          <p className="header-subtitle">{subtitle}</p>
        )}
      </div>
    </header>
  );
}

/* Inline modular CSS (scoped via className and compatible with styles.css theme) */
const headerStyles = `
.modern-header {
  background: linear-gradient(
    90deg,
    rgba(59,130,246,0.10) 0%,
    #f8fafc 100%
  );
  padding: 1.6rem 1rem 1.1rem 1rem;
  text-align: center;
  position: relative;
  border-bottom: 1px solid var(--border);
  transition: background 0.3s;
}

.header-content {
  max-width: 540px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  align-items: center;
}

.app-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary, #3b82f6);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.85em;
}

.header-subtitle {
  color: var(--secondary, #64748b);
  font-size: 1.02rem;
  margin: 0.15em 0 0 0;
  font-weight: 400;
  text-align: center;
}

.remaining-badge {
  display: inline-block;
  background: linear-gradient(90deg,#06b6d410,#3b82f620 95%);
  color: #06b6d4;
  font-size: 0.86em;
  font-weight: 600;
  border-radius: 999px;
  padding: 0.18em 0.9em;
  margin-left: 0.2em;
  outline: none;
  border: 1px solid #06b6d435;
  box-shadow: none;
  transition: border-color 0.18s, box-shadow 0.18s;
}
.remaining-badge:focus-visible {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px #3b82f688;
}

@media (max-width: 600px) {
  .modern-header {
    padding: 1rem 0.5rem 0.7rem 0.5rem;
  }
  .app-title {
    font-size: 1.32rem;
  }
  .header-content {
    gap: 0.19em;
  }
}
`;

// Inject the styles if not already added, to support scoped custom styles
if (
  typeof document !== "undefined" &&
  !document.getElementById("modern-header-css")
) {
  const styleTag = document.createElement("style");
  styleTag.id = "modern-header-css";
  styleTag.innerHTML = headerStyles;
  document.head.appendChild(styleTag);
}
