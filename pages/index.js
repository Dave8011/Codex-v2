import { useState, useRef, useCallback } from "react";
import Head from "next/head";

// Import our *local* styles for the page layout
import homeStyles from '../styles/Home.module.css';

// Import our new hook and component!
import { useTheme } from '../hooks/useTheme';
import Header from '../components/Header/Header';

// We will create these components in the next steps
// import Sidebar from '../components/Sidebar/Sidebar';
// import Editor from '../components/Editor/Editor';

export default function Home() {
  // --- State Management ---
  
  // 1. Theme state from our custom hook
  const [theme, setTheme] = useTheme();
  
  // 2. State for the "New File" modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // 3. State for the mobile sidebar toggle
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  
  // --- Event Handlers ---
  
  // This function will be passed to the Header
  const handleNewFile = () => {
    setShowCreateModal(true);
    // We will build the modal component later
    console.log("Show 'New File' modal");
  };
  
  // This function will be passed to the Header
  const handleToggleSidebar = () => {
    setShowMobileSidebar(prev => !prev);
  };

  return (
    <div className={homeStyles.root}>
      <Head>
        <title>Codex v2</title>
      </Head>

      {/* This is no longer a placeholder! 
        We pass all the state and functions the Header needs as props.
      */}
      <Header
        theme={theme}
        setTheme={setTheme}
        onNewFile={handleNewFile}
        showMobileSidebar={showMobileSidebar}
        onToggleMobileSidebar={handleToggleSidebar}
      />

      <main className={homeStyles.main}>
        {/* This is a placeholder for our Sidebar.
          We will replace it with a real <Sidebar /> component.
        */}
        <nav className={homeStyles.sidebar}>
          File Sidebar
        </nav>

        {/* This is a placeholder for our Editor.
          We will replace it with a real <Editor /> component.
        */}
        <section className={homeStyles.editorPanel}>
          Editor Panel
        </section>
      </main>
      
      {/* We will add the <CreateFileModal /> component here later
        when showCreateModal is true.
      */}
    </div>
  );
}
