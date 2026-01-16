async function searchGitHub() {
    const query = document.getElementById("searchInput").value;
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "Loading...";

    try {
        const repoResponse = await fetch(`https://api.github.com/search/repositories?q=${query}`);
        const repoData = await repoResponse.json();

        resultsDiv.innerHTML = "";

        if (repoData.items.length === 0) {
            resultsDiv.innerHTML = "<p>No repositories found</p>";
            return;
        }

        repoData.items.slice(0, 10).forEach(repo => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description available"}</p>
                <p>⭐ Stars: ${repo.stargazers_count}</p>
                <p>🍴 Forks: ${repo.forks_count}</p>
                <p>🧑 Owner: ${repo.owner.login}</p>
                <a href="${repo.html_url}" target="_blank">View Repository</a>
            `;

            resultsDiv.appendChild(card);
        });

    } catch (error) {
        resultsDiv.innerHTML = "<p>Error fetching data</p>";
    }
}
