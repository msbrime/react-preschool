import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from 'components/app'
import { BrowserRouter } from 'react-router-dom'
import { inflate as inflateStore } from 'services/firebase'

inflateStore();
hydrateRoot(document.getElementById('app'), <BrowserRouter ><App /></BrowserRouter>);
