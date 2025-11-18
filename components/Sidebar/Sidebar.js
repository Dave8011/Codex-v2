import { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';
import { parentPath } from '../../utils/fileUtils';

/**
 * The file navigation sidebar.
 * It fetches and displays the file list for the 'currentPath'.
 * It calls 'onNavigate' or 'onOpenFile' when an item is clicked.
 */
export default function Sidebar({ currentPath, onNavigate, onOpenFile }) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  // This effect re-fetches the file list when 'currentPath' changes
  useEffect(() => {
    async function fetchFiles() {
      try {
        setError(""); // Clear previous errors
        const res = await fetch(`/api/files/list?subpath=${encodeURIComponent(currentPath)}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to load files.");
        }
        const data = await res.json();
        setFiles(data.files || []);
      } catch (e) {
        setFiles([]);
        setError(e.message);
      }
    }
    fetchFiles();
  }, [currentPath]); // Re-run whenever currentPath changes

  return (
    <>
      <div className={styles.title}>Browse</div>

      {/* "Up" Button (..), only shown if not in root */}
      {currentPath && (
        <button
          className={`${styles.item} ${styles.up}`}
          onClick={() => onNavigate(parentPath(currentPath))}
          aria-label="Up one folder"
        >
          <span className={styles.icon}>⬆️</span>
          <span className={styles.label}>..</span>
        </button>
      )}

      {/* File/Folder List */}
      {error && (
        <div className={styles.empty}>{error}</div>
      )}
      {!error && files.length > 0 ? (
        files
          .filter((file) => file.name !== '.gitkeep') // Hide .gitkeep
          .map((file) => (
            <button
              key={file.name}
              className={styles.item}
              onClick={() =>
                file.type === "folder"
                  ? onNavigate([currentPath, file.name].filter(Boolean).join("/"))
                  : onOpenFile(file.name)
              }
              aria-label={
                file.type === "folder"
                  ? `Open folder ${file.name}`
                  : `Open file ${file.name}`
              }
            >
              <span className={styles.icon}>
                {file.type === "folder" ? "📂" : "📄"}
              </span>
              <span className={styles.label}>{file.name}</span>
            </button>
          ))
      ) : (
        !error && <div className={styles.empty}>No files</div>
      )}
    </>
  );
}
