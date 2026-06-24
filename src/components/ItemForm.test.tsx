import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ItemForm from './ItemForm'

describe('ItemForm', () => {
  it('shows validation errors when required fields are missing', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<ItemForm onSubmit={onSubmit} />)
    await user.click(screen.getByRole('button', { name: /save recipe/i }))

    expect(screen.getByText(/title is required/i)).toBeInTheDocument()
    expect(screen.getByText(/summary must be at least 10 characters/i)).toBeInTheDocument()
    expect(screen.getByText(/category is required/i)).toBeInTheDocument()
    expect(screen.getByText(/add at least one ingredient/i)).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits parsed form data when inputs are valid', async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()

    render(<ItemForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/title/i), 'Spicy Noodles')
    await user.type(
      screen.getByLabelText(/summary/i),
      'A quick noodle dish with chili, garlic, and sesame.',
    )
    await user.selectOptions(screen.getByLabelText(/category/i), 'dinner')
    await user.type(screen.getByLabelText(/ingredients/i), 'noodles\nchili oil\ngarlic')
    await user.type(
      screen.getByLabelText(/instructions/i),
      'Boil noodles, mix sauce ingredients, then toss everything together.',
    )

    await user.click(screen.getByRole('button', { name: /save recipe/i }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Spicy Noodles',
        category: 'dinner',
        ingredients: ['noodles', 'chili oil', 'garlic'],
      }),
    )
  })
})