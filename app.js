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
  },
  {
    id: "titan-sequoia",
    name: "Titan Sequoia",
    level: 6,
    unlockXp: 2500
  }
];

const TREE_GROWTH_STAGES = [

  {
    id: "seed",
    label: "Seed",
    minXp: 0
  },

  {
    id: "sprout",
    label: "Sprout",
    minXp: 50
  },

  {
    id: "sapling",
    label: "Sapling",
    minXp: 125
  },

  {
    id: "mature",
    label: "Mature",
    minXp: 250
  }

];


function treeGrowthStage(tree) {

  const plantedAt =
    Number(
      tree.plantedAtXp || 0
    );


  const gained =
    Math.max(
      0,
      lifetimeXp() - plantedAt
    );


  let stage =
    TREE_GROWTH_STAGES[0];


  TREE_GROWTH_STAGES.forEach(
    candidate => {

      if (
        gained >= candidate.minXp
      ) {
        stage = candidate;
      }

    }
  );


  return {
    id:
      stage.id,

    label:
      stage.label,

    minXp:
      stage.minXp,

    gained:
      gained
  };

}

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

function moduleQuizXpEarned() {

  try {

    const raw =
      localStorage.getItem(
        "neon-grove-module-quiz-state"
      );

    if (!raw) {
      return 0;
    }

    const quizState =
      JSON.parse(raw);

    return (
      Object.values(
        quizState.passed || {}
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
    moduleXpEarned() +
    quizXpEarned() +
    handsOnXpEarned() +
    moduleQuizXpEarned()
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
        <span>Unlocked · Level ${item.level}</span>
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
        <strong>${item.name}</strong>
        <span>Locked · Unlock at ${item.unlockXp.toLocaleString()} XP</span>
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

      const growth =
        treeGrowthStage(tree);

      element.className =
        `tree ${tree.species} growth-${growth.id}`;

      element.dataset.growthStage =
        growth.label;

      element.dataset.growthXp =
        String(
          growth.gained
        );

      const treeSpecies =
        species.find(
          item =>
            item.id === tree.species
        );

      element.title =
        `${treeSpecies?.name || "Tree"} #${index + 1} · ${growth.label} · ${growth.gained} XP since planting`;

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
      `Plant ${selected.name} seed · ${TREE_COST} XP`;
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

/* =========================================================
   NEON GROVE DIRECT PRACTICE ENGINE
   ========================================================= */

const neonPracticeKey =
  "neon-grove-practice-state";


function neonPracticeFresh() {

  return {
    completed: {},
    evidence: {},
    steps: {},
    screenshots: {}
  };

}


function neonPracticeLoad() {

  try {

    const raw =
      localStorage.getItem(
        neonPracticeKey
      );

    if (!raw) {
      return neonPracticeFresh();
    }

    return Object.assign(
      neonPracticeFresh(),
      JSON.parse(raw)
    );

  }
  catch {

    return neonPracticeFresh();

  }

}


let neonPractice =
  neonPracticeLoad();


function neonPracticeSave() {

  localStorage.setItem(
    neonPracticeKey,
    JSON.stringify(
      neonPractice
    )
  );

}


function handsOnXpEarned() {

  return (
    Object.values(
      neonPractice.completed || {}
    )
      .filter(Boolean)
      .length * 50
  );

}


function neonEscape(value) {

  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


window.__neonPracticeConfigs =
  window.__neonPracticeConfigs || {};


function neonEvidenceFor(key) {

  if (
    !neonPractice.evidence[key] ||
    typeof neonPractice.evidence[key] !==
      "object"
  ) {

    neonPractice.evidence[key] =
      {};

  }

  return neonPractice.evidence[key];

}


function neonStepsHtml(
  config,
  key
) {

  const saved =
    neonPractice.steps[key] || [];


  return (
    config.steps || []
  )
    .map(
      (step, index) => `

        <div class="ng-step">

          <label class="ng-step-check">

            <input
              type="checkbox"
              ${
                saved[index]
                  ? "checked"
                  : ""
              }
              onchange="
                window.neonPracticeStep(
                  '${key}',
                  ${index},
                  this.checked
                )
              ">

            <span>
              ${index + 1}
            </span>

          </label>


          <div class="ng-step-content">

            <h5>
              ${neonEscape(step.title)}
            </h5>

            <div>
              ${step.body}
            </div>

          </div>

        </div>

      `
    )
    .join("");

}


function neonEvidenceHtml(
  config,
  key
) {

  const saved =
    neonEvidenceFor(key);


  return (
    config.evidence || []
  )
    .map(
      field => {

        const value =
          saved[field.id] || "";


        if (
          Number(
            field.minLength || 0
          ) >= 30
        ) {

          return `

            <label class="ng-field">

              <span>
                ${neonEscape(field.label)}
              </span>

              <textarea
                rows="5"
                data-ng-field="${neonEscape(field.id)}"
                placeholder="${neonEscape(field.placeholder || "")}"
                oninput="
                  window.neonPracticeEvidence(
                    '${key}',
                    '${field.id}',
                    this.value
                  )
                "
              >${neonEscape(value)}</textarea>

            </label>

          `;

        }


        return `

          <label class="ng-field">

            <span>
              ${neonEscape(field.label)}
            </span>

            <input
              type="text"
              data-ng-field="${neonEscape(field.id)}"
              value="${neonEscape(value)}"
              placeholder="${neonEscape(field.placeholder || "")}"
              oninput="
                window.neonPracticeEvidence(
                  '${key}',
                  '${field.id}',
                  this.value
                )
              ">

          </label>

        `;

      }
    )
    .join("");

}


function neonPracticeScreenshots(
  key
) {

  const stored =
    neonPractice.screenshots[key];


  /*
    Older Neon Grove versions stored one screenshot
    as a single data URL string.

    Keep it automatically.
  */
  if (
    typeof stored === "string" &&
    stored
  ) {

    return [
      {
        dataUrl: stored,
        caption: ""
      }
    ];

  }


  if (
    Array.isArray(stored)
  ) {

    return stored
      .map(
        item => {

          if (
            typeof item === "string"
          ) {

            return {
              dataUrl: item,
              caption: ""
            };

          }


          return {
            dataUrl:
              item.dataUrl ||
              item.image ||
              "",

            caption:
              item.caption ||
              ""
          };

        }
      )
      .filter(
        item =>
          item.dataUrl
      );

  }


  return [];

}

function neonRequestNamesFor(
  key,
  config
) {

  const title =
    String(
      config?.title ||
      ""
    )
      .toLowerCase();


  if (
    key ===
    "postman-bootcamp-v1"
  ) {

    return [
      "01 - First GET Request"
    ];

  }
  /*
    Capstone must be checked before generic title heuristics.
    Its title contains the word "Test", which would otherwise
    incorrectly classify it as the Postman Tests mission.
  */
  if (
    title.includes(
      "capstone"
    )
  ) {

    return [
      "14 - Capstone - API Investigation"
    ];

  }


  if (
    title.includes(
      "get and post"
    ) ||
    title.includes(
      "get & post"
    )
  ) {

    return [
      "GET - HTTP Methods",
      "POST - HTTP Methods"
    ];

  }


  if (
    title.includes(
      "query parameter"
    )
  ) {

    return [
      "GET - Query Parameters"
    ];

  }


  if (
    title.includes(
      "header"
    )
  ) {

    return [
      "POST - JSON Headers"
    ];

  }


  if (
    title.includes(
      "body"
    ) ||
    title.includes(
      "json"
    )
  ) {

    return [
      "POST - JSON Body"
    ];

  }


  if (
    title.includes(
      "status"
    ) ||
    title.includes(
      "response"
    )
  ) {

    return [
      "GET - Response Inspection"
    ];

  }


  if (
    title.includes(
      "auth"
    )
  ) {

    return [
      "GET - Authorization"
    ];

  }


  if (
    title.includes(
      "variable"
    ) ||
    title.includes(
      "environment"
    )
  ) {

    return [
      "GET - Environment Variables"
    ];

  }


  if (
    title.includes(
      "collection"
    ) ||
    title.includes(
      "workflow"
    )
  ) {

    return [
      "10 - GET - Collection Workflow"
    ];

  }


  if (
    title.includes(
      "test"
    )
  ) {

    return [
      "11 - GET - Response Tests"
    ];

  }


  if (
    title.includes(
      "troubleshoot"
    )
  ) {

    return [
      "GET - Troubleshooting"
    ];

  }


  if (
    title.includes(
      "ticket"
    )
  ) {

    return [
      "Support Ticket - Investigation"
    ];

  }


  if (
    title.includes(
      "capstone"
    ) ||
    title.includes(
      "investigation"
    )
  ) {

    return [
      "Capstone - API Investigation"
    ];

  }


  /*
    No guessing required even for a mission we have
    not specifically named yet.
  */
  const cleanTitle =
    String(
      config?.title ||
      "Postman Request"
    )
      .replace(
        /^Guided Lab:\s*/i,
        ""
      )
      .replace(
        /^Postman Bootcamp:\s*/i,
        ""
      )
      .trim();


  return [
    `${cleanTitle} - Request`
  ];

}


function neonRequestNamesHtml(
  key,
  config
) {

  const names =
    neonRequestNamesFor(
      key,
      config
    );


  /* USE EXISTING CAPSTONE REQUEST */
  const requestTitle =
    String(
      config?.title ||
      ""
    )
      .toLowerCase();


  if (
    requestTitle.includes(
      "capstone"
    )
  ) {

    return `

      <div class="ng-request-name-box">

        <span>
          USE EXISTING REQUEST
        </span>

        <div>
          <code>
            14 - Capstone - API Investigation
          </code>
        </div>

        <small>
          Open this existing request in your Neon Grove API Practice
          collection. Do not create another capstone request.
        </small>

      </div>

    `;

  }


  return `

    <div class="ng-request-name-box">

      <span>
        SAVE REQUEST AS
      </span>

      ${
        names
          .map(
            (
              name,
              index
            ) => `

              <div>

                ${
                  names.length > 1
                    ? `<b>Request ${index + 1}</b>`
                    : ""
                }

                <code>
                  ${neonEscape(name)}
                </code>

              </div>

            `
          )
          .join("")
      }

      <small>
        Use this exact name so you never have to stop
        and decide what to call the request.
      </small>

    </div>

  `;

}

function neonMissionPanel(
  config,
  key,
  label,
  locked = false
) {

  window.__neonPracticeConfigs[key] =
    config;


  const completed =
    neonPractice.completed[key] === true;


  const screenshots =
    neonPracticeScreenshots(
      key
    );


  return `

    <section
      class="ng-mission ${
        completed
          ? "ng-mission-complete"
          : ""
      }"
      data-ng-mission="${key}">

      <div class="ng-mission-header">

        <div>

          <p class="ng-kicker">
            ${label} · +50 XP
          </p>

          <h4>
            ${neonEscape(config.title)}
          </h4>

          <p>
            ${neonEscape(config.intro)}
          </p>

          ${
            neonRequestNamesHtml(
              key,
              config
            )
          }

        </div>

        <span class="ng-status">

          ${
            completed
              ? "✓ Complete"
              : locked
                ? "🔒 Bootcamp required"
                : "In progress"
          }

        </span>

      </div>


      ${
        locked
          ? `

            <div class="ng-lock">

              <strong>
                Complete Postman Bootcamp first.
              </strong>

              This module exercise will unlock automatically
              after you finish Bootcamp.

            </div>

          `
          : ""
      }


      <div class="ng-guidance">

        <strong>
          FOLLOW ALONG FIRST
        </strong>

        You are not expected to already know Postman.
        Do each step exactly as written.

      </div>


      <div class="ng-steps">

        ${neonStepsHtml(
          config,
          key
        )}

      </div>


      <div class="ng-your-turn">

        <strong>
          YOUR TURN
        </strong>

        Complete the work in real Postman,
        then submit what happened below.

      </div>


      <div class="ng-evidence">

        <h5>
          Submit your work
        </h5>

        ${neonEvidenceHtml(
          config,
          key
        )}
        <div class="ng-screenshot-area">

          <div class="ng-screenshot-heading">

            <div>

              <strong>
                📎 Screenshot evidence
              </strong>

              <span>
                Add every screenshot needed to prove the work.
                Up to four screenshots per mission.
              </span>

            </div>

            <b>
              ${screenshots.length}/4
            </b>

          </div>


          <div
            class="ng-paste-zone"
            tabindex="0"
            contenteditable="true"
            role="textbox"
            aria-label="Paste screenshot here"
            data-ng-paste-target
            onpaste="
              window.neonPracticePasteScreenshot(
                '${key}',
                event
              )
            ">

            <strong>
              Paste screenshot here
            </strong>

            <span>
              Click this box, then press Ctrl+V.
              You can still upload files below.
            </span>

          </div>

          <input
            class="ng-screenshot-input"
            type="file"
            accept="image/*"
            multiple
            ${
              screenshots.length >= 4
                ? "disabled"
                : ""
            }
            onchange="
              window.neonPracticeScreenshot(
                '${key}',
                this
              )
            ">


          ${
            screenshots.length
              ? `

                <div class="ng-screenshot-gallery">

                  ${
                    screenshots
                      .map(
                        (shot, index) => `

                          <article class="ng-screenshot-item">

                            <div class="ng-screenshot-number">
                              Evidence ${index + 1}
                            </div>

                            <img
                              src="${shot.dataUrl}"
                              alt="Postman mission evidence ${index + 1}">

                            <label>

                              <span>
                                Caption
                              </span>

                              <input
                                type="text"
                                value="${neonEscape(
                                  shot.caption || ""
                                )}"
                                placeholder="Example: GET request — 200 OK"
                                oninput="
                                  window.neonPracticeScreenshotCaption(
                                    '${key}',
                                    ${index},
                                    this.value
                                  )
                                ">

                            </label>

                            <button
                              type="button"
                              onclick="
                                window.neonRemoveScreenshot(
                                  '${key}',
                                  ${index}
                                )
                              ">

                              Remove screenshot

                            </button>

                          </article>

                        `
                      )
                      .join("")
                  }

                </div>

              `
              : `
                <div class="ng-screenshot-empty">
                  No screenshots added yet.
                </div>
              `
          }

        </div>


        <div
          class="ng-feedback"
          data-ng-feedback>
        </div>


        <button
          type="button"
          class="ng-submit"
          ${
            completed || locked
              ? "disabled"
              : ""
          }
          onclick="
            window.neonSubmitPractice(
              '${key}'
            )
          ">

          ${
            completed
              ? "✓ Mission complete · +50 XP earned"
              : locked
                ? "Complete Bootcamp first"
                : "Submit mission · +50 XP"
          }

        </button>

      </div>

    </section>

  `;

}


function neonGenericMission(
  module
) {

  return {

    title:
      "Apply what you learned",

    intro:
      "Work through the challenge yourself, then record your reasoning.",

    steps: [

      {
        title:
          "Read the mission goal",

        body:
          "Read the challenge above carefully."
      },

      {
        title:
          "Complete the task",

        body:
          "Use the lesson and worked example as references, but answer in your own words."
      },

      {
        title:
          "Record your evidence",

        body:
          "Write what you did and what you concluded in the submission area."
      }

    ],

    evidence: [

      {
        id:
          "answer",

        label:
          "Your answer / evidence",

        minLength:
          20,

        placeholder:
          "Explain what you did and what you concluded."
      }

    ]

  };

}


function practiceMissionHtml(
  module
) {

  const tutorials =
    window.NEON_GROVE_POSTMAN_TUTORIALS ||
    {};


  const tutorial =
    tutorials[module.title];


  const bootcamp =
    tutorials.bootcamp;


  const bootcampKey =
    "postman-bootcamp-v1";


  const bootcampDone =
    neonPractice.completed[
      bootcampKey
    ] === true;


  let html = `

    <div class="ng-practice">

      <div class="ng-goal">

        <span>
          MISSION GOAL
        </span>

        <p>
          ${module.challenge}
        </p>

        <small>
          You do not need to know how to do this already.
          The instructions are below.
        </small>

      </div>

  `;


  if (tutorial) {

    if (
      !bootcampDone &&
      bootcamp
    ) {

      html +=
        neonMissionPanel(
          bootcamp,
          bootcampKey,
          "🎓 POSTMAN BOOTCAMP"
        );

    }
    else {

      html += `

        <div class="ng-bootcamp-done">

          <strong>
            ✓ Postman Bootcamp complete
          </strong>

          <span>
            Continue with the guided module exercise.
          </span>

        </div>

      `;

    }


    html +=
      neonMissionPanel(
        tutorial,
        `postman-${module.id}`,
        "🧪 GUIDED POSTMAN LAB",
        !bootcampDone
      );

  }
  else {

    html +=
      neonMissionPanel(
        neonGenericMission(module),
        `practice-${module.id}`,
        "🧠 PRACTICE MISSION"
      );

  }


  html += `
    </div>
  `;


  return html;

}


/* =========================================================
   PRACTICE EVENTS
   ========================================================= */

window.neonPracticeEvidence =
  function(
    key,
    id,
    value
  ) {

    neonEvidenceFor(key)[id] =
      value;

    neonPracticeSave();

  };


window.neonPracticeStep =
  function(
    key,
    index,
    checked
  ) {

    if (
      !Array.isArray(
        neonPractice.steps[key]
      )
    ) {

      neonPractice.steps[key] =
        [];

    }


    neonPractice.steps[key][index] =
      checked;


    neonPracticeSave();

  };


window.neonPracticePasteScreenshot =
  function(
    key,
    event
  ) {

    event.preventDefault();


    const clipboard =
      event.clipboardData;


    if (
      !clipboard
    ) {

      alert(
        "Clipboard access was not available."
      );

      return;

    }


    let files =
      Array.from(
        clipboard.files ||
        []
      )
        .filter(
          file =>
            file.type.startsWith(
              "image/"
            )
        );


    if (
      files.length === 0
    ) {

      files =
        Array.from(
          clipboard.items ||
          []
        )
          .filter(
            item =>
              item.kind === "file" &&
              item.type.startsWith(
                "image/"
              )
          )
          .map(
            item =>
              item.getAsFile()
          )
          .filter(Boolean);

    }


    if (
      files.length === 0
    ) {

      alert(
        "No image was found on your clipboard. Use Win+Shift+S first, then Ctrl+V."
      );

      return;

    }


    window.neonPracticeScreenshot(
      key,
      {
        files: files,
        value: ""
      }
    );

  };

window.neonPracticeScreenshot =
  function(
    key,
    input
  ) {

    const files =
      Array.from(
        input.files || []
      )
        .filter(
          file =>
            file.type.startsWith(
              "image/"
            )
        );


    if (
      files.length === 0
    ) {
      return;
    }


    const before =
      neonPracticeScreenshots(
        key
      );


    const room =
      Math.max(
        0,
        4 - before.length
      );


    if (
      room === 0
    ) {

      alert(
        "This mission already has four screenshots."
      );

      input.value = "";

      return;

    }


    const selected =
      files.slice(
        0,
        room
      );


    if (
      files.length > room
    ) {

      alert(
        `Only ${room} more screenshot${
          room === 1
            ? ""
            : "s"
        } can be added to this mission.`
      );

    }


    const processFile =
      index => {

        if (
          index >= selected.length
        ) {

          input.value = "";

          render();

          return;

        }


        const file =
          selected[index];


        const reader =
          new FileReader();


        reader.onload =
          event => {

            const image =
              new Image();


            image.onload =
              () => {

                const max = 1440;


                const scale =
                  Math.min(
                    1,
                    max / image.width
                  );


                const canvas =
                  document.createElement(
                    "canvas"
                  );


                canvas.width =
                  Math.round(
                    image.width *
                    scale
                  );


                canvas.height =
                  Math.round(
                    image.height *
                    scale
                  );


                const context =
                  canvas.getContext(
                    "2d"
                  );


                context.drawImage(
                  image,
                  0,
                  0,
                  canvas.width,
                  canvas.height
                );


                const screenshots =
                  neonPracticeScreenshots(
                    key
                  );


                screenshots.push({
                  dataUrl:
                    canvas.toDataURL("image/jpeg", 0.84),

                  caption: ""
                });


                neonPractice
                  .screenshots[key] =
                    screenshots;


                try {

                  neonPracticeSave();

                }
                catch {

                  neonPractice
                    .screenshots[key] =
                      before;


                  try {
                    neonPracticeSave();
                  }
                  catch {}


                  alert(
                    "Your browser ran out of local screenshot storage. Try a smaller crop or remove an older screenshot."
                  );

                  input.value = "";

                  render();

                  return;

                }


                processFile(
                  index + 1
                );

              };


            image.src =
              event.target.result;

          };


        reader.readAsDataURL(
          file
        );

      };


    processFile(0);

  };


window.neonPracticeScreenshotCaption =
  function(
    key,
    index,
    value
  ) {

    const screenshots =
      neonPracticeScreenshots(
        key
      );


    if (
      !screenshots[index]
    ) {
      return;
    }


    screenshots[index]
      .caption =
        value;


    neonPractice
      .screenshots[key] =
        screenshots;


    neonPracticeSave();

  };


window.neonRemoveScreenshot =
  function(
    key,
    index
  ) {

    const screenshots =
      neonPracticeScreenshots(
        key
      );


    if (
      !screenshots[index]
    ) {
      return;
    }


    screenshots.splice(
      index,
      1
    );


    if (
      screenshots.length === 0
    ) {

      delete neonPractice
        .screenshots[key];

    }
    else {

      neonPractice
        .screenshots[key] =
          screenshots;

    }


    neonPracticeSave();

    render();

  };


window.neonSubmitPractice =
  function(key) {

    const config =
      window.__neonPracticeConfigs[
        key
      ];


    const panel =
      document.querySelector(
        `[data-ng-mission="${key}"]`
      );


    const feedback =
      panel?.querySelector(
        "[data-ng-feedback]"
      );


    if (
      !config ||
      !panel
    ) {
      return;
    }


    if (
      key.startsWith(
        "postman-"
      ) &&
      key !==
        "postman-bootcamp-v1" &&
      neonPractice.completed[
        "postman-bootcamp-v1"
      ] !== true
    ) {

      if (feedback) {

        feedback.textContent =
          "Complete Postman Bootcamp first.";

      }

      return;

    }


    const evidence =
      neonEvidenceFor(
        key
      );


    for (
      const field of
      config.evidence || []
    ) {

      const value =
        String(
          evidence[field.id] || ""
        )
          .trim();


      if (!value) {

        feedback.textContent =
          `Complete "${field.label}" first.`;

        return;

      }


      if (field.expected) {

        const normalized =
          value.toLowerCase();


        const correct =
          field.expected.some(
            expected =>
              String(expected)
                .trim()
                .toLowerCase() ===
              normalized
          );


        if (!correct) {

          feedback.textContent =
            `"${field.label}" is the first answer that is incorrect. ${
              field.validationHint ||
              `Expected: ${(field.expected || []).join(" or ")}.`
            }`;

          return;

        }

      }


      if (
        field.acceptedContains
      ) {

        const normalized =
          value.toLowerCase();


        const correct =
          field.acceptedContains.some(
            expected =>
              normalized.includes(
                String(expected)
                  .toLowerCase()
              )
          );


        if (!correct) {

          feedback.textContent =
            `"${field.label}" is the first answer that is incorrect. ${
              field.validationHint ||
              "The answer is missing the technical concept this question is checking."
            }`;

          return;

        }

      }


      if (
        field.minLength &&
        value.length <
          field.minLength
      ) {

        feedback.textContent =
          `"${field.label}" needs a little more detail.`;

        return;

      }

    }


    if (
      neonPractice.completed[key]
    ) {
      return;
    }


    neonPractice.completed[key] =
      true;


    neonPracticeSave();

    updateStats();

    render();

  };


/* =========================================================
   NEON GROVE DIRECT MODULE QUIZ
   ========================================================= */

const neonModuleQuizStateKey =
  "neon-grove-module-quiz-state";


function neonFreshModuleQuizState() {

  return {
    passed: {},
    best: {}
  };

}


function neonLoadModuleQuizState() {

  try {

    const raw =
      localStorage.getItem(
        neonModuleQuizStateKey
      );


    if (!raw) {
      return neonFreshModuleQuizState();
    }


    const parsed =
      JSON.parse(raw);


    return {

      passed:
        parsed.passed ||
        parsed.completed ||
        {},

      best:
        parsed.best ||
        parsed.bestScores ||
        {}

    };

  }
  catch {

    return neonFreshModuleQuizState();

  }

}


let neonModuleQuizState =
  neonLoadModuleQuizState();


function neonSaveModuleQuizState() {

  localStorage.setItem(
    neonModuleQuizStateKey,
    JSON.stringify(
      neonModuleQuizState
    )
  );

}


function moduleQuizXpEarned() {

  return (
    Object.values(
      neonModuleQuizState.passed ||
      {}
    )
      .filter(Boolean)
      .length * 50
  );

}


function neonQuizChoices(
  module,
  question,
  questionIndex
) {

  const options =
    question.choices.map(
      (text, originalIndex) => ({
        text,
        originalIndex
      })
    );


  /*
    Stable rotation rather than true randomness.

    This means:
    - answer positions vary across questions
    - refreshing does not move the answers around
    - scoring still uses the original answer index
  */
  const moduleSeed =
    [...String(module.id || module.title)]
      .reduce(
        (total, character) =>
          total + character.charCodeAt(0),
        0
      );


  const rotation =
    (
      moduleSeed +
      questionIndex
    ) %
    options.length;


  return [
    ...options.slice(rotation),
    ...options.slice(0, rotation)
  ];

}

function moduleQuizHtml(
  module
) {

  const bank =
    window.NEON_GROVE_MODULE_QUIZZES_ALIAS ||
    {};


  const questions =
    bank[module.title];


  if (
    !Array.isArray(questions) ||
    questions.length === 0
  ) {

    return "";

  }


  const passed =
    neonModuleQuizState
      .passed[module.id] === true;


  const best =
    Number(
      neonModuleQuizState
        .best[module.id] || 0
    );


  return `

    <section
      class="ngmq"
      data-ngmq-module="${module.id}">

      <div class="ngmq-header">

        <div>

          <p class="ngmq-kicker">
            MODULE QUIZ · ${questions.length} QUESTIONS · +50 XP
          </p>

          <h3>
            Test your understanding
          </h3>

          <p>
            Pass with 4 out of 5.
            You can retake the quiz as often as you want.
            XP is awarded once.
          </p>

        </div>


        <div class="ngmq-best">

          <span>
            BEST
          </span>

          <strong>
            ${best}/${questions.length}
          </strong>

        </div>

      </div>


      ${
        passed
          ? `

            <div class="ngmq-earned">

              ✓ Passed · +50 XP already earned

            </div>

          `
          : ""
      }


      <div class="ngmq-questions">

        ${
          questions
            .map(
              (question, questionIndex) => `

                <div
                  class="ngmq-question"
                  data-ngmq-question="${questionIndex}">

                  <h4>

                    <span>
                      ${questionIndex + 1}
                    </span>

                    ${question.q}

                  </h4>


                  <div class="ngmq-choices">

                    ${
                      neonQuizChoices(
                        module,
                        question,
                        questionIndex
                      )
                        .map(
                          option => `

                            <label
                              class="ngmq-choice"
                              data-ngmq-choice="${option.originalIndex}">

                              <input
                                type="radio"
                                name="ngmq-${module.id}-${questionIndex}"
                                value="${option.originalIndex}">

                              <span>
                                ${option.text}
                              </span>

                            </label>

                          `
                        )
                        .join("")
                    }

                  </div>


                  <div
                    class="ngmq-explanation"
                    data-ngmq-explanation>
                  </div>

                </div>

              `
            )
            .join("")
        }

      </div>


      <div
        class="ngmq-feedback"
        data-ngmq-feedback>
      </div>


      <button
        type="button"
        class="ngmq-submit"
        onclick="
          window.neonSubmitModuleQuiz(
            '${module.id}'
          )
        ">

        Submit quiz · +50 XP

      </button>

    </section>

  `;

}


window.neonSubmitModuleQuiz =
  function(moduleId) {

    const module =
      modules.find(
        item =>
          item.id === moduleId
      );


    if (!module) {
      return;
    }


    const bank =
      window.NEON_GROVE_MODULE_QUIZZES_ALIAS ||
      {};


    const questions =
      bank[module.title];


    if (
      !Array.isArray(questions)
    ) {
      return;
    }


    const section =
      document.querySelector(
        `[data-ngmq-module="${moduleId}"]`
      );


    if (!section) {
      return;
    }


    const feedback =
      section.querySelector(
        "[data-ngmq-feedback]"
      );


    const answers = [];


    for (
      let index = 0;
      index < questions.length;
      index++
    ) {

      const checked =
        section.querySelector(
          `input[name="ngmq-${moduleId}-${index}"]:checked`
        );


      if (!checked) {

        feedback.textContent =
          `Answer question ${index + 1} before submitting.`;

        return;

      }


      answers.push(
        Number(
          checked.value
        )
      );

    }


    let score = 0;


    questions.forEach(
      (question, questionIndex) => {

        const questionBox =
          section.querySelector(
            `[data-ngmq-question="${questionIndex}"]`
          );


        const selected =
          answers[questionIndex];


        const correct =
          selected ===
          question.answer;


        if (correct) {
          score++;
        }


        questionBox
          .querySelectorAll(
            ".ngmq-choice"
          )
          .forEach(
            choice => {

              choice.classList.remove(
                "ngmq-correct",
                "ngmq-wrong"
              );

            }
          );


        const correctChoice =
          questionBox.querySelector(
            `[data-ngmq-choice="${question.answer}"]`
          );


        correctChoice?.classList.add(
          "ngmq-correct"
        );


        if (!correct) {

          const selectedChoice =
            questionBox.querySelector(
              `[data-ngmq-choice="${selected}"]`
            );


          selectedChoice?.classList.add(
            "ngmq-wrong"
          );

        }


        const explanation =
          questionBox.querySelector(
            "[data-ngmq-explanation]"
          );


        explanation.textContent =
          (
            correct
              ? "Correct. "
              : "Not quite. "
          ) +
          question.explain;

      }
    );


    const oldBest =
      Number(
        neonModuleQuizState
          .best[moduleId] || 0
      );


    neonModuleQuizState
      .best[moduleId] =
        Math.max(
          oldBest,
          score
        );


    const alreadyPassed =
      neonModuleQuizState
        .passed[moduleId] === true;


    const passed =
      score >= 4;


    if (
      passed &&
      !alreadyPassed
    ) {

      neonModuleQuizState
        .passed[moduleId] =
          true;

    }


    neonSaveModuleQuizState();


    if (passed) {

      feedback.textContent =
        alreadyPassed
          ? `Passed ${score}/${questions.length}. XP was already earned on an earlier pass.`
          : `Passed ${score}/${questions.length}. +50 XP added to your Grove.`;

    }
    else {

      feedback.textContent =
        `Score: ${score}/${questions.length}. You need 4/5 to pass. Review the explanations and try again.`;

    }


    if (
      passed &&
      !alreadyPassed
    ) {

      updateStats();

    }


    const bestBox =
      section.querySelector(
        ".ngmq-best strong"
      );


    if (bestBox) {

      bestBox.textContent =
        `${
          neonModuleQuizState
            .best[moduleId]
        }/${questions.length}`;

    }

  };


/* =========================================================
   NEON GROVE INTERACTIVE TICKET ENGINE
   ========================================================= */

const neonTicketStateKey =
  "neon-grove-ticket-response-state";


function neonLoadTicketState() {

  try {

    const raw =
      localStorage.getItem(
        neonTicketStateKey
      );


    if (!raw) {

      return {
        responses: {}
      };

    }


    const parsed =
      JSON.parse(raw);


    return {
      responses:
        parsed.responses ||
        {}
    };

  }
  catch {

    return {
      responses: {}
    };

  }

}


let neonTicketState =
  neonLoadTicketState();


function neonSaveTicketState() {

  localStorage.setItem(
    neonTicketStateKey,
    JSON.stringify(
      neonTicketState
    )
  );

}


function neonTicketKey(
  module
) {

  return (
    module.id +
    ":" +
    module.ticket.id
  );

}


function neonTicketResponseFor(
  module
) {

  const key =
    neonTicketKey(
      module
    );


  if (
    !neonTicketState
      .responses[key]
  ) {

    neonTicketState
      .responses[key] = {

        answers: {},

        completed: false

      };

  }


  return neonTicketState
    .responses[key];

}


function neonTicketEscape(
  value
) {

  return String(
    value ??
    ""
  )
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


function neonTicketNormalize(
  value
) {

  return String(
    value ||
    ""
  )
    .toLowerCase()
    .replace(
      /\s+/g,
      " "
    )
    .trim();

}


function neonTicketFieldPasses(
  field,
  answer
) {

  const normalized =
    neonTicketNormalize(
      answer
    );


  if (
    field.minLength &&
    normalized.length <
      field.minLength
  ) {

    return false;

  }


  if (
    Array.isArray(
      field.conceptGroups
    )
  ) {

    const groupsPass =
      field.conceptGroups
        .every(
          group =>

            Array.isArray(group) &&
            group.some(
              term =>
                normalized.includes(
                  neonTicketNormalize(
                    term
                  )
                )
            )
        );


    if (!groupsPass) {
      return false;
    }

  }


  return true;

}


window.neonSaveTicketDraft =
  function(
    moduleId
  ) {

    const module =
      moduleById(
        moduleId
      );


    if (
      !module ||
      !module.ticket ||
      !Array.isArray(
        module.ticket
          .responseFields
      )
    ) {

      return;

    }


    const saved =
      neonTicketResponseFor(
        module
      );


    module.ticket
      .responseFields
      .forEach(
        field => {

          const element =
            document.getElementById(
              `ticket-response-${field.id}`
            );


          if (element) {

            saved.answers[
              field.id
            ] =
              element.value;

          }

        }
      );


    neonSaveTicketState();

  };


window.neonSubmitTicketResponse =
  function(
    moduleId
  ) {

    const module =
      moduleById(
        moduleId
      );


    if (
      !module ||
      !module.ticket
    ) {

      return;

    }


    window.neonSaveTicketDraft(
      moduleId
    );


    const saved =
      neonTicketResponseFor(
        module
      );


    const fields =
      module.ticket
        .responseFields ||
      [];


    const feedback =
      document.getElementById(
        "ticket-response-feedback"
      );


    const submitButton =
      document.getElementById(
        "ticket-response-submit"
      );


    for (
      const field
      of fields
    ) {

      const answer =
        saved.answers[
          field.id
        ] ||
        "";


      if (
        !neonTicketFieldPasses(
          field,
          answer
        )
      ) {

        saved.completed =
          false;

        neonSaveTicketState();


        if (feedback) {

          feedback.className =
            "ticket-response-feedback error";


          feedback.textContent =
            `"${field.label}" is the first response that needs revision. ` +
            (
              field.validationHint ||
              "Add more specific technical reasoning."
            );

        }


        return;

      }

    }


    saved.completed =
      true;

    neonSaveTicketState();


    if (feedback) {

      feedback.className =
        "ticket-response-feedback success";


      feedback.textContent =
        module.ticket
          .successFeedback ||
        "Ticket response saved.";

    }


    if (submitButton) {

      submitButton.textContent =
        "Response saved ✓";

    }

  };


function ticketHtml(module) {

  if (!module.ticket) {
    return "";
  }


  const ticket =
    module.ticket;


  const fields =
    Array.isArray(
      ticket.responseFields
    )
      ? ticket.responseFields
      : [];


  const saved =
    neonTicketResponseFor(
      module
    );


  const responseArea =
    fields.length === 0

      ? ""

      : `

        <div class="ticket-response">

          <p class="ticket-response-kicker">
            YOUR RESPONSE
          </p>

          <p class="ticket-response-intro">
            Treat this as a reasoning ticket.
            Use the evidence above and explain your investigation.
            Your draft saves automatically.
          </p>

          <div class="ticket-response-grid">

            ${
              fields
                .map(
                  field => `

                    <label
                      class="ticket-response-field">

                      <span>
                        ${field.label}
                      </span>

                      <textarea
                        id="ticket-response-${field.id}"
                        rows="4"
                        oninput="window.neonSaveTicketDraft('${module.id}')"
                        placeholder="Write your reasoning here…">${neonTicketEscape(
                          saved.answers[
                            field.id
                          ] ||
                          ""
                        )}</textarea>

                      ${
                        field.help

                          ? `
                            <small>
                              ${field.help}
                            </small>
                          `

                          : ""
                      }

                    </label>

                  `
                )
                .join("")
            }

          </div>

          <div class="ticket-response-actions">

            <button
              type="button"
              id="ticket-response-submit"
              class="primary"
              onclick="window.neonSubmitTicketResponse('${module.id}')">

              ${
                saved.completed
                  ? "Review response"
                  : "Submit ticket response"
              }

            </button>

          </div>

          <div
            id="ticket-response-feedback"
            class="ticket-response-feedback ${
              saved.completed
                ? "success"
                : ""
            }">

            ${
              saved.completed
                ? neonTicketEscape(
                    ticket.successFeedback ||
                    "Ticket response saved."
                  )
                : ""
            }

          </div>

        </div>

      `;


  return `

    <section class="ticket">

      <div class="ticket-id">
        ${ticket.id}
      </div>

      <h3>
        ${ticket.title}
      </h3>

      <p>
        ${ticket.body}
      </p>

      <details>

        <summary>
          Evidence collected
        </summary>

        <ul>

          ${
            ticket.clues
              .map(
                clue =>
                  `<li>${clue}</li>`
              )
              .join("")
          }

        </ul>

      </details>

      <div class="callout">

        <strong>
          Your task:
        </strong>

        ${ticket.ask}

      </div>

      ${responseArea}

    </section>

  `;

}

function render() {
  const module =
    moduleById(current);

  const moduleNumber =
    modules.findIndex(
      item =>
        item.id === module.id
    ) + 1;

  $("#hero").innerHTML = `

    <p class="eyebrow">
      MODULE ${String(moduleNumber).padStart(2, "0")} OF ${modules.length} · NEON GROVE TRAINING NODE
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

        ${practiceMissionHtml(module)}

      </div>

    </section>

    ${quizHtml(module)}

    ${moduleQuizHtml(module)}

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

window.addEventListener(
  "neon-grove-module-quiz-xp-changed",
  () => {

    updateStats();

    if (
      typeof updateForest === "function"
    ) {
      updateForest();
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
      "neon-grove-module-quiz-state"
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