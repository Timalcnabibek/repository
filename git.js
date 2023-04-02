const form = document.querySelector('form');
const usernameInput = document.querySelector('#username');
const reposList = document.querySelector('#repos-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();

  if (username === '') {
    alert('Please enter a username');
    return;
  }

  const url = `https://api.github.com/users/${username}/repos`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Unable to fetch repositories');
      }
    })
    .then(repositories => {
      reposList.innerHTML = '';

      repositories.forEach(repository => {
        const listItem = document.createElement('li');
        listItem.innerText = repository.name;
        reposList.appendChild(listItem);
      });
    })
    .catch(error => {
      alert(error.message);
    });
});
