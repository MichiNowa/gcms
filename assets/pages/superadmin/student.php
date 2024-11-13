<?php
if ($user->role !== 'superadmin') {
  redirect($user->role === 'admin'
    ? "/dashboard"
    : "/home");
}
?>
<div id="page-root"></div>

<?= getModalDisplay(
  'edit-student-account-modal',
  "Edit Student Account",
  function() {
?>
  <div>
    <!-- Admin Account Form -->
    <form id="edit-student-form">
      <div class="mb-2">
        <label for="edit_username">Student ID: </label>
        <input type="text" id="edit_username" name="username" class="form-control" value="" readonly />
      </div>
      <div class="mb-2">
        <label for="edit_first_name">First Name: </label>
        <input type="text" id="edit_first_name" name="first_name" class="form-control" value="" readonly />
        </div>
      <div class="mb-2">
        <label for="edit_middle_name">Middle Name: </label>
        <input type="text" id="edit_middle_initial" name="middle_initial" class="form-control" readonly value="" />
      </div>
      <div class="mb-2">
        <label for="edit_last_name">Last Name: </label>
        <input type="text" id="edit_last_name" name="last_name" class="form-control" value="" readonly />
      </div>
      <div class="mb-2">
        <label for="edit_email">Email Address: </label>
        <input type="text" id="edit_email" name="email" class="form-control" value="" required />
      </div>
      <div class="mb-4">
        <label for="edit_gender">Gender: </label>
        <div class="select-wrapper">
          <select name="gender" id="edit_gender" class="form-select" required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>
      <div class="mb-2">
        <label for="edit_password">Password: (leave blank to not change)</label>
        <input type="password" id="edit_password" name="password" class="form-control" value="" />
      </div>
      <div class="mb-2">
        <button type="submit" class="btn btn-success">Submit</button>
        <button type="reset" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
      </div>
    </form>
  </div>
<?php
  }
) ?>