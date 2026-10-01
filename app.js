const modules = window.LAB_MODULES;
const stateKey = "api-support-lab-progress-v1";
let state = JSON.parse(localStorage.getItem(stateKey) || '{"completed":[],"quizCorrect":{}}');
let current = modules[0].id;

const $ = (s) => document.querySelector(s);

function save(){ localStorage.setItem(stateKey, JSON.stringify(state)); }
function moduleById(id){ return modules.find(m => m.id === id); }

function xpTotal(){
  return modules.reduce((sum,m) => sum + (state.completed.includes(m.id) ? m.xp : 0), 0);
}
function updateStats(){
  const done = state.completed.length;
  $("#xp").textContent = xpTotal();
  $("#completed").textContent = done;
  $("#totalModules").textContent = modules.length;
  const pct = Math.round(done / modules.length * 100);
  $("#progressPct").textContent = pct + "%";
  $("#progressBar").style.width = pct + "%";
}

function renderNav(){
  const nav = $("#moduleNav");
  nav.innerHTML = "";
  modules.forEach((m,i)=>{
    const b = document.createElement("button");
    b.className = "module-btn" + (m.id===current ? " active" : "") + (state.completed.includes(m.id) ? " done" : "");
    b.innerHTML = `<span class="module-num">MODULE ${String(i+1).padStart(2,"0")}</span>${m.title}`;
    b.onclick = ()=>{ current=m.id; render(); window.scrollTo({top:0,behavior:"smooth"}); };
    nav.appendChild(b);
  });
}

function lessonSections(m){
  return m.lesson.map(([h,body]) => `<section class="card"><h3>${h}</h3><p>${body}</p></section>`).join("");
}

function quizHtml(m){
  const answered = state.quizCorrect[m.id] === true;
  return `<section class="quiz">
    <p class="eyebrow">KNOWLEDGE CHECK · +25 XP PRACTICE</p>
    <h3>${m.quiz.q}</h3>
    <div class="choice-grid">
      ${m.quiz.choices.map((c,i)=>`<button class="choice" data-choice="${i}">${c}</button>`).join("")}
    </div>
    <div id="feedback" class="feedback">${answered ? "Previously answered correctly." : ""}</div>
  </section>`;
}

function ticketHtml(m){
  if(!m.ticket) return "";
  return `<section class="ticket">
    <div class="ticket-id">${m.ticket.id}</div>
    <h3>${m.ticket.title}</h3>
    <p>${m.ticket.body}</p>
    <details><summary>Evidence collected</summary><ul>${m.ticket.clues.map(x=>`<li>${x}</li>`).join("")}</ul></details>
    <div class="callout"><strong>Your task:</strong> ${m.ticket.ask}</div>
  </section>`;
}

function render(){
  const m = moduleById(current);
  $("#hero").innerHTML = `
    <p class="eyebrow">INTERACTIVE MODULE</p>
    <h2>${m.title}</h2>
    <p>${m.subtitle}</p>
    <div class="tag-row">${m.tags.map(t=>`<span class="tag">${t}</span>`).join("")}</div>`;

  $("#lesson").innerHTML = `
    ${lessonSections(m)}
    <section class="card">
      <p class="eyebrow">SEE IT FIRST</p>
      <h3>${m.example.title}</h3>
      <p>${m.example.body}</p>
    </section>
    <section class="card">
      <p class="eyebrow">HANDS-ON</p>
      <h3>Do this yourself</h3>
      <div class="challenge"><strong>Challenge</strong><span>${m.challenge}</span></div>
    </section>
    ${quizHtml(m)}
    ${ticketHtml(m)}
    <section class="card ${state.completed.includes(m.id) ? "module-complete" : ""}">
      <h3>${state.completed.includes(m.id) ? "Module complete ✓" : "Ready to lock it in?"}</h3>
      <p>Mark a module complete only after you can explain the main idea without reading the lesson.</p>
      <div class="action-row">
        <button id="completeBtn" class="primary">${state.completed.includes(m.id) ? "Completed" : `Mark complete · +${m.xp} XP`}</button>
        <button id="nextBtn" class="secondary">Next module →</button>
      </div>
    </section>`;

  document.querySelectorAll(".choice").forEach(btn=>{
    btn.onclick = ()=>{
      const idx = Number(btn.dataset.choice);
      document.querySelectorAll(".choice").forEach(x=>x.disabled=true);
      const ok = idx === m.quiz.answer;
      btn.classList.add(ok ? "correct" : "wrong");
      if(!ok) document.querySelector(`.choice[data-choice="${m.quiz.answer}"]`).classList.add("correct");
      $("#feedback").textContent = (ok ? "Correct. " : "Not quite. ") + m.quiz.explain;
      if(ok){ state.quizCorrect[m.id] = true; save(); }
    };
  });

  $("#completeBtn").onclick = ()=>{
    if(!state.completed.includes(m.id)){ state.completed.push(m.id); save(); }
    render();
  };
  $("#nextBtn").onclick = ()=>{
    const i = modules.findIndex(x=>x.id===m.id);
    const next = modules[(i+1)%modules.length];
    current = next.id; render(); window.scrollTo({top:0,behavior:"smooth"});
  };

  renderNav(); updateStats();
}

$("#resetBtn").onclick = ()=>{
  if(confirm("Reset all saved module progress and quiz history?")){
    localStorage.removeItem(stateKey);
    state = {completed:[], quizCorrect:{}};
    render();
  }
};

render();