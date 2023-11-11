import React from 'react'
import './Navbar.css'
const Navbar = () => {
    return (
        <nav>
            <div className="container">
                <div className="nav-wrapper">
                    <h2>CRYPTOFOLIO</h2>
                    <div className="nav-right">
                        <select name="" id="">
                            <option value="USD">USD</option>
                            <option value="UZS">UZS</option>
                        </select>
                        <button>
                            WATCHLIST
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar