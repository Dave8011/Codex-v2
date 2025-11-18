// pages/api/files/create.js
import fs from "fs/promises";
import path from "path";

const baseDir = path.join(process.cwd(), "Codex");

/**
 * This handler securely creates a new file or folder.
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { name, type, subpath, content } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required." });
  }

  try {
    // Create resolved paths
    const targetDir = path.resolve(path.join(baseDir, subpath || ""));
    const targetPath = path.resolve(path.join(targetDir, name));

    // CRITICAL: Security Checks!
    // Check both the directory and the final file path.
    if (!targetDir.startsWith(baseDir) || !targetPath.startsWith(baseDir)) {
      return res.status(400).json({ error: "Invalid path." });
    }

    // Check if it already exists
    try {
      await fs.access(targetPath);
      return res.status(400).json({ error: "File or folder already exists." });
    } catch (e) {
      // Doesn't exist, which is good
    }

    // Create the item
    if (type === "folder") {
      await fs.mkdir(targetPath);
    } else {
      await fs.writeFile(targetPath, content || "");
    }
    res.status(201).json({ message: `${type} created.` });
  } catch (e) {
    res.status(500).json({ error: `Failed to create ${type}.` });
  }
}
