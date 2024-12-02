**Pokémon App Documentation**
Overview

This project fetches data from the Pokémon API to display Pokémon information dynamically. The app allows users to search for Pokémon, view their details, and load more Pokémon as they scroll down (infinite scrolling).

Components

1. Pokemon.jsx

  This is the main component that fetches, filters, and displays the Pokémon data. It handles:
  Fetching Pokémon data from the API with pagination.
  Filtering Pokémon by name using a search bar.
  Displaying a loader image while data is loading.
  Handling infinite scrolling to load more Pokémon as the user scrolls.

  Features:

  Search Pokémon: Allows users to search for Pokémon by name.
  Infinite Scrolling: More Pokémon are loaded as the user scrolls down.
  Error Handling: Displays an error message if the data fetch fails.
  Loading Indicator: Displays a loading spinner while the data is being fetched

  Key Functions:

  fetchPokemon: Fetches data from the Pokémon API and retrieves detailed information about each Pokémon.
  handleInfiniteScroll: Triggers fetching of more Pokémon when the user scrolls to the bottom of the page.
  useEffect hooks:
    Fetches Pokémon data when the offset state changes.
    Updates the filtered Pokémon list whenever the search term changes or new Pokémon data is fetched.


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


2. PokemonCards.jsx

  This component is used to display detailed information about each Pokémon in a card format. Each card     includes the following:

  Pokémon's name.
  Type(s) of the Pokémon.
  Height, weight, speed, experience, attack, and abilities.

  Key Features:

  Display Pokémon Image: Shows the Pokémon's image from the API.
  Pokémon Stats: Displays various stats including height, weight, speed, attack, and base experience.
  Abilities: Displays the primary ability of the Pokémon.


      export const PokemonCards = ({ pokemonData }) => {
      return (
        <li className="pokemon-card">
          <figure>
            <img src={pokemonData.sprites.other.dream_world.front_default} alt={pokemonData.name} className="pokemon-image" />
          </figure>
          <h1 className="pokemon-name">{pokemonData.name}</h1>
          <div className="pokemon-info pokemon-highlight"> 
            <p>{pokemonData.types.map((curType) => curType.type.name)}</p>
          </div>
          <div className="grid-three-cols">
            <p className="pokemon-info"><span>Height:</span> {pokemonData.height}</p>
            <p className="pokemon-info"><span>Weight:</span> {pokemonData.weight}</p>
            <p className="pokemon-info"><span>Speed:</span> {pokemonData.stats[5].base_stat}</p>
          </div>
          <div className="grid-three-cols">
            <div className="pokemon-info">
              <p>{pokemonData.base_experience}</p>
              <span>Experience:</span>
            </div>
            <div className="pokemon-info">
              <p>{pokemonData.stats[1].base_stat}</p>
              <span>Attack:</span>
            </div>
            <div className="pokemon-info">
              <p>{pokemonData.abilities.map((abilityInfo) => abilityInfo.ability.name).slice(0, 1).join(", ")}</p>
              <span>Abilities:</span>
            </div>
          </div>
        </li>
      );
    };

Technologies Used

  React: A JavaScript library for building user interfaces.
  Pokémon API: Provides detailed data about Pokémon.
  CSS: For styling the app.

Setup and Installation
    Clone the repository: git clone https://github.com/your-username/pokemon-app.git
    Install dependencies:
      cd pokemon-app
      npm install
    Run the development server:
      npm run dev
    Open http://localhost:3000 in your browser to view the app.











