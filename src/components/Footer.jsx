import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-900/60 backdrop-blur-xl mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left: Branding */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3 group">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/30 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <span className="font-bold text-white text-lg">Nimbus</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your comprehensive weather information dashboard. Get real-time weather updates, forecasts, and detailed meteorological data for cities worldwide.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Quick Links</h3>
            <nav className="space-y-3">
              <Link to="/" className="block text-slate-400 hover:text-sky-400 transition-colors text-sm">
                Home
              </Link>
              <Link to="/forecast" className="block text-slate-400 hover:text-sky-400 transition-colors text-sm">
                Forecast
              </Link>
              <Link to="/cities" className="block text-slate-400 hover:text-sky-400 transition-colors text-sm">
                Search Cities
              </Link>
              <Link to="/about" className="block text-slate-400 hover:text-sky-400 transition-colors text-sm">
                Weather Details
              </Link>
            </nav>
          </div>

          {/* Right: Social Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4">Connect With Us</h3>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-xl">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-xl">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-sky-400 transition-colors text-xl">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-slate-500 text-sm text-center">
            © 2026 WeatherDash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
