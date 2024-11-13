
<div class="modal modal-xl fade" id="<?= $id ?>" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="-<?= $id ?>-label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="static-<?= $id ?>-label">
          <?= is_callable($title) ? call_user_func($title) : $title ?>
        </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <?= is_callable($displayContent) ? call_user_func($displayContent) : $displayContent ?>
      </div>
    </div>
  </div>
</div>