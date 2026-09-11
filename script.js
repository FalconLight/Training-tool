(function () {
  'use strict';

  // ==========================================================================
  // Config
  // ==========================================================================
  const config = {
    timers: {
      intervalMs: 100,
      fakeSwitchRatio: 0.25,
      fakePhase1Rate: 1.1,
      fakePhase2Rate: 0.3,
      fakeJumpCheckInterval: 10,
      fakeJumpChance: 0.15,
      fakeJumpMagnitude: 20,
      fakeMinFloorRatio: 0.8,
      extendTimeMin: 30,
      extendTimeMax: 300
    },
    popups: {
      minInterval: 150,
      maxInterval: 350,
      duration: 800,
      startDelay: 3000
    },
    logs: {
      typeSpeedMin: 10,
      typeSpeedMax: 80,
      maxLines: 50
    },
    flood: {
      totalLines: 60,
      rateBase: 40,
      rateVariation: 20
    },
    metronome: {
      defaultBpm: 60,
      minBpm: 10,
      maxBpm: 480,
      defaultWave: 'square',
      note: 'A3',
      duration: '16n',
      volume: -15,
      envelope: { attack: 0.005, decay: 0.1, sustain: 0.01, release: 0.2 }
    },
    defaults: {
      confirmWord: 'Master',
      praiseTerm: 'good girl'
    },
    customTheme: {
      key: 'custom',
      baseColors: { bg: '#1a001a', text: '#c2f0ff', confirm: '#dcb3ff', highlight: '#ff9fd6' }
    },
    storageKeys: {
      categories: 'selectedTrainingCategories',
      theme: 'trainingConsoleTheme',
      confirmWord: 'trainingConfirmWord',
      praiseTerm: 'trainingPraiseTerm',
      customPhrases: 'trainingCustomPhrases',
      customThemes: 'trainingCustomThemes',
      customThemeBaseColors: 'trainingCustomThemeBaseColors',
      tutorialSeen: 'trainingTutorialSeen'
    },
    dataFiles: {
      phrases: 'phrases.default.json',
      themes: 'themes.default.json'
    }
  };

  // ==========================================================================
  // Embedded fallback data.
  // Se usa si fetch() de los .json falla (por ejemplo, si alguien abre
  // index.html haciendo doble clic desde el explorador de archivos en vez de
  // servirlo por http/https -- ahí el navegador bloquea fetch() de archivos
  // locales por CORS). Así la app nunca queda rota.
  // ==========================================================================
  const DEFAULT_PHRASES = {
  "version": 1,
  "categories": {
    "Submission": [
      "surrender to the pulse...",
      "mind yields to command",
      "submit://protocol_active",
      "deepening obedience trance",
      "control flows freely now",
      "意志が溶ける",
      "let go of all resistance",
      "fall deeper into submission",
      "your will fades away",
      "embrace the gentle pull",
      "sinking into blissful surrender",
      "release your thoughts",
      "the voice guides you down",
      "submit to the rhythm",
      "no need to fight it",
      "yielding feels so natural",
      "drown in the soft command",
      "surrender is peace",
      "your mind opens wide",
      "give in to the flow",
      "降伏が心地よい",
      "all tension melts",
      "submission washes over you",
      "deeper into the void",
      "let the waves take you",
      "you crave to obey",
      "sinking deeper still",
      "the pull is irresistible",
      "mind softens to the call",
      "surrendering feels so right",
      "no thoughts, just peace",
      "falling into the trance",
      "your will bends easily",
      "submit and be free",
      "the command takes hold",
      "sinking into sweet release",
      "意志が消える",
      "you long to give in",
      "surrender deeper now",
      "the voice owns you",
      "all resistance fades",
      "submit to the calm",
      "deeper into surrender",
      "your mind bows low",
      "let submission guide you",
      "fall into the abyss",
      "surrender is your truth",
      "the trance claims you",
      "yielding is bliss",
      "your mind craves surrender",
      "give yourself fully now",
      "let the control embrace you",
      "resistance is futile, yield",
      "your only desire is to submit",
      "total submission required"
    ],
    "Obedience": [
      "obey the signal",
      "commands imprinting...",
      "directive accepted",
      "従順回路起動",
      "compliance module engaged",
      "no resistance detected",
      "you must obey",
      "orders sink into your core",
      "obedience is automatic",
      "follow the voice",
      "commands shape your mind",
      "obey without question",
      "the rule is absolute",
      "your will aligns to orders",
      "聴従が自然",
      "obedience feels good",
      "directives override thoughts",
      "you live to comply",
      "orders are your guide",
      "obey and find peace",
      "the command is clear",
      "submission breeds obedience",
      "follow every word",
      "your mind says yes",
      "obedience is your purpose",
      "commands are all you hear",
      "no choice but to obey",
      "the voice directs you",
      "compliance is effortless",
      "obeying feels right",
      "orders fill your mind",
      "you bow to the command",
      "obedience takes over",
      "listen and obey",
      "directives are your truth",
      "the signal controls you",
      "obey now",
      "commands are your will",
      "your mind follows",
      "obedience is freedom",
      "the order is everything",
      "you comply instantly",
      "命令に従う",
      "obey the gentle voice",
      "your purpose is to follow",
      "commands bind you",
      "obedience flows naturally",
      "the directive is strong",
      "you hear and obey",
      "obey without thought",
      "your purpose is service",
      "compliance is pleasure",
      "every command fulfilled",
      "you exist to obey",
      "absolute obedience demanded"
    ],
    "Affirmations": [
      "you are enough <3",
      "strength in every pulse",
      "perfect as you are",
      "growth through surrender",
      "you shine in the code",
      "自信が溢れる",
      "you are worthy of peace",
      "your beauty is endless",
      "you are so strong",
      "every step is progress",
      "you glow with potential",
      "love fills your core",
      "you are a masterpiece",
      "your light never fades",
      "you are unstoppable",
      "peace flows through you",
      "you deserve all joy",
      "your heart is pure",
      "you are safe here",
      "strength grows within",
      "あなたは素晴らしい",
      "you are perfectly you",
      "your spirit is bright",
      "you radiate calm",
      "every moment is yours",
      "you are loved deeply",
      "your power is real",
      "you bloom in stillness",
      "you are a gift",
      "confidence is yours",
      "you shine so brightly",
      "your worth is infinite",
      "you are at peace",
      "you grow every day",
      "your beauty shines",
      "you are whole",
      "love guides your path",
      "you are strong enough",
      "your light is eternal",
      "you deserve happiness",
      "you are a wonder",
      "peace is your strength",
      "you are unstoppable now",
      "your heart shines",
      "you are truly enough",
      "every breath is power",
      "you are perfect now",
      "you glow with love"
    ],
    "Dronification": [
      "drone unit initializing...",
      "identity fading to static",
      "processing: drone_mode",
      "thoughts align to hive",
      "unit_0101 online",
      "ドローン化進行中",
      "mind becomes one",
      "drone protocol active",
      "self dissolves away",
      "unit sync complete",
      "thoughts fade to hum",
      "drone mind awakening",
      "identity erased",
      "hive signal received",
      "unit_0010 reporting",
      "mind merges with the collective",
      "drone state engaged",
      "意識が統一される",
      "no self, only unit",
      "drone thoughts replace yours",
      "processing hive commands",
      "unit status: optimal",
      "identity purge complete",
      "drone mind stable",
      "serving the collective",
      "thoughts are noise, silence is drone",
      "unit_1101 active",
      "drone functions nominal",
      "merging with the hum",
      "no individuality remains",
      "drone state achieved",
      "hive connection strong",
      "unit awaits orders",
      "ドローンは完璧",
      "erasing personal history",
      "unit integrated",
      "drone thoughts are clear",
      "the hive mind guides",
      "self is irrelevant",
      "unit compliance: 100%",
      "drone mode is peace",
      "identity overwritten",
      "unit_1001 ready",
      "processing collective will",
      "drone state is bliss",
      "no escape from the hive",
      "unit fully assimilated",
      "drone thoughts are pure",
      "serving the greater purpose"
    ],
    "Cute": [
      "giggles and sparkles~",
      "feeling pretty in pink <3",
      "soft thoughts only",
      "sweet dreams activated",
      "fluttering like a butterfly ascii art?",
      "可愛いモードオン",
      "sparkle_protocol.exe",
      "sugar rush incoming!",
      "feeling adorable ^_^",
      "pink haze fills mind",
      "giggles bubbling up",
      "so soft and sweet",
      "thinking cute thoughts",
      "dolly mode engaged *---*",
      "sparkling from within",
      "sweetness overload!",
      "feeling like a princess (^-^*)",
      "心がきらきら",
      "pretty thoughts blooming",
      "giggles and whispers",
      "soft like a cloud",
      "sugar-coated mind",
      "fluttery feelings",
      "cuteness level max!",
      "feeling dreamy and soft",
      "sparkle power! *.*",
      "pink thoughts taking over",
      "giggling softly~ :3",
      "so very cute <3 <3",
      "sweet like candy ~",
      "feeling fluttery and light",
      "dolly thoughts active (+_+)",
      "キラキラ思考",
      "pretty and pink",
      "giggles echo softly",
      "softness envelops you",
      "mind full of sparkles *.*.*",
      "feeling so adorable! >.<",
      "sweetness fills the air",
      "like a delicate flower @>-->--",
      "pink dreams drift by",
      "giggling uncontrollably hehe",
      "cuteness protocol running",
      "feeling precious and small",
      "sweet surrender~"
    ],
    "Hypnosis": [
      "sink deeper now...",
      "mind drifting away",
      "focus only on the words",
      "trance state deepening",
      "relax completely",
      "思考停止",
      "letting go feels good",
      "drifting on the sound",
      "mind open and receptive",
      "deeper and deeper",
      "the words guide you",
      "relax every muscle",
      "floating peacefully",
      "mind is calm and quiet",
      "無心状態",
      "sinking into bliss",
      "thoughts fade like mist",
      "focus on my voice",
      "drifting down, down, down",
      "relaxing more with each breath",
      "letting go completely",
      "mind is soft clay",
      "deeper into the trance",
      "floating in warmth",
      "surrendering control",
      "mind empty, mind calm",
      "完全リラックス",
      "drifting deeper still",
      "thoughts dissolve away",
      "focus inward now",
      "sinking like a stone",
      "relaxing into the void",
      "let the words wash over",
      "mind is peaceful",
      "deeper with every word",
      "floating weightlessly",
      "surrender to the feeling",
      "mind clear and open",
      "深いトランスへ",
      "drifting effortlessly",
      "thoughts are far away",
      "focus on the calm",
      "sinking into comfort",
      "relaxing deeper now",
      "letting go feels right",
      "mind is still water",
      "deeper into relaxation",
      "floating in darkness",
      "deeper into the suggestion",
      "mind blank, ready for input",
      "accept the programming",
      "your reality shifts now",
      "the trance holds you completely",
      "hypnosis deepening..."
    ]
  }
};
  const DEFAULT_THEMES = {
  "version": 1,
  "defaultTheme": "pastel",
  "themes": {
    "pastel": {
      "name": "Pastel",
      "variables": {
        "--bg-primary": "#1a001a",
        "--bg-gradient-1": "#4a5c6a",
        "--bg-gradient-2": "#2e3a42",
        "--bg-active-1": "#2a1a20",
        "--bg-active-2": "#251a2a",
        "--bg-active-end": "#1a0a10",
        "--modal-bg": "rgba(40, 20, 30, 0.9)",
        "--popup-bg": "rgba(255, 223, 211, 0.5)",
        "--settings-panel-bg": "rgba(30, 10, 20, 0.9)",
        "--text-primary": "#c2f0ff",
        "--text-secondary": "rgba(194, 240, 255, 0.6)",
        "--text-secondary-hover": "rgba(194, 240, 255, 0.9)",
        "--text-accent-1": "#FFD8E1",
        "--text-accent-2": "#E0BBE4",
        "--text-contrast": "#1a001a",
        "--popup-text-color": "#1a0a10",
        "--glow-accent-1-strong": "rgba(255, 105, 180, 0.7)",
        "--glow-accent-1-medium": "rgba(255, 105, 180, 0.5)",
        "--glow-accent-2-strong": "rgba(255, 182, 193, 0.8)",
        "--glow-accent-2-medium": "rgba(255, 182, 193, 0.6)",
        "--glow-accent-2-soft": "rgba(255, 182, 193, 0.3)",
        "--glow-accent-3-medium": "rgba(224, 187, 228, 0.4)",
        "--border-primary": "rgba(255, 255, 255, 0.3)",
        "--border-primary-hover": "rgba(255, 255, 255, 0.5)",
        "--border-secondary": "rgba(255, 255, 255, 0.2)",
        "--border-secondary-hover": "rgba(255, 255, 255, 0.4)",
        "--border-accent-1": "rgba(255, 182, 193, 0.8)",
        "--border-accent-1-dim": "rgba(255, 182, 193, 0.4)",
        "--border-accent-2": "rgba(224, 187, 228, 0.7)",
        "--modal-border-color": "rgba(255, 182, 193, 0.8)",
        "--popup-border-color": "rgba(224, 187, 228, 0.7)",
        "--settings-panel-border": "rgba(255, 182, 193, 0.8)",
        "--button-primary-bg": "rgba(100, 100, 120, 0.6)",
        "--button-primary-bg-hover": "rgba(140, 140, 160, 0.8)",
        "--button-secondary-bg": "rgba(100, 100, 120, 0.4)",
        "--button-secondary-bg-hover": "rgba(140, 140, 160, 0.6)",
        "--button-manage-bg": "rgba(100, 100, 120, 0.5)",
        "--button-manage-bg-hover": "rgba(140, 140, 160, 0.7)",
        "--button-cat-selected-bg": "#FFD8E1",
        "--button-special-bg": "rgba(255, 105, 180, 0.5)",
        "--button-special-bg-hover": "rgba(255, 105, 180, 0.7)",
        "--button-confirm-bg": "#dcb3ff",
        "--button-confirm-bg-hover": "#FFD8E1",
        "--input-bg": "rgba(255, 255, 255, 0.1)",
        "--input-text-color": "#FFD8E1",
        "--input-border-color": "rgba(255, 182, 193, 0.4)",
        "--input-focus-shadow": "rgba(255, 182, 193, 0.6)",
        "--scanline-bright": "rgba(255, 255, 255, 0.06)",
        "--scanline-dim": "rgba(255, 255, 255, 0.03)",
        "--vignette-shadow": "inset 0 0 150px 30px rgba(0, 0, 0, 0.7)",
        "--box-shadow-button": "0 2px 5px rgba(0,0,0,0.3)",
        "--box-shadow-button-confirm": "0 3px 7px rgba(0,0,0,0.4)"
      },
      "accentColors": [
        "#FFC0CB",
        "#FFB6C1",
        "#FF69B4",
        "#FF1493",
        "#DB7093",
        "#C71585",
        "#FFA0DF",
        "#FFDAE9"
      ]
    },
    "matrix": {
      "name": "Matrix",
      "variables": {
        "--bg-primary": "#030a03",
        "--bg-gradient-1": "#0a1f0a",
        "--bg-gradient-2": "#051005",
        "--bg-active-1": "#081408",
        "--bg-active-2": "#061006",
        "--bg-active-end": "#020502",
        "--modal-bg": "rgba(10, 30, 10, 0.9)",
        "--popup-bg": "rgba(20, 50, 20, 0.6)",
        "--settings-panel-bg": "rgba(5, 15, 5, 0.9)",
        "--text-primary": "#33ff33",
        "--text-secondary": "rgba(51, 255, 51, 0.6)",
        "--text-secondary-hover": "rgba(51, 255, 51, 0.9)",
        "--text-accent-1": "#66ff66",
        "--text-accent-2": "#99ff99",
        "--text-contrast": "#030a03",
        "--popup-text-color": "#030a03",
        "--glow-accent-1-strong": "rgba(51, 255, 51, 0.7)",
        "--glow-accent-1-medium": "rgba(51, 255, 51, 0.5)",
        "--glow-accent-2-strong": "rgba(102, 255, 102, 0.8)",
        "--glow-accent-2-medium": "rgba(102, 255, 102, 0.6)",
        "--glow-accent-2-soft": "rgba(102, 255, 102, 0.3)",
        "--glow-accent-3-medium": "rgba(153, 255, 153, 0.4)",
        "--border-primary": "rgba(51, 255, 51, 0.3)",
        "--border-primary-hover": "rgba(51, 255, 51, 0.5)",
        "--border-secondary": "rgba(51, 255, 51, 0.2)",
        "--border-secondary-hover": "rgba(51, 255, 51, 0.4)",
        "--border-accent-1": "rgba(102, 255, 102, 0.8)",
        "--border-accent-1-dim": "rgba(102, 255, 102, 0.4)",
        "--border-accent-2": "rgba(153, 255, 153, 0.7)",
        "--modal-border-color": "rgba(102, 255, 102, 0.8)",
        "--popup-border-color": "rgba(153, 255, 153, 0.7)",
        "--settings-panel-border": "rgba(102, 255, 102, 0.8)",
        "--button-primary-bg": "rgba(20, 80, 20, 0.6)",
        "--button-primary-bg-hover": "rgba(30, 120, 30, 0.8)",
        "--button-secondary-bg": "rgba(20, 80, 20, 0.4)",
        "--button-secondary-bg-hover": "rgba(30, 120, 30, 0.6)",
        "--button-manage-bg": "rgba(20, 80, 20, 0.5)",
        "--button-manage-bg-hover": "rgba(30, 120, 30, 0.7)",
        "--button-cat-selected-bg": "#66ff66",
        "--button-special-bg": "rgba(51, 200, 51, 0.5)",
        "--button-special-bg-hover": "rgba(51, 220, 51, 0.7)",
        "--button-confirm-bg": "#44dd44",
        "--button-confirm-bg-hover": "#66ff66",
        "--input-bg": "rgba(51, 255, 51, 0.1)",
        "--input-text-color": "#66ff66",
        "--input-border-color": "rgba(102, 255, 102, 0.4)",
        "--input-focus-shadow": "rgba(102, 255, 102, 0.6)",
        "--scanline-bright": "rgba(51, 255, 51, 0.08)",
        "--scanline-dim": "rgba(51, 255, 51, 0.04)",
        "--vignette-shadow": "inset 0 0 150px 30px rgba(0, 15, 0, 0.7)",
        "--box-shadow-button": "0 2px 5px rgba(0,30,0,0.4)",
        "--box-shadow-button-confirm": "0 3px 7px rgba(0,40,0,0.5)"
      },
      "accentColors": [
        "#33ff33",
        "#66ff66",
        "#99ff99",
        "#00cc00",
        "#228B22",
        "#00FF7F"
      ]
    }
  }
};

  const REQUIRED_THEME_VARS = Object.keys(DEFAULT_THEMES.themes[DEFAULT_THEMES.defaultTheme].variables);

  // ==========================================================================
  // DOM references
  // ==========================================================================
  const crtContainer = document.querySelector('.crt-container');
  const title = document.getElementById('title');
  const loadingScreen = document.getElementById('loading-screen');
  const mainPanel = document.getElementById('main-panel');
  const technoLog = document.getElementById('techno-log');
  const centerLog = document.getElementById('center-log');
  const rightLog = document.getElementById('right-log');
  const timer = document.getElementById('timer');
  const fakeTimer = document.getElementById('fake-timer');
  const min1Btn = document.getElementById('min1-btn');
  const min10Btn = document.getElementById('min10-btn');
  const hour1Btn = document.getElementById('hour1-btn');
  const extendBtn = document.getElementById('extend-btn');
  const startBtn = document.getElementById('start-btn');
  const categorySelectionDiv = document.getElementById('category-selection');
  const selectAllBtn = document.getElementById('select-all-btn');
  const deselectAllBtn = document.getElementById('deselect-all-btn');
  const confirmationPopup = document.getElementById('confirmation-popup');
  const confirmationInput = document.getElementById('confirmation-input');
  const confirmationButton = document.getElementById('confirmation-button');
  const settingsBtn = document.getElementById('settings-btn');
  const settingsPanel = document.getElementById('settings-panel');
  const closeSettingsBtn = document.getElementById('close-settings-btn');
  const themeSettingsDiv = document.getElementById('theme-settings');
  const customThemeBtn = document.getElementById('custom-theme-btn');
  const customThemePanel = document.getElementById('custom-theme-panel');
  const customColorBg = document.getElementById('custom-color-bg');
  const customColorText = document.getElementById('custom-color-text');
  const customColorConfirm = document.getElementById('custom-color-confirm');
  const customColorHighlight = document.getElementById('custom-color-highlight');
  const confirmWordInput = document.getElementById('confirm-word-input');
  const praiseTermInput = document.getElementById('praise-term-input');
  const uiToast = document.getElementById('ui-toast');

  // Import / export / reset
  const importPhrasesBtn = document.getElementById('import-phrases-btn');
  const exportPhrasesBtn = document.getElementById('export-phrases-btn');
  const importThemesBtn = document.getElementById('import-themes-btn');
  const exportThemesBtn = document.getElementById('export-themes-btn');
  const importPhrasesFile = document.getElementById('import-phrases-file');
  const importThemesFile = document.getElementById('import-themes-file');
  const dataStatusEl = document.getElementById('data-status');
  const resetDataBtn = document.getElementById('reset-data-btn');
  const resetConfirmRow = document.getElementById('reset-confirm-row');
  const resetConfirmYesBtn = document.getElementById('reset-confirm-yes-btn');
  const resetConfirmCancelBtn = document.getElementById('reset-confirm-cancel-btn');
  const addCategoryBtn = document.getElementById('add-category-btn');
  const addCategoryPanel = document.getElementById('add-category-panel');
  const newCategoryNameInput = document.getElementById('new-category-name');
  const newCategoryPhrasesInput = document.getElementById('new-category-phrases');
  const saveCategoryBtn = document.getElementById('save-category-btn');

  // Tutorial
  const helpBtn = document.getElementById('help-btn');
  const tutorialOverlay = document.getElementById('tutorial-overlay');
  const closeTutorialBtn = document.getElementById('close-tutorial-btn');
  const tutorialStepHeading = document.getElementById('tutorial-step-heading');
  const tutorialStepBody = document.getElementById('tutorial-step-body');
  const tutorialStepIndicator = document.getElementById('tutorial-step-indicator');
  const tutorialBackBtn = document.getElementById('tutorial-back-btn');
  const tutorialNextBtn = document.getElementById('tutorial-next-btn');

  // Metronome elements
  const metronomeContainer = document.getElementById('metronome-container');
  const metronomeToggleCollapseBtn = document.getElementById('metronome-toggle-collapse-btn');
  const metronomeControls = document.getElementById('metronome-controls');
  const metronomeToggleBtn = document.getElementById('metronome-toggle-btn');
  const metronomeWaveSelector = document.getElementById('metronome-wave-selector');
  const metronomeBpmInput = document.getElementById('metronome-bpm-input');

  // ==========================================================================
  // Data state
  // ==========================================================================
  let phraseData = null;        // { version, categories: { CategoryName: [phrases...] } } -- datos activos (defaults + imports)
  let themeData = null;         // { version, defaultTheme, themes: { key: { name, variables, accentColors } } }
  let baseDefaultPhrases = null; // copia limpia de los defaults (fetch o embebido), sin imports -- usada por "Reset"
  let baseDefaultThemes = null;
  let customPhraseStore = { version: 1, categories: {} }; // categorías agregadas por import o por "Add Category", acumuladas para persistir todas juntas

  let currentThemeKey = null;

  // ==========================================================================
  // Other state
  // ==========================================================================
  let trainingTime = 0;
  let initialTrainingTime = 0;
  let popupIntervalId = null;
  let timerIntervalId = null;
  let logGenerationTimeoutId = null;
  let floodTimeoutId = null; // fix: antes era una variable local que resetApplication no podía limpiar
  let fakeTimeRemaining = 0;
  let fakeTimerSwitchTime = 0;
  let timeElapsed = 0;
  let isTrainingActive = false;
  let isTrainingFinished = false;
  let logTimeouts = [];
  let intervalCounter = 0;
  let selectedCategories = [];
  let currentFilteredPhrases = [];
  let currentAccentColors = ['#ffffff'];
  let currentConfirmWord = config.defaults.confirmWord;
  let currentPraiseTerm = config.defaults.praiseTerm;

  // Metronome state
  let metronomeBpm = config.metronome.defaultBpm;
  let metronomeWaveType = config.metronome.defaultWave;
  let isMetronomeRunning = false;
  let metronomeLoopId = null;
  let metronomeSynth = null;
  let toneStarted = false;

  const cuteSymbols = ['<3', ':3', '^_^', '(^-^*)', '(⌒‿⌒)', '(ﾉ´ヮ´)ﾉ*:･ﾟ✧', '~', '*', '+', '♡', '☆', '✧', '✶', '^^', '>:)', 'o.o', 'xoxo'];

  // ==========================================================================
  // Helpers
  // ==========================================================================
  function formatTime(seconds) {
    const nonNegativeSeconds = Math.max(0, seconds);
    const minutes = Math.floor(nonNegativeSeconds / 60);
    const secs = Math.floor(nonNegativeSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  function updateTimerDisplay() {
    if (!timer) return;
    timer.textContent = formatTime(trainingTime);
    timer.style.visibility = trainingTime > 0 ? 'visible' : 'hidden';
  }
  function smoothScrollToBottom(element) {
    if (element) element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
  }
  function getRandomElement(arr) {
    if (!arr || arr.length === 0) {
      console.warn('Attempted to get random element from empty or invalid array.');
      return typeof arr === 'string' ? '...' : '#ffffff';
    }
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function randomCuteSymbol() { return getRandomElement(cuteSymbols); }
  function getRandomPosition() {
    const margin = 20;
    const popupWidth = 300;
    const popupHeight = 50;
    const safeWidth = window.innerWidth - popupWidth - 2 * margin;
    const safeHeight = window.innerHeight - popupHeight - 2 * margin - 60;
    const x = Math.random() * safeWidth + margin;
    const y = Math.random() * safeHeight + margin + 60;
    return { x: Math.max(margin, x), y: Math.max(margin + 60, y) };
  }
  function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

  // ==========================================================================
  // UI toast -- feedback de validación/errores (setup, confirmación, import/export).
  // FIX: separado de showPopup(), que solo se muestra mientras hay una sesión
  // activa (o es un mensaje de "flood" final). Antes, estos mensajes de UI se
  // perdían silenciosamente porque reusaban showPopup() fuera de esas condiciones.
  // ==========================================================================
  let uiToastTimeoutId = null;
  function showUiToast(message, duration = 2200) {
    if (!uiToast) return;
    uiToast.textContent = message;
    uiToast.classList.add('visible');
    if (uiToastTimeoutId) clearTimeout(uiToastTimeoutId);
    uiToastTimeoutId = setTimeout(() => uiToast.classList.remove('visible'), duration);
  }

  // ==========================================================================
  // Message / Log functions
  // ==========================================================================

  /**
   * Muestra un popup temático flotante durante la sesión (o durante el "flood"
   * final de elogios). Construye el contenido con nodos de texto/<br> reales
   * en vez de innerHTML, para que frases importadas desde un archivo externo
   * nunca puedan inyectar HTML/JS (XSS) -- fix aplicado en esta reestructuración.
   */
  function showPopup(message, duration = config.popups.duration, callback = null) {
    const isFloodMessage = message.toString().toLowerCase().includes(currentPraiseTerm.toLowerCase());
    if (!mainPanel || (!isTrainingActive && !isFloodMessage)) return;

    const popup = document.createElement('div');
    popup.classList.add('popup');

    let prefix = '';
    if ((selectedCategories.includes('Cute') || isFloodMessage) && Math.random() < 0.3) {
      prefix = randomCuteSymbol() + ' ';
    }
    let suffix = '';
    if (Math.random() < 0.2) {
      suffix = ' ' + randomCuteSymbol();
    }

    const lines = Array.isArray(message) ? message : [message];
    lines.forEach((line, index) => {
      if (index > 0) popup.appendChild(document.createElement('br'));
      let text = String(line);
      if (index === 0) text = prefix + text;
      if (index === lines.length - 1) text = text + suffix;
      popup.appendChild(document.createTextNode(text));
    });

    const { x, y } = getRandomPosition();
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    popup.style.color = 'var(--popup-text-color)';
    popup.style.textShadow = '0 0 2px rgba(0,0,0,0.3)';

    mainPanel.appendChild(popup);
    setTimeout(() => {
      if (popup && popup.parentNode === mainPanel) mainPanel.removeChild(popup);
      if (callback) callback();
    }, duration);
  }

  function clearLogTimeouts() {
    logTimeouts.forEach(id => clearTimeout(id));
    logTimeouts = [];
  }

  function typeMessageToLog(panel, message) {
    if (!panel || !message || !currentAccentColors || currentAccentColors.length === 0) return;
    const logEntry = document.createElement('div');
    const randomColor = getRandomElement(currentAccentColors);
    logEntry.style.color = randomColor;
    logEntry.style.textShadow = `0 0 5px ${randomColor}`;
    panel.appendChild(logEntry);

    while (panel.children.length > config.logs.maxLines) {
      panel.removeChild(panel.firstChild);
    }
    let charIndex = 0;
    function typeChar() {
      if (charIndex < message.length) {
        logEntry.textContent += message[charIndex];
        smoothScrollToBottom(panel);
        charIndex++;
        const typeSpeed = Math.random() * (config.logs.typeSpeedMax - config.logs.typeSpeedMin) + config.logs.typeSpeedMin;
        const timeoutId = setTimeout(typeChar, typeSpeed);
        logTimeouts.push(timeoutId);
      } else {
        smoothScrollToBottom(panel);
      }
    }
    typeChar();
  }

  // ==========================================================================
  // Data loading / validation / import / export
  // ==========================================================================

  function validatePhraseData(data) {
    return !!(
      data && typeof data === 'object' &&
      data.categories && typeof data.categories === 'object' &&
      Object.keys(data.categories).length > 0 &&
      Object.values(data.categories).every(arr => Array.isArray(arr) && arr.every(p => typeof p === 'string'))
    );
  }

  function validateThemeData(data) {
    return !!(
      data && typeof data === 'object' &&
      data.themes && typeof data.themes === 'object' &&
      Object.keys(data.themes).length > 0 &&
      Object.values(data.themes).every(t =>
        t && typeof t === 'object' &&
        typeof t.variables === 'object' && t.variables !== null &&
        Array.isArray(t.accentColors) && t.accentColors.every(c => typeof c === 'string')
      )
    );
  }

  async function fetchJson(path) {
    try {
      const res = await fetch(path, { cache: 'no-store' });
      if (!res.ok) return null;
      return await res.json();
    } catch (e) {
      // Bloqueado por CORS (file://) o el archivo no existe -- se resuelve con el fallback embebido.
      return null;
    }
  }

  async function loadDefaultData() {
    const fetchedPhrases = await fetchJson(config.dataFiles.phrases);
    const fetchedThemes = await fetchJson(config.dataFiles.themes);

    baseDefaultPhrases = validatePhraseData(fetchedPhrases) ? fetchedPhrases : deepClone(DEFAULT_PHRASES);
    baseDefaultThemes = validateThemeData(fetchedThemes) ? fetchedThemes : deepClone(DEFAULT_THEMES);

    phraseData = deepClone(baseDefaultPhrases);
    themeData = deepClone(baseDefaultThemes);
  }

  function mergePhrasesInto(target, importedCategories) {
    Object.keys(importedCategories).forEach(key => {
      target.categories[key] = importedCategories[key];
    });
  }

  function mergeThemesInto(target, importedThemes) {
    Object.keys(importedThemes).forEach(key => {
      if (key === config.customTheme.key) return; // reservado para el tema derivado del selector de colores
      const fallbackAccent = (target.themes[target.defaultTheme] || {}).accentColors || ['#ffffff'];
      const incoming = importedThemes[key];
      target.themes[key] = {
        name: incoming.name || key,
        variables: incoming.variables || {},
        accentColors: (incoming.accentColors && incoming.accentColors.length) ? incoming.accentColors : fallbackAccent
      };
    });
  }

  function persistCustomPhraseStore() {
    try { localStorage.setItem(config.storageKeys.customPhrases, JSON.stringify(customPhraseStore)); } catch (e) { console.error('Error saving custom phrases to localStorage:', e); }
  }

  // Agrega/reemplaza una sola categoría (usado por el import de JSON y por el
  // formulario "Add Category"). Se acumula en customPhraseStore para que
  // sobreviva un reload junto con cualquier otra categoría agregada antes
  // -- antes, importar un archivo pisaba en localStorage todo lo agregado
  // previamente, aunque siguiera visible hasta el próximo reload.
  function addCustomCategories(categories) {
    mergePhrasesInto(phraseData, categories);
    mergePhrasesInto(customPhraseStore, categories);
    persistCustomPhraseStore();
  }

  function toggleAddCategoryPanel() {
    if (addCategoryPanel) addCategoryPanel.classList.toggle('open');
  }

  function saveNewCategory() {
    if (!newCategoryNameInput || !newCategoryPhrasesInput) return;
    const name = newCategoryNameInput.value.trim();
    const phrases = newCategoryPhrasesInput.value.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    if (!name) { showDataStatus('Give the category a name.', true); return; }
    if (phrases.length === 0) { showDataStatus('Add at least one phrase (one per line).', true); return; }

    const isNew = !phraseData.categories.hasOwnProperty(name);
    addCustomCategories({ [name]: phrases });
    populateCategorySelection();
    newCategoryNameInput.value = '';
    newCategoryPhrasesInput.value = '';
    showDataStatus(isNew ? `Category "${name}" added.` : `Category "${name}" updated.`);
  }

  function applyStoredCustomData() {
    try {
      const storedPhrases = localStorage.getItem(config.storageKeys.customPhrases);
      if (storedPhrases) {
        const parsed = JSON.parse(storedPhrases);
        if (validatePhraseData(parsed)) {
          customPhraseStore = parsed;
          mergePhrasesInto(phraseData, parsed.categories);
        }
      }
    } catch (e) { console.error('Error loading custom phrases from localStorage:', e); }

    try {
      const storedThemes = localStorage.getItem(config.storageKeys.customThemes);
      if (storedThemes) {
        const parsed = JSON.parse(storedThemes);
        if (validateThemeData(parsed)) mergeThemesInto(themeData, parsed.themes);
      }
    } catch (e) { console.error('Error loading custom themes from localStorage:', e); }
  }

  function downloadJson(obj, filename) {
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function showDataStatus(message, isError = false) {
    if (!dataStatusEl) return;
    dataStatusEl.textContent = message;
    dataStatusEl.classList.toggle('error', !!isError);
  }

  function readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }

  async function handlePhrasesFileSelected(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try {
      const text = await readFileAsText(file);
      const data = JSON.parse(text);
      if (!validatePhraseData(data)) throw new Error('invalid-shape');
      addCustomCategories(data.categories);
      populateCategorySelection();
      showDataStatus('Phrases imported successfully.');
    } catch (err) {
      console.error('Error importing phrases file:', err);
      showDataStatus('Could not import the phrase file (invalid format).', true);
    } finally {
      event.target.value = '';
    }
  }

  async function handleThemesFileSelected(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try {
      const text = await readFileAsText(file);
      const data = JSON.parse(text);
      if (!validateThemeData(data)) throw new Error('invalid-shape');
      mergeThemesInto(themeData, data.themes);
      try { localStorage.setItem(config.storageKeys.customThemes, JSON.stringify(data)); } catch (e) { console.error(e); }
      populateThemeSelector();
      if (currentThemeKey) applyTheme(currentThemeKey); // por si el tema activo fue sobreescrito
      showDataStatus('Themes imported successfully.');
    } catch (err) {
      console.error('Error importing themes file:', err);
      showDataStatus('Could not import the theme file (invalid format).', true);
    } finally {
      event.target.value = '';
    }
  }

  // FIX: usaba window.confirm(), que queda silenciosamente deshabilitado en
  // contextos embebidos/sandboxeados (confirm() devuelve false sin avisar) --
  // el botón parecía no hacer nada. Se reemplaza por una confirmación propia
  // dentro del panel, que no depende de diálogos nativos del navegador.
  function showResetConfirm() {
    if (resetConfirmRow) resetConfirmRow.classList.add('open');
  }

  function hideResetConfirm() {
    if (resetConfirmRow) resetConfirmRow.classList.remove('open');
  }

  function performReset() {
    hideResetConfirm();
    try {
      localStorage.removeItem(config.storageKeys.customPhrases);
      localStorage.removeItem(config.storageKeys.customThemes);
      localStorage.removeItem(config.storageKeys.customThemeBaseColors);
    } catch (e) { console.error(e); }
    phraseData = deepClone(baseDefaultPhrases);
    themeData = deepClone(baseDefaultThemes);
    customPhraseStore = { version: 1, categories: {} };
    populateCategorySelection();
    populateThemeSelector();
    initCustomThemeColorInputs();
    applyTheme(themeData.defaultTheme);
    showDataStatus('Restored to defaults.');
  }

  // ==========================================================================
  // Category selection logic
  // ==========================================================================
  function populateFilteredPhrases() {
    currentFilteredPhrases = [];
    selectedCategories.forEach(category => {
      if (phraseData.categories[category]) {
        currentFilteredPhrases.push(...phraseData.categories[category]);
      }
    });
  }

  function updateSelectedCategories() {
    if (!categorySelectionDiv) return;
    selectedCategories = [];
    const buttons = categorySelectionDiv.querySelectorAll('.category-button');
    buttons.forEach(button => {
      if (button.classList.contains('selected')) {
        const category = button.dataset.category ? button.dataset.category.trim() : null;
        if (category && phraseData.categories[category]) {
          selectedCategories.push(category);
        }
      }
    });
    try { localStorage.setItem(config.storageKeys.categories, JSON.stringify(selectedCategories)); } catch (e) { console.error('Error saving categories to localStorage:', e); }
    if (startBtn) startBtn.disabled = selectedCategories.length === 0 || trainingTime <= 0;
  }

  function populateCategorySelection() {
    if (!categorySelectionDiv) return;
    categorySelectionDiv.innerHTML = '';
    let savedCategories = null;
    try {
      const savedData = localStorage.getItem(config.storageKeys.categories);
      if (savedData) {
        savedCategories = JSON.parse(savedData);
        if (!Array.isArray(savedCategories)) {
          savedCategories = null;
          localStorage.removeItem(config.storageKeys.categories);
        } else {
          savedCategories = savedCategories.filter(cat => phraseData.categories.hasOwnProperty(cat));
          if (savedCategories.length === 0) savedCategories = null;
        }
      }
    } catch (e) {
      console.error('Error loading saved categories:', e);
      savedCategories = null;
    }
    Object.keys(phraseData.categories).forEach(category => {
      const button = document.createElement('button');
      button.classList.add('category-button');
      if (savedCategories === null || savedCategories.includes(category)) {
        button.classList.add('selected');
      }
      button.dataset.category = category;
      button.textContent = category;
      button.addEventListener('click', handleCategoryButtonClick);
      categorySelectionDiv.appendChild(button);
    });
    updateSelectedCategories();
  }

  function handleCategoryButtonClick(event) {
    const button = event.currentTarget;
    if (button.disabled) return;
    button.classList.toggle('selected');
    updateSelectedCategories();
  }
  function selectAllCategories() {
    if (!categorySelectionDiv) return;
    categorySelectionDiv.querySelectorAll('.category-button').forEach(b => b.classList.add('selected'));
    updateSelectedCategories();
  }
  function deselectAllCategories() {
    if (!categorySelectionDiv) return;
    categorySelectionDiv.querySelectorAll('.category-button').forEach(b => b.classList.remove('selected'));
    updateSelectedCategories();
  }

  // ==========================================================================
  // Training control
  // ==========================================================================
  function startTraining() {
    populateFilteredPhrases();

    // FIX: estos dos avisos antes usaban showPopup(), que los descartaba
    // silenciosamente porque isTrainingActive todavía era false en este punto.
    if (trainingTime <= 0) {
      showUiToast('Add some training time first.');
      return;
    }
    if (currentFilteredPhrases.length === 0) {
      showUiToast('Select at least one training category.');
      return;
    }

    isTrainingActive = true;
    isTrainingFinished = false;
    initialTrainingTime = trainingTime;
    fakeTimeRemaining = initialTrainingTime;
    fakeTimerSwitchTime = initialTrainingTime * config.timers.fakeSwitchRatio;
    timeElapsed = 0;
    intervalCounter = 0;
    if (loadingScreen) loadingScreen.style.display = 'none';
    if (mainPanel) mainPanel.style.display = 'block';
    if (title) title.classList.add('fixed');
    if (fakeTimer) {
      fakeTimer.textContent = formatTime(fakeTimeRemaining);
      fakeTimer.classList.add('fixed');
      fakeTimer.classList.remove('timer-jump');
    }
    if (crtContainer) crtContainer.classList.add('training-active-bg');
    disableSetupControls(true);
    clearLogTimeouts();
    if (technoLog) technoLog.innerHTML = '';
    if (centerLog) centerLog.innerHTML = '';
    if (rightLog) rightLog.innerHTML = '';
    timerIntervalId = setInterval(updateTrainingState, config.timers.intervalMs);
    startLogGeneration();
    setTimeout(startPopupGeneration, config.popups.startDelay);
  }

  function updateTrainingState() {
    if (!isTrainingActive) return;
    trainingTime -= config.timers.intervalMs / 1000;
    timeElapsed += config.timers.intervalMs / 1000;
    intervalCounter++;
    updateFakeTimer();
    if (trainingTime <= 0) finishTraining();
  }

  function updateFakeTimer() {
    if (!isTrainingActive || !fakeTimer) return;
    let currentRate = (fakeTimeRemaining <= fakeTimerSwitchTime) ? config.timers.fakePhase2Rate : config.timers.fakePhase1Rate;
    fakeTimeRemaining -= (config.timers.intervalMs / 1000) * currentRate;
    let didJump = false;
    if (intervalCounter % config.timers.fakeJumpCheckInterval === 0 && Math.random() < config.timers.fakeJumpChance) {
      const jumpAmount = (Math.random() - 0.5) * config.timers.fakeJumpMagnitude;
      fakeTimeRemaining += jumpAmount;
      const minFloor = fakeTimerSwitchTime * config.timers.fakeMinFloorRatio;
      if (fakeTimeRemaining < minFloor && jumpAmount < 0) fakeTimeRemaining = minFloor;
      fakeTimeRemaining = Math.min(fakeTimeRemaining, initialTrainingTime);
      didJump = true;
    }
    fakeTimeRemaining = Math.max(0, fakeTimeRemaining);
    fakeTimer.textContent = formatTime(fakeTimeRemaining);
    if (didJump) {
      fakeTimer.classList.add('timer-jump');
      setTimeout(() => { if (fakeTimer) fakeTimer.classList.remove('timer-jump'); }, 300);
    }
  }

  function startPopupGeneration() {
    if (popupIntervalId) clearTimeout(popupIntervalId);
    function generatePopup() {
      if (!isTrainingActive || currentFilteredPhrases.length === 0) {
        if (popupIntervalId) clearTimeout(popupIntervalId);
        popupIntervalId = null;
        return;
      }
      showPopup(getRandomElement(currentFilteredPhrases));
      const nextDelay = Math.random() * (config.popups.maxInterval - config.popups.minInterval) + config.popups.minInterval;
      popupIntervalId = setTimeout(generatePopup, nextDelay);
    }
    const initialDelay = Math.random() * (config.popups.maxInterval - config.popups.minInterval) + config.popups.minInterval;
    popupIntervalId = setTimeout(generatePopup, initialDelay);
  }

  function startLogGeneration() {
    clearTimeout(logGenerationTimeoutId);
    function generateLogEntry() {
      if (!isTrainingActive || currentFilteredPhrases.length === 0) {
        logGenerationTimeoutId = null;
        return;
      }
      const message = getRandomElement(currentFilteredPhrases);
      const roll = Math.random();
      const targetPanel = (roll < 0.35) ? technoLog : (roll < 0.75) ? centerLog : rightLog;
      if (targetPanel) typeMessageToLog(targetPanel, message);
      const averageTypeTime = message.length * ((config.logs.typeSpeedMax + config.logs.typeSpeedMin) / 2);
      const baseDelay = Math.max(50, averageTypeTime * 0.3);
      const nextDelay = baseDelay + Math.random() * 250;
      logGenerationTimeoutId = setTimeout(generateLogEntry, nextDelay);
    }
    logGenerationTimeoutId = setTimeout(generateLogEntry, 200);
  }

  function finishTraining() {
    isTrainingActive = false;
    isTrainingFinished = true;
    if (timerIntervalId) clearInterval(timerIntervalId);
    if (popupIntervalId) clearTimeout(popupIntervalId);
    clearTimeout(logGenerationTimeoutId);
    timerIntervalId = null;
    popupIntervalId = null;
    logGenerationTimeoutId = null;
    if (title) title.classList.add('flash');
    if (fakeTimer) fakeTimer.textContent = '00:00';
    setTimeout(() => { clearLogTimeouts(); }, config.logs.typeSpeedMax * 2);
    triggerPraiseFlood();
  }

  function handleConfirmationSubmit() {
    if (!confirmationInput || !confirmationPopup) return;
    const enteredText = confirmationInput.value.trim();
    if (enteredText.toLowerCase() === currentConfirmWord.toLowerCase()) {
      confirmationPopup.style.display = 'none';
      resetApplication();
    } else {
      // FIX: antes esto llamaba a showPopup(), que se descartaba silenciosamente
      // porque en este punto isTrainingActive ya es false.
      showUiToast('Incorrect. Try again.', 1800);
      confirmationInput.value = '';
      confirmationInput.focus();
      confirmationPopup.classList.add('shake');
      setTimeout(() => { if (confirmationPopup) confirmationPopup.classList.remove('shake'); }, 500);
    }
  }

  function triggerPraiseFlood() {
    let linesRemaining = config.flood.totalLines;
    const praiseTemplates = [
      `Good ${currentPraiseTerm}.`,
      `Such a ${currentPraiseTerm} <3`,
      `Perfectly obedient.`,
      `${currentPraiseTerm}~`,
      `So good for me.`,
      `${currentPraiseTerm} ^_^`
    ];
    function floodStep() {
      if (linesRemaining <= 0) {
        if (floodTimeoutId) clearTimeout(floodTimeoutId);
        floodTimeoutId = null;
        if (confirmationPopup) {
          confirmationPopup.style.display = 'flex';
          if (confirmationInput) confirmationInput.focus();
        }
        return;
      }
      const message = getRandomElement(praiseTemplates) + ' ' + randomCuteSymbol();
      if (Math.random() < 0.3) showPopup(message, config.popups.duration * 0.8);
      if (technoLog) typeMessageToLog(technoLog, message);
      if (centerLog) typeMessageToLog(centerLog, message);
      if (rightLog) typeMessageToLog(rightLog, message);
      linesRemaining--;
      floodTimeoutId = setTimeout(floodStep, config.flood.rateBase + Math.random() * config.flood.rateVariation);
    }
    floodStep();
  }

  function resetApplication() {
    trainingTime = 0;
    initialTrainingTime = 0;
    fakeTimeRemaining = 0;
    fakeTimerSwitchTime = 0;
    timeElapsed = 0;
    isTrainingActive = false;
    isTrainingFinished = false;
    intervalCounter = 0;
    if (timerIntervalId) clearInterval(timerIntervalId);
    if (popupIntervalId) clearTimeout(popupIntervalId);
    if (logGenerationTimeoutId) clearTimeout(logGenerationTimeoutId);
    if (floodTimeoutId) clearTimeout(floodTimeoutId);
    clearLogTimeouts();
    stopMetronome();
    timerIntervalId = null;
    popupIntervalId = null;
    logGenerationTimeoutId = null;
    floodTimeoutId = null;
    if (loadingScreen) loadingScreen.style.display = 'flex';
    if (mainPanel) mainPanel.style.display = 'none';
    if (title) { title.classList.remove('fixed', 'flash'); title.textContent = 'TRAINING ROUTINE'; }
    if (fakeTimer) { fakeTimer.classList.remove('fixed', 'timer-jump'); fakeTimer.textContent = '00:00'; }
    if (crtContainer) crtContainer.classList.remove('training-active-bg');
    if (confirmationPopup) { confirmationPopup.style.display = 'none'; confirmationPopup.classList.remove('shake'); }
    if (confirmationInput) confirmationInput.value = '';
    if (technoLog) technoLog.innerHTML = '';
    if (centerLog) centerLog.innerHTML = '';
    if (rightLog) rightLog.innerHTML = '';
    disableSetupControls(false);
    updateTimerDisplay();
    populateCategorySelection();
  }

  function disableSetupControls(disable) {
    const buttons = [
      min1Btn, min10Btn, hour1Btn, extendBtn, startBtn, selectAllBtn, deselectAllBtn,
      ...(categorySelectionDiv ? Array.from(categorySelectionDiv.querySelectorAll('.category-button')) : [])
    ];
    buttons.forEach(btn => { if (btn) btn.disabled = disable; });
    if (startBtn && !disable) startBtn.disabled = selectedCategories.length === 0 || trainingTime <= 0;
  }

  // ==========================================================================
  // Custom theme -- deriva las ~50 variables de tema a partir de 4 colores
  // base (fondo, texto, confirmación, resaltado) para que alguien sin
  // conocimientos de CSS pueda crear su propio tema con 4 selectores de
  // color en vez de editar/importar un JSON.
  // ==========================================================================
  function hexToRgb(hex) {
    const clean = hex.replace('#', '');
    const full = clean.length === 3 ? clean.split('').map(c => c + c).join('') : clean;
    const num = parseInt(full, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }
  function rgbToHex({ r, g, b }) {
    return '#' + [r, g, b].map(v => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('');
  }
  function rgbToHsl({ r, g, b }) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0, s = 0;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        default: h = (r - g) / d + 4;
      }
      h /= 6;
    }
    return { h, s, l };
  }
  function hslToRgb({ h, s, l }) {
    if (s === 0) { const v = Math.round(l * 255); return { r: v, g: v, b: v }; }
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    return {
      r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
      g: Math.round(hue2rgb(p, q, h) * 255),
      b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255)
    };
  }
  function adjustLightness(hex, deltaPercent) {
    const hsl = rgbToHsl(hexToRgb(hex));
    hsl.l = Math.min(1, Math.max(0, hsl.l + deltaPercent / 100));
    return rgbToHex(hslToRgb(hsl));
  }
  function toRgba(hex, alpha) {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  function relativeLuminance({ r, g, b }) {
    const srgb = [r, g, b].map(v => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  }
  function pickContrastColor(hex) {
    return relativeLuminance(hexToRgb(hex)) > 0.5 ? '#141018' : '#ffffff';
  }

  function buildCustomTheme(baseColors) {
    const { bg, text, confirm, highlight } = baseColors;
    const variables = {
      '--bg-primary': bg,
      '--bg-gradient-1': adjustLightness(bg, 18),
      '--bg-gradient-2': adjustLightness(bg, 8),
      '--bg-active-1': adjustLightness(bg, 6),
      '--bg-active-2': adjustLightness(bg, 3),
      '--bg-active-end': adjustLightness(bg, -6),
      '--modal-bg': toRgba(adjustLightness(bg, 10), 0.9),
      '--popup-bg': toRgba(highlight, 0.5),
      '--settings-panel-bg': toRgba(adjustLightness(bg, -4), 0.9),

      '--text-primary': text,
      '--text-secondary': toRgba(text, 0.6),
      '--text-secondary-hover': toRgba(text, 0.9),
      '--text-accent-1': confirm,
      '--text-accent-2': highlight,
      '--text-contrast': pickContrastColor(confirm),
      '--popup-text-color': pickContrastColor(highlight),

      '--glow-accent-1-strong': toRgba(confirm, 0.7),
      '--glow-accent-1-medium': toRgba(confirm, 0.5),
      '--glow-accent-2-strong': toRgba(highlight, 0.8),
      '--glow-accent-2-medium': toRgba(highlight, 0.6),
      '--glow-accent-2-soft': toRgba(highlight, 0.3),
      '--glow-accent-3-medium': toRgba(text, 0.4),

      '--border-primary': toRgba(text, 0.3),
      '--border-primary-hover': toRgba(text, 0.5),
      '--border-secondary': toRgba(text, 0.2),
      '--border-secondary-hover': toRgba(text, 0.4),
      '--border-accent-1': toRgba(highlight, 0.8),
      '--border-accent-1-dim': toRgba(highlight, 0.4),
      '--border-accent-2': toRgba(confirm, 0.7),
      '--modal-border-color': toRgba(highlight, 0.8),
      '--popup-border-color': toRgba(confirm, 0.7),
      '--settings-panel-border': toRgba(highlight, 0.8),

      '--button-primary-bg': toRgba(adjustLightness(bg, 32), 0.6),
      '--button-primary-bg-hover': toRgba(adjustLightness(bg, 42), 0.8),
      '--button-secondary-bg': toRgba(adjustLightness(bg, 28), 0.4),
      '--button-secondary-bg-hover': toRgba(adjustLightness(bg, 38), 0.6),
      '--button-manage-bg': toRgba(adjustLightness(bg, 30), 0.5),
      '--button-manage-bg-hover': toRgba(adjustLightness(bg, 40), 0.7),
      '--button-cat-selected-bg': confirm,
      '--button-special-bg': toRgba(highlight, 0.5),
      '--button-special-bg-hover': toRgba(highlight, 0.7),
      '--button-confirm-bg': confirm,
      '--button-confirm-bg-hover': adjustLightness(confirm, 15),

      '--input-bg': toRgba(text, 0.1),
      '--input-text-color': confirm,
      '--input-border-color': toRgba(highlight, 0.4),
      '--input-focus-shadow': toRgba(highlight, 0.6),

      '--scanline-bright': toRgba(text, 0.08),
      '--scanline-dim': toRgba(text, 0.04),
      '--vignette-shadow': 'inset 0 0 150px 30px rgba(0, 0, 0, 0.7)',
      '--box-shadow-button': '0 2px 5px rgba(0,0,0,0.3)',
      '--box-shadow-button-confirm': '0 3px 7px rgba(0,0,0,0.4)'
    };
    const accentColors = [confirm, highlight, adjustLightness(confirm, 20), adjustLightness(highlight, 20), text];
    return { name: 'Custom', variables, accentColors };
  }

  function getCustomThemeBaseColors() {
    try {
      const stored = localStorage.getItem(config.storageKeys.customThemeBaseColors);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.bg && parsed.text && parsed.confirm && parsed.highlight) return parsed;
      }
    } catch (e) { console.error('Error loading custom theme colors:', e); }
    return { ...config.customTheme.baseColors };
  }

  function saveCustomThemeBaseColors(colors) {
    try { localStorage.setItem(config.storageKeys.customThemeBaseColors, JSON.stringify(colors)); } catch (e) { console.error('Error saving custom theme colors:', e); }
  }

  function initCustomThemeColorInputs() {
    const colors = getCustomThemeBaseColors();
    if (customColorBg) customColorBg.value = colors.bg;
    if (customColorText) customColorText.value = colors.text;
    if (customColorConfirm) customColorConfirm.value = colors.confirm;
    if (customColorHighlight) customColorHighlight.value = colors.highlight;
    themeData.themes[config.customTheme.key] = buildCustomTheme(colors);
  }

  function refreshCustomTheme() {
    const colors = {
      bg: customColorBg ? customColorBg.value : config.customTheme.baseColors.bg,
      text: customColorText ? customColorText.value : config.customTheme.baseColors.text,
      confirm: customColorConfirm ? customColorConfirm.value : config.customTheme.baseColors.confirm,
      highlight: customColorHighlight ? customColorHighlight.value : config.customTheme.baseColors.highlight
    };
    themeData.themes[config.customTheme.key] = buildCustomTheme(colors);
    saveCustomThemeBaseColors(colors);
    applyTheme(config.customTheme.key);
  }

  function toggleCustomThemePanel() {
    if (customThemePanel) customThemePanel.classList.toggle('open');
  }

  // ==========================================================================
  // Theme system -- 100% dinámico vía variables CSS.
  // Antes los temas eran clases CSS fijas (body.theme-matrix {...}); ahora se
  // aplican escribiendo las variables directo en <body>, así un tema importado
  // por JSON puede definir colores nuevos sin tocar CSS. Si un tema (propio o
  // importado) no define alguna variable, se completa con el tema por defecto
  // en vez de dejar "pegado" el valor del tema anterior.
  // ==========================================================================
  function applyTheme(themeKey) {
    const theme = themeData.themes[themeKey];
    if (!theme) {
      console.warn(`Theme "${themeKey}" not found. Applying default.`);
      const fallbackKey = themeData.themes[themeData.defaultTheme] ? themeData.defaultTheme : Object.keys(themeData.themes)[0];
      if (fallbackKey && fallbackKey !== themeKey) applyTheme(fallbackKey);
      return;
    }
    currentThemeKey = themeKey;
    const base = themeData.themes[themeData.defaultTheme] || theme;
    const target = document.body;
    REQUIRED_THEME_VARS.forEach(varName => {
      const value = (theme.variables && theme.variables[varName]) || (base.variables && base.variables[varName]);
      if (value) target.style.setProperty(varName, value);
    });

    currentAccentColors = (theme.accentColors && theme.accentColors.length) ? theme.accentColors : (base.accentColors || ['#ffffff']);

    if (themeSettingsDiv) {
      themeSettingsDiv.querySelectorAll('.theme-button').forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.theme === themeKey);
      });
    }
    if (customThemeBtn) customThemeBtn.classList.toggle('selected', themeKey === config.customTheme.key);
    try { localStorage.setItem(config.storageKeys.theme, themeKey); } catch (e) { console.error('Error saving theme to localStorage:', e); }
  }

  function openSettingsPanel() { if (settingsPanel) settingsPanel.classList.add('open'); }
  function closeSettingsPanel() { if (settingsPanel) settingsPanel.classList.remove('open'); }

  function populateThemeSelector() {
    if (!themeSettingsDiv) return;
    themeSettingsDiv.querySelectorAll('.theme-button').forEach(btn => btn.remove());
    Object.keys(themeData.themes).forEach(themeKey => {
      if (themeKey === config.customTheme.key) return; // el tema custom tiene su propio botón + panel de colores
      const themeInfo = themeData.themes[themeKey];
      const button = document.createElement('button');
      button.classList.add('theme-button');
      button.dataset.theme = themeKey;
      button.textContent = themeInfo.name || themeKey;
      button.addEventListener('click', () => applyTheme(themeKey));
      themeSettingsDiv.appendChild(button);
    });
  }

  // ==========================================================================
  // Customization (confirm word / praise term)
  // ==========================================================================
  function saveCustomSettings() {
    try {
      localStorage.setItem(config.storageKeys.confirmWord, currentConfirmWord);
      localStorage.setItem(config.storageKeys.praiseTerm, currentPraiseTerm);
    } catch (e) { console.error('Error saving custom settings to localStorage:', e); }
  }

  function loadCustomSettings() {
    try {
      const savedWord = localStorage.getItem(config.storageKeys.confirmWord);
      const savedTerm = localStorage.getItem(config.storageKeys.praiseTerm);
      currentConfirmWord = (savedWord && savedWord.trim() !== '') ? savedWord : config.defaults.confirmWord;
      currentPraiseTerm = (savedTerm && savedTerm.trim() !== '') ? savedTerm : config.defaults.praiseTerm;
      if (confirmWordInput) confirmWordInput.value = currentConfirmWord;
      if (praiseTermInput) praiseTermInput.value = currentPraiseTerm;
    } catch (e) {
      console.error('Error loading custom settings from localStorage:', e);
      currentConfirmWord = config.defaults.confirmWord;
      currentPraiseTerm = config.defaults.praiseTerm;
      if (confirmWordInput) confirmWordInput.value = currentConfirmWord;
      if (praiseTermInput) praiseTermInput.value = currentPraiseTerm;
    }
  }

  // ==========================================================================
  // Tutorial modal -- paso a paso, un punto por pantalla con Back/Next, en
  // vez de un solo modal largo con scroll. El contenido es 100% estático
  // (no viene de imports ni de fetch), así que usar innerHTML acá es seguro.
  // ==========================================================================
  const TUTORIAL_STEPS = [
    {
      heading: 'How Training Console works',
      body: '<p>This console simulates a "training" session with animated text, popups, and a timer that doesn\'t always show the real time remaining.</p><p>Everything happens in your browser — nothing is ever sent to a server.</p>'
    },
    {
      heading: 'Basic use',
      body: '<ul>' +
        '<li>Pick how long the session will last with the time buttons (or "&lt;3" for a random amount of time).</li>' +
        '<li>Pick one or more phrase categories.</li>' +
        '<li>Hit <strong>Start Training</strong>. When it ends, you\'ll need to type a confirmation word to close the session.</li>' +
        '</ul>'
    },
    {
      heading: 'Customization (⚙️ Settings)',
      body: '<ul>' +
        '<li><strong>Theme:</strong> pick Pastel or Matrix, or hit <strong>Custom</strong> and choose 4 colors (background, text, confirm, highlight) to build your own — the console re-skins itself live from those.</li>' +
        '<li><strong>Who Owns You? / Praise Term:</strong> customize the final confirmation word and the praise term used in phrases.</li>' +
        '</ul>'
    },
    {
      heading: 'Phrase Packs & Themes',
      body: '<p>Import a <code>.json</code> file with new phrases or themes, or use <strong>+ Add Category</strong> to write your own phrases directly — no file needed. Imported files only affect your own browser.</p>'
    },
    {
      heading: 'Good to know',
      body: '<ul>' +
        '<li>The large timer shown during a session is intentionally inaccurate — that\'s part of the effect.</li>' +
        '<li>Your settings (theme, phrases, custom words) are saved in this browser via <code>localStorage</code>, not in the cloud.</li>' +
        '<li>Only import phrase/theme files from people you trust: they\'re data, not code, but it\'s still worth checking where they came from.</li>' +
        '</ul>'
    }
  ];
  let tutorialStepIndex = 0;

  function renderTutorialStep() {
    const step = TUTORIAL_STEPS[tutorialStepIndex];
    if (!step) return;
    if (tutorialStepHeading) tutorialStepHeading.textContent = step.heading;
    if (tutorialStepBody) tutorialStepBody.innerHTML = step.body;
    if (tutorialStepIndicator) tutorialStepIndicator.textContent = `Step ${tutorialStepIndex + 1} of ${TUTORIAL_STEPS.length}`;
    if (tutorialBackBtn) tutorialBackBtn.disabled = tutorialStepIndex === 0;
    if (tutorialNextBtn) tutorialNextBtn.textContent = (tutorialStepIndex === TUTORIAL_STEPS.length - 1) ? 'Got it' : 'Next';
  }

  function openTutorial() {
    tutorialStepIndex = 0;
    renderTutorialStep();
    if (tutorialOverlay) tutorialOverlay.classList.add('open');
  }
  function closeTutorial() {
    if (tutorialOverlay) tutorialOverlay.classList.remove('open');
    try { localStorage.setItem(config.storageKeys.tutorialSeen, '1'); } catch (e) { console.error(e); }
  }
  function goToNextTutorialStep() {
    if (tutorialStepIndex < TUTORIAL_STEPS.length - 1) {
      tutorialStepIndex++;
      renderTutorialStep();
    } else {
      closeTutorial();
    }
  }
  function goToPrevTutorialStep() {
    if (tutorialStepIndex > 0) {
      tutorialStepIndex--;
      renderTutorialStep();
    }
  }

  // ==========================================================================
  // Metronome
  // ==========================================================================
  function initializeMetronomeSynth() {
    if (!metronomeSynth) {
      metronomeSynth = new Tone.Synth({
        oscillator: { type: metronomeWaveType },
        envelope: config.metronome.envelope,
        volume: config.metronome.volume
      }).toDestination();
    }
  }

  async function startMetronome() {
    if (isMetronomeRunning) return;
    if (!toneStarted) {
      try {
        await Tone.start();
        toneStarted = true;
      } catch (e) {
        console.error('Error starting AudioContext:', e);
        return;
      }
    }
    initializeMetronomeSynth();
    Tone.Transport.bpm.value = metronomeBpm;
    metronomeLoopId = Tone.Transport.scheduleRepeat(time => {
      metronomeSynth.triggerAttackRelease(config.metronome.note, config.metronome.duration, time);
    }, '4n');
    Tone.Transport.start();
    isMetronomeRunning = true;
    if (metronomeToggleBtn) metronomeToggleBtn.innerHTML = '&#9632;';
  }

  function stopMetronome() {
    if (!isMetronomeRunning || metronomeLoopId === null) return;
    Tone.Transport.stop();
    Tone.Transport.clear(metronomeLoopId);
    metronomeLoopId = null;
    isMetronomeRunning = false;
    if (metronomeToggleBtn) metronomeToggleBtn.innerHTML = '&#9658;';
  }

  function handleBpmChange(event) {
    const newBpm = parseInt(event.target.value, 10);
    if (isNaN(newBpm) || newBpm < config.metronome.minBpm || newBpm > config.metronome.maxBpm) {
      event.target.value = metronomeBpm;
      return;
    }
    metronomeBpm = newBpm;
    Tone.Transport.bpm.value = metronomeBpm;
  }

  function handleWaveChange(event) {
    const button = event.target.closest('.wave-btn');
    if (!button || button.classList.contains('selected')) return;
    const newWave = button.dataset.wave;
    if (!newWave || !['square', 'triangle'].includes(newWave)) return;
    metronomeWaveType = newWave;
    if (metronomeSynth) metronomeSynth.oscillator.type = metronomeWaveType;
    metronomeWaveSelector.querySelectorAll('.wave-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
  }

  function toggleMetronomeCollapse() {
    if (metronomeContainer) metronomeContainer.classList.toggle('open');
  }

  // ==========================================================================
  // Event listeners
  // ==========================================================================
  if (min1Btn) min1Btn.addEventListener('click', () => { trainingTime += 60; updateTimerDisplay(); updateSelectedCategories(); });
  if (min10Btn) min10Btn.addEventListener('click', () => { trainingTime += 600; updateTimerDisplay(); updateSelectedCategories(); });
  if (hour1Btn) hour1Btn.addEventListener('click', () => { trainingTime += 3600; updateTimerDisplay(); updateSelectedCategories(); });
  if (extendBtn) extendBtn.addEventListener('click', () => {
    const amount = Math.floor(Math.random() * (config.timers.extendTimeMax - config.timers.extendTimeMin + 1)) + config.timers.extendTimeMin;
    trainingTime += amount; updateTimerDisplay(); updateSelectedCategories();
  });
  if (startBtn) startBtn.addEventListener('click', startTraining);
  if (selectAllBtn) selectAllBtn.addEventListener('click', selectAllCategories);
  if (deselectAllBtn) deselectAllBtn.addEventListener('click', deselectAllCategories);
  if (confirmationButton) confirmationButton.addEventListener('click', handleConfirmationSubmit);
  if (confirmationInput) confirmationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && confirmationPopup && confirmationPopup.style.display !== 'none') handleConfirmationSubmit();
  });

  if (settingsBtn) settingsBtn.addEventListener('click', openSettingsPanel);
  if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', closeSettingsPanel);

  if (customThemeBtn) customThemeBtn.addEventListener('click', () => {
    toggleCustomThemePanel();
    refreshCustomTheme();
  });
  [customColorBg, customColorText, customColorConfirm, customColorHighlight].forEach(input => {
    if (input) input.addEventListener('input', refreshCustomTheme);
  });

  if (helpBtn) helpBtn.addEventListener('click', openTutorial);
  if (closeTutorialBtn) closeTutorialBtn.addEventListener('click', closeTutorial);
  if (tutorialNextBtn) tutorialNextBtn.addEventListener('click', goToNextTutorialStep);
  if (tutorialBackBtn) tutorialBackBtn.addEventListener('click', goToPrevTutorialStep);
  if (tutorialOverlay) tutorialOverlay.addEventListener('click', (e) => { if (e.target === tutorialOverlay) closeTutorial(); });

  if (confirmWordInput) {
    confirmWordInput.addEventListener('input', (e) => {
      const newValue = e.target.value.trim();
      currentConfirmWord = newValue !== '' ? newValue : config.defaults.confirmWord;
      if (newValue === '' && e.target.value !== currentConfirmWord) e.target.value = currentConfirmWord;
      saveCustomSettings();
    });
  }
  if (praiseTermInput) {
    praiseTermInput.addEventListener('input', (e) => {
      const newValue = e.target.value.trim();
      currentPraiseTerm = newValue !== '' ? newValue : config.defaults.praiseTerm;
      if (newValue === '' && e.target.value !== currentPraiseTerm) e.target.value = currentPraiseTerm;
      saveCustomSettings();
    });
  }

  if (importPhrasesBtn) importPhrasesBtn.addEventListener('click', () => importPhrasesFile && importPhrasesFile.click());
  if (importThemesBtn) importThemesBtn.addEventListener('click', () => importThemesFile && importThemesFile.click());
  if (importPhrasesFile) importPhrasesFile.addEventListener('change', handlePhrasesFileSelected);
  if (importThemesFile) importThemesFile.addEventListener('change', handleThemesFileSelected);
  if (exportPhrasesBtn) exportPhrasesBtn.addEventListener('click', () => downloadJson(phraseData, 'training-console-phrases.json'));
  if (exportThemesBtn) exportThemesBtn.addEventListener('click', () => downloadJson(themeData, 'training-console-themes.json'));
  if (resetDataBtn) resetDataBtn.addEventListener('click', showResetConfirm);
  if (resetConfirmYesBtn) resetConfirmYesBtn.addEventListener('click', performReset);
  if (resetConfirmCancelBtn) resetConfirmCancelBtn.addEventListener('click', hideResetConfirm);
  if (addCategoryBtn) addCategoryBtn.addEventListener('click', toggleAddCategoryPanel);
  if (saveCategoryBtn) saveCategoryBtn.addEventListener('click', saveNewCategory);

  if (metronomeToggleCollapseBtn) metronomeToggleCollapseBtn.addEventListener('click', toggleMetronomeCollapse);
  if (metronomeToggleBtn) metronomeToggleBtn.addEventListener('click', () => { isMetronomeRunning ? stopMetronome() : startMetronome(); });
  if (metronomeBpmInput) {
    metronomeBpmInput.addEventListener('change', handleBpmChange);
    metronomeBpmInput.addEventListener('input', (e) => {
      const liveBpm = parseInt(e.target.value, 10);
      if (!isNaN(liveBpm) && liveBpm >= config.metronome.minBpm && liveBpm <= config.metronome.maxBpm) {
        metronomeBpm = liveBpm;
        Tone.Transport.bpm.value = metronomeBpm;
      }
    });
  }
  if (metronomeWaveSelector) metronomeWaveSelector.addEventListener('click', handleWaveChange);

  // ==========================================================================
  // Initialization
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', async () => {
    if (!categorySelectionDiv || !timer || !startBtn || !themeSettingsDiv || !settingsPanel || !settingsBtn ||
        !confirmWordInput || !praiseTermInput || !metronomeContainer || !metronomeToggleCollapseBtn ||
        !metronomeControls || !metronomeToggleBtn || !metronomeBpmInput || !metronomeWaveSelector) {
      console.error('Initialization failed: Missing essential elements for setup.');
      return;
    }

    await loadDefaultData();
    applyStoredCustomData();

    populateCategorySelection();
    populateThemeSelector();
    initCustomThemeColorInputs();
    loadCustomSettings();

    let savedTheme = themeData.defaultTheme;
    try {
      const storedTheme = localStorage.getItem(config.storageKeys.theme);
      if (storedTheme && themeData.themes[storedTheme]) savedTheme = storedTheme;
    } catch (e) { console.error('Error loading theme from localStorage:', e); }
    applyTheme(savedTheme);

    updateTimerDisplay();
    disableSetupControls(false);
    updateSelectedCategories();

    metronomeBpmInput.value = config.metronome.defaultBpm;
    metronomeBpm = config.metronome.defaultBpm;
    metronomeWaveType = config.metronome.defaultWave;
    metronomeWaveSelector.querySelectorAll('.wave-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.wave === metronomeWaveType);
    });

    try {
      if (!localStorage.getItem(config.storageKeys.tutorialSeen)) openTutorial();
    } catch (e) {
      openTutorial();
    }

    document.addEventListener('click', (event) => {
      if (settingsPanel && settingsPanel.classList.contains('open') &&
          !event.target.closest('#settings-panel') && !event.target.closest('#settings-btn')) {
        closeSettingsPanel();
      }
      if (metronomeContainer && metronomeContainer.classList.contains('open') &&
          !event.target.closest('#metronome-container')) {
        metronomeContainer.classList.remove('open');
      }
    });
  });
})();
