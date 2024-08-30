import { Route, Routes } from 'react-router-dom';
import './App.css';
import { LoginApp } from './components/LoginApp';
import { AuthProvider, useFirebaseApp } from 'reactfire';
import { AuthContextApp } from './contexts/AuthContextApp';
import { getAuth } from 'firebase/auth';
import { RegisterApp } from './components/RegisterApp';
import { HomeApp } from './components/HomeApp';
import { DashboardApp } from './components/DashboardApp';
import { ListApp } from './components/ListApp';
import { AddApp } from './components/AddApp';

function App() {
  const firestoreInstance = getAuth(useFirebaseApp());
  return (
    <>
      <AuthProvider sdk={firestoreInstance}>
        <AuthContextApp>
          <Routes>
            <Route exact path='/' element={<LoginApp />} />
            <Route exact path='/login' element={<LoginApp />} />
            <Route exact path='/register' element={<RegisterApp />} />
            <Route exact path='/admin' element={<HomeApp />}>
              <Route path='' element={<DashboardApp />} />
              <Route path='dashboard' element={<DashboardApp />} />
              <Route path='list' element={<ListApp />} />
              <Route path='add' element={<AddApp />} />
            </Route>
          </Routes>
        </AuthContextApp>
      </AuthProvider>
    </>
  );
}

export default App;
