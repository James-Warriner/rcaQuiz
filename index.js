 document.addEventListener('DOMContentLoaded', () => {
   
    if (localStorage.getItem('index') === null) {
      localStorage.setItem('index', '0');
    }
    if (localStorage.getItem('score') === null) {
      localStorage.setItem('score', '0');
    }

  
    loadQuestion(quizQuestions);

    document.getElementById('quiz-form').addEventListener('submit', function(e) {
      e.preventDefault();

      const result = checkAnswer(quizQuestions);
      if (result === null) return; 

  
      if (result) {
        let sc = parseInt(localStorage.getItem('score'), 10);
        localStorage.setItem('score', String(sc + 1));
      }

 
      let idx = parseInt(localStorage.getItem('index'), 10) + 1;
      localStorage.setItem('index', String(idx));

   
      if (idx >= quizQuestions.length) {
        alert(`Quiz complet your score: ${localStorage.getItem('score')} / ${quizQuestions.length}`);
        localStorage.removeItem('index');
        localStorage.removeItem('score');
      } else {
        loadQuestion(quizQuestions);
      }
    });
  });

 
  const quizQuestions = [
  {
    number: 1,
    question: "What is the primary purpose of a Fishbone (Ishikawa) diagram?",
    A: "To track defect resolution times",
    B: "To visualize categorized root-cause factors",
    C: "To document test cases",
    D: "To rank vulnerabilities by severity",
    correctAnswer: "B"
  },
  {
    number: 2,
    question: "Which category would you use in a fishbone diagram to describe issues with tooling or servers?",
    A: "Manpower",
    B: "Methods",
    C: "Machine",
    D: "Materials",
    correctAnswer: "C"
  },
  {
    number: 3,
    question: "In a typical defect-management lifecycle, which stage comes when a defect has been initially logged",
    A: "Closed",
    B: "New",
    C: "Reopened",
    D: "Deferred",
    correctAnswer: "B"
  },
  {
    number: 4,
    question: "Which of these is an example of a security vulnerability that allows attackers to inject malicious SQL commands?",
    A: "Cross-Site Scripting (XSS)",
    B: "Cross-Site Request Forgery ",
    C: "SQL Injection",
    D: "Session hijacking",
    correctAnswer: "C"
  },
  {
    number: 5,
    question: "Which is an example of structured data",
    A: "Text",
    B: "Video",
    C: "SQL database",
    D: "Image",
    correctAnswer: "C"
  }
];


  function fetchProgress() {
    return parseInt(localStorage.getItem('index'), 10);
  }

  function loadQuestion(questions) {
    const index = fetchProgress();
    const q = questions[index];
    const headerEl = document.getElementById('qHeader');
    headerEl.innerText = q.question;

    const optsContainer = document.getElementById('options');
    optsContainer.innerHTML = ''; 

    ['A','B','C','D'].forEach(letter => {
      const wrapper = document.createElement('div');
      wrapper.className = 'radio';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'answer';
      input.id   = `opt${letter}`;
      input.value = letter;

      const label = document.createElement('label');
      label.htmlFor = input.id;
      label.innerText = `${letter}: ${q[letter]}`;

      wrapper.appendChild(input);
      wrapper.appendChild(label);
      optsContainer.appendChild(wrapper);
    });
  }

  function checkAnswer(questions) {
    const index = fetchProgress();
    const currentQ = questions[index];
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
      alert('Please select an answer!');
      return null;
    }
    return selected.value === currentQ.correctAnswer;
  }