(() => {

  "use strict";

  const synth = window.speechSynthesis;

  if (!synth) {
    console.warn("Browser speech synthesis is unavailable.");
    return;
  }

  let activeCard = null;
  let activeButton = null;
  let availableVoices = [];
  let observerBusy = false;

  const VOICE_KEY = "neon-grove-voice";
  const RATE_KEY = "neon-grove-speech-rate";


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
            Play any section individually
          </span>

        </div>

      </div>


      <div class="narration-controls">

        <label>

          <span>
            Voice
          </span>

          <select
            id="voiceSelect"
            aria-label="Narration voice">

            <option value="auto">
              Best natural voice
            </option>

          </select>

        </label>


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


    const savedRate =
      localStorage.getItem(
        RATE_KEY
      );

    if (savedRate) {

      const rate =
        document.querySelector(
          "#speechRate"
        );

      if (
        [...rate.options]
          .some(
            option =>
              option.value === savedRate
          )
      ) {
        rate.value =
          savedRate;
      }

    }


    document
      .querySelector("#speechRate")
      .addEventListener(
        "change",
        event => {

          localStorage.setItem(
            RATE_KEY,
            event.target.value
          );

        }
      );


    document
      .querySelector("#voiceSelect")
      .addEventListener(
        "change",
        event => {

          localStorage.setItem(
            VOICE_KEY,
            event.target.value
          );

        }
      );



    document
      .querySelector("#previewVoice")
      .addEventListener(
        "click",
        previewSelectedVoice
      );
    document
      .querySelector("#stopNarration")
      .addEventListener(
        "click",
        stopNarration
      );

  }


  // ============================================================
  // NATURAL VOICE SELECTION
  // ============================================================

  function voiceScore(voice) {

    const name =
      voice.name.toLowerCase();

    const lang =
      voice.lang.toLowerCase();


    if (
      !lang.startsWith("en")
    ) {
      return -10000;
    }


    let score = 0;


    // Strong preference for US English.
    if (
      lang === "en-us"
    ) {
      score += 500;
    }
    else {
      score += 100;
    }


    // Natural / neural engines first.
    if (
      name.includes("natural")
    ) {
      score += 1000;
    }


    if (
      name.includes("neural")
    ) {
      score += 1000;
    }


    // Google voices generally sound better than
    // older system TTS voices when available.
    if (
      name.includes("google")
    ) {
      score += 800;
    }


    // Favor common modern female US voices.
    const preferred = [
      "aria",
      "ava",
      "jenny",
      "emma",
      "michelle",
      "samantha",
      "zira",
      "female"
    ];


    preferred.forEach(
      preferredName => {

        if (
          name.includes(
            preferredName
          )
        ) {
          score += 350;
        }

      }
    );


    // De-prioritize common older robotic voices.
    const lowerPriority = [
      "david",
      "mark",
      "george"
    ];


    lowerPriority.forEach(
      oldVoice => {

        if (
          name.includes(
            oldVoice
          )
        ) {
          score -= 300;
        }

      }
    );


    return score;
  }


  function cleanVoiceName(voice) {

    let name =
      voice.name;


    name = name
      .replace(
        /Microsoft /gi,
        ""
      )
      .replace(
        / Online \(Natural\)/gi,
        " · Natural"
      )
      .replace(
        / Online/gi,
        ""
      )
      .replace(
        / Desktop/gi,
        ""
      );


    return `${name} · ${voice.lang}`;
  }


  function refreshVoices() {

    const voices =
      synth.getVoices();


    if (!voices.length) {
      return;
    }


    availableVoices =
      voices
        .filter(
          voice =>
            voice.lang
              .toLowerCase()
              .startsWith("en")
        )
        .sort(
          (a, b) =>
            voiceScore(b) -
            voiceScore(a)
        );


    const select =
      document.querySelector(
        "#voiceSelect"
      );


    if (!select) {
      return;
    }


    /*
      Keep the menu short.

      We show the six highest-ranked English voices
      actually available on this computer/browser.
    */

    const candidates =
      availableVoices
        .slice(0, 6);


    select.innerHTML = "";


    candidates.forEach(
      voice => {

        const option =
          document.createElement(
            "option"
          );


        option.value =
          voice.name;


        option.textContent =
          cleanVoiceName(
            voice
          );


        select.appendChild(
          option
        );

      }
    );


    const savedVoice =
      localStorage.getItem(
        VOICE_KEY
      );


    const savedExists =
      candidates.some(
        voice =>
          voice.name === savedVoice
      );


    if (savedExists) {

      select.value =
        savedVoice;

    }
    else if (
      candidates.length
    ) {

      select.value =
        candidates[0].name;


      localStorage.setItem(
        VOICE_KEY,
        candidates[0].name
      );

    }

  }


  function selectedVoice() {

    const selectedName =
      document
        .querySelector(
          "#voiceSelect"
        )
        ?.value;


    if (!selectedName) {

      return (
        availableVoices[0] ||
        null
      );

    }


    return (
      availableVoices.find(
        voice =>
          voice.name === selectedName
      ) ||
      availableVoices[0] ||
      null
    );

  }


  function previewSelectedVoice() {

    synth.cancel();


    const voice =
      selectedVoice();


    const preview =
      new SpeechSynthesisUtterance(
        "Hi. This is the voice I'll use throughout Neon Grove. " +
        "You can listen to any API lesson section as many times as you need."
      );


    if (voice) {

      preview.voice =
        voice;

      preview.lang =
        voice.lang || "en-US";

    }


    const rate =
      Number(
        document
          .querySelector(
            "#speechRate"
          )
          ?.value || 1
      );


    preview.rate =
      rate;


    synth.speak(
      preview
    );

  }

// ============================================================
  // SPEECH TEXT CLEANUP
  // ============================================================

  function spokenText(card) {

    const clone =
      card.cloneNode(true);


    clone
      .querySelectorAll(
        [
          ".section-read-btn",
          "button",
          ".choice-grid",
          ".action-row"
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


    // Make common technical abbreviations sound intentional.
    text = text
      .replace(
        /\bAPI\b/g,
        "A P I"
      )
      .replace(
        /\bAPIs\b/g,
        "A P I's"
      )
      .replace(
        /\bHTTP\b/g,
        "H T T P"
      )
      .replace(
        /\bHTTPS\b/g,
        "H T T P S"
      )
      .replace(
        /\bURL\b/g,
        "U R L"
      )
      .replace(
        /\bURLs\b/g,
        "U R L's"
      );


    // Make URLs less awful when read aloud.
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

  function speakCard(
    card,
    button
  ) {

    // Clicking the active card again stops it.
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
      selectedVoice();


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

      button.innerHTML =
        "■ Stop";


      const stop =
        document.querySelector(
          "#stopNarration"
        );

      if (stop) {
        stop.disabled =
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

      activeButton.innerHTML =
        "▶ Read section";

    }


    activeCard =
      null;

    activeButton =
      null;


    const stop =
      document.querySelector(
        "#stopNarration"
      );

    if (stop) {
      stop.disabled =
        true;
    }

  }


  // ============================================================
  // INDIVIDUAL SECTION BUTTONS
  // ============================================================

  function addReadButtons() {

    if (observerBusy) {
      return;
    }

    observerBusy =
      true;


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

        button.innerHTML =
          "▶ Read section";

        button.setAttribute(
          "aria-label",
          "Read this section aloud"
        );


        button.addEventListener(
          "click",
          event => {

            event.stopPropagation();

            speakCard(
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


    observerBusy =
      false;

  }


  // ============================================================
  // WATCH MODULE CHANGES
  // ============================================================

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

          if (observerBusy) {
            return;
          }

          stopNarration();
          addReadButtons();

        }
      );


    observer.observe(
      lesson,
      {
        childList: true
      }
    );

  }


  // ============================================================
  // INITIALIZE
  // ============================================================

  createToolbar();

  refreshVoices();

  addReadButtons();

  watchLessons();


  if (
    "onvoiceschanged" in synth
  ) {

    synth.addEventListener(
      "voiceschanged",
      refreshVoices
    );

  }


  // Stop narration when changing modules.
  document
    .querySelector("#moduleNav")
    ?.addEventListener(
      "click",
      stopNarration
    );


  // Stop narration if leaving/reloading.
  window.addEventListener(
    "beforeunload",
    () => synth.cancel()
  );

})();