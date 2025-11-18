// pages/api/files/open.js
import fs from "fs/promises";
import path from "path";

const baseDir = path.join(process.cwd(), "Codex");

/**
 * This handler securely reads the content of a single file.
 */
export default async function handler(req, res) {
  const { path: filePath } = req.query;

  if (!filePath) {
    return res.status(400).json({ error: "File path is required." });
  }

  try {
    const targetPath = path.resolve(path.join(baseDir, filePath));

    // CRITICAL: Security Check!
    if (!targetPath.startsWith(baseDir)) {
      return res.status(400).json({ error: "Invalid path." });
    }

    const content = await fs.readFile(targetPath, "utf-8");
    res.status(200).json({ content });
  } catch (e) {
    res.status(500).json({ error: "Failed to open file." });
  }
}  
