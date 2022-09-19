const documents = [];
// Finds all nested iframes/documents
const getAllDocuments = (document) => {
  if (document.querySelector("iframe")) {
    documents.push(document.querySelector("iframe").contentDocument);
    getAllDocuments(document.querySelector("iframe").contentDocument);
  } else {
    documents.push(window.parent.parent.parent.document);
    return documents;
  }
};

const pressedKeys = [];
const addSaveHotkey = (document) => {
  // Adds keys to pressedKeys array while they're held down
  document.addEventListener("keydown", (e) => {
    if (e.repeat) return;
    pressedKeys.push(e.key);
    console.log(pressedKeys);
    // if (pressedKeys[0] == "Control" && pressedKeys[1] == "Enter") {
    //   window.parent.parent.parent.document
    //     .querySelector("iframe")
    //     .contentDocument.querySelector("iframe")
    //     .contentDocument.querySelector(".Save")
    //     .click();
    // }

    // Remove keys from pressedKeys array when they are released
    document.addEventListener("keyup", (e) => {
      pressedKeys.pop();
    });
  });
};

// TAB RENAMER

const tabRenamer = () => {
  const currentUrl = window.location.href;
  const currentTabName = document.title;

  if (currentUrl.includes("imiscloud") && currentTabName.includes("Manage")) {
    // splice string after "//" and before "."
    const orgName = currentUrl.split("//")[1].split(".")[0];

    // replace first word of currentTabName with orgName
    document.title = currentTabName.replace("Manage", orgName.toUpperCase());
  }
};

const runOnTitleChange = () => {
  tabRenamer();
  getAllDocuments(document);
  // documents.forEach((document) => {
  //   console.log(document)
  //   addSaveHotkey(document);
  // });
};

// run function everytime document.title changes
const observer = new MutationObserver(runOnTitleChange);
observer.observe(document, {
  subtree: true,
  childList: true,
  characterData: true,
  attributes: true,
});
