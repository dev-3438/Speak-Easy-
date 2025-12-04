// SpeakEasy - Main JavaScript File
// Interactive functionality for the English learning platform

// Global variables
let currentFlashcardIndex = 0;
let isRecording = false;
let currentTense = 'simple-present';
let conversationHistory = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize based on current page
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'index':
            initializeHomePage();
            break;
        case 'vocabulary':
            initializeVocabularyPage();
            break;
        case 'grammar':
            initializeGrammarPage();
            break;
        case 'conversation':
            initializeConversationPage();
            break;
        default:
            initializeCommonFeatures();
    }
    
    // Initialize common features for all pages
    initializeCommonFeatures();
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('vocabulary')) return 'vocabulary';
    if (path.includes('grammar')) return 'grammar';
    if (path.includes('conversation')) return 'conversation';
    if (path.includes('tips')) return 'tips';
    if (path.includes('quizzes')) return 'quizzes';
    if (path.includes('downloads')) return 'downloads';
    return 'index';
}

// ===== HOME PAGE FUNCTIONALITY =====

function initializeHomePage() {
    // Initialize typewriter effect
    if (document.getElementById('typed-text')) {
        new Typed('#typed-text', {
            strings: [
                'Fluently',
                'Confidently',
                'Naturally',
                'Perfectly'
            ],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
    
    // Initialize progress chart
    initializeProgressChart();
    
    // Set up daily word
    initializeDailyWord();
    
    // Animate elements on scroll
    animateOnScroll();
}

function initializeProgressChart() {
    if (document.getElementById('progress-chart')) {
        const chartDom = document.getElementById('progress-chart');
        const myChart = echarts.init(chartDom);
        
        const option = {
            color: ['#A8C8A8', '#D4C5E8', '#F4C2A1'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['Vocabulary', 'Grammar', 'Speaking'],
                bottom: 0
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Vocabulary',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {
                        opacity: 0.3
                    },
                    data: [65, 72, 78, 85, 89, 92, 95]
                },
                {
                    name: 'Grammar',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {
                        opacity: 0.3
                    },
                    data: [45, 58, 65, 72, 78, 85, 88]
                },
                {
                    name: 'Speaking',
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    areaStyle: {
                        opacity: 0.3
                    },
                    data: [35, 42, 48, 55, 62, 68, 75]
                }
            ]
        };
        
        myChart.setOption(option);
        
        // Make chart responsive
        window.addEventListener('resize', function() {
            myChart.resize();
        });
    }
}

function initializeDailyWord() {
    const dailyWords = [
        {
            word: 'Eloquent',
            pronunciation: '/ˈeləkwənt/',
            meaning: 'Having or showing the ability to use language clearly and effectively.',
            example: 'She gave an eloquent speech that moved the entire audience.'
        },
        {
            word: 'Serendipity',
            pronunciation: '/ˌserənˈdipədē/',
            meaning: 'The occurrence and development of events by chance in a happy or beneficial way.',
            example: 'A fortunate stroke of serendipity brought the two old friends together.'
        },
        {
            word: 'Perspicacious',
            pronunciation: '/ˌpərspəˈkāSHəs/',
            meaning: 'Having a ready insight into and understanding of things.',
            example: 'The perspicacious detective quickly solved the complex case.'
        }
    ];
    
    // Select random word for the day
    const today = new Date().getDate();
    const wordOfDay = dailyWords[today % dailyWords.length];
    
    // Update DOM elements if they exist
    const wordElement = document.getElementById('daily-word');
    const pronunciationElement = document.getElementById('daily-pronunciation');
    const meaningElement = document.getElementById('daily-meaning');
    const exampleElement = document.getElementById('daily-example');
    
    if (wordElement) wordElement.textContent = wordOfDay.word;
    if (pronunciationElement) pronunciationElement.textContent = wordOfDay.pronunciation;
    if (meaningElement) meaningElement.textContent = wordOfDay.meaning;
    if (exampleElement) exampleElement.textContent = wordOfDay.example;
}

// ===== VOCABULARY PAGE FUNCTIONALITY =====

function initializeVocabularyPage() {
    // Initialize flashcards
    initializeFlashcards();
    
    // Set up search functionality
    initializeVocabularySearch();
    
    // Initialize category filters
    initializeCategoryFilters();
    
    // Populate word list
    populateWordList();
    
    // Set up flashcard controls
    initializeFlashcardControls();
}

function initializeFlashcards() {
    const flashcardsData = [
        {
            word: 'Eloquent',
            pronunciation: '/ˈeləkwənt/',
            meaning: 'Having or showing the ability to use language clearly and effectively.',
            example: 'She gave an eloquent speech that moved the entire audience.',
            category: 'academic',
            difficulty: 'advanced'
        },
        {
            word: 'Ubiquitous',
            pronunciation: '/yo͞oˈbikwədəs/',
            meaning: 'Present, appearing, or found everywhere.',
            example: 'Smartphones have become ubiquitous in modern society.',
            category: 'daily',
            difficulty: 'intermediate'
        },
        {
            word: 'Meticulous',
            pronunciation: '/məˈtikyələs/',
            meaning: 'Showing great attention to detail; very careful and precise.',
            example: 'The scientist was meticulous in recording every observation.',
            category: 'business',
            difficulty: 'intermediate'
        },
        {
            word: 'Resilient',
            pronunciation: '/rəˈzilyənt/',
            meaning: 'Able to withstand or recover quickly from difficult conditions.',
            example: 'The resilient community rebuilt after the natural disaster.',
            category: 'social',
            difficulty: 'intermediate'
        },
        {
            word: 'Itinerary',
            pronunciation: '/īˈtinəˌrerē/',
            meaning: 'A planned route or journey.',
            example: 'Our travel itinerary includes stops in Paris and Rome.',
            category: 'travel',
            difficulty: 'beginner'
        }
    ];
    
    window.flashcardsData = flashcardsData;
    updateFlashcardDisplay();
}

function updateFlashcardDisplay() {
    const currentCard = window.flashcardsData[currentFlashcardIndex];
    
    const wordElement = document.getElementById('flashcard-word');
    const pronunciationElement = document.getElementById('flashcard-pronunciation');
    const meaningElement = document.getElementById('flashcard-meaning');
    const exampleElement = document.getElementById('flashcard-example');
    
    if (wordElement) wordElement.textContent = currentCard.word;
    if (pronunciationElement) pronunciationElement.textContent = currentCard.pronunciation;
    if (meaningElement) meaningElement.textContent = currentCard.meaning;
    if (exampleElement) exampleElement.textContent = currentCard.example;
}

function flipCard() {
    const flashcard = document.getElementById('main-flashcard');
    if (flashcard) {
        flashcard.classList.toggle('flipped');
    }
}

function nextCard() {
    currentFlashcardIndex = (currentFlashcardIndex + 1) % window.flashcardsData.length;
    updateFlashcardDisplay();
    
    // Reset flip state
    const flashcard = document.getElementById('main-flashcard');
    if (flashcard) {
        flashcard.classList.remove('flipped');
    }
}

function prevCard() {
    currentFlashcardIndex = currentFlashcardIndex === 0 ? 
        window.flashcardsData.length - 1 : currentFlashcardIndex - 1;
    updateFlashcardDisplay();
    
    // Reset flip state
    const flashcard = document.getElementById('main-flashcard');
    if (flashcard) {
        flashcard.classList.remove('flipped');
    }
}

function initializeVocabularySearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            filterWords(query);
        });
    }
}

function filterWords(query) {
    const wordItems = document.querySelectorAll('.word-item');
    wordItems.forEach(item => {
        const wordText = item.textContent.toLowerCase();
        if (wordText.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function initializeCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-filter');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterWordsByCategory(category);
        });
    });
}

function filterWordsByCategory(category) {
    // This would filter the word list based on category
    console.log('Filtering by category:', category);
}

function populateWordList() {
    const wordListContainer = document.getElementById('word-list');
    if (!wordListContainer) return;
    
    const words = [
        { word: 'Beautiful', type: 'adjective', meaning: 'Pleasing to look at' },
        { word: 'Quickly', type: 'adverb', meaning: 'In a fast manner' },
        { word: 'Discover', type: 'verb', meaning: 'To find something new' },
        { word: 'Knowledge', type: 'noun', meaning: 'Information and understanding' },
        { word: 'Important', type: 'adjective', meaning: 'Having great significance' },
        
  { word: 'Achieve', type: 'verb', meaning: 'Kisi goal ko poora karna' },
  { word: 'Adapt', type: 'verb', meaning: 'Naye situation mein dhal jaana' },
  { word: 'Admire', type: 'verb', meaning: 'Kisi ki tareef karna' },
  { word: 'Aggressive', type: 'adjective', meaning: 'Tez ya ladne wala behavior' },
  { word: 'Ambition', type: 'noun', meaning: 'Bada sapna ya ichha' },

  { word: 'Analyze', type: 'verb', meaning: 'Dhyaan se jaanchna' },
  { word: 'Ancient', type: 'adjective', meaning: 'Bahut purana' },
  { word: 'Anxiety', type: 'noun', meaning: 'Chinta ya ghabrahat' },
  { word: 'Approve', type: 'verb', meaning: 'Manzoori dena' },
  { word: 'Appropriate', type: 'adjective', meaning: 'Sahi ya upyukt' },

  { word: 'Barrier', type: 'noun', meaning: 'Rukawat ya badha' },
  { word: 'Brief', type: 'adjective', meaning: 'Chhota ya jaldi khatam hone wala' },
  { word: 'Calculate', type: 'verb', meaning: 'Hisab lagana' },
  { word: 'Capacity', type: 'noun', meaning: 'Kshamta ya limit' },
  { word: 'Challenge', type: 'noun', meaning: 'Mushkil kaam ya chunauti' },

  { word: 'Combine', type: 'verb', meaning: 'Jodna ya ek saath lana' },
  { word: 'Comfort', type: 'noun', meaning: 'Aaram ya sukoon' },
  { word: 'Commit', type: 'verb', meaning: 'Vachan dena ya tay rehna' },
  { word: 'Community', type: 'noun', meaning: 'Ek group jo saath rehta ho' },
  { word: 'Compete', type: 'verb', meaning: 'Muqabla karna' },

  { word: 'Complex', type: 'adjective', meaning: 'Jatil ya samajhne mein mushkil' },
  { word: 'Confident', type: 'adjective', meaning: 'Atmavishwas wala' },
  { word: 'Confirm', type: 'verb', meaning: 'Pakka karna ya verify karna' },
  { word: 'Consequences', type: 'noun', meaning: 'Kisi kaam ka nateeja' },
  { word: 'Consistent', type: 'adjective', meaning: 'Lagatar ek jaisa' },

  { word: 'Construct', type: 'verb', meaning: 'Banana ya tayar karna' },
  { word: 'Convince', type: 'verb', meaning: 'Manana ya samjhana' },
  { word: 'Courage', type: 'noun', meaning: 'Himmat ya bahaduri' },
  { word: 'Creative', type: 'adjective', meaning: 'Naye ideas banana' },
  { word: 'Crisis', type: 'noun', meaning: 'Sankat ya mushkil time' },

  { word: 'Decision', type: 'noun', meaning: 'Faisla ya choice' },
  { word: 'Declare', type: 'verb', meaning: 'Ghoshna karna' },
  { word: 'Delight', type: 'noun', meaning: 'Badi khushi' },
  { word: 'Demand', type: 'noun', meaning: 'Zor ki maang' },
  { word: 'Demonstrate', type: 'verb', meaning: 'Dikhakar samjhana' },

  { word: 'Determine', type: 'verb', meaning: 'Tay karna' },
  { word: 'Develop', type: 'verb', meaning: 'Vikas karna ya improve karna' },
  { word: 'Devote', type: 'verb', meaning: 'Samay ya mehnat dena' },
  { word: 'Dignity', type: 'noun', meaning: 'Samman ya self-respect' },
  { word: 'Disaster', type: 'noun', meaning: 'Badi tabahi' },

  { word: 'Discipline', type: 'noun', meaning: 'Anushasan ya niyam follow karna' },
  { word: 'Discover', type: 'verb', meaning: 'Kuch naya dhundhna' },
  { word: 'Display', type: 'verb', meaning: 'Dikhana ya present karna' },
  { word: 'Distribute', type: 'verb', meaning: 'Baantna' },
  { word: 'Disturb', type: 'verb', meaning: 'Tangles karna ya pareshan karna' },

  { word: 'Efficient', type: 'adjective', meaning: 'Kam time mein sahi kaam karna' },
  { word: 'Element', type: 'noun', meaning: 'Hissa ya bhaag' },
  { word: 'Embarrass', type: 'verb', meaning: 'Sharminda karna' },
  { word: 'Emphasize', type: 'verb', meaning: 'Zor dena' },
  { word: 'Encourage', type: 'verb', meaning: 'Himmat badhana' },

  { word: 'Energy', type: 'noun', meaning: 'Takaat ya urja' },
  { word: 'Enhance', type: 'verb', meaning: 'Behtar banana' },
  { word: 'Essential', type: 'adjective', meaning: 'Bahut zaroori' },
  { word: 'Establish', type: 'verb', meaning: 'Sthaapna karna' },
  { word: 'Evaluate', type: 'verb', meaning: 'Jaanch karna' },

  { word: 'Exhausted', type: 'adjective', meaning: 'Bahut thaka hua' },
  { word: 'Expand', type: 'verb', meaning: 'Badhna ya failna' },
  { word: 'Experience', type: 'noun', meaning: 'Anubhav' },
  { word: 'Explain', type: 'verb', meaning: 'Samjhana' },
  { word: 'Explore', type: 'verb', meaning: 'Khojna ya jaanchna' },

  { word: 'Familiar', type: 'adjective', meaning: 'Jana-pehchana' },
  { word: 'Fascinating', type: 'adjective', meaning: 'Bahut interesting' },
  { word: 'Flexible', type: 'adjective', meaning: 'Jhukne ya badalne wala' },
  { word: 'Focus', type: 'verb', meaning: 'Dhyaan lagana' },
  { word: 'Frighten', type: 'verb', meaning: 'Darrana' },

  { word: 'Generate', type: 'verb', meaning: 'Paida karna' },
  { word: 'Genuine', type: 'adjective', meaning: 'Asli ya sachcha' },
  { word: 'Glorious', type: 'adjective', meaning: 'Shandar ya khoobsurat' },
  { word: 'Guarantee', type: 'noun', meaning: 'Pakka vada' },
  { word: 'Guidance', type: 'noun', meaning: 'Margdarshan' },

  { word: 'Habitat', type: 'noun', meaning: 'Rehne ki jagah' },
  { word: 'Hesitate', type: 'verb', meaning: 'Hichkichana' },
  { word: 'Historic', type: 'adjective', meaning: 'Itihaas se juda hua' },
  { word: 'Honor', type: 'noun', meaning: 'Samman' },
  { word: 'Humble', type: 'adjective', meaning: 'Vinarm ya simple' },

  { word: 'Identify', type: 'verb', meaning: 'Pehchaan karna' },
  { word: 'Ignore', type: 'verb', meaning: 'Nazarandaaz karna' },
  { word: 'Impact', type: 'noun', meaning: 'Asar ya prabhav' },
  { word: 'Impress', type: 'verb', meaning: 'Prabhavit karna' },
  { word: 'Improve', type: 'verb', meaning: 'Behtar banana' },

  { word: 'Inspire', type: 'verb', meaning: 'Prerit karna' },
  { word: 'Intelligent', type: 'adjective', meaning: 'Hoshiyaar ya samajhdaar' },
  { word: 'Interrupt', type: 'verb', meaning: 'Beech mein rokna' },
  { word: 'Introduce', type: 'verb', meaning: 'Parichay karana' },
  { word: 'Involve', type: 'verb', meaning: 'Shaamil karna' },
  
  { word: 'Abandon', type: 'verb', meaning: 'Chhod dena ya give up karna' },
  { word: 'Abolish', type: 'verb', meaning: 'Khatm kar dena' },
  { word: 'Accelerate', type: 'verb', meaning: 'Tez karna' },
  { word: 'Accessible', type: 'adjective', meaning: 'Aasaan se pahunchne layak' },
  { word: 'Accomplish', type: 'verb', meaning: 'Pura karna' },

  { word: 'Accountable', type: 'adjective', meaning: 'Jis par zimmedari ho' },
  { word: 'Accumulate', type: 'verb', meaning: 'Ikatthe karna' },
  { word: 'Accurate', type: 'adjective', meaning: 'Bilkul sahi' },
  { word: 'Accuse', type: 'verb', meaning: 'Ilzaam lagana' },
  { word: 'Adapt', type: 'verb', meaning: 'Adjust ho jaana' },

  { word: 'Addict', type: 'noun', meaning: 'Aadat pad chuki ho kisi cheez ki' },
  { word: 'Adequate', type: 'adjective', meaning: 'Kaafi matra mein' },
  { word: 'Adjacent', type: 'adjective', meaning: 'Bilkul paas wala' },
  { word: 'Admire', type: 'verb', meaning: 'Tareef karna' },
  { word: 'Adore', type: 'verb', meaning: 'Bahut pyaar karna' },

  { word: 'Advance', type: 'verb', meaning: 'Aage badhna' },
  { word: 'Adventurous', type: 'adjective', meaning: 'Risk lene wala ya exciting' },
  { word: 'Advocate', type: 'verb', meaning: 'Samarthan karna' },
  { word: 'Affection', type: 'noun', meaning: 'Pyaar ya lagav' },
  { word: 'Affirm', type: 'verb', meaning: 'Confirm karna' },

  { word: 'Agitate', type: 'verb', meaning: 'Bechain ya pareshaan karna' },
  { word: 'Alert', type: 'adjective', meaning: 'Hoshiyar ya saavdhan' },
  { word: 'Allocate', type: 'verb', meaning: 'Baantna ya assign karna' },
  { word: 'Allow', type: 'verb', meaning: 'Ijazat dena' },
  { word: 'Alter', type: 'verb', meaning: 'Badalna' },

  { word: 'Amend', type: 'verb', meaning: 'Sudhaar karna' },
  { word: 'Amaze', type: 'verb', meaning: 'Hairan kar dena' },
  { word: 'Ambitious', type: 'adjective', meaning: 'Bada sapna rakhne wala' },
  { word: 'Analyze', type: 'verb', meaning: 'Gehraai se jaanchna' },
  { word: 'Ancient', type: 'adjective', meaning: 'Bahut purana' },

  { word: 'Announce', type: 'verb', meaning: 'Ailan karna' },
  { word: 'Anticipate', type: 'verb', meaning: 'Pehle se soch lena' },
  { word: 'Anxiety', type: 'noun', meaning: 'Bechaini ya ghabrahat' },
  { word: 'Appeal', type: 'verb', meaning: 'Vinati ya request karna' },
  { word: 'Approve', type: 'verb', meaning: 'Sahmati dena' },

  { word: 'Arise', type: 'verb', meaning: 'Uthna ya shuru hona' },
  { word: 'Arrange', type: 'verb', meaning: 'Sahi tarah se rakhna' },
  { word: 'Arrogant', type: 'adjective', meaning: 'Ghamandi ya over-confident' },
  { word: 'Ascend', type: 'verb', meaning: 'Upar chadhna' },
  { word: 'Assert', type: 'verb', meaning: 'Dabav ke sath bolna' },

  { word: 'Assess', type: 'verb', meaning: 'Jaanchna ya evaluate karna' },
  { word: 'Assign', type: 'verb', meaning: 'Kaam dena' },
  { word: 'Assist', type: 'verb', meaning: 'Madad karna' },
  { word: 'Assure', type: 'verb', meaning: 'Yakeen dilana' },
  { word: 'Attach', type: 'verb', meaning: 'Jod dena' },

  { word: 'Attain', type: 'verb', meaning: 'Prapt karna' },
  { word: 'Attempt', type: 'verb', meaning: 'Koshish karna' },
  { word: 'Attract', type: 'verb', meaning: 'Aakarshit karna' },
  { word: 'Attribute', type: 'noun', meaning: 'Khasiyat ya guna' },
  { word: 'Authorize', type: 'verb', meaning: 'Permission dena' },

  { word: 'Awkward', type: 'adjective', meaning: 'Thoda uljhan wala ya odd lagne wala' },
  { word: 'Balance', type: 'noun', meaning: 'Santulan ya barabari' },
  { word: 'Ban', type: 'verb', meaning: 'Rok lagana' },
  { word: 'Barrier', type: 'noun', meaning: 'Rukawat' },
  { word: 'Battle', type: 'noun', meaning: 'Ladai ya sangharsh' },

  { word: 'Behold', type: 'verb', meaning: 'Dhyaan se dekhna' },
  { word: 'Belong', type: 'verb', meaning: 'Kisi jagah ya group ka hissa hona' },
  { word: 'Benefactor', type: 'noun', meaning: 'Madad karne wala' },
  { word: 'Betray', type: 'verb', meaning: 'Dhokha dena' },
  { word: 'Bewilder', type: 'verb', meaning: 'Confuse kar dena' },

  { word: 'Bizarre', type: 'adjective', meaning: 'Bahut ajeeb' },
  { word: 'Boost', type: 'verb', meaning: 'Badhaava dena' },
  { word: 'Bounce', type: 'verb', meaning: 'Uchhalna' },
  { word: 'Brag', type: 'verb', meaning: 'Shekhi marna' },
  { word: 'Breach', type: 'verb', meaning: 'Todna ya violate karna' },

  { word: 'Broaden', type: 'verb', meaning: 'Vishtar karna' },
  { word: 'Burst', type: 'verb', meaning: 'Phat jana' },
  { word: 'Calculate', type: 'verb', meaning: 'Hisab lagana' },
  { word: 'Calm', type: 'adjective', meaning: 'Shaant' },
  { word: 'Capture', type: 'verb', meaning: 'Pakad lena' },

  { word: 'Cease', type: 'verb', meaning: 'Band karna' },
  { word: 'Challenge', type: 'noun', meaning: 'Mushkil kaam ya takkar' },
  { word: 'Chaos', type: 'noun', meaning: 'Gadbad ya afra tafri' },
  { word: 'Cherish', type: 'verb', meaning: 'Dil se sambhalna ya enjoy karna' },
  { word: 'Circumstance', type: 'noun', meaning: 'Paristhiti' },

  { word: 'Circulate', type: 'verb', meaning: 'Ghumna ya phailna' },
  { word: 'Civil', type: 'adjective', meaning: 'Sabhyata se bharpur' },
  { word: 'Clarify', type: 'verb', meaning: 'Clear karna' },
  { word: 'Clash', type: 'noun', meaning: 'Takrav ya jhagad' },
  { word: 'Classify', type: 'verb', meaning: 'Vargikaran karna' },

  { word: 'Cling', type: 'verb', meaning: 'Chipakna' },
  { word: 'Collapse', type: 'verb', meaning: 'Gir jana' },
  { word: 'Combine', type: 'verb', meaning: 'Jodna' },
  { word: 'Comfort', type: 'noun', meaning: 'Sukoon ya rahat' },
  { word: 'Command', type: 'verb', meaning: 'Aadesh dena' },

  { word: 'Commence', type: 'verb', meaning: 'Shuru karna' },
  { word: 'Commit', type: 'verb', meaning: 'Wada karna ya lagan se kaam karna' },
  { word: 'Communicate', type: 'verb', meaning: 'Baatein karna ya sampark karna' },
  { word: 'Compare', type: 'verb', meaning: 'Tulna karna' },
  { word: 'Compel', type: 'verb', meaning: 'Majboor karna' },

  { word: 'Compensate', type: 'verb', meaning: 'Badla dena ya bharpai karna' },
  { word: 'Compile', type: 'verb', meaning: 'Ikatthe karna' },
  { word: 'Comply', type: 'verb', meaning: 'Niyam maanana' },
  { word: 'Compose', type: 'verb', meaning: 'Banana ya rachna' },
  { word: 'Comprehend', type: 'verb', meaning: 'Samajhna' },

  { word: 'Concentrate', type: 'verb', meaning: 'Dhyaan lagana' },
  { word: 'Conclude', type: 'verb', meaning: 'Nateeja nikalna' },
  { word: 'Condemn', type: 'verb', meaning: 'Ninda karna' },
  { word: 'Confer', type: 'verb', meaning: 'Vichaar karna' },
  { word: 'Confess', type: 'verb', meaning: 'Sammati se sach batana' },

  { word: 'Confront', type: 'verb', meaning: 'Samna karna' },
  { word: 'Conserve', type: 'verb', meaning: 'Bachana ya preserve karna' },
  { word: 'Consist', type: 'verb', meaning: 'Banaya hona kisi se' },
  { word: 'Consolidate', type: 'verb', meaning: 'Majboot banana ya jodna' },
  { word: 'Constitution', type: 'noun', meaning: 'Sansad dwara bana niyam' },

  { word: 'Construct', type: 'verb', meaning: 'Banana ya nirman karna' },
  { word: 'Consult', type: 'verb', meaning: 'Salaah lena' },
  { word: 'Contain', type: 'verb', meaning: 'Samaana ya rakha hona' },
  { word: 'Contaminate', type: 'verb', meaning: 'Ganda kar dena' },
  { word: 'Contemplate', type: 'verb', meaning: 'Gehraai se sochna' },

  { word: 'Contest', type: 'verb', meaning: 'Takraar karna ya compete karna' },
  { word: 'Continue', type: 'verb', meaning: 'Jari rakhna' },
  { word: 'Contract', type: 'noun', meaning: 'Kanooni agreement' },
  { word: 'Contradict', type: 'verb', meaning: 'Ultal bolna ya oppose karna' },
  { word: 'Contribute', type: 'verb', meaning: 'Yogdaan dena' },

  { word: 'Coordinate', type: 'verb', meaning: 'Milkar kaam karna' },
  { word: 'Corrupt', type: 'adjective', meaning: 'Beimaan ya bhrasht' },
  { word: 'Counsel', type: 'verb', meaning: 'Salaah dena' },
  { word: 'Counter', type: 'verb', meaning: 'Ulta jawaab dena ya rokna' },
  { word: 'Courage', type: 'noun', meaning: 'Himmat' },

  { word: 'Courtesy', type: 'noun', meaning: 'Vinarmata aur tameez' },
  { word: 'Crisis', type: 'noun', meaning: 'Bahut mushkil halat' },
  { word: 'Crucial', type: 'adjective', meaning: 'Bahut zaroori' },
  { word: 'Cultivate', type: 'verb', meaning: 'Vikas karna ya ugana' },
  { word: 'Cure', type: 'verb', meaning: 'Ilaj karna' },

  { word: 'Customize', type: 'verb', meaning: 'Apni need ke hisab se badalna' },
  { word: 'Dazzle', type: 'verb', meaning: 'Jhakmaar roshni se chonka dena' },
  { word: 'Debate', type: 'noun', meaning: 'Bahas' },
  { word: 'Decay', type: 'verb', meaning: 'Galna ya kharab hona' },
  { word: 'Deceive', type: 'verb', meaning: 'Dhokha dena' },


  { word: 'Declare', type: 'verb', meaning: 'Officially announce karna' },
  { word: 'Dedicate', type: 'verb', meaning: 'Samarpit karna' },
  { word: 'Deficit', type: 'noun', meaning: 'Kami ya shortage' },
  { word: 'Delegate', type: 'verb', meaning: 'Kaam dusre ko saunp dena' },
  { word: 'Deliberate', type: 'adjective', meaning: 'Soch samajh kar kiya hua' },

  { word: 'Delight', type: 'noun', meaning: 'Khushi ya anand' },
  { word: 'Demand', type: 'verb', meaning: 'Zor se maang karna' },
  { word: 'Demolish', type: 'verb', meaning: 'Tod kar gira dena' },
  { word: 'Demonstrate', type: 'verb', meaning: 'Karke dikhana' },
  { word: 'Deny', type: 'verb', meaning: 'Mana kar dena' },

  { word: 'Depart', type: 'verb', meaning: 'Ravangi karna ya nikalna' },
  { word: 'Depend', type: 'verb', meaning: 'Nirbhar hona' },
  { word: 'Depict', type: 'verb', meaning: 'Dikhana ya portray karna' },
  { word: 'Deprive', type: 'verb', meaning: 'Door rakhna ya vanchit karna' },
  { word: 'Derive', type: 'verb', meaning: 'Nikalna ya prapt karna' },

  { word: 'Descend', type: 'verb', meaning: 'Neeche utarna' },
  { word: 'Desire', type: 'noun', meaning: 'Ichha ya strong want' },
  { word: 'Despair', type: 'noun', meaning: 'Niraasha' },
  { word: 'Destroy', type: 'verb', meaning: 'Nuksaan pahuncha kar khatam kar dena' },
  { word: 'Detach', type: 'verb', meaning: 'Alag karna' },

  { word: 'Determine', type: 'verb', meaning: 'Faisla lena ya nishchit karna' },
  { word: 'Devastate', type: 'verb', meaning: 'Poora barbad kar dena' },
  { word: 'Devote', type: 'verb', meaning: 'Pure mann se samarpit karna' },
  { word: 'Diagnose', type: 'verb', meaning: 'Bimari ka pata lagana' },
  { word: 'Differentiate', type: 'verb', meaning: 'Farq pehchanna' },

  { word: 'Dignity', type: 'noun', meaning: 'Samman' },
  { word: 'Diminish', type: 'verb', meaning: 'Kam hona ya karna' },
  { word: 'Disappoint', type: 'verb', meaning: 'Niraash kar dena' },
  { word: 'Disaster', type: 'noun', meaning: 'Tabahi' },
  { word: 'Discipline', type: 'noun', meaning: 'Anushasan' },

  { word: 'Disclose', type: 'verb', meaning: 'Raaz batana' },
  { word: 'Discriminate', type: 'verb', meaning: 'Bhedbhaav karna' },
  { word: 'Discuss', type: 'verb', meaning: 'Baatchit karna' },
  { word: 'Disguise', type: 'verb', meaning: 'Bhes badalna' },
  { word: 'Dismantle', type: 'verb', meaning: 'Todhna ya alag karna' },

  { word: 'Dismiss', type: 'verb', meaning: 'Reject ya hata dena' },
  { word: 'Display', type: 'verb', meaning: 'Dikhana' },
  { word: 'Dispose', type: 'verb', meaning: 'Fenk dena ya chutkaara paana' },
  { word: 'Dissolve', type: 'verb', meaning: 'Ghulna ya khatam ho jana' },
  { word: 'Distribute', type: 'verb', meaning: 'Baantna' },

  { word: 'Diverse', type: 'adjective', meaning: 'Alag-alag tarah ka' },
  { word: 'Divert', type: 'verb', meaning: 'Rasta ya dhyaan badal dena' },
  { word: 'Dominate', type: 'verb', meaning: 'Control karna' },
  { word: 'Donate', type: 'verb', meaning: 'Daan dena' },
  { word: 'Doubtful', type: 'adjective', meaning: 'Shakki ya unsure' },

  { word: 'Draft', type: 'noun', meaning: 'Rough version ya khaka' },
  { word: 'Drastic', type: 'adjective', meaning: 'Bahut teekha ya strong effect wala' },
  { word: 'Duplicate', type: 'verb', meaning: 'Copy banana' },
  { word: 'Duration', type: 'noun', meaning: 'Kitne time tak' },
  { word: 'Dwell', type: 'verb', meaning: 'Rehna ya soch mein atka rehna' },

  { word: 'Eager', type: 'adjective', meaning: 'Bahut utsuk' },
  { word: 'Ease', type: 'noun', meaning: 'Aaram ya aasani' },
  { word: 'Economize', type: 'verb', meaning: 'Paise bachana' },
  { word: 'Educate', type: 'verb', meaning: 'Siksha dena' },
  { word: 'Efficient', type: 'adjective', meaning: 'Kam mehnat mein zyada output' },

  { word: 'Elaborate', type: 'verb', meaning: 'Detail mein batana' },
  { word: 'Elevate', type: 'verb', meaning: 'Upar uthana ya badaana' },
  { word: 'Eliminate', type: 'verb', meaning: 'Hata dena ya khatam karna' },
  { word: 'Embarrass', type: 'verb', meaning: 'Sharminada karna' },
  { word: 'Emphasize', type: 'verb', meaning: 'Zor dena' },

  { word: 'Empower', type: 'verb', meaning: 'Shakti dena ya strong banana' },
  { word: 'Enable', type: 'verb', meaning: 'Sambhav banana' },
  { word: 'Encounter', type: 'verb', meaning: 'Samna karna' },
  { word: 'Encourage', type: 'verb', meaning: 'Himmat badhana' },
  { word: 'Endanger', type: 'verb', meaning: 'Khatre mein daalna' },

  { word: 'Endorse', type: 'verb', meaning: 'Support ya recommend karna' },
  { word: 'Endure', type: 'verb', meaning: 'Sahan karna' },
  { word: 'Enhance', type: 'verb', meaning: 'Sudhaar karna' },
  { word: 'Enlighten', type: 'verb', meaning: 'Gyaan dena' },
  { word: 'Enrich', type: 'verb', meaning: 'Aur behtar banana' },

  { word: 'Entertain', type: 'verb', meaning: 'Manoranjan karna' },
  { word: 'Enforce', type: 'verb', meaning: 'Zabardasti lagu karna' },
  { word: 'Ensure', type: 'verb', meaning: 'Pakka karna' },
  { word: 'Entitle', type: 'verb', meaning: 'Haqq dena' },
  { word: 'Envy', type: 'noun', meaning: 'Jalan ya jealousy' },

  { word: 'Equate', type: 'verb', meaning: 'Barabar karna' },
  { word: 'Equip', type: 'verb', meaning: 'Samaan dena ya ready karna' },
  { word: 'Erode', type: 'verb', meaning: 'Ghiste hue kam hona' },
  { word: 'Errand', type: 'noun', meaning: 'Chhota kaam ya message le jana' },
  { word: 'Establish', type: 'verb', meaning: 'Sthapit karna' },

  { word: 'Estimate', type: 'verb', meaning: 'Andaza lagana' },
  { word: 'Evaluate', type: 'verb', meaning: 'Jaanchna' },
  { word: 'Evaporate', type: 'verb', meaning: 'Udd jana ya bhaap banna' },
  { word: 'Evolve', type: 'verb', meaning: 'Dheere dheere vikas hona' },
  { word: 'Exceed', type: 'verb', meaning: 'Limit se zyada hona' },

  { word: 'Excel', type: 'verb', meaning: 'Bahut achha perform karna' },
  { word: 'Exclude', type: 'verb', meaning: 'Bahaar rakhna' },
  { word: 'Exhaust', type: 'verb', meaning: 'Thaka dena' },
  { word: 'Expand', type: 'verb', meaning: 'Badhaana' },
  { word: 'Expect', type: 'verb', meaning: 'Umeed rakhna' },

  { word: 'Expertise', type: 'noun', meaning: 'Kisi cheez ka high-level gyaan' },
  { word: 'Expire', type: 'verb', meaning: 'Khatam ho jana' },
  { word: 'Explain', type: 'verb', meaning: 'Samjhana' },
  { word: 'Explode', type: 'verb', meaning: 'Phat jana' },
  { word: 'Explore', type: 'verb', meaning: 'Khojna' },

  { word: 'Expose', type: 'verb', meaning: 'Kholna ya saamne lana' },
  { word: 'Extend', type: 'verb', meaning: 'Badaana' },
  { word: 'Extract', type: 'verb', meaning: 'Nikalna' },
  { word: 'Extreme', type: 'adjective', meaning: 'Bahut zyada' },
  { word: 'Fabricate', type: 'verb', meaning: 'Jhut taiyaar karna' },

  { word: 'Facilitate', type: 'verb', meaning: 'Aasaan banana' },
  { word: 'Fascinate', type: 'verb', meaning: 'Aakarshit karna' },
  { word: 'Falter', type: 'verb', meaning: 'Hichkichana' },
  { word: 'Farewell', type: 'noun', meaning: 'Alvida bolna' },
  { word: 'Fatal', type: 'adjective', meaning: 'Maut ya gambhir nuksaan wala' },

  { word: 'Favor', type: 'noun', meaning: 'Madad ya support' },
  { word: 'Feeble', type: 'adjective', meaning: 'Kamzor' },
  { word: 'Fierce', type: 'adjective', meaning: 'Tez ya violent' },
  { word: 'Figure', type: 'verb', meaning: 'Samajh lena' },
  { word: 'Flatter', type: 'verb', meaning: 'Nakal se tareef karna' },

  { word: 'Flawless', type: 'adjective', meaning: 'Bilkul perfect' },
  { word: 'Flourish', type: 'verb', meaning: 'Taraqqi karna' },
  { word: 'Focus', type: 'verb', meaning: 'Dhyaan lagana' },
  { word: 'Forbid', type: 'verb', meaning: 'Mana karna' },
  { word: 'Forecast', type: 'verb', meaning: 'Pehle se batana' },

  { word: 'Forge', type: 'verb', meaning: 'Banana ya strong relation banana' },
  { word: 'Formulate', type: 'verb', meaning: 'Plan banana' },
  { word: 'Fortunate', type: 'adjective', meaning: 'Lucky' },
  { word: 'Foster', type: 'verb', meaning: 'Vikas karna' },
  { word: 'Fragment', type: 'noun', meaning: 'Chhota tukda' },

  { word: 'Frankly', type: 'adverb', meaning: 'Sacchai se' },
  { word: 'Fulfill', type: 'verb', meaning: 'Pura karna' },
  { word: 'Function', type: 'verb', meaning: 'Kaam karna' },
  { word: 'Fundamental', type: 'adjective', meaning: 'Basic ya buniyadi' },
  { word: 'Furious', type: 'adjective', meaning: 'Bahut gussa' },

  { word: 'Regret', type: 'verb', meaning: 'Pachtana ya afsos karna' },
  { word: 'Reinforce', type: 'verb', meaning: 'Aur majboot banana' },
  { word: 'Reject', type: 'verb', meaning: 'Mana kar dena ya swikar na karna' },
  { word: 'Relative', type: 'noun', meaning: 'Rishtedaar' },
  { word: 'Relax', type: 'verb', meaning: 'Aaram karna' },

  { word: 'Reliable', type: 'adjective', meaning: 'Jis par bharosa kiya ja sake' },
  { word: 'Relief', type: 'noun', meaning: 'Sukoon ya rahat' },
  { word: 'Reluctant', type: 'adjective', meaning: 'Mann na hona ya hichkichahat' },
  { word: 'Remarkable', type: 'adjective', meaning: 'Shaandar ya yaadgaar' },
  { word: 'Remedy', type: 'noun', meaning: 'Upay ya ilaaj' },

  { word: 'Remote', type: 'adjective', meaning: 'Door daraz' },
  { word: 'Renew', type: 'verb', meaning: 'Dobara update ya fresh karna' },
  { word: 'Represent', type: 'verb', meaning: 'Pratinidhitv karna' },
  { word: 'Reputation', type: 'noun', meaning: 'Imaandari ya chavi' },
  { word: 'Rescue', type: 'verb', meaning: 'Bachana ya madad karna' },

  { word: 'Research', type: 'noun', meaning: 'Khoj ya adhyan' },
  { word: 'Resemble', type: 'verb', meaning: 'Milta julta hona' },
  { word: 'Reserve', type: 'verb', meaning: 'Book karna ya rakh karna' },
  { word: 'Resident', type: 'noun', meaning: 'Nivaasi' },
  { word: 'Resign', type: 'verb', meaning: 'Naukri chhodna' },

  { word: 'Resist', type: 'verb', meaning: 'Virodh karna ya rokna' },
  { word: 'Resolve', type: 'verb', meaning: 'Samadhan karna' },
  { word: 'Resource', type: 'noun', meaning: 'Saadhan ya upyogi cheez' },
  { word: 'Respect', type: 'verb', meaning: 'Samman dena' },
  { word: 'Restore', type: 'verb', meaning: 'Wapas purani condition mein lana' },

  { word: 'Restrict', type: 'verb', meaning: 'Rokna ya limit karna' },
  { word: 'Result', type: 'noun', meaning: 'Nateeja' },
  { word: 'Retire', type: 'verb', meaning: 'Kaam se alag hona' },
  { word: 'Reveal', type: 'verb', meaning: 'Kholna ya batana' },
  { word: 'Revenue', type: 'noun', meaning: 'Aamdani ya kamai' },

  { word: 'Reverse', type: 'verb', meaning: 'Palatna ya ulta karna' },
  { word: 'Review', type: 'verb', meaning: 'Dobara dekhna ya analyse karna' },
  { word: 'Revolution', type: 'noun', meaning: 'Krantikari parivartan' },
  { word: 'Rigid', type: 'adjective', meaning: 'Kathor ya na badalne wala' },
  { word: 'Rival', type: 'noun', meaning: 'Pratiyogi ya dusman jaisa competitor' },

  { word: 'Sacrifice', type: 'noun', meaning: 'Balidaan' },
  { word: 'Satisfied', type: 'adjective', meaning: 'Khush ya santusht' },
  { word: 'Scattered', type: 'adjective', meaning: 'Idhar-udhar faila hua' },
  { word: 'Schedule', type: 'noun', meaning: 'Time-table ya yojna' },
  { word: 'Scheme', type: 'noun', meaning: 'Yojna ya plan' },

  { word: 'Scholar', type: 'noun', meaning: 'Gyaani ya vidvaan' },
  { word: 'Scope', type: 'noun', meaning: 'Avsar ya sambhavana' },
  { word: 'Scream', type: 'verb', meaning: 'Chillana' },
  { word: 'Secure', type: 'verb', meaning: 'Surakshit karna' },
  { word: 'Select', type: 'verb', meaning: 'Chunana' },

  { word: 'Sensitive', type: 'adjective', meaning: 'Jaldi prabhavit hone wala' },
  { word: 'Severe', type: 'adjective', meaning: 'Bahut kathin ya serious' },
  { word: 'Sincere', type: 'adjective', meaning: 'Dil se imandaari dikhana' },
  { word: 'Situate', type: 'verb', meaning: 'Kisi jagah par rakhna' },
  { word: 'Skeptical', type: 'adjective', meaning: 'Shak karne wala' },

  { word: 'Slight', type: 'adjective', meaning: 'Thoda sa ya halka' },
  { word: 'Solid', type: 'adjective', meaning: 'Mazboot ya thos' },
  { word: 'Solution', type: 'noun', meaning: 'Samadhan' },
  { word: 'Sophisticated', type: 'adjective', meaning: 'Advanced ya classy' },
  { word: 'Specify', type: 'verb', meaning: 'Spasht tarah batana' },

  { word: 'Stable', type: 'adjective', meaning: 'Sthir ya na hilne wala' },
  { word: 'Standard', type: 'noun', meaning: 'Niyamit star' },
  { word: 'Statistic', type: 'noun', meaning: 'Data ya sankhiki' },
  { word: 'Stimulate', type: 'verb', meaning: 'Protsahan dena' },
  { word: 'Strategic', type: 'adjective', meaning: 'Yojna ke hisab se' },

  { word: 'Strengthen', type: 'verb', meaning: 'Mazboot banana' },
  { word: 'Structure', type: 'noun', meaning: 'Banawat ya vyavastha' },
  { word: 'Struggle', type: 'verb', meaning: 'Sangharsh karna' },
  { word: 'Stubborn', type: 'adjective', meaning: 'Ziddi' },
  { word: 'Substantial', type: 'adjective', meaning: 'Kaafi bada ya mahatvapurn' },

  { word: 'Substitute', type: 'noun', meaning: 'Badlaav ya replacement' },
  { word: 'Sufficient', type: 'adjective', meaning: 'Kaafi ya puri matra' },
  { word: 'Summarize', type: 'verb', meaning: 'Chhota sa saar batana' },
  { word: 'Supervise', type: 'verb', meaning: 'Nigrani karna' },
  { word: 'Supportive', type: 'adjective', meaning: 'Madad karne wala' },

  { word: 'Survival', type: 'noun', meaning: 'Zinda rehna ya bachna' },
  { word: 'Suspend', type: 'verb', meaning: 'Temporary rokna' },
  { word: 'Sustain', type: 'verb', meaning: 'Banaaye rakhna' },
  { word: 'Symbolic', type: 'adjective', meaning: 'Prateek roop mein' },
  { word: 'Tactical', type: 'adjective', meaning: 'Chalak yojna se' },

  { word: 'Talent', type: 'noun', meaning: 'Kshamta ya hunar' },
  { word: 'Tension', type: 'noun', meaning: 'Tanav ya chinta' },
  { word: 'Terminate', type: 'verb', meaning: 'Khatam karna' },
  { word: 'Territory', type: 'noun', meaning: 'Kshetra ya area' },
  { word: 'Threaten', type: 'verb', meaning: 'Dhamki dena' },

  { word: 'Tolerate', type: 'verb', meaning: 'Bardaasht karna' },
  { word: 'Toxic', type: 'adjective', meaning: 'Zahreele ya harmful' },
  { word: 'Transform', type: 'verb', meaning: 'Badal dena' },
  { word: 'Transparent', type: 'adjective', meaning: 'Bilkul saaf dikhai dene wala' },
  { word: 'Trigger', type: 'verb', meaning: 'Shuru kar dena ya cause karna' },

  { word: 'Ultimate', type: 'adjective', meaning: 'Antim ya sabse bada' },
  { word: 'Uncertain', type: 'adjective', meaning: 'Pakki jankari na hona' },
  { word: 'Undergo', type: 'verb', meaning: 'Kuch jhelna ya experience karna' },
  { word: 'Uniform', type: 'adjective', meaning: 'Ek jaisa' },
  { word: 'Unique', type: 'adjective', meaning: 'Alag ya khaas' },

  { word: 'Universal', type: 'adjective', meaning: 'Sabke liye ek samaan' },
  { word: 'Urgent', type: 'adjective', meaning: 'Bahut zaroori' },
  { word: 'Vacant', type: 'adjective', meaning: 'Khaali jagah' },
  { word: 'Valid', type: 'adjective', meaning: 'Sahi ya kanooni roop se theek' },
  { word: 'Vanish', type: 'verb', meaning: 'Gaayab ho jaana' },

  { word: 'Vast', type: 'adjective', meaning: 'Bahut bada ya vistrit' },
  { word: 'Venture', type: 'noun', meaning: 'Jua lena ya risky kaam' },
  { word: 'Verbal', type: 'adjective', meaning: 'Boli ya words se juda' },
  { word: 'Vibrant', type: 'adjective', meaning: 'Energetic aur colourful' },
  { word: 'Vicious', type: 'adjective', meaning: 'Bura ya violent' },

  { word: 'Visible', type: 'adjective', meaning: 'Dikhai dene wala' },
  { word: 'Vital', type: 'adjective', meaning: 'Bahut zaroori' },
  { word: 'Voluntary', type: 'adjective', meaning: 'Apni marzi se kiya hua' },
  { word: 'Vulnerable', type: 'adjective', meaning: 'Asani se hurt ho sakne wala' },
  { word: 'Wisdom', type: 'noun', meaning: 'Gyaan aur samajh' }
]




    ;
    
    wordListContainer.innerHTML = '';
    
    words.forEach((wordData, index) => {
        const wordItem = document.createElement('div');
        wordItem.className = 'word-item bg-white rounded-xl p-4 border border-sage-green/20 card-hover';
        wordItem.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <div class="flex items-center space-x-3 mb-2">
                        <h4 class="font-semibold text-deep-charcoal">${wordData.word}</h4>
                        <span class="text-xs bg-sage-green/20 text-sage-green px-2 py-1 rounded-full">${wordData.type}</span>
                    </div>
                    <p class="text-sm text-medium-gray">${wordData.meaning}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button class="p-2 rounded-lg bg-sage-green/10 hover:bg-sage-green/20 transition-colors" onclick="playWordAudio('${wordData.word}')">
                        <svg class="w-4 h-4 text-sage-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                        </svg>
                    </button>
                    <button class="p-2 rounded-lg bg-muted-coral/10 hover:bg-muted-coral/20 transition-colors">
                        <svg class="w-4 h-4 text-muted-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        wordListContainer.appendChild(wordItem);
    });
}

function initializeFlashcardControls() {
    // Shuffle button functionality
    const shuffleBtn = document.getElementById('shuffle-btn');
    if (shuffleBtn) {
        shuffleBtn.addEventListener('click', function() {
            shuffleFlashcards();
        });
    }
}

function shuffleFlashcards() {
    // Fisher-Yates shuffle algorithm
    const array = window.flashcardsData;
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    
    currentFlashcardIndex = 0;
    updateFlashcardDisplay();
    
    // Show shuffle animation
    anime({
        targets: '#main-flashcard',
        rotateY: [0, 180, 360],
        duration: 600,
        easing: 'easeInOutQuad'
    });
}

function markAsKnown() {
    // Add to known words
    showNotification('Word marked as known!', 'success');
    nextCard();
}

function markForReview() {
    // Add to review queue
    showNotification('Word added to review queue!', 'info');
    nextCard();
}

// ===== GRAMMAR PAGE FUNCTIONALITY =====

function initializeGrammarPage() {
    // Initialize tense timeline
    initializeTenseTimeline();
    
    // Load grammar content
    loadGrammarContent();
}

function initializeTenseTimeline() {
    const tensePoints = document.querySelectorAll('.tense-point');
    tensePoints.forEach(point => {
        point.addEventListener('click', function() {
            // Remove active class from all points
            tensePoints.forEach(p => p.classList.remove('active'));
            // Add active class to clicked point
            this.classList.add('active');
            
            const tense = this.dataset.tense;
            currentTense = tense;
            loadTenseContent(tense);
        });
    });
}

function loadTenseContent(tense) {
    // This would load the specific tense content
    console.log('Loading tense content for:', tense);
    
    // Animate content change
    const grammarContent = document.getElementById('grammar-content');
    if (grammarContent) {
        anime({
            targets: grammarContent,
            opacity: [1, 0],
            duration: 300,
            complete: function() {
                // Update content here
                anime({
                    targets: grammarContent,
                    opacity: [0, 1],
                    duration: 300
                });
            }
        });
    }
}

function loadGrammarContent() {
    // Initialize grammar exercises and examples
    console.log('Loading grammar content...');
}

// ===== CONVERSATION PAGE FUNCTIONALITY =====

function initializeConversationPage() {
    // Initialize scenario selection
    initializeScenarioSelection();
    
    // Set up conversation interface
    initializeConversationInterface();
    
    // Initialize voice recording
    initializeVoiceRecording();
}

function initializeScenarioSelection() {
    const scenarioCards = document.querySelectorAll('.scenario-card');
    scenarioCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            scenarioCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            
            const scenario = this.dataset.scenario;
            loadScenario(scenario);
        });
    });
}

function loadScenario(scenario) {
    // Load scenario-specific conversation
    console.log('Loading scenario:', scenario);
    
    const scenarios = {
        restaurant: {
            messages: [
                { sender: 'ai', text: 'Hello! Welcome to our restaurant. Do you have a reservation?' },
                { sender: 'user', text: 'No, I don\'t have a reservation. Do you have a table for two?' },
                { sender: 'ai', text: 'Of course! We have a nice table by the window. Would you like to see the menu?' }
            ]
        },
        airport: {
            messages: [
                { sender: 'ai', text: 'Good morning! May I see your passport and boarding pass, please?' },
                { sender: 'user', text: 'Sure, here you go. Which gate should I go to?' },
                { sender: 'ai', text: 'You\'re at gate 12A. Your flight boards in 30 minutes.' }
            ]
        }
    };
    
    const scenarioData = scenarios[scenario] || scenarios.restaurant;
    updateConversationDisplay(scenarioData.messages);
}

function updateConversationDisplay(messages) {
    const messagesContainer = document.getElementById('conversation-messages');
    if (!messagesContainer) return;
    
    messagesContainer.innerHTML = '';
    
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `conversation-bubble ${message.sender}`;
        messageElement.innerHTML = `<p>${message.text}</p>`;
        messagesContainer.appendChild(messageElement);
    });
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function initializeConversationInterface() {
    const messageInput = document.getElementById('message-input');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    if (!messageInput) return;
    
    const message = messageInput.value.trim();
    if (!message) return;
    
    // Add user message to conversation
    addMessageToConversation('user', message);
    
    // Clear input
    messageInput.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        addMessageToConversation('ai', aiResponse);
    }, 1000);
}

function addMessageToConversation(sender, message) {
    const messagesContainer = document.getElementById('conversation-messages');
    if (!messagesContainer) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `conversation-bubble ${sender}`;
    messageElement.innerHTML = `<p>${message}</p>`;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Animate new message
    anime({
        targets: messageElement,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 300,
        easing: 'easeOutQuad'
    });
}

function generateAIResponse(userMessage) {
    // Simple AI response simulation
    const responses = [
        'That\'s a great point! Tell me more about that.',
        'I understand what you mean. How do you feel about that?',
        'Interesting perspective! What made you think that way?',
        'I see. Can you elaborate on that?',
        'That\'s fascinating! Have you considered other viewpoints?'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

function insertQuickResponse(response) {
    const messageInput = document.getElementById('message-input');
    if (messageInput) {
        messageInput.value = response;
        messageInput.focus();
    }
}

function initializeVoiceRecording() {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        window.speechRecognition = recognition;
        
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            const messageInput = document.getElementById('message-input');
            if (messageInput) {
                messageInput.value = transcript;
            }
            stopRecording();
        };
        
        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            stopRecording();
        };
        
        recognition.onend = function() {
            stopRecording();
        };
    }
}

function toggleRecording() {
    if (!window.speechRecognition) {
        showNotification('Speech recognition not supported in this browser', 'error');
        return;
    }
    
    const recordButton = document.getElementById('record-button');
    const pronunciationWave = document.getElementById('pronunciation-wave');
    
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
}

function startRecording() {
    if (!window.speechRecognition) return;
    
    isRecording = true;
    const recordButton = document.getElementById('record-button');
    const pronunciationWave = document.getElementById('pronunciation-wave');
    
    if (recordButton) {
        recordButton.classList.add('recording');
    }
    
    if (pronunciationWave) {
        pronunciationWave.classList.add('active');
    }
    
    window.speechRecognition.start();
}

function stopRecording() {
    isRecording = false;
    const recordButton = document.getElementById('record-button');
    const pronunciationWave = document.getElementById('pronunciation-wave');
    
    if (recordButton) {
        recordButton.classList.remove('recording');
    }
    
    if (pronunciationWave) {
        pronunciationWave.classList.remove('active');
    }
    
    if (window.speechRecognition) {
        window.speechRecognition.stop();
    }
}

// ===== COMMON FUNCTIONALITY =====

function initializeCommonFeatures() {
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Set up navigation
    initializeNavigation();
    
    // Initialize audio playback
    initializeAudioPlayback();
}

function initializeScrollAnimations() {
    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with animation class
    const animatedElements = document.querySelectorAll('.card-hover, .word-item, .scenario-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function initializeNavigation() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.md\\:hidden button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            // Toggle mobile menu
            console.log('Mobile menu toggled');
        });
    }
}

function initializeAudioPlayback() {
    // This would initialize audio playback functionality
    console.log('Audio playback initialized');
}

// ===== UTILITY FUNCTIONS =====

function playAudio() {
    // Simulate audio playback
    showNotification('Playing audio...', 'info');
}

function playWordAudio(word) {
    // Simulate word audio playback
    showNotification(`Playing pronunciation for "${word}"`, 'info');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-xl shadow-lg transform translate-x-full transition-transform duration-300`;
    
    // Set colors based on type
    switch(type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

function animateOnScroll() {
    // Animate progress ring
    const progressRing = document.querySelector('.progress-ring-circle');
    if (progressRing) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: progressRing,
                        strokeDashoffset: [251.2, 125.6],
                        duration: 1000,
                        easing: 'easeOutQuad'
                    });
                }
            });
        });
        observer.observe(progressRing);
    }
}

// ===== GLOBAL EVENT LISTENERS =====

// Handle window resize
window.addEventListener('resize', function() {
    // Handle responsive adjustments
    console.log('Window resized');
});

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause any ongoing activities
        if (isRecording) {
            stopRecording();
        }
    }
});

// Handle keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Space bar to flip flashcard
    if (e.code === 'Space' && getCurrentPage() === 'vocabulary') {
        e.preventDefault();
        flipCard();
    }
    
    // Arrow keys for navigation
    if (e.code === 'ArrowRight' && getCurrentPage() === 'vocabulary') {
        e.preventDefault();
        nextCard();
    }
    
    if (e.code === 'ArrowLeft' && getCurrentPage() === 'vocabulary') {
        e.preventDefault();
        prevCard();
    }
});
function showPresentContinuous() {
    const content = `
    <div id="present-continuous" class="grammar-section">
        <div class="grammar-card rounded-2xl p-8 mb-8">
        
            <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                    <span class="text-white font-bold">PC</span>
                </div>
                <div>
                    <h2 class="text-2xl font-bold text-deep-charcoal">Present Continuous Tense</h2>
                    <p class="text-medium-gray">For actions happening right now or temporary situations</p>
                </div>
            </div>

            <!-- STRUCTURE -->
            <div class="rule-highlight rounded-xl p-6 mb-6">
                <h3 class="font-semibold text-deep-charcoal mb-3">Structure:</h3>
                <div class="bg-white rounded-lg p-4 font-mono text-blue-600">
                    Subject + am/is/are + Verb(+ing)
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h4 class="font-semibold text-deep-charcoal mb-3">When to Use:</h4>
                    <ul class="space-y-2 text-sm text-medium-gray">

                        <li class="flex items-start">
                            <svg class="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                            </svg>
                            Actions happening now
                        </li>

                        <li class="flex items-start">
                            <svg class="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                            </svg>
                            Temporary situations
                        </li>

                        <li class="flex items-start">
                            <svg class="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                            </svg>
                            Future plans (near future)
                        </li>

                    </ul>
                </div>

                <div>
                    <h4 class="font-semibold text-deep-charcoal mb-3">Time Expressions:</h4>
                    <div class="flex flex-wrap gap-2">
                        <span class="bg-blue-500/20 text-blue-500 px-3 py-1 rounded-full text-xs">now</span>
                        <span class="bg-blue-500/20 text-blue-500 px-3 py-1 rounded-full text-xs">right now</span>
                        <span class="bg-blue-500/20 text-blue-500 px-3 py-1 rounded-full text-xs">currently</span>
                        <span class="bg-blue-500/20 text-blue-500 px-3 py-1 rounded-full text-xs">at the moment</span>
                        <span class="bg-blue-500/20 text-blue-500 px-3 py-1 rounded-full text-xs">these days</span>
                    </div>
                </div>
            </div>

            <!-- EXAMPLES -->
            <div class="example-box rounded-xl p-6">
                <h4 class="font-semibold text-deep-charcoal mb-4">Examples:</h4>

                <div class="space-y-3">
                    <div class="flex items-start space-x-3">
                        <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span class="text-white text-xs font-bold">1</span>
                        </div>
                        <div>
                            <p class="font-medium text-deep-charcoal">I am drinking coffee right now.</p>
                            <p class="text-sm text-medium-gray">Action happening now</p>
                        </div>
                    </div>

                    <div class="flex items-start space-x-3">
                        <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span class="text-white text-xs font-bold">2</span>
                        </div>
                        <div>
                            <p class="font-medium text-deep-charcoal">She is working on a project.</p>
                            <p class="text-sm text-medium-gray">Temporary situation</p>
                        </div>
                    </div>

                    <div class="flex items-start space-x-3">
                        <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span class="text-white text-xs font-bold">3</span>
                        </div>
                        <div>
                            <p class="font-medium text-deep-charcoal">They are meeting us tomorrow.</p>
                            <p class="text-sm text-medium-gray">Planned future action</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
    `;

    document.getElementById("grammar-content").innerHTML = content;
}


// Export functions for global access
window.flipCard = flipCard;
window.nextCard = nextCard;
window.prevCard = prevCard;
window.playAudio = playAudio;
window.playWordAudio = playWordAudio;
window.markAsKnown = markAsKnown;
window.markForReview = markForReview;
window.sendMessage = sendMessage;
window.insertQuickResponse = insertQuickResponse;
window.toggleRecording = toggleRecording;