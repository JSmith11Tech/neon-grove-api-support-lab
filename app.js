const modules = window.LAB_MODULES;

const stateKey = "neon-grove-progress-v2";
const legacyKey = "api-support-lab-progress-v1";

const TREE_COST = 100;

const species = [
  {
    id: "neon-pine",
    name: "Neon Pine",
    level: 1,
    unlockXp: 0
  },
  {
    id: "circuit-willow",
    name: "Circuit Willow",
    level: 2,
    unlockXp: 400
  },
  {
    id: "glasswood",
    name: "Glasswood",
    level: 3,
    unlockXp: 800
  },
  {
    id: "aurora-cedar",
    name: "Aurora Cedar",
    level: 4,
    unlockXp: 1300
  },
  {
    id: "quantum-sakura",
    name: "Quantum Sakura",
    level: 5,
    unlockXp: 1900
  }
];

function freshState() {
  return {
    completed: [],
    quizCorrect: {},
    spentXp: 0,
    trees: [],
    selectedSpecies: "neon-pine"
  };
}

function loadState() {
  const current = localStorage.getItem(stateKey);

  if (current) {
    return Object.assign(
      freshState(),
      JSON.parse(current)
    );
  }

  const legacy = localStorage.getItem(legacyKey);

  if (legacy) {
    const old = JSON.parse(legacy);

    return Object.assign(
      freshState(),
      {
        completed: old.completed || [],
        quizCorrect: old.quizCorrect || {}
      }
    );
  }

  return freshState();
}

let state = loadState();
let current = modules[0].id;

const $ = selector =>
  document.querySelector(selector);

function save() {
  localStorage.setItem(
    stateKey,
    JSON.stringify(state)
  );
}

function moduleById(id) {
  return modules.find(
    module => module.id === id
  );
}

function moduleXpEarned() {
  return modules.reduce(
    (total, module) =>
      total +
      (
        state.completed.includes(module.id)
          ? module.xp
          : 0
      ),
    0
  );
}

function quizXpEarned() {
  return (
    Object.values(state.quizCorrect)
      .filter(Boolean)
      .length * 25
  );
}

function handsOnXpEarned() {

  try {

    const raw =
      localStorage.getItem(
        "neon-grove-practice-state"
      );

    if (!raw) {
      return 0;
    }

    const practice =
      JSON.parse(raw);

    return (
      Object.values(
        practice.completed || {}
      )
        .filter(Boolean)
        .length * 50
    );

  }
  catch {
    return 0;
  }
}

function lifetimeXp() {
  return (
    moduleXpEarned() +`r`n    quizXpEarned() +`r`n    handsOnXpEarned()
  );
}

function availableXp() {
  return Math.max(
    0,
    lifetimeXp() - (state.spentXp || 0)
  );
}

function currentLevel() {
  let level = 1;
  const xp = lifetimeXp();

  species.forEach(item => {
    if (xp >= item.unlockXp) {
      level = Math.max(
        level,
        item.level
      );
    }
  });

  return level;
}

function unlockedSpecies() {
  return species.filter(
    item =>
      item.level <= currentLevel()
  );
}

function nextSpecies() {
  return (
    species.find(
      item =>
        item.level > currentLevel()
    ) || null
  );
}

function updateForest() {
  const level = currentLevel();
  const next = nextSpecies();

  $("#forestLevel").textContent =
    `LVL ${level}`;

  if (next) {
    const currentSpecies =
      species.find(
        item => item.level === level
      );

    const levelStart =
      currentSpecies.unlockXp;

    const levelRange =
      next.unlockXp - levelStart;

    const progress =
      lifetimeXp() - levelStart;

    const percent =
      Math.min(
        100,
        Math.max(
          0,
          Math.round(
            (progress / levelRange) * 100
          )
        )
      );

    $("#levelProgressBar").style.width =
      percent + "%";

    $("#levelProgressLabel").textContent =
      `${lifetimeXp()} / ${next.unlockXp} XP`;

    $("#nextUnlockLabel").textContent =
      `Next: ${next.name}`;
  }
  else {
    $("#levelProgressBar").style.width =
      "100%";

    $("#levelProgressLabel").textContent =
      `${lifetimeXp()} XP`;

    $("#nextUnlockLabel").textContent =
      "All species unlocked";
  }

  const unlocked =
    unlockedSpecies();

  if (
    !unlocked.some(
      item =>
        item.id === state.selectedSpecies
    )
  ) {
    state.selectedSpecies =
      unlocked[0].id;

    save();
  }

  const picker =
    $("#speciesPicker");

  picker.innerHTML = "";

  species.forEach(item => {

    const isUnlocked =
      item.level <= level;

    const button =
      document.createElement("button");

    button.className =
      "species-btn" +
      (
        state.selectedSpecies === item.id
          ? " selected"
          : ""
      );

    button.disabled =
      !isUnlocked;

    if (isUnlocked) {
      button.innerHTML = `
        <strong>${item.name}</strong>
        <span>Level ${item.level}</span>
      `;

      button.onclick = () => {
        state.selectedSpecies =
          item.id;

        save();
        updateForest();
      };
    }
    else {
      button.innerHTML = `
        <strong>Locked</strong>
        <span>${item.unlockXp} XP</span>
      `;
    }

    picker.appendChild(button);
  });

  const forest =
    $("#forestGrid");

  forest.innerHTML = "";

  state.trees.forEach(
    (tree, index) => {

      const element =
        document.createElement("div");

      element.className =
        `tree ${tree.species}`;

      const treeSpecies =
        species.find(
          item =>
            item.id === tree.species
        );

      element.title =
        `${treeSpecies?.name || "Tree"} #${index + 1}`;

      forest.appendChild(element);
    }
  );

  const plantButton =
    $("#plantTreeBtn");

  if (
    availableXp() >= TREE_COST
  ) {
    const selected =
      species.find(
        item =>
          item.id === state.selectedSpecies
      );

    plantButton.disabled = false;

    plantButton.textContent =
      `Plant ${selected.name} · ${TREE_COST} XP`;
  }
  else {
    plantButton.disabled = true;

    plantButton.textContent =
      `Need ${TREE_COST - availableXp()} more XP`;
  }

  $("#forestHint").textContent =
    state.trees.length
      ? `${state.trees.length} tree${state.trees.length === 1 ? "" : "s"} growing · ${unlocked.length}/${species.length} species unlocked`
      : "Earn your first 100 XP and plant something.";
}

function updateStats() {
  const done =
    state.completed.length;

  $("#xp").textContent =
    availableXp();

  $("#earnedXp").textContent =
    lifetimeXp();

  $("#completed").textContent =
    done;

  $("#totalModules").textContent =
    modules.length;

  const percent =
    Math.round(
      done /
      modules.length *
      100
    );

  $("#progressPct").textContent =
    percent + "%";

  $("#progressBar").style.width =
    percent + "%";

  updateForest();
}

function renderNav() {
  const nav =
    $("#moduleNav");

  nav.innerHTML = "";

  modules.forEach(
    (module, index) => {

      const button =
        document.createElement("button");

      button.className =
        "module-btn" +
        (
          module.id === current
            ? " active"
            : ""
        ) +
        (
          state.completed.includes(module.id)
            ? " done"
            : ""
        );

      button.innerHTML = `
        <span class="module-num">
          MODULE ${String(index + 1).padStart(2, "0")}
        </span>
        ${module.title}
      `;

      button.onclick = () => {
        current =
          module.id;

        render();

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      };

      nav.appendChild(button);
    }
  );
}

function lessonSections(module) {
  return module.lesson
    .map(
      ([heading, body]) => `
        <section class="card">
          <h3>${heading}</h3>
          <p>${body}</p>
        </section>
      `
    )
    .join("");
}

function quizHtml(module) {
  const answered =
    state.quizCorrect[module.id] === true;

  return `
    <section class="quiz">

      <p class="eyebrow">
        KNOWLEDGE CHECK · +25 XP
      </p>

      <h3>
        ${module.quiz.q}
      </h3>

      <div class="choice-grid">

        ${
          module.quiz.choices
            .map(
              (choice, index) => `
                <button
                  class="choice"
                  data-choice="${index}">
                  ${choice}
                </button>
              `
            )
            .join("")
        }

      </div>

      <div
        id="feedback"
        class="feedback">

        ${
          answered
            ? "Previously answered correctly. XP already collected."
            : ""
        }

      </div>

    </section>
  `;
}

function ticketHtml(module) {
  if (!module.ticket) {
    return "";
  }

  return `
    <section class="ticket">

      <div class="ticket-id">
        ${module.ticket.id}
      </div>

      <h3>
        ${module.ticket.title}
      </h3>

      <p>
        ${module.ticket.body}
      </p>

      <details>
        <summary>
          Evidence collected
        </summary>

        <ul>
          ${
            module.ticket.clues
              .map(
                clue =>
                  `<li>${clue}</li>`
              )
              .join("")
          }
        </ul>
      </details>

      <div class="callout">
        <strong>Your task:</strong>
        ${module.ticket.ask}
      </div>

    </section>
  `;
}

function render() {
  const module =
    moduleById(current);

  $("#hero").innerHTML = `

    <p class="eyebrow">
      NEON GROVE TRAINING NODE
    </p>

    <h2>
      ${module.title}
    </h2>

    <p>
      ${module.subtitle}
    </p>

    <div class="tag-row">

      ${
        module.tags
          .map(
            tag =>
              `<span class="tag">${tag}</span>`
          )
          .join("")
      }

    </div>
  `;

  $("#lesson").innerHTML = `

    ${lessonSections(module)}

    <section class="card">

      <p class="eyebrow">
        SEE IT FIRST
      </p>

      <h3>
        ${module.example.title}
      </h3>

      <p>
        ${module.example.body}
      </p>

    </section>

    <section class="card">

      <p class="eyebrow">
        HANDS-ON
      </p>

      <h3>
        Do this yourself
      </h3>

      <div class="challenge">

        <strong>
          Challenge
        </strong>

        <span>
          ${module.challenge}
        </span>

      </div>

    </section>

    ${quizHtml(module)}

    ${ticketHtml(module)}

    <section class="card ${
      state.completed.includes(module.id)
        ? "module-complete"
        : ""
    }">

      <h3>

        ${
          state.completed.includes(module.id)
            ? "Module complete ✓"
            : "Ready to lock it in?"
        }

      </h3>

      <p>
        Mark a module complete only after
        you can explain the main idea
        without reading the lesson.
      </p>

      <div class="action-row">

        <button
          id="completeBtn"
          class="primary">

          ${
            state.completed.includes(module.id)
              ? "Completed"
              : `Mark complete · +${module.xp} XP`
          }

        </button>

        <button
          id="nextBtn"
          class="secondary">

          Next module →

        </button>

      </div>

    </section>
  `;

  document
    .querySelectorAll(".choice")
    .forEach(button => {

      button.onclick = () => {

        const selected =
          Number(
            button.dataset.choice
          );

        const alreadyEarned =
          state.quizCorrect[module.id] === true;

        document
          .querySelectorAll(".choice")
          .forEach(
            item =>
              item.disabled = true
          );

        const correct =
          selected === module.quiz.answer;

        button.classList.add(
          correct
            ? "correct"
            : "wrong"
        );

        if (!correct) {
          document
            .querySelector(
              `.choice[data-choice="${module.quiz.answer}"]`
            )
            .classList
            .add("correct");
        }

        $("#feedback").textContent =
          (
            correct
              ? "Correct. "
              : "Not quite. "
          ) +
          module.quiz.explain +
          (
            correct &&
            !alreadyEarned
              ? " +25 XP added to your forest bank."
              : ""
          );

        if (
          correct &&
          !alreadyEarned
        ) {
          state.quizCorrect[module.id] =
            true;

          save();
          updateStats();
        }
      };
    });

  $("#completeBtn").onclick = () => {

    if (
      !state.completed.includes(module.id)
    ) {
      state.completed.push(
        module.id
      );

      save();
    }

    render();
  };

  $("#nextBtn").onclick = () => {

    const index =
      modules.findIndex(
        item =>
          item.id === module.id
      );

    const next =
      modules[
        (index + 1) %
        modules.length
      ];

    current =
      next.id;

    render();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  renderNav();
  updateStats();
}

$("#plantTreeBtn").onclick = () => {

  if (
    availableXp() < TREE_COST
  ) {
    return;
  }

  const allowed =
    unlockedSpecies()
      .some(
        item =>
          item.id === state.selectedSpecies
      );

  if (!allowed) {
    return;
  }

  state.spentXp +=
    TREE_COST;

  state.trees.push({
    species:
      state.selectedSpecies,

    plantedAtXp:
      lifetimeXp(),

    plantedAt:
      new Date().toISOString()
  });

  save();
  updateStats();
};

window.addEventListener(
  "neon-grove-practice-xp-changed",
  () => {

    updateStats();

    if (
      typeof renderForest === "function"
    ) {
      renderForest();
    }

  }
);

$("#resetBtn").onclick = () => {

  if (
    confirm(
      "Reset all lesson progress, XP, and your entire Neon Grove forest?"
    )
  ) {
    localStorage.removeItem(
      stateKey
    );

    localStorage.removeItem(
      "neon-grove-practice-state"
    );

    localStorage.removeItem(
      legacyKey
    );

    state =
      freshState();

    render();
  }
};

render();