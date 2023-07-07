let isSuff = true; // Set suff to true for Sufficent Balance or false for Insufficient Balance
// Get DOM of 2 main boards
const settingDOM = document.querySelector(".board.setting-board");
const printDOM = document.querySelector(".board.print-board");

// update Date and Time per minute
const timeText = document.querySelector(".time-text");

function updateTime() {
    const now = new Date();
    const dateOptions = {
        month: "short",
        day: "numeric",
    };
    const timeOptions = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    };
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeekStr = daysOfWeek[now.getDay()];
    const dateStr = now.toLocaleDateString("en-US", dateOptions);
    const timeStr = now.toLocaleTimeString("en-US", timeOptions);
    const yearStr = now.getFullYear().toString().slice(-2);
    timeText.textContent = `${timeStr} ${dayOfWeekStr} ${dateStr} '${yearStr}`;
}

updateTime();
// setInterval(updateTime, 60000);
setInterval(updateTime, 1000);

// Print Settings
const printSetting = {
    copies: 1,
    pagesType: 0,
    colorType: 0,
    layoutType: 0,
};

const PAGES = ["All", "Current", "Custom"];
const COLORS = ["Grayscale", "Color"];
const LAYOUTS = ["Portrait", "Landscape"];

// Document Settings
const UNITS = ["in", "cm", "mm"];
const PAPERTYPES = ["Plain", "Matte", "Glossy", "Envelope"];
const QUALITIES = ["High", "Standard", "Draft"];

let selectedDocType = "sizeNotSelected"; // sizeNotSelected, sizeEdited, globalSizeSelected, localSizeSelected
let selectedUnit = 0;

const paperSetting = {
    source: 0,
    type: 0, // 0: Plain, 1: Matte, 2: Glossy, 3: Envelope
    quality: 0, // 0: Standard, 1: Draft, 2: High
    twoSided: 0, // 0: ON, 1: OFF
    size: {
        title: "A4",
        width: "210",
        height: "297",
        unit: "mm",
    },
};

const docSizes = [{
        title: "A4",
        width: "210",
        height: "297",
        unit: "mm",
        type: "global",
    },
    {
        title: "10Ã—15cm",
        width: "4",
        height: "6",
        unit: "in",
        type: "local",
    },
    {
        title: "13Ã—18cm",
        width: "5",
        height: "7",
        unit: "in",
        type: "local",
    },
    {
        title: "A6",
        width: "105",
        height: "148",
        unit: "mm",
        type: "global",
    },
    {
        title: "A5",
        width: "148",
        height: "210",
        unit: "mm",
        type: "global",
    },
    {
        title: "B5",
        width: "182",
        height: "257",
        unit: "mm",
        type: "global",
    },
    {
        title: "9Ã—13cm",
        width: "3.5",
        height: "5",
        unit: "in",
        type: "local",
    },
    {
        title: "13Ã—20cm",
        width: "5",
        height: "8",
        unit: "in",
        type: "local",
    },
    {
        title: "20Ã—25cm",
        width: "8",
        height: "10",
        unit: "in",
        type: "local",
    },
    {
        title: "16:9",
        width: "102",
        height: "181",
        unit: "mm",
        type: "local",
    },
    {
        width: "100",
        height: "148",
        unit: "cm",
        type: "local",
    },
    {
        title: "Env #10",
        width: "4.1/2",
        height: "9.1/2",
        unit: "in",
        type: "global",
    },
    {
        title: "Env DL",
        width: "110",
        height: "220",
        unit: "mm",
        type: "global",
    },
    {
        title: "Env C6",
        width: "114",
        height: "162",
        unit: "mm",
        type: "global",
    },
    {
        title: "Letter",
        width: "8.1/2",
        height: "11",
        unit: "in",
        type: "local",
    },
    {
        title: "Legal",
        width: "8.1/2",
        height: "14",
        unit: "in",
        type: "local",
    },
    {
        title: "A3",
        width: "297",
        height: "420",
        unit: "mm",
        type: "global",
    },
    {
        title: "A3+",
        width: "329",
        height: "483",
        unit: "mm",
        type: "global",
    },
    {
        title: "A2",
        width: "420",
        height: "594",
        unit: "mm",
        type: "global",
    },
    {
        title: "B4",
        width: "257",
        height: "364",
        unit: "mm",
        type: "global",
    },
    {
        title: "A3",
        width: "364",
        height: "515",
        unit: "mm",
        type: "global",
    },
];

/* /////////////////////////////////////////////////
///////////////  Print Setting  DOM  ///////////////
///////////////////////////////////////////////// */
const setCopiesDOM = document.getElementById("setting-copies"); // DOM of selectin-copies inputbox
// select Pages Settting DOM
const prevPagesBtn = document.querySelector(".btn-prev.selecting-pages");
const nextPagesBtn = document.querySelector(".btn-next.selecting-pages");
const pagesContents = document.querySelectorAll(".selecting.pages .content");

// select Pages Settting DOM
const prevColorBtn = document.querySelector(".btn-prev.selecting-color");
const nextColorBtn = document.querySelector(".btn-next.selecting-color");
const colorContents = document.querySelectorAll(".selecting.colors .content");

// select Layout Settting DOM
const prevLayoutBtn = document.querySelector(".btn-prev.selecting-layout");
const nextLayoutBtn = document.querySelector(".btn-next.selecting-layout");
const layoutContents = document.querySelectorAll(".selecting.layouts .content");

/* /////////////////////////////////////////////////
///////////////  Paper Setting  DOM  ///////////////
///////////////////////////////////////////////// */
// select Paper Type Settting DOM
const paperTypeDOM = document.querySelector(".item.paper-type");
const paperTypeContents = document.querySelectorAll(
    ".item.paper-type .details"
);

// select Paper Quality Settting DOM
const paperQualityDOM = document.querySelector(".item.paper-quality");
const paperQualityContents = document.querySelectorAll(
    ".item.paper-quality .details"
);

// select 2-Sided Rendering Settting DOM
const paperTwoSidedDOM = document.querySelector(".item.paper-two-sided");
const paperTwoSideContents = document.querySelectorAll(
    ".item.paper-two-sided .details"
);

// select Document Size Customize DOM
const customWidthDOM = document.getElementById("custom-size-width");
const customHeightDOM = document.getElementById("custom-size-height");

const prevUnitBtn = document.querySelector(".btn-prev.selecting-unit");
const nextUnitBtn = document.querySelector(".btn-next.selecting-unit");
const selectUnitDOM = document.querySelector(".unit-selector div");

// select Document Size Setting DOM
const sizeNotSelected = document.querySelector(
    ".dropdown-toggle .item-detail.no-selected"
);
const sizeEdited = document.querySelector(
    ".dropdown-toggle .item-detail.editing"
);
const globalSizeSelected = document.querySelector(
    ".dropdown-toggle .item-detail.global"
);
const localSizeSelected = document.querySelector(
    ".dropdown-toggle .item-detail.local"
);

const dropdownDetailDOM = {
    sizeNotSelected: sizeNotSelected,
    sizeEdited: sizeEdited,
    globalSizeSelected: globalSizeSelected,
    localSizeSelected: localSizeSelected,
};

const dropdownToggleDOM = document.querySelector(".dropdown-toggle");
const dropdown = document.querySelector(".dropdown");
const dropdownMenu = document.querySelector(".dropdown-menu");

const dropdownItemsArea = document.querySelector(".dropdown-items-area");
// Create dropdown items from docSizes array
const dropdownItems = docSizes.map((docSize) => {
    const sizeTitle = docSize.title ?
        `<span class="size-title">${docSize.title}</span>` :
        "";
    const sizeDetails = `<span>${docSize.width}Ã—${docSize.height} ${docSize.unit}</span>`;
    return `<a class="dropdown-item" href="#" data-size-type="${docSize.type}SizeSelected" data-size-title="${docSize.title}" data-size-width="${docSize.width}" data-size-height="${docSize.height}" data-size-unit="${docSize.unit}">
              ${sizeTitle} ${sizeDetails}
            </a>`;
});

// Add custom size dropdown item to the beginning of the dropdown items array
dropdownItems.unshift(
    '<a class="dropdown-item" href="#" data-size-type="sizeEdited" data-size-title="" data-size-width="" data-size-height="" data-size-unit=""><span class="size-title">Custom Size</span></a>'
);

// function to initialize the values
function initialize() {
    settingDOM.style.display = "flex";
    printDOM.style.display = "none";
    setCopiesDOM.value = printSetting.copies;
    pagesContents[printSetting.pagesType].classList.add("active");
    colorContents[printSetting.colorType].classList.add("active");
    layoutContents[printSetting.layoutType].classList.add("active");
    paperTypeContents[paperSetting.type].classList.add("active");
    paperQualityContents[paperSetting.quality].classList.add("active");
    paperTwoSideContents[paperSetting.twoSided].classList.add("active");
    // Add dropdown items to dropdown items area
    dropdownItemsArea.innerHTML = dropdownItems.join("");
    dropdownDetailDOM[selectedDocType].style.display = "block";
    selectUnitDOM.innerHTML = UNITS[selectedUnit];
    // $(".mid-section .mid-modal .mid-modal-main-content").innerHTML("")
    // $(".mid-section .mid-modal .mid-modal-title").innerHTML("")
}

// set the initial value of the input element
window.onload = initialize();

/* ///////////////////////////////////////////
///////////////  PrintSetting  ///////////////
/////////////////////////////////////////// */
// function to increase the value of copies
function increaseCopies() {
    setCopiesDOM.value++;
    updatePreview("preview");
}

// function to decrease the value of copies
function decreaseCopies() {
    if (setCopiesDOM.value > 1) {
        setCopiesDOM.value--;
        updatePreview("preview");
    }
}

// function to change the value of copies by input
function setCopies() {
    console.log("Copy changes!!!");
}

function prevBtnAction(contentsDOM, changeValue) {
    // hide the current content
    contentsDOM[printSetting[changeValue]].classList.remove(
        "active",
        "animate__fadeInRight"
    );

    // update the index
    printSetting[changeValue] =
        (printSetting[changeValue] - 1 + contentsDOM.length) % contentsDOM.length;

    // show the new content
    contentsDOM[printSetting[changeValue]].classList.add(
        "active",
        "animate__fadeInLeft"
    );

    updatePreview("preview");
}

function nextBtnAction(contentsDOM, changeValue) {
    // hide the current content
    contentsDOM[printSetting[changeValue]].classList.remove(
        "active",
        "animate__fadeInLeft"
    );

    // update the index
    printSetting[changeValue] =
        (printSetting[changeValue] + 1 + contentsDOM.length) % contentsDOM.length;

    // show the new content
    contentsDOM[printSetting[changeValue]].classList.add(
        "active",
        "animate__fadeInRight"
    );

    updatePreview("preview");
}

// add event listeners to the Page Selection buttons
prevPagesBtn.addEventListener("click", () =>
    prevBtnAction(pagesContents, "pagesType")
);

nextPagesBtn.addEventListener("click", () =>
    nextBtnAction(pagesContents, "pagesType")
);

// add event listeners to the Color Selection buttons
prevColorBtn.addEventListener("click", () =>
    prevBtnAction(colorContents, "colorType")
);

nextColorBtn.addEventListener("click", () =>
    nextBtnAction(colorContents, "colorType")
);

// add event listeners to the Layout Selection buttons
prevLayoutBtn.addEventListener("click", () =>
    prevBtnAction(layoutContents, "layoutType")
);

nextLayoutBtn.addEventListener("click", () =>
    nextBtnAction(layoutContents, "layoutType")
);

/* ///////////////////////////////////////////
///////////////  PaperSetting  ///////////////
/////////////////////////////////////////// */
function nextContentsAction(contentsDOM, changeValue) {
    // hide the current content
    contentsDOM[paperSetting[changeValue]].classList.remove("active");

    // update the index
    paperSetting[changeValue] =
        (paperSetting[changeValue] + 1) % contentsDOM.length;

    // show the new content
    contentsDOM[paperSetting[changeValue]].classList.add("active");

    updatePreview("preview");
}

paperTypeDOM.addEventListener("click", () =>
    nextContentsAction(paperTypeContents, "type")
);

paperQualityDOM.addEventListener("click", () =>
    nextContentsAction(paperQualityContents, "quality")
);

paperTwoSidedDOM.addEventListener("click", () =>
    nextContentsAction(paperTwoSideContents, "twoSided")
);

// const dropdownDetailDOM = {
//   sizeNotSelected: sizeNotSelected,
//   sizeEdited: sizeEdited,
//   globalSizeSelected: globalSizeSelected,
//   localSizeSelected: localSizeSelected,
// };

// Event listener for dropdown item click
// dropdownItemsArea.addEventListener("click", 
dropdownClick = (event) => {
    event.preventDefault();
    const target = $(event.target).is("a")?$(event.target):$($(event.target).parents("a")[0]);
    // if (target.tagName === "A") {
        const type = target.data("sizeType");

        // dropdownDetailDOM[selectedDocType].style.display = "none";
        selectedDocType = type;
        // dropdownDetailDOM[type].style.display = "block";

        if (type !== "sizeEdited") {
            const width = target.data("sizeWidth");
            const height = target.data("sizeHeight");
            const unit = target.data("sizeUnit");
            const subtitle = width + "X" + height + " " + unit;
            const title = target.data("sizeTitle");

            paperSetting.size = {
                title,
                width,
                height,
                unit,
            };

            if (title === "undefined") {
                dropdownDetailDOM[type].querySelector(".title").innerHTML = subtitle;
            } else {
                dropdownDetailDOM[type].querySelector(".title").innerHTML = title;
                dropdownDetailDOM[type].querySelector(".text").innerHTML = subtitle;
            }
            $(event.target).parents(".mid-modal").toggle(false)
        } else {
            $(event.target).parents(".mid-modal-main-content").off("click")
            $(event.target).parents(".mid-modal").find(".mid-modal-title").html("Custom Size")
            editingCtrl = $("<div class='item-detail editing'><div class='editor'><input type='number' id='custom-size-width' class='use-keyboard-input'placeholder='width' /><span class='font-21'>×</span><input type='number' id='custom-size-height' class='use-keyboard-input'placeholder='height' /></div><div class='error-notifier'></div><div class='unit-selector'><button class='btn-prev selecting-unit'></button><div class='font-21 animate__animated'>in</div><button class='btn-next selecting-unit'></button></div><div class='button-section'><button class='btn-ok'>OK</button><div></div>")
            editingCtrl.find(".btn-prev").on("click", prevUnitBtnClick)
            editingCtrl.find(".btn-next").on("click", nextUnitBtnClick)
            editingCtrl.find(".btn-ok").on("click", sizeOkBtnClick)
            $(event.target).parents(".mid-modal-main-content").html(editingCtrl)
        }
    // }
}
// );

// Event listener for unit Selection in Custom Size
function unitSelected(event) {
    paperSetting.size.unit = UNITS[selectedUnit];
    $(event.target).parents(".unit-selector").find(".animate__animated").html(UNITS[selectedUnit]);
}

function nextUnitBtnClick(event) {
    selectedUnit = (selectedUnit + 1) % UNITS.length;
    unitSelected(event);
};

function sizeOkBtnClick(event) {
    let modalContent = $($(event.target).parents(".mid-modal-main-content")[0])
    modalContent.children(".error-notifier").html("")
    const width = modalContent.children("input#custom-size-width").value;
    const height = modalContent.children("input#custom-size-height").value;
    const unit = animate__animated.html();
    const subtitle = width + "X" + height + " " + unit;
    const title = 'Custom Size';
    if(width&&height){
        paperSetting.size = {
            title,
            width,
            height,
            unit,
        };

        dropdownDetailDOM[type].querySelector(".title").innerHTML = title;
        dropdownDetailDOM[type].querySelector(".text").innerHTML = subtitle;
        $(".mid-modal").toggle(false)
    } else {
        modalContent.children(".error-notifier").html("Illigal size inputed!");
    }
}

function prevUnitBtnClick(event) {
    selectedUnit = (selectedUnit - 1 + UNITS.length) % UNITS.length;
    unitSelected(event);
};

// Prevent Dropdown toggle expanded when click button or input box
dropdownToggleDOM.addEventListener("click", (event) => {
    event.preventDefault();
    const target = event.target;
    $(".mid-section .mid-modal").toggle(true);
    $(".mid-section .mid-modal .mid-modal-title").html("Select Size");
    $(".mid-section .mid-modal .mid-modal-main-content").html(dropdownItems.join(""));
    $(".mid-section .mid-modal .mid-modal-main-content").on("click", dropdownClick);
    if (target.tagName !== "DIV") {
        dropdown.classList.remove("show");
        dropdownMenu.classList.remove("show");
    }
});

// Event Listener for Custom Document Size DOM
customWidthDOM.addEventListener("change", (event) => {
    event.preventDefault();
    paperSetting.size.width = event.target.value;
});

customHeightDOM.addEventListener("change", (event) => {
    event.preventDefault();
    paperSetting.size.height = event.target.value;
});

// Event Listener for Sufficient Print button clicked
document.getElementById("sufficient-print").addEventListener("click", () => {
    settingDOM.style.display = "none";
    printDOM.style.display = "flex";
    drawPrintDOM();
});

// Event Listener for Sufficient Print button clicked
document.querySelector(".btn.btn-stop").addEventListener("click", () => {
    printDOM.style.display = "none";
    settingDOM.style.display = "flex";
});

/////////////////////////////////////////////////
///////// DOM Management in Print-board /////////
/////////////////////////////////////////////////
function drawPrintDOM() {
    printDOM.querySelector(".item.id .value").innerHTML = "202308192";

    printDOM.querySelector(".item.quality .value").innerHTML =
        QUALITIES[paperSetting.quality];

    printDOM.querySelector(".item.color .value").innerHTML =
        COLORS[printSetting.colorType];

    printDOM.querySelector(".item.size .value").innerHTML =
        paperSetting.size.title;

    printDOM.querySelector(".item.orientation .value").innerHTML =
        LAYOUTS[printSetting.layoutType];

    printDOM.querySelector(".item.pages .value").innerHTML = printSetting.copies;

    printDOM.querySelector(".item.paper-type .value").innerHTML =
        PAPERTYPES[paperSetting.type];
}

// Proceed Button DOM
const proceedButton = document.getElementById("proceedButton");
const modalTarget = isSuff ?
    "#sufficientBalanceModal" :
    "#insufficientBalanceModal";
proceedButton.setAttribute("data-target", modalTarget);

proceedButton.addEventListener("click", function(event) {
    // Handle the click event here
    onProceedClick();
});

// Sufficient Print Status Modal Event Listeners
const sufficentModal = document.getElementById("sufficientBalanceModal");
const sufItem = sufficentModal.querySelector(".item.media");
const sufMain = sufItem.querySelector(".main");
const sufDetails = sufItem.querySelector(".details");
const sufMore = sufMain.querySelector(".more");

sufMore.addEventListener("click", (e) => {
    e.preventDefault();
    sufMain.style.display = "none";
    sufDetails.style.display = "block";
    sufDetails.querySelector(".doc-size").innerHTML =
        paperSetting.size.title +
        " " +
        paperSetting.size.width +
        " X " +
        paperSetting.size.height +
        " " +
        paperSetting.size.unit;
    sufDetails.querySelector(".copies").innerHTML = printSetting.copies;
    sufDetails.querySelector(".price").innerHTML = "1.25";
});

sufDetails.addEventListener("click", (e) => {
    sufMain.style.display = "block";
    sufDetails.style.display = "none";
});

sufItem.addEventListener("mouseleave", (e) => {
    sufMain.style.display = "block";
    sufDetails.style.display = "none";
});

// Insufficient Print Status Modal Event Listeners
const insufficentModal = document.getElementById("insufficientBalanceModal");
const insufItem = insufficentModal.querySelector(".item.media");
const insufMain = insufItem.querySelector(".main");
const insufDetails = insufItem.querySelector(".details");
const insufMore = insufMain.querySelector(".more");

insufMore.addEventListener("click", (e) => {
    e.preventDefault();
    insufMain.style.display = "none";
    insufDetails.style.display = "block";
    insufDetails.querySelector(".doc-size").innerHTML =
        paperSetting.size.title +
        " " +
        paperSetting.size.width +
        " X " +
        paperSetting.size.height +
        " " +
        paperSetting.size.unit;
    insufDetails.querySelector(".copies").innerHTML = printSetting.copies;
    insufDetails.querySelector(".price").innerHTML = "1.25";
});

insufDetails.addEventListener("click", (e) => {
    insufMain.style.display = "block";
    insufDetails.style.display = "none";
});

insufItem.addEventListener("mouseleave", (e) => {
    insufMain.style.display = "block";
    insufDetails.style.display = "none";
});

/* /////////////////////////////////////////////////////////////////////
////   Functions that is used for connection with alyosha's code    ////
///////////////////////////////////////////////////////////////////// */

// returns the current print options
function getPrintOptions() {
    const { source, type, quality, twoSided, size } = paperSetting;
    const { colorType } = printSetting;

    return {
        source,
        type,
        quality,
        twoSided,
        size,
        color: colorType,
    };
}

// To force the main application update the print preview
function updatePreview(id) {
    console.log(id, "is changed");
}

// To inform the main application that PROCEED button is clicked

function onProceedClick() {
    printSetting.copies = setCopiesDOM.value;

    if (sizeEdited.style.display === "block") {
        paperSetting.size.width = customWidthDOM.value;
        paperSetting.size.height = customHeightDOM.value;
    }

    const info = {
        source: "./assets/Screenshot_5.png",
        destination: "preview",
    };
    drawPreview(info);
}

//
function drawPreview(info) {
    // destination = "preview"
    const { source, destination } = info;
    const previewElement = document.getElementById(destination);

    if (!source) {
        // If source is empty, erase the preview
        console.log("There is no source");
        previewElement.innerHTML = "";
        return;
    }

    // Create a new image element and set its source to the provided URL
    const img = new Image();
    img.src = source;

    // When the image is loaded, draw it into the preview element
    img.onload = () => {
        // Clear the preview element first
        previewElement.innerHTML = "";

        // Draw the image into the preview element
        previewElement.appendChild(img);
    };
}

function closeModal() {
    $(".mid-section .mid-modal").toggle(false);
}
// document.querySelectorAll(".use-keyboard-input").forEach((element) => {
//   element.addEventListener("")
// })