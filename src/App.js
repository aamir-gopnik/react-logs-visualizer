import logo from './logo.svg';
import Header from './Components/Header/Header.tsx';
import LogsViewer from './Components/LogViewer/LogViewer.tsx';

function App() {
   return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <LogsViewer />
      {/* Your log viewer or other components here */}
    </div>
  );
}

export default App;


