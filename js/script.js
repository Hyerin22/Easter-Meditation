function getDayFromUrl() {
  // Get 'day' from URL param
  const params = new URLSearchParams(window.location.search);
  let day = params.get("day");

  // If no parameter, for Vercel deployment
  if (!day) {
    const pathParts = window.location.pathname.split("/");
    day = pathParts[pathParts.length - 1];
  }

  // Set default
  if (!day || day === "" || day === "index.html" || day === "/") {
    day = "Palm-Sunday";
  }
  return day;
}

function updateContent() {
  const day = getDayFromUrl();
  const langSelect = document.getElementById("lang-select");
  const lang = langSelect && langSelect.value ? langSelect.value : "ko";
  if (lang === "") lang = "ko";

  if (typeof meditationData === "undefined") {
    console.error("meditationData is not defined.");
    return;
  }

  let data = meditationData[lang] && meditationData[lang][day];

  if (!data || !data.text || data.text === "") {
    data = meditationData["ko"][day];
  }

  if (data) {
    const textElement = document.getElementById("display-text");
    document.getElementById("display-main-title").innerText = data.enTitle;
    document.getElementById("display-sub-title").innerText =
      `PASSION WEEK • ${data.date}`;
    document.getElementById("display-scripture").innerText = data.scripture;

    textElement.classList.remove(
      "lang-ko",
      "lang-ja",
      "lang-es",
      "lang-tl",
      "lang-en",
    );

    textElement.classList.add(`lang-${lang}`);

    if (lang === "ja") {
      textElement.innerText = data.text.replace(/．\s+」/g, "．」");
    } else {
      textElement.innerText = data.text;
    }

    document.title = `${data.enTitle} - Meditation`;
  } else {
    console.error("Content not found for day:", day);
  }
}

window.onload = function () {
  const langSelect = document.getElementById("lang-select");
  if (langSelect) {
    langSelect.addEventListener("change", updateContent);
  }
  updateContent();
};
