const modules = window.LAB_MODULES || [];

const stateKey = "neon-grove-progress-v2";
const legacyKey = "api-support-lab-progress-v1";

const species = [

  {
    id: "neon-pine",
    name: "Neon Pine",
    level: 1,
    unlockXp: 0,
    description: "The founding species of Neon Grove."
  },

  {
    id: "circuit-willow",
    name: "Circuit Willow",
    level: 2,
    unlockXp: 400,
    description: "A luminous branching species unlocked through early API mastery."
  },

  {
    id: "glasswood",
    name: "Glasswood",
    level: 3,
    unlockXp: 800,
    description: "A crystalline canopy species representing deeper technical fluency."
  },

  {
    id: "aurora-cedar",
    name: "Aurora Cedar",
    level: 4,
    unlockXp: 1300,
    description: "A high-growth species unlocked through advanced troubleshooting."
  },

  {
    id: "quantum-sakura",
    name: "Quantum Sakura",
    level: 5,
    unlockXp: 1900,
    description: "The rarest species in the current Neon Grove ecosystem."
  }

];


function loadState() {

  const saved =
    localStorage.getItem(stateKey);

  if (saved) {

    return Object.assign(
      {
        completed: [],
        quizCorrect: {},
        spentXp: 0,
        trees: [],
        selectedSpecies: "neon-pine"
      },
      JSON.parse(saved)
    );

  }


  const legacy =
    localStorage.getItem(legacyKey);

  if (legacy) {

    const old =
      JSON.parse(legacy);

    return {
      completed: old.completed || [],
      quizCorrect: old.quizCorrect || {},
      spentXp: 0,
      trees: [],
      selectedSpecies: "neon-pine"
    };

  }


  return {
    completed: [],
    quizCorrect: {},
    spentXp: 0,
    trees: [],
    selectedSpecies: "neon-pine"
  };

}


const state =
  loadState();


function moduleXpEarned() {

  return modules.reduce(
    (total, module) => {

      if (
        state.completed.includes(module.id)
      ) {
        return total + module.xp;
      }

      return total;

    },
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


function lifetimeXp() {

  return (
    moduleXpEarned() +
    quizXpEarned()
  );

}


function currentLevel() {

  let level = 1;

  species.forEach(item => {

    if (
      lifetimeXp() >= item.unlockXp
    ) {
      level = item.level;
    }

  });

  return level;

}


function unlockedSpecies() {

  return species.filter(
    item =>
      lifetimeXp() >= item.unlockXp
  );

}


function populationFor(speciesId) {

  return state.trees.filter(
    tree =>
      tree.species === speciesId
  ).length;

}


function plantedSpeciesCount() {

  return species.filter(
    item =>
      populationFor(item.id) > 0
  ).length;

}


function nextSpecies() {

  return species.find(
    item =>
      lifetimeXp() < item.unlockXp
  ) || null;

}


function renderStats() {

  document
    .querySelector("#forestTotalTrees")
    .textContent =
      state.trees.length;


  document
    .querySelector("#forestUnlockedSpecies")
    .textContent =
      `${unlockedSpecies().length} / ${species.length}`;


  document
    .querySelector("#forestPlantedSpecies")
    .textContent =
      plantedSpeciesCount();


  document
    .querySelector("#forestLifetimeXp")
    .textContent =
      lifetimeXp();


  document
    .querySelector("#groveLevel")
    .textContent =
      currentLevel();


  const summary =
    document.querySelector("#groveSummary");


  if (state.trees.length === 0) {

    summary.textContent =
      "Your grove is waiting for its first tree.";

  }
  else {

    summary.textContent =
      `${state.trees.length} trees across ` +
      `${plantedSpeciesCount()} planted species.`;

  }

}


function renderForest() {

  const forest =
    document.querySelector("#forestOverview");

  const empty =
    document.querySelector("#emptyGrove");


  if (
    state.trees.length === 0
  ) {
    return;
  }


  empty.remove();


  state.trees.forEach(
    (tree, index) => {

      const slot =
        document.createElement("div");

      slot.className =
        "grove-tree-slot";


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


      const label =
        document.createElement("span");

      label.textContent =
        `${index + 1}`;


      slot.appendChild(element);
      slot.appendChild(label);

      forest.appendChild(slot);

    }
  );

}


function renderCensus() {

  const census =
    document.querySelector("#speciesCensus");


  species.forEach(item => {

    const population =
      populationFor(item.id);

    const unlocked =
      lifetimeXp() >= item.unlockXp;


    const card =
      document.createElement("article");

    card.className =
      "species-card" +
      (
        unlocked
          ? ""
          : " species-locked"
      );


    const icon =
      document.createElement("div");

    icon.className =
      `species-preview tree ${item.id}`;


    const info =
      document.createElement("div");

    info.className =
      "species-info";


    const status =
      unlocked
        ? (
            population > 0
              ? "Growing"
              : "Unlocked"
          )
        : "Locked";


    info.innerHTML = `

      <div class="species-card-title">

        <div>

          <span class="species-status">
            ${status}
          </span>

          <h3>
            ${item.name}
          </h3>

        </div>

        <strong class="species-count">
          ${population}
        </strong>

      </div>

      <p>
        ${item.description}
      </p>

      <div class="species-meta">

        <span>
          Level ${item.level}
        </span>

        <span>
          ${item.unlockXp} lifetime XP
        </span>

        <span>
          Population: ${population}
        </span>

      </div>

    `;


    card.appendChild(icon);
    card.appendChild(info);

    census.appendChild(card);

  });

}


function renderUnlock() {

  const next =
    nextSpecies();


  if (!next) {

    document
      .querySelector("#nextSpeciesName")
      .textContent =
        "Full Biodiversity Achieved";


    document
      .querySelector("#nextSpeciesText")
      .textContent =
        "Every current Neon Grove species has been unlocked.";


    document
      .querySelector("#groveProgressText")
      .textContent =
        `${lifetimeXp()} XP`;


    document
      .querySelector("#groveProgressBar")
      .style.width =
        "100%";


    return;

  }


  document
    .querySelector("#nextSpeciesName")
    .textContent =
      next.name;


  document
    .querySelector("#nextSpeciesText")
    .textContent =
      `Reach ${next.unlockXp} lifetime XP to unlock this species.`;


  document
    .querySelector("#groveProgressText")
    .textContent =
      `${lifetimeXp()} / ${next.unlockXp} XP`;


  const previous =
    species
      .filter(
        item =>
          item.unlockXp <= lifetimeXp()
      )
      .at(-1);


  const start =
    previous
      ? previous.unlockXp
      : 0;


  const range =
    next.unlockXp - start;


  const progress =
    lifetimeXp() - start;


  const percent =
    Math.max(
      0,
      Math.min(
        100,
        Math.round(
          progress /
          range *
          100
        )
      )
    );


  document
    .querySelector("#groveProgressBar")
    .style.width =
      percent + "%";

}


renderStats();
renderForest();
renderCensus();
renderUnlock();