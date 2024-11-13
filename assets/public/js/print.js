$("button.print-btn").on("click", function() {
  const query = $(this).attr('data-query');
  const url = new URL(pathname("/print"), window.location.origin);
  url.search = query;
  window.open(url.toString(), '_blank', 'noreferrer,noopener,toolbar=no,menubar=no,location=no');
})