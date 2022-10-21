import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import {ProvideNotification} from "./provider/NotificationProvider";
import {ProvideLayout} from "./provider/LayoutStoreProvider";
import {ProvideAuth} from "./provider/AuthProvider";
import Account from "./components/account/Account";
import AccountSection from "./components/account/AccountTransactions";

function App() {

    const AppProviders = ({children}: { children: JSX.Element }) => {
        return (
            <ProvideNotification>
                <ProvideLayout>
                    <ProvideAuth>
                        {children}
                    </ProvideAuth>
                </ProvideLayout>
            </ProvideNotification>
        );
    };

    return (
        <AppProviders>
            <div className="App">
                <header className="App-header">
                    <Navbar/>
                    <Account/>
                    <AccountSection/>
                </header>
            </div>
        </AppProviders>
    );
}

export default App;
