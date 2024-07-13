function encodeURL(url) {
  url = url.trim();
  return encodeURIComponent(url);
}

let shortenURL;

async function generateShortUrl() {
  let URL = document.getElementById("url").value;
  let shortURL = document.getElementById("shortURL");
  let divver = document.getElementById("divver");
  let copyButton = document.getElementById("copyButton");

  let encodedURL = encodeURL(URL);

  try {
    let response = await fetch(`https://cleanuri.com/api/v1/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `url=${encodedURL}`,
    });
    let data = await response.json();
    shortenURL = data.result_url;
    shortURL.innerText = "👉 " + data.result_url;
    divver.style.display = "block";
  } catch (error) {
    shortURL.innerText =
      error.message + ". Please looks at the console for more detials...";
    shortURL.style.display = "block";
    console.error("Error:", error);
  }
}

copyButton.addEventListener("click", (event) => {
  event.preventDefault();
  navigator.clipboard.writeText(shortenURL);
  copyButton.innerHTML = "Copied";
  setTimeout(() => {
    copyButton.innerHTML = "Click to copy";
  }, 1000);
});
