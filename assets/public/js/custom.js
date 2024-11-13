
/*==================== Home page ====================*/
function toggleLyrics() {
  var lyricsContainer = document.getElementById("lyrics-container");
  var btnlyrics = document.getElementById("btnlyrics");
  if (lyricsContainer.style.display === "none") {
    lyricsContainer.style.display = "block";
    btnlyrics.innerHTML = "Hide Lyrics";
  } else {
    lyricsContainer.style.display = "none";
    btnlyrics.innerHTML = "Show Lyrics";
  }
}
