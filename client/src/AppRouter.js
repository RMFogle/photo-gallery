import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import UploadPage from './components/UploadPage';
import Gallery from './components/Gallery';
import NotFoundPage from './components/NotFoundPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
        <Header />
        <div className="main-content">
            <Routes>
            <Route path="/" />
            <Route path="upload" element={<UploadPage />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="NotFoundPage" element={<NotFoundPage />} />
            </Routes>
        </div>
        </div>
    </BrowserRouter>
);

export default AppRouter;
