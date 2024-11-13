<!-- login form -->
<div class="container fluid text-center justify-content-center">
    <div class="tw-flex tw-justify-center tw-items-start tw-mt-8">
        <div class="tw-object-contain tw-p-4 tw-max-w-32 aspect-square">
            <img class="mb-4" src="<?= pathname('images/logo.jpg') ?>" alt="Guidance Logo">
        </div>
    </div>
    <div class="row justify-content-center">
        <h3>SMCC GUIDANCE CENTER</h3>
        <div class="col-sm-10 col-lg-4 bg-white border p-4 box">
            <form method="post" action="<?= pathname('api/post/login') ?>">
                <h1 class="h5 mb-3 text-muted">Login</h1>
                <div class="mb-3 tw-text-left">
                    <label class="form-label" for="studentid">School ID</label>
                    <div class="form-floating">
                        <input type="text" name="studentid" id="studentid" value="<?= showFormData('studentid') ?>"
                            class="form-control form-control-lg" placeholder="username/email">
                        <label for="studentid">Student or Teacher ID</label>
                    </div>
                    <?= showError('studentid') ?>
                </div>

                <div class="mb-3 tw-text-left">
                    <label class="form-label" for="password">Password</label>
                    <div class="form-floating position-relative password-toggle">
                        <input type="password" name="password" id="password" class="form-control form-control-lg"
                            placeholder="Password">
                        <label for="password">Password</label>
                        <button type="button" class="position-absolute tw-right-0 tw-top-0 tw-h-full tw-aspect-square p-2 password-toggle-btn"><i class="bi bi-eye-slash-fill"></i></button>
                    </div>
                    <?= showError('password') ?>
                    <?= showError('checkuser') ?>
                </div>

                <div class="col-12 mt-3 text-center">
                    <span><small>Forgot Password? <a href="<?= pathname('forgot_password') ?>" class="text-decoration-none">Click
                                Here</a></small></span>
                </div>
                <div class="mt-3 d-flex justify-content-between align-items-center">
                    <button class="btn btn-primary col-12"><small class="text-light">Sign in</small></button>
                </div>
            </form>
        </div>
        <div class="col-12 mt-3 text-center">
            <span><small>Don't Have an Account? <a href="<?= pathname('signup') ?>" class="text-decoration-none">Register
                        Here</a></small></span>
        </div>
    </div>
</div>