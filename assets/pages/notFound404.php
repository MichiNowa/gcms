<div class="tw-min-h-[calc(100vh-100px)] d-flex flex-row align-items-center">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12 text-center">
        <span class="display-1 d-block">404</span>
        <div class="mb-4 lead">The page you are looking for was not found.</div>
        <a
          href="<?= pathname(
                  AUTHUSER ?
                  (AUTHUSER->role === 'superadmin'
                    ? "/schoolyear"
                    : (AUTHUSER->role === 'admin'
                      ? "/dashboard"
                      : "/home"))
                  : "/"
                ) ?>"
          class="btn btn-link">Back to Home</a>
      </div>
    </div>
  </div>
</div>