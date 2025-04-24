const btn = document.querySelector(".btn-toggle");
//Check for dark mode OS preference 
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

//Get user's theme from local storage
const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
    document.documentElement.classList.toggle("darkMode");
} else if (currentTheme == "light") {
    document.documentElement.classList.toggle("lightMode");
}

btn.addEventListener("click", function () {
    if (prefersDarkScheme.matches) {
        document.documentElement.classList.toggle("lightMode");
        let theme = document.documentElement.classList.contains("lightMode")
            ? "light"
            : "dark";
    } else {
        document.documentElement.classList.toggle("darkMode");
        let theme = document.documentElement.classList.contains("dark-theme")
            ? "dark"
            : "light";
    }
    localStorage.setItem("theme", theme);
});