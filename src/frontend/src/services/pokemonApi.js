const API_BASE = '/api/pokemon';

export const pokemonApi = {
  async getAllPokemon() {
    const response = await fetch(API_BASE);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon');
    }
    return response.json();
  },

  async getPokedex() {
    const response = await fetch(`${API_BASE}/pokedex`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokédex');
    }
    return response.json();
  },

  async catchPokemon(id) {
    const response = await fetch(`${API_BASE}/${id}/pokedex`, {
      method: 'POST',
    });
    if (!response.ok) {
      if (response.status === 400) {
        const text = await response.text();
        throw new Error(text || 'Pokémon already caught');
      }
      throw new Error('Failed to catch Pokémon');
    }
    return response.json();
  },

  async releasePokemon(id) {
    const response = await fetch(`${API_BASE}/${id}/pokedex`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to release Pokémon');
    }
  },
};
