import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'

import './Header.css'

export const Header: React.FC = ({ children }): JSX.Element => {
  return (
    <header>
      <AppBar position="static">
        <Toolbar className="header-toolbar">
          <Link to="/">
            <IconButton>
              <ArrowBackIcon style={{color: 'white'}}/>
            </IconButton>
          </Link>
          {children}
        </Toolbar>
      </AppBar>
    </header>
  )
}
