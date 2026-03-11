var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var searchInput = document.getElementById("search");
var searchBtn = document.getElementById("search-btn");
var profileContainer = document.getElementById("profile-container");
var errorContainer = document.getElementById("error-container");
var reposContainer = document.getElementById("repos-container");
var avatar = document.getElementById("avatar");
var nameElement = document.getElementById("name");
var usernameElement = document.getElementById("username");
var bioElement = document.getElementById("bio");
var locationElement = document.getElementById("location");
var joinedDateElement = document.getElementById("joined-date");
var profileLink = document.getElementById("profile-link");
var followers = document.getElementById("followers");
var following = document.getElementById("following");
var repos = document.getElementById("repos");
var companyElement = document.getElementById("company");
var blogElement = document.getElementById("blog");
var twitterElement = document.getElementById("twitter");
function searchUser() {
    return __awaiter(this, void 0, void 0, function () {
        var username, response, user, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    username = searchInput.value.trim();
                    if (!username)
                        return [2 /*return*/, alert("Enter username")];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    profileContainer.classList.add("d-none");
                    errorContainer.classList.add("d-none");
                    return [4 /*yield*/, fetch("https://api.github.com/users/".concat(username))];
                case 2:
                    response = _b.sent();
                    if (!response.ok)
                        throw new Error("User not found");
                    return [4 /*yield*/, response.json()];
                case 3:
                    user = _b.sent();
                    displayUser(user);
                    fetchRepos(user.repos_url);
                    return [3 /*break*/, 5];
                case 4:
                    _a = _b.sent();
                    showError();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function fetchRepos(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, repos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reposContainer.innerHTML = "Loading repositories...";
                    return [4 /*yield*/, fetch(url + "?per_page=6")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    repos = _a.sent();
                    displayRepos(repos);
                    return [2 /*return*/];
            }
        });
    });
}
function displayRepos(repos) {
    reposContainer.innerHTML = "";
    repos.forEach(function (repo) {
        var _a;
        var col = document.createElement("div");
        col.className = "col-md-6";
        col.innerHTML = "\n      <div class=\"card bg-secondary text-light h-100\">\n        <div class=\"card-body\">\n          <h5>\n            <a href=\"".concat(repo.html_url, "\" target=\"_blank\" class=\"text-info\">\n              ").concat(repo.name, "\n            </a>\n          </h5>\n\n          <p>").concat((_a = repo.description) !== null && _a !== void 0 ? _a : "No description", "</p>\n\n          <small>\n            \u2B50 ").concat(repo.stargazers_count, "\n            \uD83C\uDF74 ").concat(repo.forks_count, "\n          </small>\n        </div>\n      </div>\n    ");
        reposContainer.appendChild(col);
    });
}
function displayUser(user) {
    var _a, _b, _c, _d, _e;
    avatar.src = user.avatar_url;
    nameElement.textContent = (_a = user.name) !== null && _a !== void 0 ? _a : user.login;
    usernameElement.textContent = "@".concat(user.login);
    bioElement.textContent = (_b = user.bio) !== null && _b !== void 0 ? _b : "No bio";
    locationElement.textContent = (_c = user.location) !== null && _c !== void 0 ? _c : "Unknown";
    joinedDateElement.textContent = formatDate(user.created_at);
    profileLink.href = user.html_url;
    followers.textContent = user.followers.toString();
    following.textContent = user.following.toString();
    repos.textContent = user.public_repos.toString();
    companyElement.textContent = (_d = user.company) !== null && _d !== void 0 ? _d : "Not specified";
    blogElement.textContent = (_e = user.blog) !== null && _e !== void 0 ? _e : "No website";
    blogElement.href = user.blog || "#";
    twitterElement.textContent = user.twitter_username
        ? "@".concat(user.twitter_username)
        : "No Twitter";
    twitterElement.href = user.twitter_username
        ? "https://twitter.com/".concat(user.twitter_username)
        : "#";
    profileContainer.classList.remove("d-none");
}
function showError() {
    errorContainer.classList.remove("d-none");
}
function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}
searchBtn.addEventListener("click", searchUser);
searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter")
        searchUser();
});
searchInput.value = "saptarshisau";
searchUser();
