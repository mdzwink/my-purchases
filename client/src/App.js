import './App.css';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import View from './components/View';
import Map from './components/Map';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Welcome />
      <View />
    </div>
  );
}

export default App;
