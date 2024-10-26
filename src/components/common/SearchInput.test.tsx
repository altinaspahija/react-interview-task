import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '../../components/common/Search';
import '@testing-library/jest-dom';

describe('SearchInput Component', () => {
  test('renders the search input field correctly', () => {
    render(<SearchInput onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Search');
    expect(inputElement).not.toBeNull();
  });

  test('calls the onSearch function when input changes', () => {
    const mockOnSearch = jest.fn();
    render(<SearchInput onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText('Search');

    fireEvent.change(inputElement, { target: { value: 'Test Search' } });
    expect(mockOnSearch).toHaveBeenCalledWith('Test Search');
  });

  test('displays the correct value in the input field', () => {
    render(<SearchInput onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Search');

    fireEvent.change(inputElement, { target: { value: 'Search Term' } });
    expect((inputElement as HTMLInputElement).value).toBe('Search Term'); 
  });
});
