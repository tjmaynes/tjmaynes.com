import FontFaceObserver from "fontfaceobserver";

export const loadFontsAsync = async (fontName) => {
  const createFontsLoaded = () =>
    document.documentElement.classList.add("fonts-loaded");

  if (sessionStorage.fontsLoaded) {
    createFontsLoaded();
  } else {
    const regular = new FontFaceObserver(fontName);
    const bold = new FontFaceObserver(fontName, {
      weight: "bold",
    });

    Promise.all([regular.load(), bold.load()]).then(function () {
      createFontsLoaded();
      sessionStorage.fontsLoaded = true;
    });
  }
};
