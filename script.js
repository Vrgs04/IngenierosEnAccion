// Banco editable de preguntas.
const questions = [
  { question: "¿Cuál de estos elementos pertenece al ciclo de vida clásico del software?", options: { A: "Soldadura de PCB", B: "Análisis de requerimientos", C: "Overclock de CPU", D: "Render de animaciones 3D" }, correct: "B" },
  { question: "En redes, ¿qué dispositivo enruta paquetes entre diferentes redes?", options: { A: "Router", B: "Switch", C: "Hub", D: "Repetidor" }, correct: "A" },
  { question: "¿Qué estructura almacena pares clave-valor de forma eficiente?", options: { A: "Lista enlazada", B: "Pila", C: "Tabla hash", D: "Cola" }, correct: "C" },
  { question: "¿Qué unidad se usa para medir potencia eléctrica?", options: { A: "Voltio", B: "Amperio", C: "Ohmio", D: "Vatio" }, correct: "D" },
  { question: "¿Qué práctica busca detectar errores antes de integrar código al proyecto principal?", options: { A: "Deploy manual sin pruebas", B: "Code review y pruebas", C: "Cambiar contraseñas", D: "Reducir comentarios" }, correct: "B" }
];

const state = {
  teams: {
    A: { name: "Equipo A", score: 0, streak: 0, players: [] },
    B: { name: "Equipo B", score: 0, streak: 0, players: [] }
  },
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
  teamCardA.classList.toggle("on-fire", state.teams.A.streak > 3);
  teamCardB.classList.toggle("on-fire", state.teams.B.streak > 3);
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

  updateScoreboard();
  switchCurrentTeam("A"); // Inicia forzosamente Equipo A
  resetQuestionArea();
  prepareQuestionFlow();
updateFireEffects();
  showScreen(gameScreen);
}

function goToNextQuestion() {
  if (!state.questionsStarted) return;
  if (state.currentQuestionIndex >= questions.length - 1) return endGame();

  state.currentQuestionIndex += 1;
  state.answeredCurrentQuestion = false;
  statusMessage.textContent = "";

  const q = questions[state.currentQuestionIndex];
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
  if (state.currentQuestionIndex < 0 || state.currentQuestionIndex >= questions.length) return;
  if (state.answeredCurrentQuestion) return;

  state.answeredCurrentQuestion = true;

  const question = questions[state.currentQuestionIndex];
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
