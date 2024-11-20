// Retrieves the current color from localStorage or the CSS default
export function getInitialColor() {
  const userSelectedUIcolor = localStorage.getItem("userSelectedUIcolor");
  const defaultColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-primary")
    .trim();
  return userSelectedUIcolor || defaultColor;
}

// Applies a given color to the CSS variable
export function applyColorToUI(color) {
  document.documentElement.style.setProperty("--color-primary", color);
}

// Stores the user's selected color in localStorage
export function storeColor(color) {
  localStorage.setItem("userSelectedUIcolor", color);
}
