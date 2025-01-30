import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { ProductListPage } from './pages/ProductListPage'
import { ProductViewPage } from './pages/ProductViewPage'

export const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            Shop App
          </Link>
        </div>
      </nav>

      <section className="section">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductViewPage />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
