const axios = require("axios");
const fs = require("fs");

const TIMEZONE_OFFSET = 7; // Vietnam Time
const QUOTES_API = "https://zenquotes.io/api/quotes";

(async () => {
  const { today, hour } = getCurrentTime();
  const greetings = generateGreetings(hour);
  const { quote, author } = await getQuotes();

  const text = `
<div align="center">
  <img src="https://raw.githubusercontent.com/ABSphreak/ABSphreak/master/gifs/Hi.gif" width="30">
  <h1>Good evening ☕, I'm Tan Hiep To</h1>

  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=2196F3&center=true&vCenter=true&width=435&lines=Master+Student+in+Computer+Science;AI+Researcher+%40+VNU-HCM;Software+Engineer;GenAI+%26+Backend+Developer" />
  </a>

  <p>
    <i>"Your imagination is your preview of life's coming attractions." — <b>Albert Einstein</b></i>
  </p>

  <p>
    <a href="mailto:tanhiep2012003@gmail.com">
      <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white">
    </a>
    &nbsp;&nbsp;&nbsp;
    <a href="https://www.linkedin.com/in/nqbinh/" target="_blank">
      <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
    </a>
  </p>

  <p>
    <a href="https://github.com/TanHiep-To/TanHiep-To/blob/main/data/Hiep_To_AI_Resumse.pdf">
      <img src="https://img.shields.io/badge/View_CV_AI-FF6F00?style=for-the-badge&logo=googledrive&logoColor=white">
    </a>
    &nbsp;&nbsp;&nbsp;
    <a href="https://github.com/TanHiep-To/TanHiep-To/blob/main/data/Hiep_To_SE_Resumse.pdf">
      <img src="https://img.shields.io/badge/View_CV_SE-007EC6?style=for-the-badge&logo=googledrive&logoColor=white">
    </a>
  </p>
</div>

---

## 👨‍💻 About Me

I am a **Master's Student in Computer Science** at the University of Science (VNU-HCM), specializing in **Artificial Intelligence** and **Machine Learning**.  
I graduated with Honors (**GPA 9.41/10.0**) and achieved a perfect score (**10.0/10.0**) for my thesis on **Generative AI**.

I possess a hybrid skillset bridging **AI research** and **scalable software engineering**, with a strong interest in **LLMs, recommendation systems, and AI-native products**.

---

## 💼 Work Experience

### **Junior AI Engineer** @ First AI  
*(Jul 2025 – Present)*  
*Focus: AI-native Search, Recommendation Systems, Large Language Models*

- Developed personalized **recommendation systems** for AI-driven search and social platforms.
- Fine-tuned **large language models (LLMs)** on domain-specific data to improve ranking and explainability.
- Implemented **retrieval-augmented generation (RAG)** pipelines with external knowledge sources.
- Integrated external **LLM APIs** for semantic search and personalized content delivery.

---

### **Associate Machine Learning Engineer** @ OPSWAT  
*(Jul 2025)*  
*Focus: DeepCDR Team, Cybersecurity*

- Improved **file type detection accuracy** from **85% to 92%** using deep learning models.
- Optimized **model inference latency** for production pipelines.
- Collaborated with security experts to align ML models with threat detection requirements.

---

### **Software Engineer (Contractor)** @ Treasure Data  
*(Apr 2024 – Jun 2025)*  

- Developed an **AI document summarization agent**, improving processing speed by **30%**.
- Built and maintained **data connectors** using Embulk and REST APIs.
- Enhanced CLI tools to support QA and integration testing.

---

### **Undergraduate Researcher** @ Software Engineering Lab (SELab)  
*(Sept 2023 – Present)*  

- Conducted research on **Generative AI**, **Stable Diffusion**, and **RAG**.
- Published work on adversarial robustness and autonomous driving segmentation.

---

## 📚 Education

| Institution | Degree | Achievement | Year |
| :--- | :--- | :--- | :--- |
| University of Science – VNUHCM | **M.Sc. Computer Science** | In Progress | 2025 – Present |
| University of Science – VNUHCM | **B.S. Computer Science** | GPA 9.41/10.0 (Honors) | 2021 – 2025 |

---

## 🛠 Tech Stack

| **Languages** | **AI & Machine Learning** | **Backend & DevOps** |
|:---:|:---:|:---:|
| Python · Java · C++ | PyTorch · TensorFlow · HuggingFace | Django · Docker · AWS |
| SQL · Shell · Ruby | OpenCV · LangChain · RAG | PostgreSQL · MongoDB · Embulk |

---

## 🔬 Projects

### 💻 Open Source & Engineering Projects

| Project | Tech Stack | Description |
| :--- | :--- | :--- |
| **Embulk Marketo Plugin** | Java · Ruby | Enhanced open-source plugin for Marketo REST API ingestion with improved scalability. |
| **Question Answering System** | BERT · Streamlit | Fine-tuned QA system with Google Search integration, improving response time by **25%**. |
| **Adversarial NLP Defense** | PyTorch · TextAttack | Improved robustness from 0% to **95.24%** using adversarial training. |
| **Remote Control PC** | Java · Socket | Built remote control app with process management and screen capture. |

---

## 🏆 Honors & Awards

- 🥇 Outstanding Student in Scientific Research (2023)  
- 🏅 Top 100 Outstanding Students – VNU (2023)  
- 🎓 Ranked 1st Best Student – Faculty of IT (2021)  
- 🥉 Third Prize – Provincial Informatics Competition (2020)

---

## 📜 Certificates

- AWS Certified Developer – Associate  
- AWS Certified AI Practitioner  
- Machine Learning Specialization (Coursera / Stanford)  
- Deep Learning & Reinforcement Learning  
- FPT AI Compass  

---

## 📊 GitHub Stats

<div align="center">
  <img src="https://github-readme-stats-eight-theta.vercel.app/api?username=TanHiep-To&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0D1117" height="180">
  <img src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=TanHiep-To&layout=compact&theme=tokyonight&hide_border=true&bg_color=0D1117" height="180">
</div>

---

<div align="center">
  <img src="https://komarev.com/ghpvc/?username=TanHiep-To&label=Profile%20Views&color=0e75b6&style=flat-square">
</div>

`;

  generateFile(text);
  console.log(`✅ Updated README at ${today}`);
})();

function getCurrentTime() {
  const today = new Date();
  today.setHours(today.getHours() + TIMEZONE_OFFSET);
  const hour = today.getHours();
  return { today, hour };
}

function generateGreetings(time) {
  const hour = time % 24; 
  if (hour >= 5 && hour < 12) return "Good morning ☀️";
  if (hour >= 12 && hour < 18) return "Good afternoon 👋";
  if (hour >= 18 && hour < 22) return "Good evening ☕";
  return "Good night 😴";
}

async function getQuotes() {
  try {
    const response = await axios.get(QUOTES_API);
    if (response.data && response.data.length > 0) {
      return { quote: response.data[0].q, author: response.data[0].a };
    }
  } catch (error) {
    console.error("Error fetching quote:", error.message);
  }
  return {
    quote: "I walk slowly, but I never walk backwards.",
    author: "Abraham Lincoln",
  };
}

function generateFile(contents) {
  fs.writeFile("README.md", contents, (err) => {
    if (err) return console.log(`⛔ [FAILED]: ${err}`);
    console.log("✅ [SUCCESS]: README.md has been generated.");
  });
}
