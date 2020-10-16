// const db = require("../../../models");

$(document).ready(function () {
  const addNewProspect = $(".addNewProspect");
  let currentStage;
  addNewProspect.on("click", function (event) {
    currentStage = $(this).val();
  });

  let currentUserId;
  $.get("/api/user_data").then((dbUser) => {
    currentUserId = dbUser.id;
  });
  //event listener for add new job btn
  // const newJobModal = $("#exampleModal1");
  const addJob = $("#submit-new-job-form");

  addJob.on("submit", function (event) {
    event.preventDefault();
    const obj = {
      jobName: $("#job-title").val().trim(),
      company: $("#company-name").val().trim(),
      stage: currentStage,
      UserId: currentUserId,
    };
    $.ajax({
      type: "POST",
      url: "api/job",
      data: obj,
    }).then(function (data) {
      console.log(data);
      location.reload();
    });
    //not sure this is the best solution to hide it
    // newJobModal.attr("style", "display:none");
  });

  let targetId;
  const editBtn = $(".updateBtn");
  editBtn.on("click", function (event) {
    // console.log($(this).parent().find(".card-section"));
    var elementToGrabVals = $(this).parent().find(".card-section");
    //console.log(event.target.parentNode.getAttribute("data-id"));
    targetId = event.target.parentNode.getAttribute("data-id");
    //console.log(targetId);
    var $modal = $("#editModal");
    $("#job-title-edit").val(elementToGrabVals.find("h4").text());
    $("#company-name-edit").val(
      elementToGrabVals.find("p.currentCompany").text()
    );
    $("#position-edit").val(elementToGrabVals.find("p.currentPos").text());
    $("#stage-edit").val(elementToGrabVals.find("p.currentStage").text());
    $.ajax("/url").done(function (resp) {
      $modal.html(resp).foundation("open");
    });
  });

  //update form submit event listener
  const editForm = $("#editForm");
  editForm.on("submit", (event) => {
    event.preventDefault();
    // console.log(targetId);
    // console.log("clicked");
    // const currentId = event.currentTarget.parentNode.getAttribute("data-id");
    // console.log(currentId);
    const obj = {
      jobName: $("#job-title-edit").val().trim(),
      company: $("#company-name-edit").val().trim(),
      stage: $("#stage-edit").val().trim(),
      id: targetId,
    };
    $.ajax({
      url: "api/job",
      method: "PUT",
      data: obj,
    }).then(function (response) {
      console.log("successfully updated entry");
      location.reload();
    });
  });

  //delete btn event listener
  const deleteBtn = $(".deleteBtn");
  deleteBtn.on("click", function (event) {
    targetId = event.currentTarget.parentNode.getAttribute("data-id");
    $.ajax({
      url: `api/job/${targetId}`,
      type: "DELETE",
      data: { id: targetId },
    }).then(function (response) {
      console.log("successfully deleted " + targetId + " job");
      location.reload();
    });
  });

  const saveBtn = $(".saveBtn");
  saveBtn.on("click", (event) => {
    const id = event.currentTarget.parentNode.parentNode.getAttribute("data-id");
    $.ajax({
      type: "PUT",
      url: "/api/job",
      data: { starred: 1, id: id },
    }).then(function (data) {
      $(`.kanban[data-id="${id}"]`).append($("<div class='save-message'>").text("saved!"));
      setTimeout(function () {
        $(".save-message").remove();
      }, 1500);
    });
  });

  $.get("/api/user_data").then((dbUser) => {
    $(".user-name").text(dbUser.firstName);
  });
});
