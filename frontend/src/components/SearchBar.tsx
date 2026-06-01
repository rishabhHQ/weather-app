import React from 'react'

interface Props {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onLocation: () => void
  loading: boolean
}

export default function SearchBar({ value, onChange, onSubmit, onLocation, loading }: Props) {
  return (
    <div className="search-row">
      <form onSubmit={onSubmit} className="search-form">
        <input
          className="search-input"
          type="text"
          placeholder="city name..."
          value={value}
          onChange={onChange}
          disabled={loading}
          autoFocus
        />
        <button className="btn-search" type="submit" disabled={loading || !value.trim()}>
          search
        </button>
      </form>
      <button className="btn-location" onClick={onLocation} disabled={loading} title="Use my location">
        ◎
      </button>
    </div>
  )
}