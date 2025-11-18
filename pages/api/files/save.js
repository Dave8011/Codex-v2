// pages/api/files/save.js
import fs from "fs/promises";
import path from "path";

const baseDir = path.join(process.cwd(), "Codex");

/**
 * This handler securely writes content to a file.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { path: filePath, content } = req.body;

  if (!filePath) {
    return res.status(400).json({ error: "File path is required." });
  }

  try {
    const targetPath = path.resolve(path.join(baseDir, filePath));

    // CRITICAL: Security Check!
    if (!targetPath.startsWith(baseDir)) {
      return res.status(400).json({ error: "Invalid path." });
    }

    await fs.writeFile(targetPath, content || "");
    res.status(200).json({ message: "File saved." });
  } catch (e) {
    res.status(500).json({ error: "Failed to save file." });
  }
}
