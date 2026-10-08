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
    description: "A rare crystalline flowering tree that marks a highly developed grove."
  },

  {
    id: "titan-sequoia",
    name: "Titan Sequoia",
    level: 6,
    unlockXp: 2500,
    description: "The monumental late-game landmark of Neon Grove: an ancient cyber-sequoia towering above the entire ecosystem."
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
    description: "Tiny bioluminescent pollinators that appear beneath the grove's first developing canopy.",
    population: context =>
      Math.min(
        14,
        2 + Math.floor(
          Math.max(0, context.trees - 3) / 2
        )
      )
  },

  {
    id: "chrome-beetle",
    name: "Chrome Beetle",
    icon: "🪲",
    minXp: 350,
    minTrees: 4,
    minFlora: 1,
    description: "Metallic decomposers that recycle organic matter across the forest floor.",
    population: context =>
      Math.min(
        10,
        1 + Math.floor(
          Math.max(0, context.trees - 4) / 2
        )
      )
  },

  {
    id: "circuit-frog",
    name: "Circuit Frog",
    icon: "🐸",
    minXp: 500,
    minTrees: 5,
    minFlora: 2,
    requiredUnlock: "circuit-willow",
    description: "A bright amphibian that settles around the damp root systems of Circuit Willows.",
    population: context =>
      Math.min(
        6,
        1 + Math.floor(
          Math.max(0, context.trees - 5) / 3
        )
      )
  },

  {
    id: "circuit-finch",
    name: "Circuit Finch",
    icon: "",
    minXp: 600,
    minTrees: 6,
    minFlora: 2,
    description: "A neon songbird drawn to mixed tree cover and expanding biodiversity.",
    population: context =>
      Math.min(
        5,
        1 + Math.floor(
          Math.max(0, context.trees - 6) / 4
        )
      )
  },

  {
    id: "neon-koi",
    name: "Neon Koi",
    icon: "🐟",
    minXp: 750,
    minTrees: 7,
    minFlora: 2,
    requiredUnlock: "circuit-willow",
    description: "Glowing freshwater fish that establish a small cyber-wetland inside the grove.",
    population: context =>
      Math.min(
        9,
        2 + Math.floor(
          Math.max(0, context.trees - 7) / 3
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
    description: "A translucent nocturnal pollinator that appears after Glasswood enters the ecosystem.",
    population: context =>
      Math.min(
        7,
        1 + Math.floor(
          Math.max(0, context.trees - 9) / 3
        )
      )
  },

  {
    id: "echo-owl",
    name: "Echo Owl",
    icon: "🦉",
    minXp: 1050,
    minTrees: 10,
    minFlora: 3,
    description: "A quiet canopy hunter whose calls pulse softly through the grove at night.",
    population: context =>
      Math.min(
        3,
        1 + Math.floor(
          Math.max(0, context.trees - 14) / 6
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
    description: "A shy ground-dweller that only appears once the grove has matured into a stable habitat.",
    population: context =>
      Math.min(
        5,
        1 + Math.floor(
          Math.max(0, context.trees - 12) / 4
        )
      )
  },

  {
    id: "phase-gecko",
    name: "Phase Gecko",
    icon: "🦎",
    minXp: 1400,
    minTrees: 14,
    minFlora: 3,
    requiredUnlock: "glasswood",
    description: "A strange semi-translucent reptile that flickers at the edge of visibility as it moves between Glasswood branches.",
    population: context =>
      Math.min(
        4,
        1 + Math.floor(
          Math.max(0, context.trees - 14) / 4
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
    description: "A rare luminous predator that only settles in a large, biologically diverse grove.",
    population: context =>
      Math.min(
        2,
        1 + Math.floor(
          Math.max(0, context.trees - 20) / 6
        )
      )
  },

  {
    id: "cyber-deer",
    name: "Cyber Deer",
    icon: "🦌",
    minXp: 1800,
    minTrees: 18,
    minFlora: 4,
    requiredUnlock: "aurora-cedar",
    description: "A small herd of luminous cybernetic deer that settles into mature forests with dense cover and high biodiversity.",
    population: context =>
      Math.min(
        3,
        1 + Math.floor(
          Math.max(0, context.trees - 18) / 5
        )
      )
  },

  {
    id: "data-wisp",
    name: "Data Wisp",
    icon: "◉",
    minXp: 2000,
    minTrees: 18,
    minFlora: 5,
    requiredUnlock: "quantum-sakura",
    description: "An unexplained floating lifeform made of pulsing light and fragmented digital patterns. Its biology remains unclear.",
    population: context =>
      Math.min(
        4,
        1 + Math.floor(
          Math.max(0, context.trees - 18) / 3
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
    description: "The rarest known creature in Neon Grove: a solitary luminous stag found only in a fully developed ecosystem.",
    population: () => 1
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


    const parsed =
      JSON.parse(raw);


    const passed =
      parsed.passed ||
      parsed.completed ||
      {};


    return (
      Object.values(passed)
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


function renderGrowthStages() {

  const summary =
    document.querySelector(
      "#groveSummary"
    );


  if (!summary) {
    return;
  }


  let legend =
    document.querySelector(
      "#growthStageLegend"
    );


  if (!legend) {

    legend =
      document.createElement(
        "div"
      );

    legend.id =
      "growthStageLegend";

    legend.className =
      "growth-stage-legend";

    summary.insertAdjacentElement(
      "afterend",
      legend
    );

  }


  const counts = {
    seed: 0,
    sprout: 0,
    sapling: 0,
    mature: 0
  };


  state.trees.forEach(
    tree => {

      const growth =
        treeGrowthStage(tree);

      counts[growth.id] += 1;

    }
  );


  legend.innerHTML = `

    <span>
      <strong>${counts.seed}</strong>
      Seeds
    </span>

    <span>
      <strong>${counts.sprout}</strong>
      Sprouts
    </span>

    <span>
      <strong>${counts.sapling}</strong>
      Saplings
    </span>

    <span>
      <strong>${counts.mature}</strong>
      Mature
    </span>

  `;

}

const NEON_GROVE_LANDSCAPE_SPOTS = [

  /*
    MAIN GROVE
    Trees grow in compact communities rather than
    spreading evenly across the whole landscape.
  */

  /* left / central grove */
  { x: 13, y: 29, s: 1.16 },
  { x: 20, y: 38, s: .91 },
  { x: 27, y: 27, s: 1.10 },
  { x: 34, y: 39, s: .84 },
  { x: 40, y: 29, s: 1.01 },
  { x: 24, y: 20, s: 1.18 },
  { x: 36, y: 19, s: 1.14 },

  /* secondary grove */
  { x: 52, y: 34, s: .94 },
  { x: 58, y: 25, s: 1.10 },
  { x: 65, y: 36, s: .86 },
  { x: 70, y: 25, s: 1.13 },
  { x: 76, y: 33, s: .91 },
  { x: 62, y: 17, s: 1.21 },
  { x: 73, y: 17, s: 1.18 },

  /* natural outer edge */
  { x: 9,  y: 19, s: .97 },
  { x: 45, y: 19, s: 1.05 },
  { x: 82, y: 22, s: 1.02 },
  { x: 18, y: 46, s: .76 },
  { x: 48, y: 43, s: .79 },
  { x: 79, y: 42, s: .77 }

];

const NEON_GROVE_POND_ZONE = {

  left: 62,
  right: 97,

  bottom: 2,
  top: 28

};


const NEON_GROVE_LAND_SAFE_SPOTS = [

  [10, 11],
  [22, 10],
  [34, 12],
  [46, 10],
  [57, 12],

  [18, 31],
  [32, 34],
  [47, 31],
  [58, 34],

  [71, 32],
  [82, 34],
  [92, 32]

];


function neonLandscapePointInPond(
  point
) {

  if (!point) {
    return false;
  }


  return (
    point.x >=
      NEON_GROVE_POND_ZONE.left &&

    point.x <=
      NEON_GROVE_POND_ZONE.right &&

    point.y >=
      NEON_GROVE_POND_ZONE.bottom &&

    point.y <=
      NEON_GROVE_POND_ZONE.top
  );

}


function neonLandscapeProtectLandPoint(
  point,
  seed
) {

  if (
    !neonLandscapePointInPond(
      point
    )
  ) {

    return point;

  }


  const safe =
    NEON_GROVE_LAND_SAFE_SPOTS[
      Math.abs(seed) %
      NEON_GROVE_LAND_SAFE_SPOTS.length
    ];


  return Object.assign(
    {},
    point,
    {
      x: safe[0],
      y: safe[1]
    }
  );

}


function neonLandscapeAnimalSeed(
  animalId,
  index
) {

  let value = 0;

  const text =
    String(
      animalId ||
      ""
    );


  for (
    let i = 0;
    i < text.length;
    i++
  ) {

    value +=
      text.charCodeAt(i) *
      (i + 1);

  }


  return (
    value +
    index * 17
  );

}


function neonLandscapeTreeSpot(
  tree,
  index
) {

  /*
    TITAN LANDMARK PLACEMENT

    Titan Sequoias remain landmark trees, but no
    Titan is allowed to grow out of the pond.
  */

  if (
    tree.species ===
    "titan-sequoia"
  ) {

    const titanIndex =
      state.trees
        .slice(
          0,
          index
        )
        .filter(
          item =>
            item.species ===
            "titan-sequoia"
        )
        .length;


    const titanSpots = [

      {
        x: 50,
        y: 23,
        scale: 1.72
      },

      {
        x: 17,
        y: 19,
        scale: 1.55
      },

      {
        x: 84,
        y: 34,
        scale: 1.55
      }

    ];


    return (
      titanSpots[
        titanIndex %
        titanSpots.length
      ]
    );

  }


  const base =
    NEON_GROVE_LANDSCAPE_SPOTS[
      index %
      NEON_GROVE_LANDSCAPE_SPOTS.length
    ];


  const generation =
    Math.floor(
      index /
      NEON_GROVE_LANDSCAPE_SPOTS.length
    );


  const point = {

    x:
      Math.min(
        96,
        base.x +
        generation * 1.3
      ),

    y:
      base.y,

    scale:
      Math.max(
        .65,
        base.s -
        generation * .04
      )

  };


  return neonLandscapeProtectLandPoint(
    point,
    index
  );

}


function neonLandscapeFaunaSpot(
  animalId,
  index
) {

  const habitats = {

    "lumen-firefly": [
      [18, 61],
      [31, 70],
      [44, 58],
      [57, 67],
      [70, 62],
      [83, 72],
      [91, 58]
    ],

    "chrome-beetle": [
      [11, 8],
      [30, 10],
      [48, 7],
      [63, 11],
      [57, 8]
    ],

    /*
      Frogs belong beside the wetland,
      not in the middle of the pond.
    */
    "circuit-frog": [
      [60, 12],
      [88, 30],
      [63, 29]
    ],

    "circuit-finch": [
      [20, 55],
      [40, 64],
      [68, 54],
      [84, 60]
    ],

    /*
      Koi are the only current fauna that
      intentionally occupy the pond itself.
    */
    "neon-koi": [
      [70, 8],
      [76, 10],
      [82, 8],
      [87, 11],
      [79, 6]
    ],

    "glasswing-moth": [
      [29, 64],
      [51, 72],
      [76, 67]
    ],

    "echo-owl": [
      [20, 34],
      [58, 36],
      [77, 33]
    ],

    "neon-hare": [
      [25, 8],
      [47, 10],
      [91, 31]
    ],

    "phase-gecko": [
      [36, 40],
      [62, 43],
      [80, 39]
    ],

    "aurora-fox": [
      [37, 12],
      [87, 32]
    ],

    "cyber-deer": [
      [17, 14],
      [48, 16],
      [84, 34]
    ],

    "data-wisp": [
      [28, 69],
      [52, 66],
      [74, 73],
      [90, 63]
    ],

    "quantum-stag": [
      [54, 15]
    ]

  };


  const choices =
    habitats[
      animalId
    ];


  let point;


  if (
    choices &&
    choices.length
  ) {

    const selected =
      choices[
        index %
        choices.length
      ];


    point = {
      x: selected[0],
      y: selected[1]
    };

  }
  else {

    point = {

      x:
        10 +
        (
          (index * 17) %
          80
        ),

      y:
        9 +
        (
          (index * 11) %
          25
        )

    };

  }


  /*
    Aquatic exception.

    Koi are allowed inside the protected water zone.
    Everything else is automatically moved to land
    if a future coordinate accidentally overlaps it.
  */

  if (
    animalId ===
    "neon-koi"
  ) {

    return point;

  }


  return neonLandscapeProtectLandPoint(
    point,
    neonLandscapeAnimalSeed(
      animalId,
      index
    )
  );

}

function neonLandscapeFaunaScale(
  animalId
) {

  const scales = {

    "lumen-firefly": .66,
    "chrome-beetle": .76,
    "circuit-frog": .94,
    "circuit-finch": .91,
    "neon-koi": .82,
    "glasswing-moth": .84,
    "echo-owl": 1,
    "neon-hare": .97,
    "phase-gecko": .84,
    "aurora-fox": 1.1,
    "cyber-deer": 1.18,
    "data-wisp": .76,
    "quantum-stag": 1.32

  };


  return (
    scales[animalId] ||
    1
  );

}


function renderForest() {

  const forest =
    document.querySelector(
      "#forestOverview"
    );


  if (!forest) {
    return;
  }


  forest.classList.add(
    "grove-ecosystem"
  );


  forest.innerHTML = `

    <div class="eco-mist eco-mist-a"></div>
    <div class="eco-mist eco-mist-b"></div>

    <div class="eco-hill eco-hill-back"></div>
    <div class="eco-hill eco-hill-front"></div>

    <div class="eco-path"></div>

    <div class="eco-pond">

      <span class="eco-ripple eco-ripple-a">
      </span>

      <span class="eco-ripple eco-ripple-b">
      </span>

    </div>

    <div class="eco-fallen-log"></div>

    <span class="eco-rock eco-rock-a"></span>
    <span class="eco-rock eco-rock-b"></span>
    <span class="eco-rock eco-rock-c"></span>

    <span class="eco-grass eco-grass-a"></span>
    <span class="eco-grass eco-grass-b"></span>
    <span class="eco-grass eco-grass-c"></span>
    <span class="eco-grass eco-grass-d"></span>

  `;


  if (
    state.trees.length === 0
  ) {

    const empty =
      document.createElement(
        "div"
      );


    empty.id =
      "emptyGrove";

    empty.className =
      "grove-empty eco-empty";


    empty.innerHTML = `

      <span class="grove-seed">
        ◉
      </span>

      <strong>
        Your ecosystem is waiting.
      </strong>

      <span>
        Plant your first tree to begin growing Neon Grove.
      </span>

    `;


    forest.appendChild(
      empty
    );

    return;

  }


  state.trees.forEach(
    (tree, index) => {

      const slot =
        document.createElement(
          "div"
        );


      const growth =
        treeGrowthStage(tree);


      const point =
        neonLandscapeTreeSpot(
          tree,
          index
        );


      slot.className =
        "grove-tree-slot eco-tree";


      slot.style.setProperty(
        "--eco-x",
        `${point.x}%`
      );

      slot.style.setProperty(
        "--eco-y",
        `${point.y}%`
      );

      slot.style.setProperty(
        "--eco-scale",
        String(
          point.scale
        )
      );


      slot.style.zIndex =
        String(
          Math.max(
            10,
            Math.round(
              65 -
              point.y
            )
          )
        );


      const element =
        document.createElement(
          "div"
        );


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
            item.id ===
            tree.species
        );


      element.title =
        `${treeSpecies?.name || "Tree"} · ${growth.label} · ${growth.gained} XP since planting`;


      slot.appendChild(
        element
      );


      forest.appendChild(
        slot
      );

    }
  );


  fauna.forEach(
    animal => {

      const population =
        faunaPopulation(
          animal
        );


      for (
        let index = 0;
        index < population;
        index++
      ) {

        const point =
          neonLandscapeFaunaSpot(
            animal.id,
            index
          );


        const slot =
          document.createElement(
            "div"
          );


        slot.className =
          `fauna-slot fauna-${animal.id} eco-fauna`;


        slot.style.setProperty(
          "--eco-x",
          `${point.x}%`
        );

        slot.style.setProperty(
          "--eco-y",
          `${point.y}%`
        );

        slot.style.setProperty(
          "--eco-scale",
          String(
            neonLandscapeFaunaScale(
              animal.id
            )
          )
        );


        slot.style.zIndex =
          String(
            Math.max(
              12,
              Math.round(
                76 -
                point.y
              )
            )
          );


        const icon =
          document.createElement(
            "span"
          );


        icon.className =
          "fauna-icon";

        if (
          animal.id ===
          "circuit-finch"
        ) {

          icon.classList.add(
            "circuit-finch-svg-host"
          );

          icon.innerHTML = `

            <svg
              class="circuit-finch-svg"
              viewBox="0 0 64 40"
              aria-hidden="true"
              focusable="false"
            >

              <path
                class="finch-svg-tail"
                d="
                  M20 21
                  L5 14
                  L13 23
                  L4 30
                  L21 26
                  Z
                "
              ></path>

              <path
                class="finch-svg-wing finch-svg-wing-up"
                d="
                  M25 22
                  C18 13 19 5 29 1
                  C31 10 36 16 40 22
                  Z
                "
              ></path>

              <path
                class="finch-svg-wing finch-svg-wing-down"
                d="
                  M28 22
                  C23 29 26 36 35 39
                  C36 31 40 26 43 22
                  Z
                "
              ></path>

              <path
                class="finch-svg-body"
                d="
                  M18 23
                  C24 15 37 13 48 19
                  C45 25 35 28 21 27
                  Z
                "
              ></path>

              <circle
                class="finch-svg-head"
                cx="48"
                cy="18"
                r="6"
              ></circle>

              <path
                class="finch-svg-beak"
                d="
                  M53 17
                  L62 20
                  L53 22
                  Z
                "
              ></path>

              <circle
                class="finch-svg-eye"
                cx="50"
                cy="16.5"
                r="1.2"
              ></circle>

            </svg>

          `;

        }
        else {

          icon.textContent =
            animal.icon;

        }

        icon.title =
          `${animal.name} #${index + 1}`;


        slot.appendChild(
          icon
        );


        forest.appendChild(
          slot
        );

      }

    }
  );

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