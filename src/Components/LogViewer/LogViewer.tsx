import React, { useEffect, useState, useRef } from 'react';

export default function LogsViewer() {
    const [logs, setLogs] = useState<string[]>([]);
    const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/logs-stream');

    socket.onmessage = (event) => {
      setLogs((prevLogs) => [...prevLogs, event.data]);
    };

    socket.onerror = () => {
      console.error("WebSocket error while connecting to logs stream.");
    };

    socket.onclose = () => {
      console.warn("WebSocket connection to logs stream closed.");
    };

    return () => {
      socket.close();
    };
  }, []);

  // Scroll to bottom when logs update
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Live Logs</h2>
      <div style={styles.logBox}>
        {logs.map((log, index) => (
          <div key={index} style={styles.logLine}>
            {log}
          </div>
        ))}
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: '20px',
    padding: '16px',
    backgroundColor: '#f3f3f3',
    borderRadius: '8px',
    fontFamily: 'monospace',
    maxHeight: '80vh',
  },
  title: {
    marginBottom: '12px',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  logBox: {
    backgroundColor: '#000',
    color: '#0f0',
    padding: '12px',
    height: '60vh',
    overflowY: 'auto',
    borderRadius: '6px',
  },
  logLine: {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    marginBottom: '4px',
  },
};