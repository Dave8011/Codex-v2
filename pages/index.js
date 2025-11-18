import { useState, useRef, useCallback } from "react";
import Head from "next/head";

// Import our *local* styles
import styles from '../styles/Home.module.css';

// We will create these components in the next steps
// import Header from '../components/Header/Header';
// import Sidebar from '../components/Sidebar/Sidebar';
// import Editor from '../components/Editor/Editor';

export default function Home() {
  return (
    <div className={styles.root}>
      <Head>
        <title>Codex v2</title>
      </Head>

      {/* This is a placeholder for our Header.
        We will replace it with a real <Header /> component.
      */}
      <header className={styles.header}>
        Codex v2 Header
      </header>

      <main className={styles.main}>
        {/* This is a placeholder for our Sidebar.
          We will replace it with a real <Sidebar /> component.
        */}
        <nav className={styles.sidebar}>
          File Sidebar
        </nav>

        {/* This is a placeholder for our Editor.
          We will replace it with a real <Editor /> component.
        */}
        <section className={styles.editorPanel}>
          Editor Panel
        </section>
      </main>
    </div>
  );
}
