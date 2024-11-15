const axios = require("axios");
const fs = require("fs");
const md = require("markdown-it")({
  html: true, // Enable HTML tags in source
  breaks: false, // Convert '\n' in paragraphs into <br>
});

const TIMEZONE_OFFSET = 7;
const QUOTES_API = "https://zenquotes.io/api/quotes";

(async () => {
  const { today, hour } = getCurrentTime();
  const greetings = generateGreetings(hour);
  const { quote, author } = await getQuotes(hour);

  const text = `### ${greetings}

<h2> Hello there, I'm Tan Hiep <img src="https://raw.githubusercontent.com/ABSphreak/ABSphreak/master/gifs/Hi.gif" width="30"></h2>

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white&url=https://gmail.com)](mailto:tthiep_student@selab.hcmus.edu.vn)
[![Linkedin](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&url=https://www.linkedin.com/in/nqbinh)](https://www.linkedin.com/in/pake/)

## 👨🏽‍💻 Talking about Personal Stuffs:
- 📚 My interests are with Machine Learning, Deep Learning, Computer vision and Software Engineering
- 💬 Ask me about anything, I am happy to help
- 📫 Please email via tthiep_student@selab.hcmus.edu.vn to reach me

## I. ABOUT ME

I have studied at the University of Science and am a new Integration team member. Since I started my education, I have always been eager to learn and discover more in the field of Information Technology, particularly in Software Engineering. I have worked hard and achieved some significant accomplishments.

I am diligently pursuing my passion for becoming a proficient software engineer, maintaining my constant desire to learn. Additionally, I am fascinated by fields like AI, Machine Learning, and Computer Vision. I engage in research topics related to Generative AI and Prompt Engineering.

Quote: I walk slowly, but I never walk backwards.


## ![Certificate Icon](https://emojis.slackmojis.com/emojis/images/1643515721/17468/homersimpson-pbjdance.gif?1643515721) CERTIFICATES

<p align="center">
  <img src="https://images.credly.com/size/680x680/images/73e4a58b-a8ef-41a3-a7db-9183dd269882/image.png" alt="Certificate 1" width="200" />
  <img src="https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~5P6Z8KT4KNDC/CERTIFICATE_LANDING_PAGE~5P6Z8KT4KNDC.jpeg" alt="Certificate 2" width="310" />
  <img src="./image/Tan Hiep - To - Intro to Programming.png" alt="Certificate 3" width="270" />
  <img src="./image/Tan Hiep - To - Machine Learning Explainability.png" alt="Certificate 4" width="270" />
  <img src="./image/Tan Hiep - To - Intro to Machine Learning.png" alt="Certificate 5" width="270" />
</p>


## <img src="https://images.viblo.asia/a22cc9ed-e446-4eae-ad55-1ddf8afbaa54.gif" width="30" /> CONTRIBUTIONS

<div style="text-align: center;">
  <a href="https://metrics.lecoq.io/ouuan?template=classic">
    <img align="center" width="50%" src="https://github-readme-stats.vercel.app/api?username=TanHiep-To&bg_color=30,2c5364,203A43&title_color=fff&text_color=FFDA33&&hide_border=true">
  </a>
</div>
`;

  const content = md.renderInline(text);
  generateFile(content);

  /* Timestamp */
  console.log(`⏳ Running at ${today} UTC +0${TIMEZONE_OFFSET}:00`);
})();

function getCurrentTime() {
  const today = new Date();
  today.setHours(today.getHours() + TIMEZONE_OFFSET);
  const hour = today.getHours();
  const minute = today.getMinutes();
  // check if the hour >= 24
  if (hour >= 24) {
    return Math.abs(24 - hour);
  }
  return {
    today,
    hour,
    minute
  };
}

function isWeekend(date = getCurrentTime().today) {
  return date.getDay() === 6 || date.getDay() === 0;
}

function generateGreetings(time) {
  const goodMorning = "Good morning ☀️";
  const goodAfternoon = "Good afternoon 👋";
  const goodEvening = "Good evening ☕";
  const goodNight = "Good night 😴";
  const happyWeekend = "Happy weekend 🏝️";

  if (isWeekend()) {
    return happyWeekend;
  }
  if (time >= 4 && time < 11) {
    return goodMorning;
  }
  if (time >= 11 && time < 16) {
    return goodAfternoon;
  }
  if (time >= 16 && time < 23) {
    return goodEvening;
  }
  return goodNight;
}

async function getQuotes(time) {
    return await axios.get(QUOTES_API).then((response) => {
        if (response.data.length === 0) {
          return {
            quote: "There is no result without struggle, there is no struggle without sacrifice.",
            author: "Me",
          };
        }
        const { q, a } = response.data[0];
        return {
          quote: q,
          author: a,
        };
      });
}

function generateFile(contents) {
  const targetFile = "README.md";
  fs.writeFile(targetFile, contents, function (err) {
    if (err) return console.log(`⛔ [FAILED]: ${err}`);
    console.log("✅ [SUCCESS]: README.md has been generated.");
  });
}
