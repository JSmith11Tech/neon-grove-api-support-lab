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


const fauna = [

  {
    id: "lumen-firefly",
    name: "Lumen Firefly",
    icon: "✦",
    minXp: 250,
    minTrees: 3,
    minFlora: 1,
    description: "Tiny bioluminescent pollinators that appear once the grove develops its first canopy.",
    population: context =>
      Math.min(
        12,
        2 + Math.floor(
          Math.max(0, context.trees - 3) / 2
        )
      )
  },

  {
    id: "circuit-finch",
    name: "Circuit Finch",
    icon: "🐦",
    minXp: 600,
    minTrees: 6,
    minFlora: 2,
    description: "A small neon songbird drawn to mixed tree cover and growing biodiversity.",
    population: context =>
      Math.min(
        5,
        1 + Math.floor(
          Math.max(0, context.trees - 6) / 4
        )
      )
  },

  {
    id: "glasswing-moth",
    name: "Glasswing Moth",
    icon: "🦋",
    minXp: 900,
    minTrees: 9,
    minFlora: 2,
    requiredUnlock: "glasswood",
    description: "A translucent nocturnal pollinator that arrives after Glasswood enters the ecosystem.",
    population: context =>
      Math.min(
        6,
        1 + Math.floor(
          Math.max(0, context.trees - 9) / 3
        )
      )
  },

  {
    id: "neon-hare",
    name: "Neon Hare",
    icon: "🐇",
    minXp: 1200,
    minTrees: 12,
    minFlora: 3,
    description: "A shy ground-dweller that requires a mature, diverse grove.",
    population: context =>
      Math.min(
        4,
        1 + Math.floor(
          Math.max(0, context.trees - 12) / 5
        )
      )
  },

  {
    id: "aurora-fox",
    name: "Aurora Fox",
    icon: "🦊",
    minXp: 1600,
    minTrees: 16,
    minFlora: 4,
    description: "A rare predator that only settles in a large and biologically diverse grove.",
    population: context =>
      Math.min(
        2,
        1 + Math.floor(
          Math.max(0, context.trees - 20) / 6
        )
      )
  },

  {
    id: "quantum-stag",
    name: "Quantum Stag",
    icon: "🦌",
    minXp: 2200,
    minTrees: 20,
    minFlora: 5,
    requiredUnlock: "quantum-sakura",
    description: "The apex wildlife unlock: a solitary luminous stag found only in a fully developed Neon Grove.",
    population: () => 1
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
      level =
        Math.max(
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


function ecosystemContext() {

  return {
    xp:
      lifetimeXp(),

    trees:
      state.trees.length,

    flora:
      plantedSpeciesCount()
  };

}


function isFaunaUnlocked(animal) {

  const context =
    ecosystemContext();


  if (
    context.xp < animal.minXp ||
    context.trees < animal.minTrees ||
    context.flora < animal.minFlora
  ) {
    return false;
  }


  if (animal.requiredUnlock) {

    const required =
      species.find(
        item =>
          item.id === animal.requiredUnlock
      );

    if (
      !required ||
      lifetimeXp() < required.unlockXp
    ) {
      return false;
    }

  }


  return true;

}


function faunaPopulation(animal) {

  if (
    !isFaunaUnlocked(animal)
  ) {
    return 0;
  }


  return Math.max(
    1,
    animal.population(
      ecosystemContext()
    )
  );

}


function totalFaunaPopulation() {

  return fauna.reduce(
    (total, animal) =>
      total +
      faunaPopulation(animal),
    0
  );

}


function nextSpecies() {

  return (
    species.find(
      item =>
        lifetimeXp() <
        item.unlockXp
    ) || null
  );

}


function faunaRequirementText(animal) {

  const parts = [
    `${animal.minXp} lifetime XP`,
    `${animal.minTrees} trees`,
    `${animal.minFlora} planted tree species`
  ];


  if (animal.requiredUnlock) {

    const required =
      species.find(
        item =>
          item.id ===
          animal.requiredUnlock
      );

    if (required) {
      parts.push(
        `${required.name} unlocked`
      );
    }

  }


  return parts.join(" · ");

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


  const faunaStat =
    document.querySelector(
      "#forestFaunaPopulation"
    );


  if (faunaStat) {

    faunaStat.textContent =
      totalFaunaPopulation();

  }


  document
    .querySelector("#groveLevel")
    .textContent =
      currentLevel();


  const summary =
    document.querySelector(
      "#groveSummary"
    );


  if (
    state.trees.length === 0
  ) {

    summary.textContent =
      "Your grove is waiting for its first tree.";

  }
  else {

    const animals =
      totalFaunaPopulation();


    summary.textContent =
      `${state.trees.length} trees across ` +
      `${plantedSpeciesCount()} planted species` +
      (
        animals > 0
          ? ` · ${animals} creatures now live here.`
          : "."
      );

  }

}


function renderForest() {

  const forest =
    document.querySelector(
      "#forestOverview"
    );


  const empty =
    document.querySelector(
      "#emptyGrove"
    );


  if (
    state.trees.length > 0 &&
    empty
  ) {
    empty.remove();
  }


  state.trees.forEach(
    (tree, index) => {

      const slot =
        document.createElement(
          "div"
        );

      slot.className =
        "grove-tree-slot";


      const element =
        document.createElement(
          "div"
        );

      element.className =
        `tree ${tree.species}`;


      const treeSpecies =
        species.find(
          item =>
            item.id ===
            tree.species
        );


      element.title =
        `${treeSpecies?.name || "Tree"} #${index + 1}`;


      const label =
        document.createElement(
          "span"
        );

      label.textContent =
        `${index + 1}`;


      slot.appendChild(
        element
      );

      slot.appendChild(
        label
      );

      forest.appendChild(
        slot
      );

    }
  );


  fauna.forEach(animal => {

    const population =
      faunaPopulation(animal);


    for (
      let index = 0;
      index < population;
      index++
    ) {

      const slot =
        document.createElement(
          "div"
        );

      slot.className =
        `fauna-slot fauna-${animal.id}`;


      const icon =
        document.createElement(
          "span"
        );

      icon.className =
        "fauna-icon";

      icon.textContent =
        animal.icon;

      icon.title =
        `${animal.name} #${index + 1}`;


      slot.appendChild(
        icon
      );

      forest.appendChild(
        slot
      );

    }

  });

}


function renderCensus() {

  const census =
    document.querySelector(
      "#speciesCensus"
    );


  species.forEach(item => {

    const population =
      populationFor(item.id);

    const unlocked =
      lifetimeXp() >=
      item.unlockXp;


    const card =
      document.createElement(
        "article"
      );

    card.className =
      "species-card" +
      (
        unlocked
          ? ""
          : " species-locked"
      );


    const icon =
      document.createElement(
        "div"
      );

    icon.className =
      `species-preview tree ${item.id}`;


    const info =
      document.createElement(
        "div"
      );

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


function renderFaunaCensus() {

  const census =
    document.querySelector(
      "#faunaCensus"
    );


  if (!census) {
    return;
  }


  fauna.forEach(animal => {

    const unlocked =
      isFaunaUnlocked(animal);

    const population =
      faunaPopulation(animal);


    const card =
      document.createElement(
        "article"
      );


    card.className =
      "fauna-card" +
      (
        unlocked
          ? ""
          : " fauna-locked"
      );


    card.innerHTML = `

      <div class="fauna-card-icon">
        ${animal.icon}
      </div>

      <div class="fauna-card-info">

        <div class="fauna-card-title">

          <div>

            <span class="species-status">
              ${
                unlocked
                  ? "Habitat established"
                  : "Habitat incomplete"
              }
            </span>

            <h3>
              ${animal.name}
            </h3>

          </div>

          <strong class="species-count">
            ${population}
          </strong>

        </div>

        <p>
          ${animal.description}
        </p>

        <div class="species-meta">

          <span>
            Population: ${population}
          </span>

          <span>
            ${faunaRequirementText(animal)}
          </span>

        </div>

      </div>
    `;


    census.appendChild(
      card
    );

  });

}


function renderUnlock() {

  const next =
    nextSpecies();


  if (!next) {

    document
      .querySelector(
        "#nextSpeciesName"
      )
      .textContent =
        "Full Flora Biodiversity Achieved";


    document
      .querySelector(
        "#nextSpeciesText"
      )
      .textContent =
        "Every current Neon Grove tree species has been unlocked.";


    document
      .querySelector(
        "#groveProgressText"
      )
      .textContent =
        `${lifetimeXp()} XP`;


    document
      .querySelector(
        "#groveProgressBar"
      )
      .style.width =
        "100%";


    return;

  }


  document
    .querySelector(
      "#nextSpeciesName"
    )
    .textContent =
      next.name;


  document
    .querySelector(
      "#nextSpeciesText"
    )
    .textContent =
      `Reach ${next.unlockXp} lifetime XP to unlock this tree species.`;


  document
    .querySelector(
      "#groveProgressText"
    )
    .textContent =
      `${lifetimeXp()} / ${next.unlockXp} XP`;


  const unlocked =
    species.filter(
      item =>
        item.unlockXp <=
        lifetimeXp()
    );


  const previous =
    unlocked.length
      ? unlocked[
          unlocked.length - 1
        ]
      : null;


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
    .querySelector(
      "#groveProgressBar"
    )
    .style.width =
      percent + "%";

}


renderStats();
renderForest();
renderCensus();
renderFaunaCensus();
renderUnlock();