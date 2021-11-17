import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PageRender from './PageRender';
import Header from './components/global/Header'

import { Alert } from './components/alert/Alert'
import { refreshToken } from './actions/auth'

const App = () => {
    const dispatch = useDispatch()
    const makeAPICall = async () => {
        try {
            const response = await fetch('https://photo-gal-app.herokuapp.com', {mode:'cors'});
            const data = await response.json();
            console.log({ data })
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        makeAPICall();
    }, [])

    useEffect(() => {
        dispatch(refreshToken())
    },[dispatch])

    return (
        <div className="container">
        <Router>
            <Alert />
            <Header />
            <Routes>
            <Route exact path="/" element={<PageRender />} />
            <Route exact path="/:page" element={<PageRender />} />
            <Route exact path="/:page/:slug" element={<PageRender />} />
            </Routes>
        </Router>
        </div>
    )
}

export default App;