import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PageRender from './PageRender';
import Header from './components/global/Header'

import { Alert } from './components/alert/Alert'
import { refreshToken } from './actions/auth'

const App = () => {
    const dispatch = useDispatch()

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