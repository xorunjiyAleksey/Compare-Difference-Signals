import React from 'react';
import MainPage from './modules/mainPage/MainPage.jsx';

const App = () => {
    return (
        <div className={'main-container'}>
            <MainPage />
        </div>
    );
}

export default React.memo(App);