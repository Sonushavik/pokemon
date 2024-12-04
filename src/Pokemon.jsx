import React, { useEffect, useState } from 'react';
import "./index.css"
import { PokemonCards } from './PokemonCards';
import loader from "../src/assets/loader.gif";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]); // Separate state for search results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(""); 
  const [offset, setOffset] = useState(0); 
  const LIMIT = 15; 

  const API = `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`;

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const pokemonData = await res.json();
        return pokemonData;
      });

      const detailedResponses = await Promise.all(detailedPokemonData);
      setPokemon((prev) => [...prev, ...detailedResponses]); // Append new data
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setOffset((prev) => prev + LIMIT); 
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [offset]); 

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  // Update `filteredPokemon` based on the search input
  useEffect(() => {
    if (search === "") {
      setFilteredPokemon(pokemon); // Show all Pokémon when search is empty
    } else {
      setFilteredPokemon(
        pokemon.filter((curPokemon) =>
          curPokemon.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, pokemon]); // Recalculate when `search` or `pokemon` changes

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <section className="container">
      <header>
        <h1>Let's Catch Pokémon</h1>
      </header>

      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div>
        {filteredPokemon.length === 0 && search ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p>No Pokémon found with the name "{search}".</p>
          </div>
        ) : (
          <ul className="cards">
            {filteredPokemon.map((curPokemon) => (
              <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
            ))}
          </ul>
        )}
      </div>

      {loading && (
        <div>
          <h1>
          <img  src={loader} alt="Loading..." />
          </h1>
        </div>
      )}
    </section>
  );
};

export default Pokemon; 
