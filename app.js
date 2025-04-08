const defaultMovies = [
  {
    id: 1,
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing.",
    comments: [],
  },
  {
    id: 2,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space.",
    comments: [],
  },
  {
    id: 3,
    title: "The Matrix",
    description: "A hacker discovers the true nature of his reality.",
    comments: [],
  },
];

let movies = loadMoviesFromStorage();
let currentMovieId = null;

function loadMoviesFromStorage() {
  const saved = localStorage.getItem("movies");
  return saved ? JSON.parse(saved) : defaultMovies;
}

function saveMoviesToStorage() {
  localStorage.setItem("movies", JSON.stringify(movies));
}

function showMovieList() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h1>🍿 Movie Reviews</h1>
    <img src="https://cdn-icons-png.flaticon.com/512/560/560216.png" alt="Popcorn" style="width: 100px; margin-bottom: 20px;" />
  `;

  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.innerHTML = `<button class="movie-btn" onclick="viewMovie(${movie.id})">${movie.title}</button>`;
    app.appendChild(div);
  });
}

function viewMovie(id) {
  const movie = movies.find((m) => m.id === id);
  currentMovieId = id;

  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>${movie.title}</h2>
    <p>${movie.description}</p>
    <textarea id="commentInput" placeholder="Leave a comment..."></textarea>
    <button onclick="addComment(${movie.id})">Add Comment</button>
    <h3>Comments:</h3>
    <ul id="commentsList"></ul>
    <button onclick="showMovieList()">← Back</button>
  `;
  renderComments(movie);
}

function renderComments(movie) {
  const list = document.getElementById("commentsList");
  list.innerHTML = "";
  movie.comments.forEach((comment, index) => {
    const li = document.createElement("li");

    const commentText = document.createElement("span");
    commentText.classList.add("text");
    commentText.innerText = comment;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = () => deleteComment(movie.id, index);

    li.appendChild(commentText);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function addComment(id) {
  const input = document.getElementById("commentInput");
  const comment = input.value.trim();
  if (comment) {
    const movie = movies.find((m) => m.id === id);
    movie.comments.push(comment);
    saveMoviesToStorage();
    input.value = "";
    renderComments(movie);
  }
}

function deleteComment(movieId, commentIndex) {
  const movie = movies.find((m) => m.id === movieId);
  movie.comments.splice(commentIndex, 1);
  saveMoviesToStorage();
  renderComments(movie);
}

window.onload = () => {
  showMovieList();
};
