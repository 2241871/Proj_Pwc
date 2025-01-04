const favoritesContainer = document.querySelector('.favorites-container');

      function loadFavorites() {
        // Busca os favoritos do localStorage
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (favorites.length === 0) {
          // Exibe um alerta e uma mensagem na interface
          alert('Erro: Nenhum país encontrado nos favoritos!');
          favoritesContainer.innerHTML = '<p>Nenhum favorito encontrado!</p>';
          return;
        }

        // Renderiza os favoritos
        favorites.forEach((favorite) => {
          const countryCard = document.createElement('div');
          countryCard.classList.add('country-card');
          countryCard.innerHTML = `
            <img src="${favorite.flag}" alt="${favorite.name} flag" />
            <h3>${favorite.name}</h3>
            <button onclick="removeFromFavorites('${favorite.name}')">Remover</button>
          `;
          favoritesContainer.appendChild(countryCard);
        });
      }

      function removeFromFavorites(name) {
        // Busca os favoritos do localStorage
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Remove o país pelo nome
        favorites = favorites.filter((favorite) => favorite.name !== name);

        // Atualiza o localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));

        // Atualiza a interface
        favoritesContainer.innerHTML = '';
        loadFavorites();
      }

      // Carrega os favoritos ao abrir a página
      loadFavorites();