<!--========== SIDEBARNAV ==========-->
<div class="nav" id="navbar">
  <nav class="nav__container">
    <div>
      <span class="nav__logo">
        <img src="<?= pathname('images/logo.jpg') ?>" alt="Guidance Logo" class="rounded-circle" width="50">
      </span>
      <span class="nav__name nav__logo">
        <h5 class="nav__logo-name">SMCC GUIDANCE</h5>
      </span>
      <hr>
      <div class="nav__list">
      <?php foreach (SIDEBAR_LINKS as $item): ?>
        <div class="nav__items">
          <h3 class="nav__subtitle"><?= $item["title"] ?? '' ?></h3>

          <?php foreach (($item["children"] ?? []) as $navlinks): ?>
            <?php if (isset($navlinks["children"])): ?>
              <div class="nav__dropdown">
                <div class="nav__link tw-cursor-pointer">
                  <i class="<?= $navlinks["icon"] ?> nav__icon"></i>
                  <span class="nav__name"><?= $navlinks["label"] ?></span>
                  <i class="bx bx-chevron-down nav__icon nav__dropdown-icon"></i>
                </div>
                <div class="nav__dropdown-collapse">
                  <div class="nav__dropdown-content">
                    <?php foreach ($navlinks["children"] as $subnavlinks): ?>
                      <a href="<?= $subnavlinks["href"] ?>" class="nav__dropdown-item <?= is_current_path($subnavlinks["href"]) ? "active" : "" ?>">
                        <?php if (isset($subnavlinks['icon'])): ?>
                          <i class="nav__icon <?= $subnavlinks['icon'] ?? '' ?>"></i>
                        <?php endif; ?>
                        <span class="nav__name"><?= $subnavlinks["label"] ?></span>
                      </a>
                    <?php endforeach; ?>
                  </div>
                </div>
              </div>
            <?php else: ?>
              <a href="<?= $navlinks["href"] ?>" class="nav__link <?= is_current_path($navlinks["href"]) ? "active" : "" ?>">
                <i class="nav__icon <?= $navlinks['icon'] ?? '' ?>"></i>
                <span class="nav__name"><?= $navlinks["label"] ?></span>
              </a>
            <?php endif; ?>

            <?php if (!isset($item["children"]) && isset($item["label"]) && isset($item["href"])): ?>
              <a href="<?= $navlinks["href"] ?>" class="nav__link <?= is_current_path($navlinks["href"]) ? "active" : "" ?>" id="navhome">
                <i class="nav__icon <?= $navlinks['icon'] ?? '' ?>"></i>
                <span class="nav__name"><?= $navlinks["label"] ?></span>
              </a>
            <?php endif; ?>

            <?php if (isset($item["divider"]) && $item["divider"]): ?>
              <hr />
            <?php endif; ?>
          <?php endforeach; ?>
        </div>
      <?php endforeach; ?>
      </div>
    </div>
    <a onclick="document.getElementById('logout').click()" href="#" class="nav__link nav__logout">
        <i class='bx bx-log-out nav__icon'></i>
        <span class="nav__name">Log Out</span>
    </a>
    <form class="d-none" action="<?= pathname('api/post/logout') ?>" method="post">
      <button id="logout" type="submit" class="d-none"></button>
    </form>
  </nav>
</div>
