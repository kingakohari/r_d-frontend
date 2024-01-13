async function loadEvent() {
  const article = document.querySelector("article");

// Hf 6-1

  function readingTime() {
    const text = article.innerText;
    const wpm = 250; // Average reading speed (words per minute)
    const words = text.trim().split(/\s+/).length; // Calculate total number of words (length) by splitting at each whitespace
    const time = Math.ceil(words / wpm); // Calculate the read time rounded up to the nearest whole number
    document.querySelector("h1").insertAdjacentHTML(
      "afterend",
      `
        <p><span id="time"></span>(Estimated reading time: ${time} minutes)</p>
        `
    );
  }
  readingTime();

// Hf 6-2

  const searchBox = document.getElementById("searchBox");
  const originalContent = article.innerHTML;

  searchBox.addEventListener("input", function () {
    let searchText = this.value;
    if (searchText.length < 2) {
      article.innerHTML = originalContent; // No search for only 1 character typed in
      return;
    }
    highlightText(searchText);
  });

  function highlightText(word) {
    if (word.trim() === "") {
      article.innerHTML = originalContent; // Reset to original before new search (remove any highlights)
    } else {
      const regex = new RegExp(`\\b(${word})\\b`, "gi"); // Only full words are matched + case insensitive
      article.innerHTML = originalContent.replace(
        regex,
        '<span class="highlight">$1</span>' // Returns any text matching "word" in a span
      ); 
    }
  }

// Hf7

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    let authorId = Math.floor(Math.random() * users.length);
    let author = users[authorId];

    document.querySelector("article").insertAdjacentHTML(
      "beforeend",
      `
        <div id="author">
            <p id="a-name">By ${author.name}</p>
            <div id="author-info">
                <p id="a-email"><a href="mailto:${author.email}">${author.email}</a></p>
                <p id="a-phone">Tel: ${author.phone}</p>
                <p id="a-company">Company:<br> ${author.company.name}</p>   
            </div>              
        </div>
        `
    );
  } catch (error) {
    console.log("Error fetching user data:", error);
  }
}

window.addEventListener("load", loadEvent);