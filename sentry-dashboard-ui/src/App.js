import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import Sentrytable from './components/Sentrytable';

function App() {
  return (
    <div className="App">
      <div className="main">
          <Navbar />
          <div class="">
            <div className='col-md-8 card p-3 shadow'>
            <Sentrytable />
            </div>

          </div>
          
      </div>
    </div>
  );
}

export default App;
