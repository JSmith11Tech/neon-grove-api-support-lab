(() => {

  "use strict";

  const STORAGE_KEY =
    "neon-grove-practice-state";

  const MISSION_XP = 50;


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


  function missionKey(container) {

    const text =
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

    return "mission-" +
      hashString(text);

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


    const key =
      missionKey(
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


    workspace.innerHTML = `

      <div class="practice-workspace-heading">

        <div>

          <p class="practice-eyebrow">
            🧪 PRACTICE WORKSPACE · +${MISSION_XP} XP
          </p>

          <h4>
            Record your hands-on evidence
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


      <p class="practice-instructions">

        Do the challenge in
        <strong>Postman</strong>,
        then record what you actually did or observed.

        A short answer is enough.

      </p>


      <label class="practice-label">

        What did you do / find?

        <textarea
          class="practice-evidence"
          rows="4"
          placeholder="Example: GET retrieved the customer record. POST created a new resource. PATCH changed one field. DELETE removed the resource."
        ></textarea>

      </label>


      <div class="practice-footer">

        <span class="practice-help">
          Minimum 12 characters of evidence
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
          evidence.length < 12
        ) {

          feedback.textContent =
            "Add a little evidence from what you did in Postman first.";

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


  function watchLessons() {

    const lesson =
      document.querySelector(
        "#lesson"
      );


    if (!lesson) {
      return;
    }


    const observer =
      new MutationObserver(
        () => {

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