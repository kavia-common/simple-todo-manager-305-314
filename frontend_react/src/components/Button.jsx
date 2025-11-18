import React from "react";

/**
 * PUBLIC_INTERFACE
 * Reusable Button component for modern, accessible, minimal UIs.
 *
 * @param {Object} props
 * @param {'primary'|'secondary'|'subtle'|'danger'} [props.variant='primary'] Visual style variant
 * @param {'sm'|'md'|'lg'} [props.size='md'] Button size
 * @param {boolean} [props.fullWidth] If true, button stretches to fill parent width
 * @param {boolean} [props.disabled] If true, button is disabled (muted)
 * @param {boolean} [props.loading] If true, shows spinner and disables all interaction
 * @param {React.ReactNode} [props.leftIcon] Icon to show at left
 * @param {React.ReactNode} [props.rightIcon] Icon to show at right
 * @param {'button'|'submit'} [props.type='button'] Button type attribute
 * @param {function} [props.onClick] click handler
 * @param {string} [props.ariaLabel] aria-label for accessibility (required if no children)
 * @param {React.ReactNode} [props.children] Button content
 * @param {...any} [props.rest] Other native button attributes
 */
function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  type = "button",
  onClick,
  ariaLabel,
  children,
  ...rest
}) {
  // Dynamic class builder
  const base =
    "kavia-btn minmodern-btn" +
    " " +
    `btn-${variant}` +
    " " +
    `btn-size-${size}` +
    (fullWidth ? " minmodern-btn-full" : "") +
    (disabled || loading ? " btn-disabled" : "");

  // Get accessible ARIA/keyboard
  const ariaProps = {
    "aria-disabled": disabled || loading ? true : undefined,
    "aria-busy": loading ? true : undefined,
    tabIndex: disabled || loading ? -1 : 0,
    // Only assign aria-label if explicitly specified or if children is nullish (pure icon)
    ...(ariaLabel
      ? { "aria-label": ariaLabel }
      : !children
      ? { "aria-label": "Button" }
      : {}),
    ...rest
  };

  // Actual click handler; disable if loading/disabled
  function handleClick(e) {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    if (onClick) onClick(e);
  }

  // Minimal spinner SVG for loading, always preserve button height
  const Spinner = (
    <span
      className="minmodern-spinner"
      role="status"
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: size === "sm" ? 16 : size === "lg" ? 22 : 18,
        height: size === "sm" ? 16 : size === "lg" ? 22 : 18,
        verticalAlign: "middle",
        marginRight: children ? 8 : 0,
        marginLeft: !children && rightIcon ? 8 : 0,
        marginTop: -2
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 32 32"
        fill="none"
        style={{ display: "block" }}
      >
        <circle
          cx="16"
          cy="16"
          r="13"
          stroke="currentColor"
          strokeWidth="3"
          opacity="0.18"
        ></circle>
        <path
          d="M29 16a13 13 0 0 0-13-13"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 16 16"
            to="360 16 16"
            dur="0.8s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </span>
  );

  // Button content: icons/text/spinner
  return (
    <button
      type={type}
      className={base}
      onClick={handleClick}
      disabled={disabled || loading}
      {...ariaProps}
    >
      {/* Keep min height stable */}
      {loading && Spinner}
      {!loading && leftIcon && (
        <span className="btn-icon btn-icon-left">{leftIcon}</span>
      )}
      <span className="btn-content">{children}</span>
      {!loading && rightIcon && (
        <span className="btn-icon btn-icon-right">{rightIcon}</span>
      )}

      {/* Inline styles tailored for the modern, minimal theme and style tokens */}
      <style>{`
      .kavia-btn.minmodern-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.48em;
        font-weight: 500;
        border-radius: var(--radius, 0.5rem);
        outline: none;
        border: none;
        cursor: pointer;
        box-shadow: none;
        background: var(--surface, #fff);
        user-select: none;
        white-space: nowrap;
        line-height: 1.17;
        transition: background 0.18s, color 0.18s, box-shadow 0.18s;
        position: relative;
      }
      .btn-size-sm { font-size: 0.97rem; padding: 0.46em 1.05em; min-height: 2.1em; }
      .btn-size-md { font-size: 1.07rem; padding: 0.62em 1.3em; min-height: 2.42em; }
      .btn-size-lg { font-size: 1.19rem; padding: 0.84em 1.8em; min-height: 3em; }
      .minmodern-btn-full { width: 100%; display: flex; }
      .btn-content:empty { display: none; }
      .btn-icon { display: inline-flex; }
      .btn-icon-left { margin-right: 0.35em;}
      .btn-icon-right { margin-left: 0.35em;}

      /* VARIANTS */
      .btn-primary {
        background: var(--primary, #3b82f6);
        color: #fff;
        border: 1px solid var(--primary, #3b82f6);
      }
      .btn-primary:hover:not(.btn-disabled),
      .btn-primary:active:not(.btn-disabled),
      .btn-primary:focus-visible:not(.btn-disabled) {
        background: var(--success, #06b6d4);
        border-color: var(--success, #06b6d4);
        box-shadow: 0 0 0 2px #06b6d444, 0 1px 6px #3b82f611;
        color: #fff;
      }

      .btn-secondary {
        background: var(--secondary, #64748b);
        color: #fff;
        border: 1px solid var(--secondary, #64748b);
      }
      .btn-secondary:hover:not(.btn-disabled),
      .btn-secondary:focus-visible:not(.btn-disabled) {
        background: var(--primary, #3b82f6);
        border-color: var(--primary, #3b82f6);
        color: #fff;
      }

      .btn-subtle {
        background: transparent;
        color: var(--secondary, #64748b);
        border: 1px solid var(--border, #e5e7eb);
      }
      .btn-subtle:hover:not(.btn-disabled),
      .btn-subtle:focus-visible:not(.btn-disabled) {
        background: #f1f5f9 !important;
        color: var(--primary, #3b82f6);
        border-color: var(--primary, #3b82f6);
      }

      .btn-danger {
        background: var(--error, hsl(0 84% 60%));
        color: #fff;
        border: 1px solid var(--error, hsl(0 84% 60%));
      }
      .btn-danger:hover:not(.btn-disabled),
      .btn-danger:focus-visible:not(.btn-disabled) {
        background: #fff;
        color: var(--error, hsl(0 84% 60%));
        border-color: var(--error, hsl(0 84% 60%));
        box-shadow: 0 0 0 2px #ea003011;
      }

      .btn-disabled,
      .kavia-btn:disabled,
      .kavia-btn[disabled] {
        opacity: 0.58;
        background: var(--border, #e5e7eb) !important;
        color: var(--secondary, #64748b) !important;
        cursor: not-allowed !important;
        border-color: var(--border, #e5e7eb) !important;
        pointer-events: none;
        text-shadow: none;
        box-shadow: none;
      }

      .kavia-btn:focus-visible {
        outline: 2px solid var(--primary, #3b82f6);
        outline-offset: 2px;
        box-shadow: 0 0 0 2.5px var(--success, #06b6d477);
      }

      /* Spinner animation for loading */
      .minmodern-spinner {
        color: var(--primary, #3b82f6);
        pointer-events: none;
      }
      .btn-danger .minmodern-spinner { color: var(--error, hsl(0 84% 60%)); }
      .btn-secondary .minmodern-spinner { color: #fff; }
      .btn-primary .minmodern-spinner { color: #fff; }
      .btn-subtle .minmodern-spinner { color: var(--primary, #3b82f6); }
      /* Reduce spinner size/padding when icon only */
      .btn-content:empty + .btn-icon-right,
      .btn-content:empty + .btn-icon-left {
        margin: 0;
      }
    `}</style>
    </button>
  );
}

export default Button;
