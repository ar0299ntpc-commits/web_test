// Sky Lantern
const skyLanternSocial = document.querySelector(".skyLantern__social");
const skyLanternWork = document.querySelector(".skyLantern__work");
const skyLanternFamily = document.querySelector(".skyLantern__family");
const skyLanternEducation = document.querySelector(".skyLantern__education");
const skyLanternSafe = document.querySelector(".skyLantern__safe");
const skyLanternHealth = document.querySelector(".skyLantern__health");
const skyLanternEquality = document.querySelector(".skyLantern__equality");

// Tab
const tab = document.getElementById("tab");
const overlay = document.getElementById("overlay");
const closeIcon = document.getElementById("closeIcon");

// Tab - close or open
function closeTab(element){
    element.addEventListener("click" , () => {
        tab.style.display = "none";
        overlay.style.display = "none";
    })
}
function openTab(element){
    element.addEventListener("click" , () => {
        tab.style.display = "block";
        overlay.style.display = "block";
    })
}

openTab(skyLanternSocial);
openTab(skyLanternWork);
openTab(skyLanternFamily);
openTab(skyLanternEducation);
openTab(skyLanternSafe);
openTab(skyLanternHealth);
openTab(skyLanternEquality);
closeTab(closeIcon);

// 載入資料
async function loadData() {
    const response = await fetch("./public/data.json");
    return await response.json();
}

function openTabWithData(element, category) {
    element.addEventListener("click", async () => {
        tab.style.display = "block";
        overlay.style.display = "block";

        const data = await loadData();
        const matched = data.results.filter(item => item.category === category);

        // 左側標籤區
        const tabLabels = document.getElementById("tab-labels");
        tabLabels.innerHTML = "";
        matched.forEach((item, index) => {
            const label = document.createElement("button");
            label.textContent = Array.isArray(item.label) ? item.label.join(" / ") : item.label;
            label.addEventListener("click", () => showContent(item));
            tabLabels.appendChild(label);

            if (index === 0) showContent(item); // 預設載入第一個
        });
    });
}

openTabWithData(skyLanternSocial, "社會參與");
openTabWithData(skyLanternWork, "就業、經濟與福利");
openTabWithData(skyLanternFamily, "人口、婚姻與家庭");
openTabWithData(skyLanternEducation, "教育");
openTabWithData(skyLanternSafe, "安全");
openTabWithData(skyLanternHealth, "健康");
openTabWithData(skyLanternEquality, "性別平等");