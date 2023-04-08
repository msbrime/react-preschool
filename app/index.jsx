import React from 'react'
import { createRoot } from 'react-dom/client'
import App from 'components/app.jsx'
import { HashRouter } from 'react-router-dom'

const Root = () => (
    <HashRouter ><App /></HashRouter>
)

const root = createRoot(document.getElementById('app'));
root.render(<Root />);
