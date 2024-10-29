import './App.css';
import Footer from './components/Footer';
import Manager from './components/Manager';
import Navbar from './components/Navbar';

function App() {
  return (
    <main className="flex flex-col min-h-screen gap-10">
      <Navbar />
      <div className="flex-grow">
        <Manager />
      </div>
      <Footer />
    </main>
  );
}

export default App;
