import React, {useEffect} from 'react';
import './styles.css'
import ShedulePage from './pages/ShedulePage';
import useGroupStore from './store/groupStore';

function App() {

  const groups = useGroupStore(state => state.groups);
  const getGroups = useGroupStore(state => state.getGroups);

  useEffect(() =>{
    getGroups();
  }, [])

  return (
    <div className="App">

      <ShedulePage/>      
    </div>
  );
}

export default App;
