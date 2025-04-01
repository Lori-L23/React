// App.js 
import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
//importation des composants 
import ClientList from './components/ClientsList'; 
import CreateClient from './components/CreateClient'; 
import ClientDetails from './components/ClientDetails'; 
import UpdateClient from './components/UpdateClient';
import './App.css'

function App() {

  return (
    <div className='App'>
      <h2 className='text-purple-500 font-bold text-3xl'>Application React CRUD</h2>
      <Router> 
        <Routes> 
          {/* // Route principale */}
          {/* <Route path="/" element={<ClientList/>} />  */}

          {/* Routes clients */}
          <Route path="/clients" element={<ClientList />} />
          <Route path="/clients/create" element={<CreateClient />} />
          <Route path="/clients/:id/details" element={<ClientDetails />} />
          <Route path="/clients/:id/update" element={<UpdateClient />} />
        </Routes> 
      </Router>

    </div>
  )
}

export default App;
