(() => {

  "use strict";

  const synth = window.speechSynthesis;

  if (!synth) {
    console.warn("Speech synthesis is not available in this browser.");
    return;
  }

  const VOICE_NAME = "Google US English";
  const RATE_KEY = "neon-grove-speech-rate";

  let activeCard = null;
  let activeButton = null;
  let voices = [];


  // ============================================================
  // VOICE
  // ============================================================

  function refreshVoices() {

    voices = synth.getVoices();

  }


  function getNarrationVoice() {

    // Exact hardcoded voice first.
    const exact =
      voices.find(
        voice =>
          voice.name === VOICE_NAME
      );

    if (exact) {
      return exact;
    }


    // Safe fallback: another Google US voice.
    const googleUs =
      voices.find(
        voice =>
          voice.lang === "en-US" &&
          voice.name
            .toLowerCase()
            .includes("google")
      );

    if (googleUs) {
      return googleUs;
    }


    // Final fallback: any US English voice.
    return (
      voices.find(
        voice =>
          voice.lang === "en-US"
      ) ||
      null
    );

  }


  // ============================================================
  // TOOLBAR
  // ============================================================

  function createToolbar() {

    if (
      document.querySelector(
        "#narrationToolbar"
      )
    ) {
      return;
    }


    const content =
      document.querySelector(
        ".content"
      );

    if (!content) {
      return;
    }


    const toolbar =
      document.createElement(
        "section"
      );

    toolbar.id =
      "narrationToolbar";

    toolbar.className =
      "narration-toolbar";


    toolbar.innerHTML = `

      <div class="narration-title">

        <span class="narration-icon">
          ◉
        </span>

        <div>

          <strong>
            Read Along
          </strong>

          <span>
            Google US English · play any section individually
          </span>

        </div>

      </div>


      <div class="narration-controls">

        <label>

          <span>
            Speed
          </span>

          <select
            id="speechRate"
            aria-label="Narration speed">

            <option value="1">
              1.0×
            </option>

            <option value="1.1">
              1.1×
            </option>

            <option value="1.2">
              1.2×
            </option>

            <option value="1.3">
              1.3×
            </option>

          </select>

        </label>


        <button
          id="stopNarration"
          class="narration-stop"
          type="button"
          disabled>

          ■ Stop

        </button>

      </div>

    `;


    content.insertBefore(
      toolbar,
      content.firstChild
    );


    const rate =
      document.querySelector(
        "#speechRate"
      );


    const savedRate =
      localStorage.getItem(
        RATE_KEY
      );


    if (
      savedRate &&
      [...rate.options]
        .some(
          option =>
            option.value === savedRate
        )
    ) {
      rate.value =
        savedRate;
    }


    rate.addEventListener(
      "change",
      () => {

        localStorage.setItem(
          RATE_KEY,
          rate.value
        );

      }
    );


    document
      .querySelector(
        "#stopNarration"
      )
      .addEventListener(
        "click",
        stopNarration
      );

  }


  // ============================================================
  // TEXT CLEANUP
  // ============================================================

  function spokenText(card) {

    const clone =
      card.cloneNode(true);


    clone
      .querySelectorAll(
        [
          ".section-read-btn",
          ".choice-grid",
          ".action-row",
          "button"
        ].join(",")
      )
      .forEach(
        element =>
          element.remove()
      );


    let text =
      clone.textContent
        .replace(
          /\s+/g,
          " "
        )
        .trim();


    /*
      Make technical terms easier for TTS.
    */

    text = text
      .replace(
        /\bAPIs\b/g,
        "A P I's"
      )
      .replace(
        /\bAPI\b/g,
        "A P I"
      )
      .replace(
        /\bHTTPS\b/g,
        "H T T P S"
      )
      .replace(
        /\bHTTP\b/g,
        "H T T P"
      )
      .replace(
        /\bURLs\b/g,
        "U R L's"
      )
      .replace(
        /\bURL\b/g,
        "U R L"
      )
      .replace(
        /\bJSON\b/g,
        "J S O N"
      );


    /*
      Stop the voice from mangling URLs.
    */

    text = text.replace(
      /https?:\/\/[^\s]+/gi,
      url => {

        return url
          .replace(
            /^https:\/\//i,
            "H T T P S, "
          )
          .replace(
            /^http:\/\//i,
            "H T T P, "
          )
          .replace(
            /\./g,
            " dot "
          )
          .replace(
            /\//g,
            " slash "
          );

      }
    );


    return text;

  }


  // ============================================================
  // PLAYBACK
  // ============================================================

  function speakSection(
    card,
    button
  ) {

    /*
      Clicking the same active section
      acts like Stop.
    */

    if (
      activeCard === card &&
      synth.speaking
    ) {

      stopNarration();
      return;

    }


    stopNarration();


    const text =
      spokenText(card);


    if (!text) {
      return;
    }


    const utterance =
      new SpeechSynthesisUtterance(
        text
      );


    const voice =
      getNarrationVoice();


    if (voice) {

      utterance.voice =
        voice;

      utterance.lang =
        voice.lang || "en-US";

    }
    else {

      utterance.lang =
        "en-US";

    }


    const rate =
      Number(
        document
          .querySelector(
            "#speechRate"
          )
          ?.value || 1
      );


    utterance.rate =
      rate;

    utterance.pitch =
      1;


    activeCard =
      card;

    activeButton =
      button;


    utterance.onstart = () => {

      card.classList.add(
        "is-speaking"
      );


      button.classList.add(
        "is-speaking"
      );


      button.textContent =
        "■ Stop";


      const globalStop =
        document.querySelector(
          "#stopNarration"
        );


      if (globalStop) {
        globalStop.disabled =
          false;
      }

    };


    utterance.onend =
      clearSpeakingState;


    utterance.onerror =
      clearSpeakingState;


    synth.speak(
      utterance
    );

  }


  function stopNarration() {

    synth.cancel();

    clearSpeakingState();

  }


  function clearSpeakingState() {

    if (activeCard) {

      activeCard.classList.remove(
        "is-speaking"
      );

    }


    if (activeButton) {

      activeButton.classList.remove(
        "is-speaking"
      );


      activeButton.textContent =
        "▶ Read section";

    }


    activeCard =
      null;

    activeButton =
      null;


    const globalStop =
      document.querySelector(
        "#stopNarration"
      );


    if (globalStop) {

      globalStop.disabled =
        true;

    }

  }


  // ============================================================
  // SECTION BUTTONS
  // ============================================================

  function addReadButtons() {

    const cards =
      document.querySelectorAll(
        [
          "#lesson .card:not(.module-complete)",
          "#lesson .quiz",
          "#lesson .ticket"
        ].join(",")
      );


    cards.forEach(
      card => {

        if (
          card.querySelector(
            ":scope > .section-read-btn"
          )
        ) {
          return;
        }


        const button =
          document.createElement(
            "button"
          );


        button.type =
          "button";


        button.className =
          "section-read-btn";


        button.textContent =
          "▶ Read section";


        button.setAttribute(
          "aria-label",
          "Read this section aloud"
        );


        button.addEventListener(
          "click",
          event => {

            event.stopPropagation();

            speakSection(
              card,
              button
            );

          }
        );


        card.prepend(
          button
        );

      }
    );

  }


  // ============================================================
  // WATCH MODULE CHANGES
  // ============================================================

  function watchLessonChanges() {

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

          stopNarration();

          addReadButtons();

        }
      );


    /*
      Watch direct module rerenders only.
      Adding buttons inside cards will not
      trigger an endless loop.
    */

    observer.observe(
      lesson,
      {
        childList: true,
        subtree: false
      }
    );

  }


  // ============================================================
  // INITIALIZE
  // ============================================================

  createToolbar();

  refreshVoices();

  addReadButtons();

  watchLessonChanges();


  synth.addEventListener?.(
    "voiceschanged",
    refreshVoices
  );


  /*
    Chrome sometimes loads voices slightly late.
  */

  setTimeout(
    refreshVoices,
    250
  );


  document
    .querySelector(
      "#moduleNav"
    )
    ?.addEventListener(
      "click",
      stopNarration
    );


  window.addEventListener(
    "beforeunload",
    () => synth.cancel()
  );

})();