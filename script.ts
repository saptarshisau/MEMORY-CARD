const searchInput = document.getElementById("search") as HTMLInputElement;
const searchBtn = document.getElementById("search-btn") as HTMLButtonElement;
const profileContainer = document.getElementById("profile-container") as HTMLDivElement;
const errorContainer = document.getElementById("error-container") as HTMLDivElement;
const reposContainer = document.getElementById("repos-container") as HTMLDivElement;

const avatar = document.getElementById("avatar") as HTMLImageElement;
const nameElement = document.getElementById("name")!;
const usernameElement = document.getElementById("username")!;
const bioElement = document.getElementById("bio")!;
const locationElement = document.getElementById("location")!;
const joinedDateElement = document.getElementById("joined-date")!;
const profileLink = document.getElementById("profile-link") as HTMLAnchorElement;

const followers = document.getElementById("followers")!;
const following = document.getElementById("following")!;
const repos = document.getElementById("repos")!;

const companyElement = document.getElementById("company")!;
const blogElement = document.getElementById("blog") as HTMLAnchorElement;
const twitterElement = document.getElementById("twitter") as HTMLAnchorElement;



interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  location: string;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
  html_url: string;
  company: string;
  blog: string;
  twitter_username: string;
  repos_url: string;
}

interface GitHubRepo {
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}


async function searchUser(): Promise<void> {

  const username = searchInput.value.trim();

  if (!username) return alert("Enter username");

  try {

    profileContainer.classList.add("d-none");
    errorContainer.classList.add("d-none");

    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) throw new Error("User not found");

    const user: GitHubUser = await response.json();

    displayUser(user);

    fetchRepos(user.repos_url);

  } catch {
    showError();
  }
}


async function fetchRepos(url: string): Promise<void> {

  reposContainer.innerHTML = "Loading repositories...";

  const response = await fetch(url + "?per_page=6");

  const repos: GitHubRepo[] = await response.json();

  displayRepos(repos);
}


function displayRepos(repos: GitHubRepo[]): void {

  reposContainer.innerHTML = "";

  repos.forEach((repo) => {

    const col = document.createElement("div");
    col.className = "col-md-6";

    col.innerHTML = `
      <div class="card bg-secondary text-light h-100">
        <div class="card-body">
          <h5>
            <a href="${repo.html_url}" target="_blank" class="text-info">
              ${repo.name}
            </a>
          </h5>

          <p>${repo.description ?? "No description"}</p>

          <small>
            ⭐ ${repo.stargazers_count}
            🍴 ${repo.forks_count}
          </small>
        </div>
      </div>
    `;

    reposContainer.appendChild(col);

  });

}


function displayUser(user: GitHubUser): void {

  avatar.src = user.avatar_url;

  nameElement.textContent = user.name ?? user.login;
  usernameElement.textContent = `@${user.login}`;

  bioElement.textContent = user.bio ?? "No bio";

  locationElement.textContent = user.location ?? "Unknown";

  joinedDateElement.textContent = formatDate(user.created_at);

  profileLink.href = user.html_url;

  followers.textContent = user.followers.toString();
  following.textContent = user.following.toString();
  repos.textContent = user.public_repos.toString();

  companyElement.textContent = user.company ?? "Not specified";

  blogElement.textContent = user.blog ?? "No website";
  blogElement.href = user.blog || "#";

  twitterElement.textContent = user.twitter_username
    ? `@${user.twitter_username}`
    : "No Twitter";

  twitterElement.href = user.twitter_username
    ? `https://twitter.com/${user.twitter_username}`
    : "#";

  profileContainer.classList.remove("d-none");
}


function showError(): void {
  errorContainer.classList.remove("d-none");
}


function formatDate(date: string): string {

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

}


searchBtn.addEventListener("click", searchUser);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchUser();
});


searchInput.value = "saptarshisau";
searchUser();