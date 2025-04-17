// import external dependencies
import React from 'react';
import { createRoot } from 'react-dom/client';

// import internal dependencies

////////////////////////////////////////////////////////////////////////////////////////////////////

const Application = () => {
    return (
        <div className="application" data-component="application">
            <header className="header" data-component="header">
                <h1 className="header__headline">Order System</h1>
            </header>

            <main className="content">Hello World!</main>

            <footer className="footer" data-component="footer">
                <p className="footer__copyright">&copy; 2025 · Coded by Neville</p>
            </footer>
        </div>
    );
};

Application.displayName = 'Application';

////////////////////////////////////////////////////////////////////////////////////////////////////

const root = createRoot(document.getElementById('root') as HTMLDivElement);
root.render(<Application />);
