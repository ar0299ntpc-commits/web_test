// --- DOM Elements ---
const skyLanterns = {
    social: document.querySelector(".skyLantern__social"),
    work: document.querySelector(".skyLantern__work"),
    family: document.querySelector(".skyLantern__family"),
    education: document.querySelector(".skyLantern__education"),
    safe: document.querySelector(".skyLantern__safe"),
    health: document.querySelector(".skyLantern__health"),
    equality: document.querySelector(".skyLantern__equality"),
};

const tab = document.getElementById("tab");
const overlay = document.getElementById("overlay");
const closeIcon = document.getElementById("closeIcon");
const tabLabelsContainer = document.getElementById("tabLabels");
const tabButtonsContainer = document.getElementById("tabButtons");
const tabContentContainer = document.getElementById("tab__content");

// --- Data Mapping ---
const lanternCategoryMap = {
    social: "社會參與",
    work: "就業、經濟與福利",
    family: "人口、婚姻與家庭",
    education: "教育、文化與媒體",
    safe: "人身安全與環境",
    health: "健康、醫療與照顧",
    // 'equality' is not in data.json, so it is omitted here.
};

// --- Initial Setup ---
let siteData = null; // To cache the loaded data

// --- Event Listeners ---
closeIcon.addEventListener("click", closeTab);
overlay.addEventListener("click", closeTab);

// Add click listeners to each sky lantern
for (const lanternKey in lanternCategoryMap) {
    const lanternElement = skyLanterns[lanternKey];
    if (lanternElement) {
        lanternElement.addEventListener("click", () => handleLanternClick(lanternCategoryMap[lanternKey]));
    }
}

// --- Functions ---

/**
 * Main handler for when a sky lantern is clicked.
 * @param {string} category - The category associated with the lantern.
 */
async function handleLanternClick(category) {
    // Load data if not already cached
    if (!siteData) {
        try {
            const response = await fetch("./public/data.json");
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            siteData = await response.json();
        } catch (error) {
            console.error("Could not load or parse data.json:", error);
            tabContentContainer.innerHTML = "<p>資料載入失敗，請稍後再試。</p>";
            openTab();
            return;
        }
    }

    const dataItem = siteData.datas.find(item => item.category === category);

    if (dataItem) {
        clearTabContent();
        createLeftTabs(dataItem);
        openTab();
        // Automatically click the first tab to load initial content
        if (tabLabelsContainer.firstChild) {
            tabLabelsContainer.firstChild.click();
        }
    } else {
        console.warn(`No data found for category: ${category}`);
    }
}

/**
 * Creates the left-side navigation tabs.
 * @param {object} dataItem - The data object for the selected category.
 */
function createLeftTabs(dataItem) {
    const labels = Array.isArray(dataItem.label) ? dataItem.label : [dataItem.label];

    labels.forEach(labelText => {
        const tabButton = document.createElement("button");
        
        // Split the text into two lines based on user's rule
        let mid;
        if (labelText.length > 4 && labelText.length % 6 === 0) {
            mid = 4;
        } else {
            mid = Math.ceil(labelText.length / 2);
        }
        const line1 = labelText.substring(0, mid);
        const line2 = labelText.substring(mid);
        tabButton.innerHTML = `${line1}<br>${line2}`; // Use innerHTML

        tabButton.className = "tab-label"; // For styling

        tabButton.addEventListener("click", () => {
            // Set active state for the clicked tab
            document.querySelectorAll('.tab-label').forEach(btn => btn.classList.remove('active'));
            tabButton.classList.add('active');

            // Clear previous top buttons and content
            tabButtonsContainer.innerHTML = "";
            tabContentContainer.innerHTML = "";

            // Check if this tab has sub-buttons and they are not an empty array
            if (dataItem.button && dataItem.button[labelText] && dataItem.button[labelText].length > 0) {
                tabButtonsContainer.style.display = 'flex'; // Show button container
                createTopButtons(dataItem, labelText);
            } else {
                tabButtonsContainer.style.display = 'none'; // Hide button container
                // If no sub-buttons, just show the content directly
                showContent(dataItem.html[labelText]);
            }
        });
        tabLabelsContainer.appendChild(tabButton);
    });
}

/**
 * Creates the top navigation buttons for a selected left tab.
 * @param {object} dataItem - The data object for the category.
 * @param {string} selectedLabel - The text of the currently active left tab.
 */
function createTopButtons(dataItem, selectedLabel) {
    const buttonLabels = dataItem.button[selectedLabel];
    if (!buttonLabels) return;

    buttonLabels.forEach(buttonText => {
        const topButton = document.createElement("button");
        topButton.textContent = buttonText;
        topButton.className = "tab-button-top"; // For styling

        topButton.addEventListener("click", () => {
            // Set active state for the clicked top button
            document.querySelectorAll('.tab-button-top').forEach(btn => btn.classList.remove('active'));
            topButton.classList.add('active');
            showContent(dataItem.html[buttonText]);
        });
        tabButtonsContainer.appendChild(topButton);
    });

    // Automatically click the first top button
    if (tabButtonsContainer.firstChild) {
        tabButtonsContainer.firstChild.click();
    }
}

/**
 * Renders the final HTML content and executes any scripts within it.
 * @param {string} htmlContent - The HTML string to display.
 */
function showContent(htmlContent) {
    if (typeof htmlContent !== 'string') {
        tabContentContainer.innerHTML = "<p>無此資料</p>";
        return;
    }

    tabContentContainer.innerHTML = htmlContent;
    
    // Re-execute the script tag to make Tableau charts work
    const scriptElement = tabContentContainer.querySelector("script");
    if (scriptElement) {
        const newScript = document.createElement("script");
        if (scriptElement.src) {
            newScript.src = scriptElement.src;
        } else {
            newScript.textContent = scriptElement.textContent;
        }
        // Remove the old script first to avoid re-execution on subsequent loads
        scriptElement.remove(); 
        document.head.appendChild(newScript).onload = () => {
            // Optional: remove the script from head after it has loaded
            newScript.remove();
        };
    }
}

// --- Utility Functions ---

function openTab() {
    tab.style.display = "block";
    overlay.style.display = "block";
}

function closeTab() {
    tab.style.display = "none";
    overlay.style.display = "none";
    clearTabContent();
}

function clearTabContent() {
    tabLabelsContainer.innerHTML = "";
    tabButtonsContainer.innerHTML = "";
    tabContentContainer.innerHTML = "";
}