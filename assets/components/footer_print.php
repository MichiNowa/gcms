<!-- links every page it is called to the scripts -->

<!-- JQuery -->
<script src="<?= pathname('vendor/jquery/jquery-3.7.1.min.js') ?>"></script>

<script>
  window.URI_PREFIX = "<?= URI_PREFIX ?>";
  function pathname(path) {
    return new URL(URI_PREFIX + path, window.location.origin).toString();
  }
  window.pathname = pathname;
  <?php
    if (isset($_SESSION['backed'])) {
      unset($_SESSION['backed']);
    } else {
  ?>
  <?php } ?>
  $("button#print-btn").on("click", function() {
    window.print();
    $("#print-btn").prop("disabled", true);
    setTimeout(function() {
      $("#print-btn").prop("disabled", false);
    }, 3000);
  });
  <?php if (AUTHUSER->getRole() === 'student'): ?>
    window.print = function() {
      alert("Printing is disabled.");
    };
  <?php endif ?>
</script>

<?php if (isset($scripts)) {
  foreach ($scripts as $script) {
    // get the file extension from filename $script
    $s = explode("/", $script);
    $filename = array_pop($s);
    $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
  ?>
      <script src="<?= $script ?>" type="<?php echo $ext == "mjs" ? "module" : "application/javascript"; ?>"></script>
  <?php }
}

?>
</body>

</html>