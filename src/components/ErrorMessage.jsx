import React from 'react'

const ErrorMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
        <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div className="text-center">
        <h3 className="text-white font-semibold mb-1">Something went wrong</h3>
        <p className="text-slate-400 text-sm max-w-xs">{message || 'Unable to fetch weather data. Please check the city name and try again.'}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded-xl bg-sky-500/20 border border-sky-500/30 text-sky-400 text-sm font-medium hover:bg-sky-500/30 transition-all"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
