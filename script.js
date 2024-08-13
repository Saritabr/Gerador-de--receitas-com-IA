// Função para atualizar os botões de remoção
function updateRemoveButtons() {
  const removeButtons = document.querySelectorAll('.ingredient-row .btn-danger'); 
  if (document.querySelectorAll('.ingredient-row').length <= 1) {
    removeButtons.forEach(button => button.disabled = true);
  } else {
    removeButtons.forEach(button => button.disabled = false);
    // Habilitar o primeiro botão especificamente (opcional)
    document.querySelectorAll('.ingredient-row')[0].querySelector('.btn-danger').disabled = false;
  }
}

// Função para adicionar um novo campo de música
function addIngredient() {
  const ingredientsDiv = document.getElementById('ingredients');

  const ingredientRow = document.createElement('div');
  ingredientRow.className = 'ingredient-row';

  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.className = 'ingredient form-control ingredient-input';
  newInput.placeholder = 'Informe uma música ou a letra dela...';

  const removeButton = document.createElement('button');
  removeButton.className = 'btn-danger';
  removeButton.innerText = 'Excluir';
  removeButton.onclick = () => removeIngredient(removeButton);

  ingredientRow.appendChild(newInput);
  ingredientRow.appendChild(removeButton);

  ingredientsDiv.appendChild(ingredientRow);

  updateRemoveButtons();
}

// Função para remover uma música
function removeIngredient(button) {
  const ingredientRow = button.parentElement;
  ingredientRow.remove();

  updateRemoveButtons();
}

// Função para submeter o formulário e gerar a história
async function submitForm() {
  const ingredientInputs = document.getElementsByClassName('ingredient');
  const musicas = [];

  for (let i = 0; i < ingredientInputs.length; i++) {
    if (ingredientInputs[i].value) {
      musicas.push(ingredientInputs[i].value);
    }
  }

  if (musicas.length < 1) {
    alert('Por favor, preencha pelo menos um campo!');
    return;
  }

  const data = {
    musicas: musicas
  };

  try {
    const response = await fetch('http://localhost:5000/receita', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    const responseDiv = document.getElementById('resposta');

    if (result.receita) {
      responseDiv.innerHTML = result.receita;
    } else {
      responseDiv.innerHTML = `<p>Erro: ${result.Erro}</p>`;
    }

    responseDiv.style.display = 'block';
  } catch (error) {
    const responseDiv = document.getElementById('resposta');
    responseDiv.innerHTML = `<p>Erro: ${error.message}</p>`;
    responseDiv.style.display = 'block';
  }
}

// Event listener para atualizar os botões quando o DOM for carregado
document.addEventListener('DOMContentLoaded', updateRemoveButtons);
