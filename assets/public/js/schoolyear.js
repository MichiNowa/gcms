$(function () {
  function broadcastNotification(sy, syid) {
    try {
      const broadcastUrl = new URL(
        pathname("/api/post/broadcast/notification"),
        window.location.origin
      );
      const homepage = (new URL(pathname('/'), window.location.origin)).toString();
      const bodyEmailHTML = $.parseHTML(
        /*html*/`<div style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="padding: 20px;">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="border: 1px solid #cccccc;">
                  <tr>
                    <td style="background-color: #4CAF50; padding: 20px; text-align: center; color: white; font-size: 24px;">
                      Guidance Office (SMCC)
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px; text-align: left; font-size: 16px; line-height: 1.6;">
                      <p>Dear Students,</p>
                      <p>Welcome to the new school year at Saint Michael College of Caraga! We are excited to begin this journey with you as we continue to grow, learn, and strive for excellence together.</p>
                      <p>This year promises to bring new challenges, new opportunities, and many memorable experiences. As always, the Guidance Office is here to support you in your academic, personal, and emotional growth. We encourage you to make the most of every moment, embrace new opportunities, and seek help whenever needed.</p>
                      <p>We look forward to seeing all of you succeed and thrive this year. Let's work together to make this a year of learning, achievement, and personal growth!</p>
                      <p>Wishing you all the best in your studies and endeavors!</p>
                      <p>Sincerely,</p>
                      <p><strong>The Guidance Office</strong></p>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #555555;">
                      <a href="https://www.smccnasipit.edu.ph">Saint Michael College of Caraga</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #555555;">
                      <a href="${homepage}">Guidance Office (SMCC)</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>`);
      const bodyHTMLString = $(bodyEmailHTML).get(0).outerHTML;
      const postData = {
        syid,
        subject: `Welcome to School Year ${sy} - ${
          Number.parseInt(sy) + 1
        } | Guidance Office (SMCC)`,
        body: bodyHTMLString.replaceAll("\n", "").trim(),
        title: "Welcome to the New School Year",
        message: `Welcome to the School Year ${sy} - ${
          Number.parseInt(sy) + 1
        }!`,
        href: "/home",
      };
      // Broadcast notification to all users
      $.post(broadcastUrl.toString(), postData)
        .done(function ({ success, error }) {
          console.log(success, error);
          setTimeout(() => window.location.reload(), 500);
        })
        .fail(function(_, statusText) {
          console.log("Something went wrong", statusText);
          setTimeout(() => window.location.reload(), 500);
        })
    } catch (error) {
      console.error("Error broadcasting notification:", error);
    }
  }

  $("#school-year-submit").on("click", function () {
    const body = { year: Number.parseInt($(this).attr("data-sy")) };
    const syUrl = new URL(
      pathname("/api/post/openschoolyear"),
      window.location.origin
    );
    $.post(syUrl.toString(), body)
      .done(function ({ success, error, sy, syid }) {
        if (success) {
          Swal.fire({
            title: "School Year Opened",
            text: `School Year ${sy} - ${
              Number.parseInt(sy) + 1
            } has been opened successfully`,
            icon: "success",
            timer: 3000,
          });
          setTimeout(() => broadcastNotification(sy, syid), 1000);
        } else {
          Swal.fire({
            title: "Error Opening School Year",
            text: error,
            icon: "error",
            confirmButtonText: "Okay",
          });
        }
      })
      .fail(function (e) {
        Swal.fire({
          title: "Error Opening School Year",
          text: e.responseText,
          icon: "error",
          confirmButtonText: "Okay",
        });
        console.log(e);
      });
  });
});
