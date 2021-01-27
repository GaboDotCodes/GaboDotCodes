const root = document.querySelector('#cards');

const query = `query {
    pokemons(first: 151) {
      id
      name
      image
      types
    }
  }`;

const apiRequest = fetch('https://graphql-pokemon2.vercel.app/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query })
});

apiRequest
    .then(r => r.json())
    .then( ({ data: { pokemons } }) => {
      console.table(pokemons);
      pokemons.forEach( pokemon => {

          const card = document.createElement('div');
          card.classList.add('card');

          const img = document.createElement('img');
          img.classList.add('img');
          img.src = pokemon.image;

          const pokemonNameHeader = document.createElement('h2');
          const pokemonNameText = document.createTextNode(pokemon.name);
          pokemonNameHeader.appendChild(pokemonNameText);

          const pokemonTypesP = document.createElement('p');
          const pokemonTypesText = document.createTextNode(pokemon.types.join(' - '));
          pokemonTypesP.appendChild(pokemonTypesText);

          card.appendChild(img);
          card.appendChild(pokemonNameHeader);
          card.appendChild(pokemonTypesP);
          
          root.appendChild(card);
      });  
    })