import './App.css';
import Snake from './components/Snake'

function App() {
  return (
    <div className="App">
      <div className="pl-5 font-bold py-5 text-2xl bg-[#f7df1e]">JS<span className='text-sm italic'>.Games</span></div>
      <Snake></Snake>
    </div>
  );
}

export default App;
