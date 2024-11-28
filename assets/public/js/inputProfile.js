$(function () {
  // make all input radio pointer cursor
  $("input[type=radio]").each(function() {
    if (!$(this).hasClass("tw-cursor-pointer")) {
      $(this).addClass("tw-cursor-pointer");
    }
    const id = $(this).attr("id");
    if (id) {
      const $label = $("label[for=" + id + "]");
      if (!$label.hasClass("tw-cursor-pointer")) {
        $label.addClass("tw-cursor-pointer");
      }
    }
  });
  $("input[type=checkbox]").each(function() {
    if (!$(this).hasClass("tw-cursor-pointer")) {
      $(this).addClass("tw-cursor-pointer");
    }
    const id = $(this).attr("id");
    if (id) {
      const $label = $("label[for=" + id + "]");
      if (!$label.hasClass("tw-cursor-pointer")) {
        $label.addClass("tw-cursor-pointer");
      }
    }
  });
  //
  var photoFormUrl = null;
  $("input#formFile").on("change", function () {
    const file = this.files[0];
    if (file) {
      if (photoFormUrl) {
        URL.revokeObjectURL(photoFormUrl);
      }
      photoFormUrl = URL.createObjectURL(file);
      $("#form-photo-display").empty();
      const $img = $("<img>")
        .attr("src", photoFormUrl)
        .attr("alt", "photo")
        .addClass(
          "tw-object-contain tw-aspect-square tw-w-[100px] tw-h-[100px] tw-mx-auto"
        );
      $("#form-photo-display").append($img);
    } else if (PREVFORMDATA && Object.keys(PREVFORMDATA).includes("profile_pic") && PREVFORMDATA['profile_pic']) {
      $("button#change-photo-button").css("display", "");
      $("input#formFile").css("display", "none");
      let phto = pathname(PREVFORMDATA['profile_pic']);
      $("#form-photo-display").empty();
      const $img = $("<img>")
        .attr("src", phto)
        .attr("alt", "photo")
        .addClass(
          "tw-object-contain tw-aspect-square tw-w-[100px] tw-h-[100px] tw-mx-auto"
        );
      $("#form-photo-display").append($img);
      $("#profile-pic-preview").attr("src", PREVFORMDATA["profile_pic"]);
    }
  });

  $("form#profile-form input[type='radio'][name='education']").on(
    "change",
    function () {
      if (this.value === "basic") {
        $("select#formSemester").val("");
        $("select#formSemester").prop('disabled', true);
        $("select#formSemester").attr("required", false);

        $("select#formYearLevel").val("");
        $("select#formYearLevel").prop('disabled', true);
        $("select#formYearLevel").attr("required", false);

        $("select#formDepartment").val("");
        $("select#formDepartment").prop('disabled', true);
        $("select#formDepartment").attr("required", false);

        $("select#formCourse").val("");
        $("select#formCourse").prop('disabled', true);
        $("select#formCourse").attr("required", false);

        $("input#formDean").val("");
        $("input#formDean").prop('disabled', true);
        $("input#formDean").attr("required", false);

        $("select#formGradeLevel").prop('disabled', false);
        $("select#formGradeLevel").attr("required", true);

        $("select#formSection").prop('disabled', false);
        $("select#formSection").attr("required", true);

        $("input#formAdviser").prop('disabled', false);
        $("input#formAdviser").attr("required", true);

        if (!$("#academic_year_label").hasClass("tw-bg-[var(--bs-secondary-bg)]")) {
          $("#academic_year_label").addClass("tw-bg-[var(--bs-secondary-bg)]");
        }
        if ($("#school_year_label").hasClass("tw-bg-[var(--bs-secondary-bg)]")) {
          $("#school_year_label").removeClass("tw-bg-[var(--bs-secondary-bg)]");
        }
      } else if (this.value === "college") {
        $("select#formGradeLevel").val("");
        $("select#formGradeLevel").prop('disabled', true);
        $("select#formGradeLevel").attr("required", false);

        $("select#formSection").val("");
        $("select#formSection").prop('disabled', true);
        $("select#formSection").attr("required", false);

        $("input#formAdviser").val("");
        $("input#formAdviser").prop('disabled', true);
        $("input#formAdviser").attr("required", false);

        $("select#formSemester").prop('disabled', false);
        $("select#formSemester").attr("required", true);

        $("select#formDepartment").prop('disabled', false);
        $("select#formDepartment").attr("required", true);

        $("select#formYearLevel").prop('disabled', false);
        $("select#formYearLevel").attr("required", true);

        $("select#formCourse").prop('disabled', false);
        $("select#formCourse").attr("required", true);

        $("input#formDean").prop('disabled', false);
        $("input#formDean").attr("required", true);

        if ($("#academic_year_label").hasClass("tw-bg-[var(--bs-secondary-bg)]")) {
          $("#academic_year_label").removeClass("tw-bg-[var(--bs-secondary-bg)]");
        }
        if (!$("#school_year_label").hasClass("tw-bg-[var(--bs-secondary-bg)]")) {
          $("#school_year_label").addClass("tw-bg-[var(--bs-secondary-bg)]");
        }
      } else {
        $("select#formGradeLevel").val("");
        $("select#formGradeLevel").prop('disabled', true);
        $("select#formGradeLevel").attr("required", false);

        $("select#formSection").val("");
        $("select#formSection").prop('disabled', true);
        $("select#formSection").attr("required", false);

        $("select#formSchoolYear").val("");
        $("select#formSchoolYear").prop('disabled', true);
        $("select#formSchoolYear").attr("required", false);

        $("select#formSemester").val("");
        $("select#formSemester").prop('disabled', true);
        $("select#formSemester").attr("required", false);

        $("select#formAcademicYear").val("");
        $("select#formAcademicYear").prop('disabled', true);
        $("select#formAcademicYear").attr("required", false);

        $("select#formYearLevel").val("");
        $("select#formYearLevel").prop('disabled', true);
        $("select#formYearLevel").attr("required", false);

        $("select#formDepartment").val("");
        $("select#formDepartment").prop('disabled', true);
        $("select#formDepartment").attr("required", false);

        $("select#formCourse").val("");
        $("select#formCourse").prop('disabled', true);
        $("select#formCourse").attr("required", false);

        $("input#formAdviser").val("");
        $("input#formAdviser").prop('disabled', true);
        $("input#formAdviser").attr("required", false);

        $("input#formDean").val("");
        $("input#formDean").prop('disabled', true);
        $("input#formDean").attr("required", false);


        if (!$("#academic_year_label").hasClass("tw-bg-[var(--bs-secondary-bg)]")) {
          $("#academic_year_label").addClass("tw-bg-[var(--bs-secondary-bg)]");
        }
        if (!$("#school_year_label").hasClass("tw-bg-[var(--bs-secondary-bg)]")) {
          $("#school_year_label").addClass("tw-bg-[var(--bs-secondary-bg)]");
        }
      }
    }
  );

  $("select#formDepartment").append(
    Object.keys(DEPARTMENTSANDCOURSES).map((dept) =>
      $("<option>").val(dept).text(dept)
    )
  );
  $("select#formDepartment").on("change", function () {
    $("select#formCourse").empty().append(
      $("<option>").val("").prop("disabled", true).prop("selected", true).text("Select Program")
    ).append(
      DEPARTMENTSANDCOURSES?.[$("select#formDepartment").val()]?.map((course) =>
        $("<option>").val(course).text(course)
      )
    );
  });
  // Grade Level JHS or SHS
  $("select#formGradeLevel").append(
    Object.keys(GRADELEVELANDSECTIONS).map((gradelevel) => (
      $("<option>").val(Number.parseInt(gradelevel.substring(gradelevel.length - 2).trim()).toString()).text(gradelevel)
    ))
  );
  $("select#formGradeLevel").on("change", function () {
    const gradelevelValue = $(this).val();
    const gradelevelLabel = $(this).find("option[value=" + gradelevelValue + "]").text();
    $("select#formSection").empty().append(
      $("<option>").val("").prop("disabled", true).prop("selected", true).text("Select Section")
    ).append(
      GRADELEVELANDSECTIONS?.[gradelevelLabel]?.map((section) =>
        $("<option>").val(section).text(section)
      )
    );
  });
  $("input[type=radio][name=father_employee_type]").on("change", function() {
    if ($(this).attr("id") === "formFatherEmpType6") {
      $(this).attr("name", null);
      $("input#formFatherEmpTypeSpecify").attr("name", "father_employee_type").prop('disabled', false).prop('required', true);
    } else {
      $("input[type=radio]#formFatherEmpType6").attr("name", "father_employee_type")  ;
      $(this).prop("checked", true);
      $("input#formFatherEmpTypeSpecify").val('').attr("name", null).prop('disabled', true).prop('required', false);
    }
  });
  $("input[type=radio][name=mother_employee_type]").on("change", function() {
    if ($(this).attr("id") === "formMotherEmpType6") {
      $(this).attr("name", null);
      $("input#formMotherEmpTypeSpecify").attr("name", "mother_employee_type").prop('disabled', false).prop('required', true);
    } else {
      $("input[type=radio]#formMotherEmpType6").attr("name", "mother_employee_type")  ;
      $(this).prop("checked", true);
      $("input#formMotherEmpTypeSpecify").val('').attr("name", null).prop('disabled', true).prop('required', false);
    }
  });
  $("input[type=radio][name=parent_marital_status]").on("change", function() {
    if ($(this).attr("id") === "formParentMaritalStatus6") {
      $(this).attr("name", null);
      $("input#formParentMaritalStatusSpecify").attr("name", "parent_marital_status").prop('disabled', false).prop('required', true);
    } else {
      $("input[type=radio]#formParentMaritalStatus6").attr("name", "parent_marital_status");
      $(this).prop("checked", true);
      $("input#formParentMaritalStatusSpecify").val('').attr("name", null).prop('disabled', true).prop('required', false);
    }
  });
  $("select#formNoOfSiblings").on("change", function () {
    const noOfSiblings = Number.parseInt($(this).val());
    $("tbody#siblings-rows").empty()
    const columns = ["name", "age", "occupation", "educational_attainment"];
    if (noOfSiblings == 0 || isNaN(noOfSiblings)) {
      const $tr = $("<tr>");
      for (col of columns) {
        const $td = $("<td>")
          .append(
            $("<input>")
              .attr("type", col == "age" ? "number" : "text")
              .prop('disabled', true)
              .addClass("form-control")
          );
        $tr.append($td);
      }
      $("tbody#siblings-rows").append($tr);
    } else {
      for (let i = 0; i < noOfSiblings; i++) {
        const $tr = $("<tr>");
        for (col of columns) {
          const $td = $("<td>")
            .append(
              $("<input>")
              .attr("type", col == "age" ? "number" : "text")
                .attr("name", `siblings[${i}][${col}]`)
                .attr("id", `formSiblings[${i}][${col}]`)
                .attr("required", true)
                .addClass("form-control")
            )
          $tr.append($td);
        }
        $("tbody#siblings-rows").append($tr);
      }
    }
  });
  $("input[type=radio][name=workathome]").on("change", function () {
    if ($(this).val() === "Yes") {
      $("input#formWork").prop('disabled', false).prop('required', true);
    } else {
      $("input#formWork").prop('disabled', true).prop('required', false).val('');
    }
  });
  $("input[type=radio][name=have_friends]").on("change", function () {
    if ($(this).val() === "Yes") {
      $("input#formWhyFriend").prop('disabled', false).prop('required', true);
    } else {
      $("input#formWhyFriend").prop('disabled', true).prop('required', false).val('');
    }
  });
  $("input[type=checkbox]#formHistoryOthers").on("change", function() {
    if (this.checked) {
      $("input#formHistoryOthersSpecify").prop('disabled', false).prop('required', true);
    } else {
      $("input#formHistoryOthersSpecify").prop('disabled', true).prop('required', false).val('');
    }
  });
  $("input[type=radio][name=indigenous_group]").on("change", function () {
    if ($(this).val() === "Yes") {
      $("input#formIndigenousGroupSpecify").prop('disabled', false).prop('required', true);
    } else {
      $("input#formIndigenousGroupSpecify").prop('disabled', true).prop('required', false).val('');
    }
  });
  $("input[type=radio][name=differently_abled]").on("change", function () {
    if ($(this).val() === "Yes") {
      $("input#formDifferentlyAbledSpecify").prop('disabled', false).prop('required', true);
    } else {
      $("input#formDifferentlyAbledSpecify").prop('disabled', true).prop('required', false).val('');
    }
  });
  $("input[type=radio][name=solo_parent]").on("change", function () {
    if ($(this).val() === "Yes") {
      $("input#formSoloParentSpecify").prop('disabled', false).prop('required', true);
    } else {
      $("input#formSoloParentSpecify").prop('disabled', true).prop('required', false).val('');
    }
  });
  $("button#change-photo-button").on("click", function () {
    $("input#formFile").css("display", "").prop("required", true).prop("disabled", false);
    $(this).css("display", "none");
    $("button#cancel-change-photo-button").css("display", "");
  });
  $("button#cancel-change-photo-button").on("click", function () {
    $("input#formFile").css("display", "none").val('').prop("required", false).prop("disabled", true);
    $(this).css("display", "none");
    $("button#change-photo-button").css("display", "");
    let phto = pathname(PREVFORMDATA['profile_pic']);
    $("#form-photo-display").empty();
    const $img = $("<img>")
      .attr("src", phto)
      .attr("alt", "photo")
      .addClass(
        "tw-object-contain tw-aspect-square tw-w-[100px] tw-h-[100px] tw-mx-auto"
      );
    $("#form-photo-display").append($img);
    $("#profile-pic-preview").attr("src", PREVFORMDATA["profile_pic"]);
  })
  if (PREVFORMDATA && Object.keys(PREVFORMDATA).length > 0) {
    $("form#profile-form").find("input[type=radio]").each(function() {
      const lastVal = $(this).prop("checked");
      const nextVal = Object.keys(PREVFORMDATA).includes($(this).attr("name")) && $(this).val() == PREVFORMDATA[$(this).attr("name")];
      $(this).prop("checked", nextVal);
      lastVal !== nextVal && $(this).trigger("change");
    });
    $("form#profile-form").find("select").each(function() {
      if (Object.keys(PREVFORMDATA).includes($(this).attr("name"))) {
        $(this).val(PREVFORMDATA[$(this).attr("name")]).trigger('change');
      }
    });
    $("form#profile-form").find("input[type=tel]").each(function() {
      if (Object.keys(PREVFORMDATA).includes($(this).attr("name"))) {
        $(this).val(PREVFORMDATA[$(this).attr("name")]).trigger('change');
      }
    });
    $("form#profile-form").find("input[type=date]").each(function() {
      if (Object.keys(PREVFORMDATA).includes($(this).attr("name"))) {
        $(this).val(PREVFORMDATA[$(this).attr("name")]).trigger('change');
      }
    });
    let enqueuedHealthHistory = PREVFORMDATA["health_history"] ? [...PREVFORMDATA["health_history"]] : [];
    // checkboxes
    $("form#profile-form").find("input[type=checkbox]").each(function() {
      if (Object.keys(PREVFORMDATA).includes($(this).attr("name"))) {
        $(this).prop("checked", PREVFORMDATA[$(this).attr("name")] === $(this).val() || PREVFORMDATA[$(this).attr("name")] === true);
      }
      if (Object.keys(PREVFORMDATA).includes("health_history") && ($(this).attr("name")?.startsWith("health_history") || $(this).attr("id") === "formHistoryOthers")) {
        const val = $(this).val();
        if (PREVFORMDATA["health_history"].includes(val)) {
          $(this).prop("checked", true).trigger("change");
          enqueuedHealthHistory = enqueuedHealthHistory.filter(item => item!== val);
        } else if ($(this).attr("id") === "formHistoryOthers") {
          if (enqueuedHealthHistory.length > 0) {
            $(this).prop("checked", true).trigger("change");
          }
        }
      }
    });
    // textarea
    $("form#profile-form").find("textarea").each(function() {
      if (Object.keys(PREVFORMDATA).includes($(this).attr("name"))) {
        $(this).val(PREVFORMDATA[$(this).attr("name")]);
      }
    });
    $("form#profile-form").find("input[type=number]").each(function() {
      if (Object.keys(PREVFORMDATA).includes($(this).attr("name"))) {
        $(this).val(PREVFORMDATA[$(this).attr("name")]).trigger('change');
      }
      if (Object.keys(PREVFORMDATA).includes("siblings") && Object.keys(PREVFORMDATA).includes("number_of_siblings") && $(this).attr("name")?.startsWith("siblings[") && Number.parseInt(PREVFORMDATA['number_of_siblings']) > 0) {
        const attrName = $(this).attr("name").toString();
        const siblIndex = Number.parseInt(attrName.substring(attrName.indexOf("[") + 1, attrName.indexOf("]")));
        const siblField = attrName.replaceAll("siblings", "").replaceAll(siblIndex.toString(), "").replaceAll("]", "").replaceAll("[", "").trim();
        $(this).val(PREVFORMDATA['siblings'][siblIndex][siblField]).trigger("change");
      }
    });
    // input text
    $("form#profile-form").find("input[type=text]").each(function() {
      if (Object.keys(PREVFORMDATA).includes($(this).attr("name"))) {
        $(this).val(PREVFORMDATA[$(this).attr("name")]).trigger('change');
      }
      if (Object.keys(PREVFORMDATA).includes("siblings") && Object.keys(PREVFORMDATA).includes("number_of_siblings") && $(this).attr("name")?.startsWith("siblings[") && Number.parseInt(PREVFORMDATA['number_of_siblings']) > 0) {
        const attrName = $(this).attr("name").toString();
        const siblIndex = Number.parseInt(attrName.substring(attrName.indexOf("[") + 1, attrName.indexOf("]")));
        const siblField = attrName.replaceAll("siblings", "").replaceAll(siblIndex.toString(), "").replaceAll("]", "").replaceAll("[", "").trim();
        $(this).val(PREVFORMDATA['siblings'][siblIndex][siblField]).trigger("change");
      }
      if ($(this).attr("id") === "formHistoryOthersSpecify" && enqueuedHealthHistory.length > 0) {
        $(this).val(enqueuedHealthHistory.pop());
      }
    });
    // profile pic
    if (Object.keys(PREVFORMDATA).includes("profile_pic")) {
      $("button#change-photo-button").css("display", "");
      $("input#formFile").css("display", "none").val('').prop("required", false).prop("disabled", true);
      let phto = pathname(PREVFORMDATA['profile_pic']);
      $("#form-photo-display").empty();
      const $img = $("<img>")
        .attr("src", phto)
        .attr("alt", "photo")
        .addClass(
          "tw-object-contain tw-aspect-square tw-w-[100px] tw-h-[100px] tw-mx-auto"
        );
      $("#form-photo-display").append($img);
      $("#profile-pic-preview").attr("src", PREVFORMDATA["profile_pic"]);
    }
  }
});
