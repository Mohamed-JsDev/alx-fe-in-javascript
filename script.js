document.addEventListener("DOMContentLoaded", function () {
  const newQuoteText = document.getElementById("newQuoteText");
  const newQuoteCategory = document.getElementById("newQuoteCategory"); // Updated ID
  const btnAddQuote = document.getElementById("btnAddQuote");
  const showNewQuote = document.getElementById("newQuote");
  const quoteDisplay = document.getElementById("quoteDisplay");
  const categoryFilter = document.getElementById("categoryFilter");
  const exportButton = document.getElementById("exportQuotes");

  const categories = [
    "age",
    "alone",
    "amazing",
    "anger",
    "architecture",
    "art",
    "attitude",
    "beauty",
    "best",
    "birthday",
    "business",
    "car",
    "change",
    "communication",
    "computers",
    "cool",
  ];
  // عاوزين زرار يطلب منه هوا عاوز الداتا منين لوكل ولا api دا في الزرار اللي بيطلب اقتباس  تلقائيا هيكون فاضل هنبعت الاقتباس فين
  //عاوزين زرار نحدد منه مين اللي يشتغل

  // check first value
  localStorage.setItem("value", categoryFilter.value);
  categoryFilter.onchange = function filterQuotes() {
    localStorage.setItem("value", categoryFilter.value);
  };
  // turn Buttons & function
  btnAddQuote.addEventListener("click", createAddQuoteForm);
  showNewQuote.addEventListener("click", displayRandomQuote);
  exportButton.addEventListener("click", exportQuotesToJson);
  // add category option in html documents
  function populateCategories() {
    localStorage.setItem("value", categoryFilter.value);
    categories.map((opt) => {
      const option = document.createElement("option");
      option.textContent = opt;
      categoryFilter.appendChild(option);
    });
  }
  populateCategories();

  btnAddQuote.addEventListener("click", createAddQuoteForm);

  showNewQuote.addEventListener("click", displayRandomQuote);

  // fetch data if user want

  const fetchQuotesFromServer = async (id) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };
  const req = (title, body) => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: `${title}`,
        body: `${body}`,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };
  // create Quote from form
  function createAddQuoteForm() {
    const text = newQuoteText.value;
    const category = newQuoteCategory.value.trim();
    let message = [];

    const AddNewQuote = document.createElement("div");
    const textQuote = document.createElement("p");
    textQuote.innerHTML = `${message} is added done`;
    AddNewQuote.appendChild(textQuote);
    document.body.appendChild(AddNewQuote);
    req(text, category);
  }
  // change category to random quote
  categoryFilter.onchange = function filterQuotes() {
    localStorage.removeItem("value");
    localStorage.setItem("value", categoryFilter.value);
  };

  // show random Quote
  async function displayRandomQuote() {
    const id = Math.floor(Math.random() * 100);
    //check localStorage & edit category
    const value = await fetchQuotesFromServer(id);
    console.log(value.title);

    quoteDisplay.innerHTML = value.title;
  }

  //
  //
  //
  //
  //////////////////////////////////////////////////////////
  ///
  ///
  //
  //
  // add json file
  let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

  // Function to save quotes to local storage
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }

  // Function to export quotes to JSON
  function exportQuotesToJson() {
    const jsonQuotes = JSON.stringify(quotes, null, 2); // Pretty print with 2 spaces
    const blob = new Blob([jsonQuotes], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Free up memory
  }

  // Function to import quotes from JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      try {
        const importedQuotes = JSON.parse(event.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes.push(...importedQuotes);
          saveQuotes();
          alert("Quotes imported successfully!");
        } else {
          alert("Invalid JSON format. Please upload a valid quotes JSON file.");
        }
      } catch (error) {
        alert("Error reading JSON file: " + error.message);
      }
    };

    fileReader.readAsText(event.target.files[0]);
  }

  // Add event listener to the export button
});

// if (value === "") {
//   const work = localStorage.getItem("work");
//   quoteDisplay.innerHTML = data.work[num2];
//   console.log(work[num2]);
// } else if (num === 1) {
//   const live = localStorage.getItem("live");
//   quoteDisplay.innerHTML = data.live[num2];
//   console.log(live[num2]);
// } else if (num === 2) {
//   const sleep = localStorage.getItem("sleep");
//   quoteDisplay.innerHTML = data.sleep[num2];
//   console.log(sleep[num2]);
// } else if (num === 3) {
//   const wife = localStorage.getItem(wife);
//   quoteDisplay.innerHTML = data.wife[num2];
//   console.log(wife[num2]);
// } else {
//   quoteDisplay.innerHTML = "try again";
// }
