// Define an object 'Keyboard' which has elements, eventHandlers and properties as its properties.
const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  // On input and on close handlers for this object
  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  // Value of keyboard and capsLock properties
  properties: {
    value: "",
    capsLock: false,
  },

  // Initialize the keyboard
  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    // this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.main.classList.add("keyboard");
    this.elements.main.style.opacity = "0";
    this.elements.main.style.pointerEvents = "none";
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    // Get all keys and add them to DOM
    this.elements.keys =
      this.elements.keysContainer.querySelectorAll(".keyboard__key");
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with '.use-keyboard-input'
    document.querySelectorAll(".use-keyboard-input").forEach((element) => {
      element.addEventListener("focus", () => {
        console.log("Focused =>", this);
        this.open(element.value, (currentValue) => {
          console.log("element value =>", element.value);
          console.log("currentValue =>", currentValue);
          element.value += currentValue;
        });
      });
    });
  },

  // Method to create all keys in the Keyboard
  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "backspace",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "caps",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "enter",
      "done",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "space",
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    // Loop through each key and add it to the fragment
    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak =
        ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      // Add attributes/classes to button element
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          // If the key is 'backspace', set classes, icon HTML, and event listener to delete characters
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");
          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          // If the key is 'caps', set classes, icon HTML, and event listener to toggle capital letters on/off
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--activatable"
          );
          keyElement.innerHTML = createIconHTML("keyboard_capslock");
          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              "keyboard__key--active",
              this.properties.capsLock
            );
          });

          break;

        case "enter":
          // If the key is 'enter', set classes, icon HTML, and event listener to add a new line character
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");
          keyElement.addEventListener("click", () => {
            this.properties.value = "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          // If the key is 'space', set class, icon HTML, and event listener to add a white space character
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");
          keyElement.addEventListener("click", () => {
            this.properties.value = " ";
            this._triggerEvent("oninput");
          });

          break;

        case "done":
          // If the key is 'done', set classes, icon HTML, and event listener to close the keyboard
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--dark",
            "keyboard_key--done"
          );
          keyElement.innerHTML = createIconHTML("check_circle");
          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        default:
          // For all other keys, set text content according to whether capslock is on or off
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener("click", () => {
            console.log(this);
            this.properties.value = this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();
            this._triggerEvent("oninput");
          });
          break;
      }

      fragment.appendChild(keyElement);

      // Add line break for certain keys
      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  // Trigger oninput and onclose events
  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  // Toggle capslock on/off
  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  // Open the keyboard
  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.style.opacity = "1";
    this.elements.main.style.pointerEvents = "auto";
  },

  // Close the keyboard
  close() {
    this.properties.value = "";
    this.elements.main.style.opacity = "0";
    this.elements.main.style.pointerEvents = "none";
  },
};

// Initialize keyboard on DOM load
window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});

/*
 * Uncomment this block of code to hide the keyboard when any element outside keyboard or input area is clicked.
 *
 * document.addEventListener("click", function (event) {
 *   const clickedElement = event.target;
 *   const isInputArea = clickedElement.classList.contains("use-keyboard-input");
 *   const isKeyboardArea = clickedElement.classList.contains("keyboard__keys");
 *   const keyboardDOM = document.querySelector(".keyboard");
 *
 *   if (!isInputArea && !isKeyboardArea) {
 *     keyboardDOM.classList.add("keyboard--hidden");
 *   }
 * });
 */
