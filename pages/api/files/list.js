// pages/api/files/list.js
import fs from "fs/promises";
import path from "path";

// Define the absolute path to our 'Codex' directory
const baseDir = path.join(process.cwd(), "Codex");

/**
 * This handler securely lists files and folders.
 */
export default async function handler(req, res) {
  try {
    const subpath = req.query.subpath || "";
    
    // Create the full, resolved path
    const targetPath = path.resolve(path.join(baseDir, subpath));

    // CRITICAL: Security Check!
    // Ensure the resolved path is still inside the base directory.
    // This prevents "directory traversal" attacks (e.g., ../../)
    if (!targetPath.startsWith(baseDir)) {
      return res.status(400).json({ error: "Invalid path." });
    }

    // Create the 'Codex' directory if it doesn't exist
    await fs.mkdir(baseDir, { recursive: true });

    const dirents = await fs.readdir(targetPath, { withFileTypes: true });
    const files = dirents.map((dirent) => ({
      name: dirent.name,
      type: dirent.isDirectory() ? "folder" : "file",
    }));
    
    res.status(200).json({ files });
  } catch (e) {
    // Handle errors (e.g., folder not found)
    res.status(500).json({ error: "Unable to list files." });
  }
}
