const root = document.querySelector('#root');

const query = `query {
    pokemons(first: 150) {
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
        pokemons.forEach( pokemon => {

            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.classList.add('img');
            img.src = pokemon.image;

            const pokemonNameHeader = document.createElement('h2');
            const pokemonNameText = document.createTextNode(pokemon.name);
            pokemonNameHeader.appendChild(pokemonNameText);

            card.appendChild(img);
            card.appendChild(pokemonNameHeader);

            root.appendChild(card); 
        });
        
    })