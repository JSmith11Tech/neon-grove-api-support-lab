(() => {

  "use strict";

  const BANK =
    window.NEON_GROVE_MODULE_QUIZZES || {};

  const STORAGE_KEY =
    "neon-grove-module-quiz-state";

  const QUIZ_XP = 50;

  const PASS_SCORE = 4;


  function freshState() {

    return {
      passed: {},
      best: {}
    };

  }


  function loadState() {

    try {

      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (!saved) {
        return freshState();
      }


      return Object.assign(
        freshState(),
        JSON.parse(saved)
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
      return null;
    }


    const text =
      lesson.textContent || "";


    return (
      Object.keys(BANK)
        .find(
          title =>
            text.includes(title)
        ) ||
      null
    );

  }


  function escapeHtml(value) {

    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }


  function renderQuiz() {

    const lesson =
      document.querySelector(
        "#lesson"
      );


    if (!lesson) {
      return;
    }


    const existing =
      document.querySelector(
        "#moduleQuiz"
      );


    if (existing) {
      existing.remove();
    }


    const title =
      currentModuleTitle();


    if (
      !title ||
      !BANK[title]
    ) {
      return;
    }


    const questions =
      BANK[title];


    const passed =
      state.passed[title] === true;


    const best =
      Number(
        state.best[title] || 0
      );


    const panel =
      document.createElement(
        "section"
      );


    panel.id =
      "moduleQuiz";


    panel.className =
      "module-quiz";


    const questionsHtml =
      questions
        .map(
          (question, questionIndex) => {

            const choices =
              question.choices
                .map(
                  (choice, choiceIndex) => `

                    <label class="module-quiz-choice">

                      <input
                        type="radio"
                        name="moduleQuiz-${questionIndex}"
                        value="${choiceIndex}">

                      <span>
                        ${escapeHtml(choice)}
                      </span>

                    </label>

                  `
                )
                .join("");


            return `

              <fieldset
                class="module-quiz-question"
                data-question="${questionIndex}">

                <legend>
                  <span class="module-quiz-number">
                    ${questionIndex + 1}
                  </span>

                  ${escapeHtml(question.q)}
                </legend>

                <div class="module-quiz-choices">
                  ${choices}
                </div>

                <div
                  class="module-quiz-explanation"
                  aria-live="polite">
                </div>

              </fieldset>

            `;

          }
        )
        .join("");


    panel.innerHTML = `

      <div class="module-quiz-heading">

        <div>

          <p class="module-quiz-eyebrow">
            MODULE QUIZ · 5 QUESTIONS · +${QUIZ_XP} XP
          </p>

          <h2>
            Test your understanding
          </h2>

          <p>
            Pass with 4 out of 5.
            You can retake the quiz as often as you want.
            XP is awarded once.
          </p>

        </div>

        <div class="module-quiz-best">

          <span>
            BEST
          </span>

          <strong>
            ${best}/5
          </strong>

        </div>

      </div>


      ${
        passed
          ? `
            <div class="module-quiz-passed">
              ✓ Passed · ${QUIZ_XP} XP already earned
            </div>
          `
          : ""
      }


      <form id="moduleQuizForm">

        ${questionsHtml}

        <div class="module-quiz-actions">

          <div
            id="moduleQuizFeedback"
            class="module-quiz-feedback"
            aria-live="polite">
          </div>

          <button
            type="submit"
            class="primary module-quiz-submit">

            ${
              passed
                ? "Retake quiz"
                : "Submit quiz · +50 XP"
            }

          </button>

        </div>

      </form>

    `;


    const completeButton =
      document.querySelector(
        "#completeBtn"
      );


    const completionCard =
      completeButton
        ?.closest(
          "section"
        );


    if (completionCard) {

      completionCard.insertAdjacentElement(
        "beforebegin",
        panel
      );

    }
    else {

      lesson.appendChild(
        panel
      );

    }


    panel
      .querySelector(
        "#moduleQuizForm"
      )
      .addEventListener(
        "submit",
        event => {

          event.preventDefault();

          gradeQuiz(
            title,
            questions,
            panel
          );

        }
      );

  }


  function gradeQuiz(
    title,
    questions,
    panel
  ) {

    const answers = [];


    for (
      let index = 0;
      index < questions.length;
      index++
    ) {

      const selected =
        panel.querySelector(
          `input[name="moduleQuiz-${index}"]:checked`
        );


      if (!selected) {

        panel
          .querySelector(
            "#moduleQuizFeedback"
          )
          .textContent =
            "Answer all five questions before submitting.";

        panel
          .querySelector(
            `[data-question="${index}"]`
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });

        return;

      }


      answers.push(
        Number(
          selected.value
        )
      );

    }


    let score = 0;


    questions.forEach(
      (question, index) => {

        const questionElement =
          panel.querySelector(
            `[data-question="${index}"]`
          );


        const explanation =
          questionElement.querySelector(
            ".module-quiz-explanation"
          );


        const correct =
          answers[index] ===
          question.answer;


        if (correct) {
          score++;
        }


        questionElement
          .classList
          .remove(
            "quiz-answer-correct",
            "quiz-answer-wrong"
          );


        questionElement
          .classList
          .add(
            correct
              ? "quiz-answer-correct"
              : "quiz-answer-wrong"
          );


        explanation.textContent =
          (
            correct
              ? "Correct. "
              : `Correct answer: ${question.choices[question.answer]}. `
          ) +
          question.explain;

      }
    );


    const previousBest =
      Number(
        state.best[title] || 0
      );


    if (
      score > previousBest
    ) {

      state.best[title] =
        score;

    }


    const passedNow =
      score >= PASS_SCORE;


    const alreadyPassed =
      state.passed[title] === true;


    const feedback =
      panel.querySelector(
        "#moduleQuizFeedback"
      );


    if (
      passedNow &&
      !alreadyPassed
    ) {

      state.passed[title] =
        true;

      save();


      feedback.textContent =
        `${score}/5 — Passed. +${QUIZ_XP} XP added to your Grove.`;


      window.dispatchEvent(
        new CustomEvent(
          "neon-grove-module-quiz-xp-changed"
        )
      );

    }
    else if (passedNow) {

      save();

      feedback.textContent =
        `${score}/5 — Passed. XP was already collected for this module.`;

    }
    else {

      save();

      feedback.textContent =
        `${score}/5 — Review the explanations and try again. You need 4/5 to pass.`;

    }


    const bestDisplay =
      panel.querySelector(
        ".module-quiz-best strong"
      );


    if (bestDisplay) {

      bestDisplay.textContent =
        `${
          Math.max(
            score,
            previousBest
          )
        }/5`;

    }


    if (
      passedNow &&
      !panel.querySelector(
        ".module-quiz-passed"
      )
    ) {

      const passedBanner =
        document.createElement(
          "div"
        );


      passedBanner.className =
        "module-quiz-passed";


      passedBanner.textContent =
        `✓ Passed · ${QUIZ_XP} XP earned`;


      panel
        .querySelector(
          ".module-quiz-heading"
        )
        .insertAdjacentElement(
          "afterend",
          passedBanner
        );

    }

  }


  function watchLesson() {

    const lesson =
      document.querySelector(
        "#lesson"
      );


    if (!lesson) {
      return;
    }


    let pending = false;


    const observer =
      new MutationObserver(
        mutations => {

          if (
            pending ||
            mutations.every(
              mutation =>
                mutation.target.closest?.(
                  "#moduleQuiz"
                )
            )
          ) {
            return;
          }


          pending = true;


          requestAnimationFrame(
            () => {

              pending = false;

              renderQuiz();

            }
          );

        }
      );


    observer.observe(
      lesson,
      {
        childList: true
      }
    );

  }


  renderQuiz();

  watchLesson();

})();