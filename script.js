function loadEvent() {

    function readingTime() {
        const text = document.querySelector('article').innerText;
        const wpm = 250;             // Average reading speed (words per minute)
        const words = text.trim().split(/\s+/).length;  // Calculate total number of words (length) by splitting at each whitespace
        const time = Math.ceil(words / wpm);  // Calculate the read time rounded up to the nearest whole number
        document.querySelector('h1').insertAdjacentHTML('afterend', `
        <p><span id="time"></span>(Estimated reading time: ${time} minutes)</p>
        `)
      }
      readingTime();

    const searchBox = document.getElementById('searchBox');
    const article = document.querySelector('article');
    const originalContent = article.innerHTML; 

    searchBox.addEventListener('input', function() {
        let searchText = this.value;
        if (searchText.length < 2) {
            article.innerHTML = originalContent;  // No search for only a single character typed in
            return;
        }
        highlightText(searchText);
        }
    );

    function highlightText(word) {
        if (word.trim() === '') {
            article.innerHTML = originalContent;  // Reset to original before new search (remove any highlights)
        } else {
            const regex = new RegExp(`\\b(${word})\\b`, 'gi');  // Only full words are matched + case insensitive
            article.innerHTML = originalContent.replace(regex, '<span class="highlight">$1</span>');  // Returns any text matching "word" in a span
        }
    }

    /* fetch("./public/data.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      console.log(data)

      document.getElementById("root").insertAdjacentHTML('beforeend', `
        <header>
            <p id="title">Best Beers</p>
            <button class="material-icons">menu</button>
        </header>
      `)

      data.cards.map(({title, sub, text}, i ) => document.getElementById('root').insertAdjacentHTML('beforeend', `
        <div class="beercard">
            <p class="number">${i+1}</p>
            <p class="name">${title}</p>
            <div class="basic-info">
                <p>${sub}</p>
                <p class="description">${text}</p>
            </div>   
            <button class="details-button">details <span class="material-icons arrow">arrow_forward</span></button>         
        </div>
        `))
      
    }).catch(function(err) {
        console.log('Fetch problem show: ' + err.message);
      }); */
}

window.addEventListener("load", loadEvent);