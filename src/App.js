import { makeStyles } from '@mui/styles';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CoinPage from './Pages/CoinPage';
import Homepage from './Pages/Homepage';

function App() {

const useStyles = makeStyles( () => ({
  App: {
    backgroundColor: '#14161a',
    color:'white',
    minHeight:'100vh'
  }
}))

const classes = useStyles()

  return (
    <div className={classes.App}>
      <Header/>
      <Routes>
        <Route path='/' exact element={<Homepage/>} />
        <Route path='/coins/:id' exact element={<CoinPage />} />
      </Routes>
    </div>
  );
}

export default App;
