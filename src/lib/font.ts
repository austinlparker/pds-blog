export async function loadGoogleFont(font: string) {
  const API = `https://fonts.googleapis.com/css2?family=${font}&display=swap`;

  const css = await fetch(API).then((res) => res.text());

  const fontUrl = css.match(
    /src: url\((https:\/\/fonts.gstatic.com\/.*?)\) format/,
  )?.[1];

  if (!fontUrl) {
    throw new Error("Failed to load font");
  }

  const fontData = await fetch(fontUrl).then((res) => res.arrayBuffer());

  return fontData;
}
