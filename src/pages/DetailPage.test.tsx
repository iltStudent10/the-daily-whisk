import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AppContext, type AppContextValue } from '../contexts/AppContext'
import DetailPage from './DetailPage'

function renderWithContext(contextValue: AppContextValue, route: string) {
  return render(
    <AppContext.Provider value={contextValue}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/items/:id" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>
    </AppContext.Provider>,
  )
}

describe('DetailPage', () => {
  it('loads recipe content based on URL param', () => {
    const contextValue: AppContextValue = {
      recipes: [
        {
          id: 'r-99',
          title: 'Miso Soup',
          summary: 'A simple comforting soup.',
          category: 'dinner',
          ingredients: ['miso', 'tofu'],
          instructions: 'Warm stock and dissolve miso.',
          createdAt: new Date().toISOString(),
        },
      ],
      filteredRecipes: [],
      filter: 'all',
      loading: false,
      error: null,
      setFilter: vi.fn(),
      addRecipe: vi.fn(),
    }

    renderWithContext(contextValue, '/items/r-99')

    expect(screen.getByRole('heading', { name: /miso soup/i })).toBeInTheDocument()
    expect(screen.getByText(/simple comforting soup/i)).toBeInTheDocument()
  })

  it('shows a graceful error for invalid route ids', () => {
    const contextValue: AppContextValue = {
      recipes: [],
      filteredRecipes: [],
      filter: 'all',
      loading: false,
      error: null,
      setFilter: vi.fn(),
      addRecipe: vi.fn(),
    }

    renderWithContext(contextValue, '/items/does-not-exist')

    expect(screen.getByText(/recipe not found for this url/i)).toBeInTheDocument()
  })
})