document.getElementById('searchBtn').addEventListener('click', searchWikipedia);

document.getElementById('searchInput').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    searchWikipedia();
  }
});

async function searchWikipedia() {
  const query = document.getElementById('searchInput').value.trim();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Clear previous results

  if (!query) {
    resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
    return;
  }

  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&origin=*`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.query && data.query.search.length > 0) {
      data.query.search.forEach(item => {
        const link = `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title)}`;
        resultsDiv.innerHTML += `
          <div class="result">
            <a href="${link}" target="_blank">${item.title}</a>
            <p>${item.snippet}...</p>
          </div>
        `;
      });
    } else {
      resultsDiv.innerHTML = '<p>No results found.</p>';
    }
  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = '<p>Error fetching results.</p>';
  }
}
