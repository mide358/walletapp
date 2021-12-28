import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import { FiMenu } from 'react-icons/fi'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }
  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className="navBar">
      <div className="logo">
        <h2>e-Wallet</h2>
      </div>
      <div className="btn">
        <button onClick={handleToggle}>
          {isOpen ? (
            <MdClose style={{ color: '#fff', width: '25px', height: '25px' }} />
          ) : (
            <FiMenu style={{ color: '#fff', width: '25px', height: '25px' }} />
          )}
        </button>
        <ul className={`navList ${isOpen ? ' showMenu' : ''}`}>
          <li className="navItem" onClick={() => closeMenu()}>
            <Link to="/">Login</Link>
          </li>

          <li className="navItem" onClick={() => closeMenu()}>
            <Link to="/wallet">Wallet</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
