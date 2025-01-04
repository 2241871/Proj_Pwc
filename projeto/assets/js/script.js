let favoritos = [];

    // Referência ao botão e à área de exibição de mensagens
    const favoritosBtn = document.getElementById("favoritosBtn");
    const mensagemErro = document.getElementById("mensagemErro");

    // Função para tratar o clique no botão "Favoritos"
    favoritosBtn.addEventListener("click", () => {
      if (favoritos.length === 0) {
        // Exibe a mensagem de erro
        mensagemErro.style.display = "block";
        mensagemErro.textContent = "Não tem nenhum país nos favoritos.";
      } else {
        // Limpa a mensagem de erro e exibe os favoritos
        mensagemErro.style.display = "none";
        alert("Seus países favoritos: " + favoritos.join(", "));
      }
    });

// Referência ao elemento "Loja"
const lojaElement = document.getElementById("Loja");

// Adiciona o evento de clique
lojaElement.addEventListener("click", () => {
  alert("A loja não se encontra disponível.");
  favoritos.push("Portugal");
});

