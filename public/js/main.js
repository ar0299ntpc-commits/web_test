const skyLanternSocial_text = document.querySelector(".skyLantern__social-text");
const skyLanternWork_text = document.querySelector(".skyLantern__work-text");
const skyLanternFamily_text = document.querySelector(".skyLantern__family-text");
const skyLanternEducation_text = document.querySelector(".skyLantern__education-text");
const skyLanternSafe_text = document.querySelector(".skyLantern__safe-text");
const skyLanternHealth_text = document.querySelector(".skyLantern__health-text");
const skyLanternEquality_text = document.querySelector(".skyLantern__equality-text");

// 滑鼠移入及移出天燈對文字的變化
function addHoverEffect(element, enterSrc, leaveSrc, enterClass) {
  element.addEventListener("mouseenter", () => {
    element.src = enterSrc;
    element.classList.add(enterClass);
  });

  element.addEventListener("mouseleave", () => {
    element.src = leaveSrc;
    element.classList.remove(enterClass);
  });
}

// 平權共生 > 綜合指數
addHoverEffect(
  skyLanternEquality_text,
  "./public/image/文字/文字0_綜合指數.svg",
  "./public/image/文字/文字0_平權共生.svg",
  "skyLantern__equality__mouseenter"
);

// 同心協力 > 社會參與
addHoverEffect(
    skyLanternSocial_text,
    "./public/image/文字/文字1_社會參與.svg",
    "./public/image/文字/文字1_同心協力.svg",
    "skyLantern__social-text__mouseenter"
);

// 工作順利 > 就業、經濟與福利
addHoverEffect(
    skyLanternWork_text,
    "./public/image/文字/文字2_就業.svg",
    "./public/image/文字/文字2_工作順利.svg",
    "skyLantern__work-text__mouseenter"
);

// 家庭和樂 > 人口、婚姻與家庭
addHoverEffect(
    skyLanternFamily_text,
    "./public/image/文字/文字3_人口.svg",
    "./public/image/文字/文字3_家庭和樂.svg",
    "skyLantern__family-text__mouseenter"
);

// 學有所成 > 教育、文化與媒體
addHoverEffect(
    skyLanternEducation_text,
    "./public/image/文字/文字4_教育.svg",
    "./public/image/文字/文字4_學有所成.svg",
    "skyLantern__education-text__mouseenter"
);

// 闔家平安 > 人身安全與環境
addHoverEffect(
    skyLanternSafe_text,
    "./public/image/文字/文字5_人身安全.svg",
    "./public/image/文字/文字5_闔家平安.svg",
    "skyLantern__safe-text__mouseenter"
);

// 永保安康 > 健康、醫療與照顧
addHoverEffect(
    skyLanternHealth_text,
    "./public/image/文字/文字6_健康.svg",
    "./public/image/文字/文字6_永保安康.svg",
    "skyLantern__health-text__mouseenter"
)