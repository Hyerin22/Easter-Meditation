function updateContent() {
  // Get 'day' from URL param
  const params = new URLSearchParams(window.location.search);
  let day = params.get("day");

  // If no parameter, for Vercel deployment
  if (!day) {
    day = window.location.pathname.split("/").pop();
  }

  // Set default
  if (!day || day === "" || day === "index.html" || day === "/") {
    day = "Palm-Sunday";
  }

  // lang
  // const langSelect = document.getElementById("lang-select");
  // let lang = langSelect ? langSelect.value : "en";

  // if (!lang) lang = "en";
  // if (typeof meditationData === "undefined") {
  //   console.error("meditationData is not defined. Check data.js");
  //   return;
  // }

  // const data = meditationData[lang][day];

  const langSelect = document.getElementById("lang-select");
  let lang =
    langSelect && langSelect.value && langSelect.value !== ""
      ? langSelect.value
      : "ko";

  if (typeof meditationData === "undefined") return;

  // **[FIX] lang이 en이어도 데이터가 없으면 ko에서 가져오도록 보강**
  const data =
    meditationData[lang] &&
    meditationData[lang][day] &&
    meditationData[lang][day].text !== ""
      ? meditationData[lang][day]
      : meditationData["ko"][day];

  if (data) {
    document.getElementById("display-main-title").innerText = data.enTitle;
    document.getElementById("display-sub-title").innerText =
      `PASSION WEEK • ${data.date}`;

    document.getElementById("display-scripture").innerText = data.scripture;
    document.getElementById("display-text").innerText = data.text;

    // Update browser tab title
    document.title = `${data.enTitle} - Meditation`;
  } else {
    console.error("Content not found for day:", day);
    // Fallback title if data is missing
    document.getElementById("display-title").innerText = "Content Not Found";
  }
}

// Update when language selection changes
window.onload = function () {
  const langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.onchange = updateContent;
  }
  updateContent(); // Initial call to load content
};
