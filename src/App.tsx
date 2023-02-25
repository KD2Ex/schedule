import React, {useEffect} from 'react';
import './styles.css'
import ShedulePage from './pages/ShedulePage';
import useGroupStore from './store/groupStore';
import useTeachersStore from './store/teachersStore';

function App() {

  const groups = useGroupStore(state => state.groups);
  const getGroups = useGroupStore(state => state.getGroups);
  const getRooms = useGroupStore(state => state.getRooms);
  const getTeachers = useTeachersStore(state => state.getTeachers);

  useEffect(() =>{
    getGroups();
    getRooms();
    getTeachers();
  }, [])

  return (
    <div className="App">
      <ShedulePage/>      
    </div>
  );
}

export default App;
