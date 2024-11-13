<div class="container-fluid text-center justify-content-center">
    <!-- Second Step: Enter Verification Code -->
    <div class="row justify-content-center mt-5">
        <div class="col-sm-10 col-lg-4 bg-white border p-4 box">
            <h1 class="h5 mb-3 text-muted">Enter Verification Code</h1>
             <div class="m-4">
                The Verification code was sent to your G-suite Account
             </div>
                <!-- Code Input Fields -->
                <div class="mb-3">
                    <div class="d-flex justify-content-between">
                        <input type="text" name="code1" maxlength="1" class="form-control form-control-lg" placeholder="*" required>
                        <input type="text" name="code2" maxlength="1" class="form-control form-control-lg" placeholder="*" required>
                        <input type="text" name="code3" maxlength="1" class="form-control form-control-lg" placeholder="*" required>
                        <input type="text" name="code4" maxlength="1" class="form-control form-control-lg" placeholder="*" required>
                        <input type="text" name="code5" maxlength="1" class="form-control form-control-lg" placeholder="*" required>
                        <input type="text" name="code6" maxlength="1" class="form-control form-control-lg" placeholder="*" required>
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="mt-3 d-flex justify-content-between align-items-center">
                    <button type="submit" class="btn btn-primary col-12"><small class="text-light">Verify Code</small></button>
                </div>
         
        </div>

        <div class="col-12 mt-3 text-center">
            <span><small>Didn't receive a code? <a href="resend_code.php" class="text-decoration-none">Resend Code</a></small></span>
        </div>
    </div>
</div>