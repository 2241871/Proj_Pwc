const countriesContainer = document.querySelector('.countries-container');
const filterByRegion = document.querySelector('.filter-by-region');
const searchInput = document.querySelector('.search-container input');
const themeChanger = document.querySelector('.theme-changer');

let allCountriesData = [];

// Fetch de todos os países na inicialização
fetch('https://restcountries.com/v3.1/all')
  .then((res) => res.json())
  .then((data) => {
    allCountriesData = data; // Armazena os dados em uma variável global
    renderCountries(data);  // Renderiza todos os países inicialmente
  })
  .catch((error) => {
    console.error('Erro ao buscar os países:', error);
  });

// Filtro por região
filterByRegion.addEventListener('change', (e) => {
  const region = e.target.value;

  if (region === 'all' || region === '') {
    renderCountries(allCountriesData); // Mostra todos os países
  } else {
    fetch(`https://restcountries.com/v3.1/region/${region}`)
      .then((res) => res.json())
      .then((data) => renderCountries(data))
      .catch((error) => {
        console.error('Erro ao filtrar por região:', error);
        countriesContainer.innerHTML = '<p>Erro ao filtrar por região.</p>';
      });
  }
});

// Função para renderizar os países na tela
function renderCountries(data) {
  countriesContainer.innerHTML = ''; // Limpa o container

  if (data.length === 0) {
    countriesContainer.innerHTML = '<p>Nenhum país encontrado.</p>';
    return;
  }

  data.forEach((country) => {
    const countryCard = document.createElement('div');
    countryCard.classList.add('country-card');
    countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="${country.name.common} flag" />
      <div class="card-text">
          <h3 class="card-title">${country.name.common}</h3>
          <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
          <p><b>Region: </b>${country.region}</p>
          <p><b>Capital: </b>${country.capital?.[0] || 'N/A'}</p>
      </div>
      <button class="favorite-button"><span class="favorite-icon">☆</span> Favorito</button>
    `;

    // Adiciona evento ao botão de favoritos
    countryCard.querySelector('.favorite-button').addEventListener('click', () => {
      addToFavorites(country.name.common, country.flags.svg);
    });

    countriesContainer.append(countryCard);
  });
}

// Adicionar aos favoritos
function addToFavorites(name, flag) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Verifica se já está nos favoritos
  if (favorites.some((fav) => fav.name === name)) {
    alert(`${name} já está nos favoritos!`);
    return;
  }

  favorites.push({ name, flag });
  localStorage.setItem('favorites', JSON.stringify(favorites));
  alert(`${name} foi adicionado aos favoritos!`);
}

// Busca por nome do país
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim().toLowerCase();

  if (query === '') {
    renderCountries(allCountriesData); // Mostra todos os países se o campo estiver vazio
    return;
  }

  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(query)
  );

  renderCountries(filteredCountries); // Renderiza os países filtrados
});

// Troca de tema (claro/escuro)
themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});




