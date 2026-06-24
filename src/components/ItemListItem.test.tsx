import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { Recipe } from '../types'
import ItemListItem from './ItemListItem'

describe('ItemListItem', () => {
  it('renders recipe title and navigable link', () => {
    const recipe: Recipe = {
      id: 'abc-123',
      title: 'Roasted Veggie Bowl',
      summary: 'Colorful vegetables with tahini dressing.',
      category: 'lunch',
      ingredients: ['carrot', 'broccoli'],
      instructions: 'Roast vegetables, then serve with dressing.',
      createdAt: new Date().toISOString(),
    }

    render(
      <MemoryRouter>
        <ul>
          <ItemListItem recipe={recipe} />
        </ul>
      </MemoryRouter>,
    )

    const link = screen.getByRole('link', { name: /roasted veggie bowl/i })
    expect(link).toHaveAttribute('href', '/items/abc-123')
    expect(screen.getByText(/colorful vegetables/i)).toBeInTheDocument()
  })
})