const apiKey = "84b11c491aba46edbe6034a72f26f964";
const blogContainer = document.getElementById("blog-container");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

async function fetchrandomNews() {
  try {
    // const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=12&apikey=${apiKey}`;
    const apiUrl = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching random data", error);
    return [];
  }
}

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsByQuery(query);
      displayBlogs(articles);
    } catch (error) {
      console.log("error fetching news by query", error);
    }
  }
});

async function fetchNewsByQuery(query) {
  try {
    const apiUrl = `
https://newsapi.org/v2/everything?q=${query}&pageSize=12&apikey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching random data", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    const truncatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "...."
        : article.title;
    title.textContent = truncatedTitle;
    const description = document.createElement("p");

    const truncatedDes =
      article.description.length > 100
        ? article.description.slice(0, 100) + "...."
        : article.description;
    description.textContent = truncatedDes;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogCard);
  });
}
(async () => {
  try {
    const articles = await fetchrandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("error fetching random data", error);
  }
})();
