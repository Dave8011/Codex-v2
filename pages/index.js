import { useState, useRef, useCallback } from "react";
import Head from "next/head";
import homeStyles from '../styles/Home.module.css';

// Import our hooks and components
import { useTheme } from '../hooks/useTheme';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar'; // <-- IMPORT SIDEBAR

// We will create these components in the next steps
// import Editor from '../components/Editor/Editor';

export default function Home() {
  // --- State Management ---
  const [theme, setTheme] = useTheme();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  // --- NEW: State for file management ---
  const [currentPath, setCurrentPath] = useState(""); // e.g., "my/folder"
  const [currentFile, setCurrentFile] = useState(null); // e.g., "index.js"
  
  // --- Event Handlers ---
  
  const handleNewFile = () => {
    setShowCreateModal(true);
    console.log("Show 'New File' modal");
  };
  
  const handleToggleSidebar = () => {
    setShowMobileSidebar(prev => !prev);
  };

  // --- NEW: Handlers to pass to the Sidebar ---
  
  /**
   * Called when a folder is clicked in the Sidebar.
   * Updates the path and closes the mobile sidebar.
   */
  const handleNavigate = (newPath) => {
    setCurrentPath(newPath);
    setCurrentFile(null); // Clear open file
    setShowMobileSidebar(false);
  };
  
  /**
   * Called when a file is clicked in the Sidebar.
   * Sets the current file and closes the mobile sidebar.
   */
  const handleOpenFile = (filename) => {
    setCurrentFile(filename);
    setShowMobileSidebar(false);
    // We will build the Editor component to read this state
    console.log(`Open file: ${filename}`);
  };

  return (
    <div className={homeStyles.root}>
      <Head>
        <title>Codex v2</title>
      </Head>

      <Header
        theme={theme}
        setTheme={setTheme}
        onNewFile={handleNewFile}
        showMobileSidebar={showMobileSidebar}
        onToggleMobileSidebar={handleToggleSidebar}
      />

      <main className={homeStyles.main}>
        {/* The <nav> element provides the layout (width, etc.)
          The <Sidebar> component provides the *content* inside.
          We also add a dynamic class for the mobile slide-out.
        */}
        <nav className={`${homeStyles.sidebar} ${showMobileSidebar ? homeStyles.sidebarOpen : ''}`}>
          <Sidebar
            currentPath={currentPath}
            onNavigate={handleNavigate}
            onOpenFile={handleOpenFile}
          />
        </nav>
        
        {/* We need to update the CSS to make sidebarOpen work */}

        {/* This is a placeholder for our Editor.
          We will replace it with a real <Editor /> component.
        */}
        <section className={homeStyles.editorPanel}>
          Editor Panel
          {/* We will show the editor here based on 'currentFile' */}
          {currentFile && <p>Opening: {currentFile}</p>}
        </section>
      </main>
    </div>
  );
}
