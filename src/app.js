import React from 'react'
import ReactDOM from 'react-dom'

import '@app/styles/index.css'

//pages
import { IndexPage } from '@pages' 

ReactDOM.render(
    <IndexPage />,
    document.querySelector('#root')
)