<?php
if ($user->role !== 'student') {
  redirect($user->role === 'superadmin'
    ? "/schoolyear"
    : "/dashboard");
}
?>
<div class="container tw-justify-content-center tw-text-center tw-box">
  <div class="tw-flex tw-justify-center">
    <div class="tw-col mt-4 tw-embed-responsive tw-embed-responsive-16by9">
      <h2>SMCC Alma Mater Song</h2>
      <br>
      <iframe class="tw-embed-responsive-item" src="https://www.youtube.com/embed/iTYxHnYkFQQ" frameborder="0"
        allowfullscreen style="width:60vw; min-height:40vh;"></iframe>
    </div>
  </div>
  <div class="row">
    <div class="tw-col mt-4">
      <button class="btn btn-primary" id="btnlyrics" onclick="toggleLyrics()">Show Lyrics</button>
    </div>
  </div>
  <div class="row">
    <div class="col mt-4">
      <div id="lyrics-container" style="display:none;">
        <p>
          <b>INTRO</b> <br>
          With our hearts ablaze,
          We sing your praise<br>
          SMCC, our guiding radiant rays,
          Deep within your love's<br>
          Everlasting grace,
          With devotion that is true,
          'Til the end we will embrace<br><br>

          <b>PRE-CHORUS:</b> <br>
          Fountain of knowledge,
          Wisdom you bestow<br>
          Alma Mater faithful,
          In your light we grow<br><br>

          <b>CHORUS:</b> <br>
          Oh SMCC Alma Mater dear,
          Our sanctuary and guide<br>
          In your hands our lives take flight,
          With wings open wide<br>
          Oh SMCC Alma Mater dear,
          Your love's our only worth<br>
          Lux Mundi, Sal Terrae,
          Light of the world<br>
          Salt of the Earth<br><br>

          <b>II.</b> <br>
          With this melody,
          We sing in harmony<br>
          SMCC, a lively symphony,
          Our voices synchronize<br>
          Moving rhythmically,
          In unison we sing as a<br>
          Michaelinian Family<br><br>

          <b>PRE-CHORUS:</b><br>
          Fountain of knowledge,
          Wisdom you bestow<br>
          Alma Mater faithful,
          In your light we grow<br><br>

          <b>CHORUS:</b> <br>
          Oh SMCC Alma Mater dear,
          Our sanctuary and guide<br>
          In your hands our lives take flight,
          With wings open wide<br>
          Oh SMCC Alma Mater dear,
          Your love's our only worth<br>
          Lux Mundi, Sal Terrae,
          Light of the world<br>
          Salt of the Earth<br><br>

          <b>(REPEAT)</b><br><br>

          <b> CODA:</b> <br>
          Lux Mundi, Sal Terrae,
          Light of the world<br>
          Salt of the Earth,
          SMCC<br>
        </p>
      </div>
    </div>
  </div>

  <script>
    function toggleLyrics() {
      const lyricsContainer = document.getElementById('lyrics-container');
      if (lyricsContainer.style.display === 'none') {
        lyricsContainer.style.display = 'block';
        document.getElementById('toggle-lyrics').innerText = 'Hide Lyrics';
      } else {
        lyricsContainer.style.display = 'none';
        document.getElementById('toggle-lyrics').innerText = 'Show Lyrics';
      }
    }
  </script>

</div>
<hr>
</hr>
<div class=" tw-m-4">
  <br>
  <h5>Subscribe and Follow Us in our Official Platforms</h5>
  <div>Facebook: <a href="https://www.facebook.com/SMCCNasipitOfficial"> SAINT MICHAEL COLLEGE OF CARAGA, Inc.</a> </div>
  <?= br() ?>
  <div>Youtube: <a href="https://www.youtube.com/@smccnasipitofficial">SAINT MICHAEL COLLEGE OF CARAGA | Official YouTube Page</a></div>
</div>