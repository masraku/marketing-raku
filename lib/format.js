/**
 * Format a number or numeric string to Indonesian Rupiah format.
 * Example: 4000000 → "Rp4.000.000"
 * @param {string|number} value
 * @returns {string}
 */
export function formatRupiah(value) {
  const num = String(value).replace(/\D/g, "");
  if (!num) return "";
  const formatted = num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `Rp${formatted}`;
}

/**
 * Parse a formatted Rupiah string back to plain numeric string.
 * Example: "Rp4.000.000" → "4000000"
 * @param {string} formatted
 * @returns {string}
 */
export function parseRupiah(formatted) {
  return String(formatted).replace(/\D/g, "");
}
