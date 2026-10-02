(() => {

  "use strict";

  const STORAGE_KEY =
    "neon-grove-practice-state";

  const MISSION_XP = 50;


  const POSTMAN_MODULES = new Set([
    "Postman Platform & Workspaces",
    "Discover, Fork & Try APIs",
    "API Mental Model",
    "HTTP Methods",
    "URLs & Parameters",
    "Headers",
    "Request Bodies & JSON",
    "Responses & Status Codes",
    "Authentication & Authorization",
    "Variables & Environments",
    "Collections & Workflows",
    "Postman Tests",
    "API Troubleshooting",
    "Support Ticket Simulations",
    "Capstone Investigation"
  ]);


  function freshState() {

    return {
      completed: {},
      evidence: {}
    };

  }


  function loadState() {

    try {

      const raw =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (!raw) {
        return freshState();
      }

      return Object.assign(
        freshState(),
        JSON.parse(raw)
      );

    }
    catch {

      return freshState();

    }

  }


  let state =
    loadState();


  function save() {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state)
    );

  }


  function currentModuleTitle() {

    const lesson =
      document.querySelector(
        "#lesson"
      );

    if (!lesson) {
      return "";
    }


    const heading =
      lesson.querySelector(
        "h1, h2"
      );


    return heading
      ? heading.textContent.trim()
      : "";

  }


  function hashString(text) {

    let hash = 0;

    for (
      let i = 0;
      i < text.length;
      i++
    ) {

      hash =
        (
          (hash << 5) -
          hash +
          text.charCodeAt(i)
        ) | 0;

    }

    return Math.abs(hash)
      .toString(36);

  }


  function missionKey(
    moduleTitle,
    container
  ) {

    const challengeText =
      container.textContent
        .replace(
          /\s+/g,
          " "
        )
        .replace(
          /Read section/gi,
          ""
        )
        .trim();


    return (
      "mission-" +
      hashString(
        `${moduleTitle}|${challengeText}`
      )
    );

  }


  function createStep(
    number,
    text
  ) {

    return `
      <div class="practice-step">

        <span class="practice-step-number">
          ${number}
        </span>

        <span>
          ${text}
        </span>

      </div>
    `;

  }


  function enhanceChallenge() {

    const lesson =
      document.querySelector(
        "#lesson"
      );

    if (!lesson) {
      return;
    }


    const headings =
      [...lesson.querySelectorAll(
        "h2, h3, h4"
      )];


    const heading =
      headings.find(
        element =>
          element.textContent
            .trim()
            .toLowerCase() ===
          "challenge"
      );


    if (!heading) {
      return;
    }


    const challenge =
      heading.parentElement;


    if (
      !challenge ||
      challenge.dataset.practiceReady ===
        "true"
    ) {
      return;
    }


    challenge.dataset.practiceReady =
      "true";


    const moduleTitle =
      currentModuleTitle();


    const usesPostman =
      POSTMAN_MODULES.has(
        moduleTitle
      );


    const key =
      missionKey(
        moduleTitle,
        challenge
      );


    const completed =
      state.completed[key] === true;


    const workspace =
      document.createElement(
        "div"
      );


    workspace.className =
      "practice-workspace";


    const missionSteps =
      usesPostman
        ? `
          ${createStep(
            1,
            "<strong>Open Postman.</strong>"
          )}

          ${createStep(
            2,
            "Open your <strong>Neon Grove API Practice</strong> workspace and collection."
          )}

          ${createStep(
            3,
            "Complete the challenge shown directly above this mission card."
          )}

          ${createStep(
            4,
            "Inspect what was actually sent and what came back."
          )}

          ${createStep(
            5,
            "Return here and record evidence from your result."
          )}
        `
        : `
          ${createStep(
            1,
            "Complete the challenge shown above."
          )}

          ${createStep(
            2,
            "Write a short explanation showing what you concluded."
          )}

          ${createStep(
            3,
            "Submit the evidence to complete the mission."
          )}
        `;


    const placeholder =
      usesPostman
        ? "Example: Sent GET /get in Postman. Response was 200 OK. I confirmed the request method, URL, query parameters, headers, and JSON response."
        : "Write what you did and what you concluded.";


    workspace.innerHTML = `

      <div class="practice-workspace-heading">

        <div>

          <p class="practice-eyebrow">

            ${
              usesPostman
                ? "🧪 OPEN POSTMAN · HANDS-ON MISSION"
                : "🧪 HANDS-ON MISSION"
            }

            · +${MISSION_XP} XP

          </p>

          <h4>
            ${
              usesPostman
                ? "Do the work in Postman"
                : "Apply what you learned"
            }
          </h4>

        </div>

        <span class="practice-status">
          ${
            completed
              ? "✓ Complete"
              : "In progress"
          }
        </span>

      </div>


      ${
        usesPostman
          ? `
            <div class="practice-postman-callout">

              <strong>
                Reading stops here.
              </strong>

              This mission is meant to be completed in
              <strong>real Postman</strong>,
              not simulated inside Neon Grove.

            </div>
          `
          : ""
      }


      <div class="practice-steps">
        ${missionSteps}
      </div>


      <label class="practice-label">

        Evidence from your work

        <textarea
          class="practice-evidence"
          rows="5"
          placeholder="${placeholder}"
        ></textarea>

      </label>


      <div class="practice-footer">

        <span class="practice-help">
          Record at least one concrete result from the mission.
        </span>

        <button
          type="button"
          class="practice-complete-btn">

          ${
            completed
              ? "✓ Mission complete · +50 XP earned"
              : "Complete mission · +50 XP"
          }

        </button>

      </div>


      <div
        class="practice-feedback"
        aria-live="polite">
      </div>

    `;


    challenge.appendChild(
      workspace
    );


    const textarea =
      workspace.querySelector(
        ".practice-evidence"
      );


    const button =
      workspace.querySelector(
        ".practice-complete-btn"
      );


    const feedback =
      workspace.querySelector(
        ".practice-feedback"
      );


    const status =
      workspace.querySelector(
        ".practice-status"
      );


    textarea.value =
      state.evidence[key] || "";


    if (completed) {

      button.disabled = true;

      workspace.classList.add(
        "practice-complete"
      );

    }


    textarea.addEventListener(
      "input",
      () => {

        state.evidence[key] =
          textarea.value;

        save();

      }
    );


    button.addEventListener(
      "click",
      () => {

        const evidence =
          textarea.value
            .trim();


        if (
          evidence.length < 20
        ) {

          feedback.textContent =
            usesPostman
              ? "Record a concrete result from Postman first — method, status code, response value, header, parameter, or another observation."
              : "Add a little more evidence from the mission first.";

          textarea.focus();

          return;

        }


        if (
          state.completed[key] === true
        ) {
          return;
        }


        state.evidence[key] =
          evidence;


        state.completed[key] =
          true;


        save();


        workspace.classList.add(
          "practice-complete"
        );


        status.textContent =
          "✓ Complete";


        button.textContent =
          "✓ Mission complete · +50 XP earned";


        button.disabled =
          true;


        feedback.textContent =
          "+50 XP added to your Grove.";


        window.dispatchEvent(
          new CustomEvent(
            "neon-grove-practice-xp-changed"
          )
        );

      }
    );

  }


  function resetEnhancement() {

    document
      .querySelectorAll(
        "[data-practice-ready]"
      )
      .forEach(
        element => {

          delete element.dataset.practiceReady;

        }
      );

  }


  function watchLessons() {

    const lesson =
      document.querySelector(
        "#lesson"
      );


    if (!lesson) {
      return;
    }


    let lastTitle =
      currentModuleTitle();


    const observer =
      new MutationObserver(
        () => {

          const title =
            currentModuleTitle();


          if (
            title !== lastTitle
          ) {

            lastTitle =
              title;

            resetEnhancement();

          }


          requestAnimationFrame(
            enhanceChallenge
          );

        }
      );


    observer.observe(
      lesson,
      {
        childList: true,
        subtree: true
      }
    );

  }


  enhanceChallenge();

  watchLessons();

})();