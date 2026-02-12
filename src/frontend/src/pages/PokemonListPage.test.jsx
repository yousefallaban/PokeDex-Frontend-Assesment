import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../test-utils/TestProviders';
import PokemonListPage from './PokemonListPage';
import { pokemonApi } from '../services/pokemonApi';

vi.mock('../services/pokemonApi', () => ({
  pokemonApi: {
    getAllPokemon: vi.fn(),
    getPokedex: vi.fn(),
    catchPokemon: vi.fn(),
    releasePokemon: vi.fn(),
  },
}));

const fakePokemon = [
  { id: 1, name: 'bulbasaur', sprites: { front_default: 'https://img/1.png' } },
  { id: 4, name: 'charmander', sprites: { front_default: 'https://img/4.png' } },
];

beforeEach(() => {
  vi.clearAllMocks();
  pokemonApi.getPokedex.mockResolvedValue([]);
});

describe('PokemonListPage', () => {
  it('shows loading state initially', () => {
    pokemonApi.getAllPokemon.mockReturnValue(new Promise(() => {}));
    renderWithProviders(<PokemonListPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders pokemon cards after fetch', async () => {
    pokemonApi.getAllPokemon.mockResolvedValue(fakePokemon);
    renderWithProviders(<PokemonListPage />, { mockState: { caughtPokemon: [] } });

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });
    expect(screen.getByText('charmander')).toBeInTheDocument();
  });

  it('shows error message on failure', async () => {
    pokemonApi.getAllPokemon.mockRejectedValue(new Error('Failed to fetch Pokémon'));
    renderWithProviders(<PokemonListPage />, { mockState: { caughtPokemon: [] } });

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch Pokémon')).toBeInTheDocument();
    });
  });


  it('shows empty state when API returns no pokemon', async () => {
    pokemonApi.getAllPokemon.mockResolvedValue([]);
    renderWithProviders(<PokemonListPage />, { mockState: { caughtPokemon: [] } });

    await waitFor(() => {
      expect(screen.getByText(/no pokémon out there/i)).toBeInTheDocument();
    });
  });

  it('shows filled heart for caught pokemon', async () => {
    pokemonApi.getAllPokemon.mockResolvedValue(fakePokemon);
    renderWithProviders(<PokemonListPage />, {
      mockState: { caughtPokemon: [{ id: 1, name: 'bulbasaur' }] },
    });

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    const heartButtons = screen.getAllByRole('button');
    const bulbasaurHeart = heartButtons.find((btn) => btn.getAttribute('aria-label') === 'Remove from collection');
    expect(bulbasaurHeart).toBeInTheDocument();
  });
});
