(() => {

  "use strict";

  const STORAGE_KEY =
    "neon-grove-practice-state";

  const BOOTCAMP_KEY =
    "postman-bootcamp-v1";

  const MISSION_XP = 50;

  const TUTORIALS =
    window.NEON_GROVE_POSTMAN_TUTORIALS || {};


  function freshState() {

    return {
      completed: {},
      evidence: {},
      steps: {}
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


  /* ==========================================================
     SCREENSHOT DATABASE
     ========================================================== */

  function openEvidenceDb() {

    return new Promise(
      (resolve, reject) => {

        const request =
          indexedDB.open(
            "neon-grove-evidence",
            1
          );


        request.onupgradeneeded =
          event => {

            const db =
              event.target.result;


            if (
              !db.objectStoreNames.contains(
                "screenshots"
              )
            ) {

              db.createObjectStore(
                "screenshots"
              );

            }

          };


        request.onsuccess =
          () =>
            resolve(
              request.result
            );


        request.onerror =
          () =>
            reject(
              request.error
            );

      }
    );

  }


  async function saveScreenshot(
    key,
    blob
  ) {

    const db =
      await openEvidenceDb();


    return new Promise(
      (resolve, reject) => {

        const tx =
          db.transaction(
            "screenshots",
            "readwrite"
          );


        tx.objectStore(
          "screenshots"
        )
          .put(
            blob,
            key
          );


        tx.oncomplete =
          () => resolve();


        tx.onerror =
          () => reject(
            tx.error
          );

      }
    );

  }


  async function getScreenshot(
    key
  ) {

    const db =
      await openEvidenceDb();


    return new Promise(
      (resolve, reject) => {

        const tx =
          db.transaction(
            "screenshots",
            "readonly"
          );


        const request =
          tx.objectStore(
            "screenshots"
          )
            .get(
              key
            );


        request.onsuccess =
          () =>
            resolve(
              request.result || null
            );


        request.onerror =
          () =>
            reject(
              request.error
            );

      }
    );

  }


  async function removeScreenshot(
    key
  ) {

    const db =
      await openEvidenceDb();


    return new Promise(
      (resolve, reject) => {

        const tx =
          db.transaction(
            "screenshots",
            "readwrite"
          );


        tx.objectStore(
          "screenshots"
        )
          .delete(
            key
          );


        tx.oncomplete =
          () => resolve();


        tx.onerror =
          () => reject(
            tx.error
          );

      }
    );

  }


  /* ==========================================================
     MODULE DETECTION
     ========================================================== */

  function currentModuleTitle() {

    const lesson =
      document.querySelector(
        "#lesson"
      );


    if (!lesson) {
      return "";
    }


    const text =
      lesson.textContent || "";


    const modules =
      window.LAB_MODULES || [];


    const match =
      modules.find(
        module =>
          text.includes(
            module.title
          )
      );


    if (match) {
      return match.title;
    }


    const headings =
      [...lesson.querySelectorAll(
        "h1, h2, h3"
      )];


    for (
      const heading of headings
    ) {

      const candidate =
        heading.textContent.trim();


      if (
        TUTORIALS[candidate]
      ) {
        return candidate;
      }

    }


    return "";

  }


  function hashString(text) {

    let hash = 0;


    for (
      let index = 0;
      index < text.length;
      index++
    ) {

      hash =
        (
          (hash << 5) -
          hash +
          text.charCodeAt(index)
        ) | 0;

    }


    return Math.abs(hash)
      .toString(36);

  }


  function missionKey(
    moduleTitle,
    challenge
  ) {

    const text =
      challenge.textContent
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
      "module-" +
      hashString(
        `${moduleTitle}|${text}`
      )
    );

  }


  function escapeHtml(value) {

    return String(
      value ?? ""
    )
      .replaceAll(
        "&",
        "&amp;"
      )
      .replaceAll(
        "<",
        "&lt;"
      )
      .replaceAll(
        ">",
        "&gt;"
      )
      .replaceAll(
        '"',
        "&quot;"
      )
      .replaceAll(
        "'",
        "&#039;"
      );

  }


  function normalizedEvidence(
    key
  ) {

    const existing =
      state.evidence[key];


    if (
      !existing ||
      typeof existing !== "object"
    ) {

      return {};

    }


    return existing;

  }


  /* ==========================================================
     TUTORIAL UI
     ========================================================== */

  function renderSteps(
    config,
    key
  ) {

    const checked =
      Array.isArray(
        state.steps[key]
      )
        ? state.steps[key]
        : [];


    return config.steps
      .map(
        (step, index) => `

          <div class="guided-step">

            <label class="guided-step-check">

              <input
                type="checkbox"
                data-step-index="${index}"
                ${
                  checked[index]
                    ? "checked"
                    : ""
                }>

              <span class="guided-step-number">
                ${index + 1}
              </span>

            </label>


            <div class="guided-step-content">

              <h5>
                ${escapeHtml(step.title)}
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


  function renderEvidenceFields(
    config,
    key
  ) {

    const evidence =
      normalizedEvidence(
        key
      );


    return (
      config.evidence || []
    )
      .map(
        field => {

          const value =
            evidence[field.id] || "";


          const textarea =
            field.minLength &&
            field.minLength >= 30;


          if (textarea) {

            return `

              <label class="mission-field">

                <span>
                  ${escapeHtml(field.label)}
                </span>

                <textarea
                  rows="5"
                  data-evidence-id="${escapeHtml(field.id)}"
                  placeholder="${escapeHtml(field.placeholder || "")}"
                >${escapeHtml(value)}</textarea>

              </label>

            `;

          }


          return `

            <label class="mission-field">

              <span>
                ${escapeHtml(field.label)}
              </span>

              <input
                type="text"
                data-evidence-id="${escapeHtml(field.id)}"
                value="${escapeHtml(value)}"
                placeholder="${escapeHtml(field.placeholder || "")}">

            </label>

          `;

        }
      )
      .join("");

  }


  function validateField(
    field,
    value
  ) {

    const clean =
      String(value || "")
        .trim();


    if (!clean) {

      return {
        ok: false,
        message:
          `Complete "${field.label}" first.`
      };

    }


    if (field.expected) {

      const normalized =
        clean.toLowerCase();


      const correct =
        field.expected.some(
          expected =>
            String(expected)
              .trim()
              .toLowerCase() ===
            normalized
        );


      if (!correct) {

        return {
          ok: false,
          message:
            `"${field.label}" doesn't match the expected result yet. Check your Postman work and try again.`
        };

      }

    }


    if (
      field.acceptedContains
    ) {

      const normalized =
        clean.toLowerCase();


      const contains =
        field.acceptedContains.some(
          expected =>
            normalized.includes(
              String(expected)
                .toLowerCase()
            )
        );


      if (!contains) {

        return {
          ok: false,
          message:
            `"${field.label}" needs a little more technical detail.`
        };

      }

    }


    if (
      field.minLength &&
      clean.length <
        field.minLength
    ) {

      return {
        ok: false,
        message:
          `"${field.label}" needs a little more detail.`
      };

    }


    return {
      ok: true
    };

  }


  async function attachScreenshotUi(
    panel,
    key
  ) {

    const dropzone =
      panel.querySelector(
        ".evidence-dropzone"
      );


    const fileInput =
      panel.querySelector(
        ".evidence-file-input"
      );


    const preview =
      panel.querySelector(
        ".evidence-preview"
      );


    if (
      !dropzone ||
      !fileInput ||
      !preview
    ) {
      return;
    }


    async function displayBlob(
      blob
    ) {

      preview.innerHTML = "";


      if (!blob) {
        return;
      }


      const url =
        URL.createObjectURL(
          blob
        );


      const img =
        document.createElement(
          "img"
        );


      img.src = url;
      img.alt =
        "Saved Postman evidence screenshot";


      const remove =
        document.createElement(
          "button"
        );


      remove.type =
        "button";

      remove.className =
        "evidence-remove";

      remove.textContent =
        "Remove screenshot";


      remove.onclick =
        async () => {

          await removeScreenshot(
            key
          );

          preview.innerHTML = "";

        };


      preview.appendChild(
        img
      );

      preview.appendChild(
        remove
      );

    }


    async function handleFile(
      file
    ) {

      if (
        !file ||
        !file.type.startsWith(
          "image/"
        )
      ) {
        return;
      }


      await saveScreenshot(
        key,
        file
      );


      await displayBlob(
        file
      );

    }


    fileInput.addEventListener(
      "change",
      async () => {

        await handleFile(
          fileInput.files?.[0]
        );

      }
    );


    dropzone.addEventListener(
      "dragover",
      event => {

        event.preventDefault();

        dropzone.classList.add(
          "dragging"
        );

      }
    );


    dropzone.addEventListener(
      "dragleave",
      () => {

        dropzone.classList.remove(
          "dragging"
        );

      }
    );


    dropzone.addEventListener(
      "drop",
      async event => {

        event.preventDefault();

        dropzone.classList.remove(
          "dragging"
        );


        await handleFile(
          event.dataTransfer
            ?.files?.[0]
        );

      }
    );


    dropzone.addEventListener(
      "paste",
      async event => {

        const items =
          [...(
            event.clipboardData
              ?.items ||
            []
          )];


        const image =
          items.find(
            item =>
              item.type.startsWith(
                "image/"
              )
          );


        if (!image) {
          return;
        }


        event.preventDefault();


        await handleFile(
          image.getAsFile()
        );

      }
    );


    try {

      await displayBlob(
        await getScreenshot(
          key
        )
      );

    }
    catch {

      /* Screenshot storage is optional.
         The rest of the mission still works. */

    }

  }


  function wireMission(
    panel,
    config,
    key,
    prerequisiteKey = null
  ) {

    const fields =
      [...panel.querySelectorAll(
        "[data-evidence-id]"
      )];


    fields.forEach(
      field => {

        field.addEventListener(
          "input",
          () => {

            const evidence =
              normalizedEvidence(
                key
              );


            evidence[
              field.dataset.evidenceId
            ] =
              field.value;


            state.evidence[key] =
              evidence;


            save();

          }
        );

      }
    );


    const checks =
      [...panel.querySelectorAll(
        "[data-step-index]"
      )];


    checks.forEach(
      checkbox => {

        checkbox.addEventListener(
          "change",
          () => {

            const progress =
              Array.isArray(
                state.steps[key]
              )
                ? state.steps[key]
                : [];


            progress[
              Number(
                checkbox.dataset.stepIndex
              )
            ] =
              checkbox.checked;


            state.steps[key] =
              progress;


            save();

          }
        );

      }
    );


    const button =
      panel.querySelector(
        ".mission-submit"
      );


    const feedback =
      panel.querySelector(
        ".mission-feedback"
      );


    if (
      state.completed[key]
    ) {

      button.disabled = true;

      button.textContent =
        "✓ Mission complete · +50 XP earned";

      panel.classList.add(
        "mission-complete"
      );

    }


    button.addEventListener(
      "click",
      async () => {

        if (
          prerequisiteKey &&
          !state.completed[
            prerequisiteKey
          ]
        ) {

          feedback.textContent =
            "Complete Postman Bootcamp first.";

          return;

        }


        const evidence =
          normalizedEvidence(
            key
          );


        for (
          const field of
          config.evidence || []
        ) {

          const result =
            validateField(
              field,
              evidence[field.id]
            );


          if (!result.ok) {

            feedback.textContent =
              result.message;

            const target =
              panel.querySelector(
                `[data-evidence-id="${field.id}"]`
              );


            target?.focus();

            return;

          }

        }


        if (
          state.completed[key]
        ) {
          return;
        }


        state.completed[key] =
          true;


        save();


        button.disabled = true;

        button.textContent =
          "✓ Mission complete · +50 XP earned";


        panel.classList.add(
          "mission-complete"
        );


        feedback.textContent =
          "+50 XP added to your Grove. Mission evidence saved locally.";


        window.dispatchEvent(
          new CustomEvent(
            "neon-grove-practice-xp-changed"
          )
        );

      }
    );


    attachScreenshotUi(
      panel,
      key
    );

  }


  function createMissionPanel(
    config,
    key,
    options = {}
  ) {

    const panel =
      document.createElement(
        "section"
      );


    panel.className =
      "guided-mission";


    const completed =
      state.completed[key] === true;


    panel.innerHTML = `

      <div class="guided-mission-header">

        <div>

          <p class="guided-kicker">
            ${
              options.bootcamp
                ? "🎓 POSTMAN BOOTCAMP"
                : "🧪 GUIDED POSTMAN LAB"
            }
            · +${MISSION_XP} XP
          </p>

          <h3>
            ${escapeHtml(config.title)}
          </h3>

          <p>
            ${escapeHtml(config.intro)}
          </p>

        </div>

        <span class="guided-status">
          ${
            completed
              ? "✓ Complete"
              : "In progress"
          }
        </span>

      </div>


      <div class="guided-example-banner">

        <strong>
          Follow the example first.
        </strong>

        Do not try to guess the interface.
        Complete these steps in order.

      </div>


      <div class="guided-steps">

        ${renderSteps(
          config,
          key
        )}

      </div>


      <div class="your-turn-banner">

        <strong>
          YOUR TURN
        </strong>

        Finish the exercise in Postman,
        then submit the results below.

      </div>


      <div class="mission-evidence">

        <h4>
          Mission Evidence
        </h4>


        <div class="mission-fields">

          ${renderEvidenceFields(
            config,
            key
          )}

        </div>


        <div
          class="evidence-dropzone"
          tabindex="0">

          <strong>
            📎 Screenshot evidence
          </strong>

          <span>
            Drag an image here, click to choose one,
            or click this box and press Ctrl+V
            after taking a screenshot.
          </span>

          <input
            class="evidence-file-input"
            type="file"
            accept="image/*">

        </div>


        <div class="evidence-preview">
        </div>


        <p class="evidence-storage-note">

          Screenshots stay on this computer in your browser's local storage database.
          They are not uploaded to GitHub.

        </p>


        <div class="mission-submit-row">

          <div
            class="mission-feedback"
            aria-live="polite">
          </div>

          <button
            type="button"
            class="mission-submit">

            ${
              completed
                ? "✓ Mission complete · +50 XP earned"
                : "Submit mission · +50 XP"
            }

          </button>

        </div>

      </div>

    `;


    const dropzone =
      panel.querySelector(
        ".evidence-dropzone"
      );


    dropzone.addEventListener(
      "click",
      event => {

        if (
          event.target
            .classList
            .contains(
              "evidence-file-input"
            )
        ) {
          return;
        }


        panel
          .querySelector(
            ".evidence-file-input"
          )
          .click();

      }
    );


    wireMission(
      panel,
      config,
      key,
      options.prerequisiteKey || null
    );


    return panel;

  }


  /* ==========================================================
     ATTACH TO LESSON
     ========================================================== */

  function enhanceChallenge() {

    const lesson =
      document.querySelector(
        "#lesson"
      );


    if (!lesson) {
      return;
    }
    /*
      The lesson renderer creates:

      <div class="challenge">
        <strong>Challenge</strong>
        <span>...</span>
      </div>

      So mount directly to the .challenge element.
    */
    const challenge =
      lesson.querySelector(
        ".challenge"
      );


    if (!challenge) {
      return;
    }


    if (
      !challenge ||
      challenge.dataset.trainingReady ===
        "true"
    ) {
      return;
    }


    challenge.dataset.trainingReady =
      "true";


    const moduleTitle =
      currentModuleTitle();


    const tutorial =
      TUTORIALS[moduleTitle];


    /*
      Modules that don't need Postman still keep the
      existing challenge card. We only replace the
      hands-on workspace for modules with a tutorial.
    */
    if (!tutorial) {
      return;
    }


    challenge
      .querySelectorAll(
        ".practice-workspace"
      )
      .forEach(
        old =>
          old.remove()
      );


    const trainingArea =
      document.createElement(
        "div"
      );


    trainingArea.className =
      "postman-training-area";


    if (
      !state.completed[
        BOOTCAMP_KEY
      ]
    ) {

      const bootcamp =
        createMissionPanel(
          TUTORIALS.bootcamp,
          BOOTCAMP_KEY,
          {
            bootcamp: true
          }
        );


      trainingArea.appendChild(
        bootcamp
      );


      const gate =
        document.createElement(
          "div"
        );


      gate.className =
        "training-gate";


      gate.innerHTML = `

        <strong>
          🔒 Module mission unlocks after Bootcamp
        </strong>

        <span>
          Finish your first guided Postman request above.
          Then this module's hands-on exercise is ready.
        </span>

      `;


      trainingArea.appendChild(
        gate
      );

    }
    else {

      const completedBootcamp =
        document.createElement(
          "div"
        );


      completedBootcamp.className =
        "bootcamp-complete-banner";


      completedBootcamp.innerHTML = `

        <strong>
          ✓ Postman Bootcamp complete
        </strong>

        <span>
          You know how to create, send, inspect,
          and save a basic request.
        </span>

      `;


      trainingArea.appendChild(
        completedBootcamp
      );

    }


    const missionKeyValue =
      missionKey(
        moduleTitle,
        challenge
      );


    const modulePanel =
      createMissionPanel(
        tutorial,
        missionKeyValue,
        {
          prerequisiteKey:
            BOOTCAMP_KEY
        }
      );


    trainingArea.appendChild(
      modulePanel
    );


    challenge.appendChild(
      trainingArea
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
        mutations => {

          const meaningful =
            mutations.some(
              mutation =>
                !mutation.target
                  .closest?.(
                    ".postman-training-area"
                  )
            );


          if (!meaningful) {
            return;
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