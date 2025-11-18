/**
 * Gets the parent folder path from a given path.
 * e.g., 'foo/bar' -> 'foo'
 */
export function parentPath(path) {
  if (!path) return "";
  const parts = path.split("/").filter(Boolean);
  parts.pop();
  return parts.join("/");
}

/**
 * Detects a programming language from a filename.
 */
export function detectLanguage(filename = "") {
  const ext = filename.split(".").pop().toLowerCase();
  const map = {
    js: "javascript", jsx: "javascript", ts: "typescript", tsx: "typescript",
    json: "json", css: "css", scss: "scss", html: "html", htm: "html",
    md: "markdown", py: "python", java: "java", php: "php", rb: "ruby",
    c: "c", h: "c", cpp: "cpp", go: "go", rs: "rust", sh: "shell",
    xml: "xml", yml: "yaml", yaml: "yaml", sql: "sql", swift: "swift",
  };
  return map[ext] || "plaintext";
}

/**
 * A list of common file extensions for the "Create File" modal.
 */
export const FILE_EXTENSIONS = [
  "js", "jsx", "ts", "tsx", "json", "css", "scss", "html", "md", "py",
  "java", "php", "rb", "c", "cpp", "go", "rs", "sh", "xml", "yml",
  "yaml", "sql", "swift", "txt"
];
