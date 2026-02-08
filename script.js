// Banco editable de preguntas.
const questions = [
  // CATEGORÍA 1: CULTURA GENERAL
  {
    question: "¿Cuál es el país con más hablantes nativos de español?",
    options: { A: "España", B: "Argentina", C: "México", D: "Colombia" },
    correct: "C"
  },
  {
    question: "¿Cuál de estos NO es un continente?",
    options: { A: "África", B: "Europa", C: "Oceanía", D: "Antártida" },
    correct: "D"
  },
  {
    question: "¿Qué planeta es conocido como el planeta rojo?",
    options: { A: "Venus", B: "Marte", C: "Júpiter", D: "Mercurio" },
    correct: "B"
  },
  {
    question: "¿Cuántos lados tiene un hexágono?",
    options: { A: "5", B: "6", C: "7", D: "8" },
    correct: "B"
  },
  {
    question: "¿Quién pintó la Mona Lisa?",
    options: { A: "Van Gogh", B: "Picasso", C: "Leonardo da Vinci", D: "Miguel Ángel" },
    correct: "C"
  },

  // CATEGORÍA 2: CIENCIA Y TECNOLOGÍA
  {
    question: "¿Qué significa “Wi-Fi”?",
    options: { A: "Wireless Fidelity", B: "Wireless Internet", C: "No significa nada específico", D: "World Fiber" },
    correct: "C"
  },
  {
    question: "¿Cuál es la unidad básica de la información digital?",
    options: { A: "Byte", B: "Mega", C: "Bit", D: "Pixel" },
    correct: "C"
  },
  {
    question: "¿Qué dispositivo sirve para almacenar energía?",
    options: { A: "Router", B: "Batería", C: "CPU", D: "Monitor" },
    correct: "B"
  },
  {
    question: "¿Cuál de estos NO es un lenguaje de programación?",
    options: { A: "Python", B: "Java", C: "HTML", D: "C++" },
    correct: "C"
  },
  {
    question: "¿Qué hace principalmente un sistema operativo?",
    options: { A: "Navegar en internet", B: "Crear documentos", C: "Administrar recursos del sistema", D: "Guardar archivos en la nube" },
    correct: "C"
  },

  // CATEGORÍA 3: CINE Y ENTRETENIMIENTO
  {
    question: "¿En qué saga aparece el personaje Darth Vader?",
    options: { A: "Star Trek", B: "Star Wars", C: "Matrix", D: "Marvel" },
    correct: "B"
  },
  {
    question: "¿Cuál de estas es una serie de Netflix?",
    options: { A: "Breaking Bad", B: "Stranger Things", C: "Friends", D: "The Office" },
    correct: "B"
  },
  {
    question: "¿Qué superhéroe es conocido como “El Hombre Araña”?",
    options: { A: "Batman", B: "Iron Man", C: "Spider-Man", D: "Hulk" },
    correct: "C"
  },
  {
    question: "¿Qué película trata sobre sueños dentro de sueños?",
    options: { A: "Interstellar", B: "Inception", C: "Avatar", D: "Titanic" },
    correct: "B"
  },
  {
    question: "¿Quién interpreta a Iron Man en el MCU?",
    options: { A: "Chris Evans", B: "Chris Hemsworth", C: "Robert Downey Jr.", D: "Tom Holland" },
    correct: "C"
  },

  // CATEGORÍA 4: LÓGICA Y CURIOSIDADES
  {
    question: "Si tienes una vela y la apagas, ¿qué queda?",
    options: { A: "Cera", B: "Humo", C: "Oscuridad", D: "La vela apagada" },
    correct: "D"
  },
  {
    question: "¿Qué pesa más?",
    options: { A: "1 kilo de algodón", B: "1 kilo de hierro", C: "Pesan lo mismo", D: "Depende" },
    correct: "C"
  },
  {
    question: "¿Cuántos meses tienen 28 días?",
    options: { A: "1", B: "2", C: "6", D: "Todos" },
    correct: "D"
  },
  {
    question: "¿Qué número sigue en la serie: 2, 4, 8, 16…?",
    options: { A: "18", B: "24", C: "32", D: "64" },
    correct: "C"
  },
  {
    question: "Si todos los cisnes que has visto son blancos, eso significa que…",
    options: { A: "Todos los cisnes son blancos", B: "Nunca hay cisnes negros", C: "No has visto un cisne negro", D: "Los cisnes no existen" },
    correct: "C"
  }
];

const state = {
  teams: {
    A: { name: "Equipo A", score: 0, streak: 0, players: [] },
    B: { name: "Equipo B", score: 0, streak: 0, players: [] }
  },
  shuffledQuestions: [],
  currentTeam: "A",
  currentQuestionIndex: -1,
  answeredCurrentQuestion: false,
  questionsStarted: false
};

const $ = (id) => document.getElementById(id);

const startScreen = $("startScreen");
const gameScreen = $("gameScreen");
const finalScreen = $("finalScreen");
const questionTotal = $("questionTotal");
const questionIndex = $("questionIndex");
const questionValue = $("questionValue");
const questionText = $("questionText");
const statusMessage = $("statusMessage");
const optionButtons = [...document.querySelectorAll(".option-btn")];
const questionsIntro = $("questionsIntro");
const questionsContent = $("questionsContent");
const teamCardA = $("teamCardA");
const teamCardB = $("teamCardB");
const confettiLayer = $("confettiLayer");

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}


function launchConfetti() {
  if (!confettiLayer) return;
  confettiLayer.innerHTML = "";
  const colors = ["#ffd166", "#ef476f", "#06d6a0", "#118ab2", "#a56bff", "#ffffff"];

  for (let i = 0; i < 120; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${3 + Math.random() * 2.8}s`;
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiLayer.appendChild(piece);
  }

  setTimeout(() => {
    confettiLayer.innerHTML = "";
  }, 6500);
}

function addParticipantInput(teamKey, value = "") {
  const list = teamKey === "A" ? $("participantsA") : $("participantsB");
  const row = document.createElement("div");
  row.className = "participant-row";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = `Participante ${list.children.length + 1}`;
  input.maxLength = 30;
  input.value = value;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "Quitar";
  removeBtn.className = "btn small remove";
  removeBtn.addEventListener("click", () => {
    if (list.children.length > 1) row.remove();
  });

  row.append(input, removeBtn);
  list.appendChild(row);
}

function getParticipants(teamKey) {
  const list = teamKey === "A" ? $("participantsA") : $("participantsB");
  return [...list.querySelectorAll("input")].map((i) => i.value.trim()).filter(Boolean);
}

function showScreen(screen) {
  [startScreen, gameScreen, finalScreen].forEach((s) => s.classList.remove("active"));
  screen.classList.add("active");
}

function switchCurrentTeam(teamKey) {
  state.currentTeam = teamKey;
  teamCardA.classList.toggle("active-turn", teamKey === "A");
  teamCardB.classList.toggle("active-turn", teamKey === "B");
  updateQuestionValue();
}

function triggerImpulse(teamKey) {
  const card = teamKey === "A" ? teamCardA : teamCardB;
  card.classList.remove("impulse");
  void card.offsetWidth;
  card.classList.add("impulse");
}

function updateFireEffects() {
  const aOnFire = state.teams.A.streak > 3;
  const bOnFire = state.teams.B.streak > 3;
  const aSuper = state.teams.A.streak > 6;
  const bSuper = state.teams.B.streak > 6;

  teamCardA.classList.toggle("on-fire", aOnFire);
  teamCardB.classList.toggle("on-fire", bOnFire);
  teamCardA.classList.toggle("super-streak", aSuper);
  teamCardB.classList.toggle("super-streak", bSuper);
}

function updateScoreboard() {
  $("teamNameA").textContent = state.teams.A.name;
  $("teamNameB").textContent = state.teams.B.name;
  $("scoreA").textContent = state.teams.A.score;
  $("scoreB").textContent = state.teams.B.score;
  $("streakA").textContent = state.teams.A.streak;
  $("streakB").textContent = state.teams.B.streak;

  $("playersA").textContent = `Participantes: ${state.teams.A.players.length ? state.teams.A.players.join(", ") : "-"}`;
  $("playersB").textContent = `Participantes: ${state.teams.B.players.length ? state.teams.B.players.join(", ") : "-"}`;
  updateFireEffects();
}

function updateQuestionValue() {
  const streak = state.teams[state.currentTeam].streak;
  questionValue.textContent = `+${Math.min(streak + 1, 3)}`;
}

function resetQuestionArea() {
  questionIndex.textContent = "0";
  questionText.textContent = "Presiona “Siguiente pregunta” para comenzar.";
  statusMessage.textContent = "";
  optionButtons.forEach((btn) => {
    btn.textContent = `${btn.dataset.option}) -`;
    btn.classList.remove("correct", "wrong");
  });
  updateQuestionValue();
}

function prepareQuestionFlow() {
  state.questionsStarted = false;
  questionsIntro.classList.remove("hidden");
  questionsContent.classList.add("hidden");
}

function startQuestionsFlow() {
  if (state.questionsStarted) return;
  state.questionsStarted = true;
  questionsIntro.remove();
  questionsContent.classList.remove("hidden");
  goToNextQuestion();
}

function startGame() {
  state.teams.A.name = $("teamAInput").value.trim() || "Equipo A";
  state.teams.B.name = $("teamBInput").value.trim() || "Equipo B";
  state.teams.A.players = getParticipants("A");
  state.teams.B.players = getParticipants("B");

  state.teams.A.score = 0;
  state.teams.B.score = 0;
  state.teams.A.streak = 0;
  state.teams.B.streak = 0;
  state.currentQuestionIndex = -1;
  state.answeredCurrentQuestion = false;
  state.shuffledQuestions = shuffleArray(questions);

  questionTotal.textContent = state.shuffledQuestions.length;
  updateScoreboard();
  switchCurrentTeam("A"); // Inicia forzosamente Equipo A
  resetQuestionArea();
  prepareQuestionFlow();
  updateFireEffects();
  showScreen(gameScreen);
}

function goToNextQuestion() {
  if (!state.questionsStarted) return;
  if (state.currentQuestionIndex >= state.shuffledQuestions.length - 1) return endGame();

  state.currentQuestionIndex += 1;
  state.answeredCurrentQuestion = false;
  statusMessage.textContent = "";

  const q = state.shuffledQuestions[state.currentQuestionIndex];
  questionIndex.textContent = String(state.currentQuestionIndex + 1);
  questionText.textContent = q.question;

  optionButtons.forEach((btn) => {
    const letter = btn.dataset.option;
    btn.classList.remove("correct", "wrong");
    btn.textContent = `${letter}) ${q.options[letter]}`;
  });

  updateQuestionValue();
}

function handleAnswer(selectedOption) {
  if (!state.questionsStarted) return;
  if (state.currentQuestionIndex < 0 || state.currentQuestionIndex >= state.shuffledQuestions.length) return;
  if (state.answeredCurrentQuestion) return;

  state.answeredCurrentQuestion = true;

  const question = state.shuffledQuestions[state.currentQuestionIndex];
  const active = state.currentTeam;
  const rival = active === "A" ? "B" : "A";
  const activeTeam = state.teams[active];
  const rivalTeam = state.teams[rival];
  const isCorrect = selectedOption === question.correct;

  optionButtons.forEach((btn) => {
    const option = btn.dataset.option;
    btn.classList.remove("correct", "wrong");
    if (option === question.correct) btn.classList.add("correct");
    if (option === selectedOption && !isCorrect) btn.classList.add("wrong");
  });

  if (isCorrect) {
    // Si acierta, el mismo equipo sigue respondiendo.
    activeTeam.streak += 1;
    const pointsWon = Math.min(activeTeam.streak, 3);
    activeTeam.score += pointsWon;
    rivalTeam.streak = 0;
    triggerImpulse(active);
    statusMessage.textContent = `✅ Correcto. ${activeTeam.name} gana +${pointsWon} punto(s) y continúa respondiendo.`;
  } else {
    // Si falla, pasa el turno al otro equipo.
    if (activeTeam.streak > 0) {
      activeTeam.score -= 1;
      statusMessage.textContent = `❌ Incorrecto. ${activeTeam.name} pierde 1 punto, reinicia racha y responde ${rivalTeam.name}.`;
    } else {
      statusMessage.textContent = `❌ Incorrecto. ${activeTeam.name} falla y responde ${rivalTeam.name}.`;
    }
    activeTeam.streak = 0;
    switchCurrentTeam(rival);
  }

  updateScoreboard();
  updateQuestionValue();
}

function endGame() {
  const [firstKey, secondKey] = state.teams.A.score >= state.teams.B.score ? ["A", "B"] : ["B", "A"];
  const first = state.teams[firstKey];
  const second = state.teams[secondKey];

  $("winnerName").textContent = first.score === second.score ? "Empate" : first.name;
  $("championName").textContent = first.name;
  $("championScore").textContent = first.score;
  $("runnerUpName").textContent = second.name;
  $("runnerUpScore").textContent = second.score;

  showScreen(finalScreen);
  launchConfetti();
}

function resetToStart() {
  window.location.reload();
}

$("addParticipantA").addEventListener("click", () => addParticipantInput("A"));
$("addParticipantB").addEventListener("click", () => addParticipantInput("B"));
$("startGameBtn").addEventListener("click", startGame);
$("startQuestionsBtn").addEventListener("click", startQuestionsFlow);
$("nextQuestionBtn").addEventListener("click", goToNextQuestion);
$("finishBtn").addEventListener("click", endGame);
$("restartBtn").addEventListener("click", resetToStart);

optionButtons.forEach((btn) => btn.addEventListener("click", () => handleAnswer(btn.dataset.option)));

questionTotal.textContent = questions.length;
addParticipantInput("A", "Jugador 1");
addParticipantInput("B", "Jugador 1");
prepareQuestionFlow();
updateFireEffects();
