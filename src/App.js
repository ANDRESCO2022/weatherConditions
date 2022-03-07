
import { Suspense } from 'react';
import './App.css';
import Spinner from './Component/Spinner';
import Weathers from './Component/Weathers.js';


function App() {
   const appStyle = {
     backgroundImage: " url('https://picsum.photos/id/1015/1600/900') ",
     backgroundRepeat: "no-repeat",
   };
  return (
    <Suspense fallback={<Spinner />} >
      <div className="App" style={appStyle}>
        <Weathers />
      </div>
    </Suspense>
  );
}

export default App;
