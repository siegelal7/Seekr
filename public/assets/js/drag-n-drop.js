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

  const cardSectionEl = $(".card-section");
  // const saveAlert = $(".saveAlert");
  const saveBtn = $(".saveBtn");
  saveBtn.on("click", (event) => {
    var id = event.currentTarget.parentNode.parentNode.getAttribute("data-id");
    $.ajax({
      type: "PUT",
      url: "/api/job",
      data: { starred: 1, id: id },
    }).then(function (data) {
      var savedText = $("<p>")
        .text("Saved")
        .attr(
          "style",
          "display: block; position: absolute;right: 4%;bottom: 0; font-size:1em"
        );
      cardSectionEl.append(savedText);
      // saveAlert.attr("display:block");
      setTimeout(function () {
        saveAlert.attr("style", "display:none");
      }, 2000);
      // saveAlert.attr(
      //   "style",
      //   "display: block; position: absolute;right: 4%;bottom: 0; font-size:1em"
      // );
      // console.log("starred value");
      // location.reload();
    });
  });

  // const dragStart = (event) => {
  //   event.currentTarget.classList.add("dragging");
  // };

  // const dragEnd = (event) => {
  //   event.currentTarget.classList.remove("dragging");
  // };

  // Array.from(document.querySelectorAll(".card")).forEach((card) => {
  //   card.addEventListener("dragstart", dragStart);
  //   card.addEventListener("dragend", dragEnd);
  // });

  // const drag = (event) => {
  //   event.dataTransfer.setData("text/html", event.currentTarget.outerHTML);
  //   event.dataTransfer.setData("text/plain", event.currentTarget.dataset.id);
  // };

  // const dragEnter = (event) => {
  //   event.currentTarget.classList.add("drop");
  // };

  // const dragLeave = (event) => {
  //   event.currentTarget.classList.remove("drop");
  // };

  // Array.from(document.querySelectorAll(".column")).forEach((column) => {
  //   column.addEventListener("dragenter", dragEnter);
  //   column.addEventListener("dragleave", dragLeave);
  // });

  // const drop = (event) => {
  //   Array.from(document.querySelectorAll(".column")).forEach((column) =>
  //     column.classList.remove("drop")
  //   );

  //   document
  //     .querySelector(`[data-id="${event.dataTransfer.getData("text/plain")}"]`)
  //     .remove();

  //   event.currentTarget.innerHTML =
  //     event.currentTarget.innerHTML + event.dataTransfer.getData("text/html");
  //   //console.log(event.currentTarget.lastElementChild.getAttribute("data-id"))
  //   const id = event.currentTarget.lastElementChild.getAttribute("data-id");
  //   const stage = event.currentTarget.lastElementChild.parentNode.getAttribute(
  //     "id"
  //   );
  //   let newStage;
  //   if (stage === "planning-to-apply") {
  //     newStage = "Planning to Apply";
  //   } else if (stage == "applied") {
  //     newStage = "Applied";
  //   } else if (stage == "phone-screen") {
  //     newStage = "Phone Screen";
  //   } else if (stage == "on-site") {
  //     newStage = "On Site";
  //   } else if (stage == "offers") {
  //     newStage = "Offers";
  //   } else if (stage == "rejected") {
  //     newStage = "Rejected";
  //   }
  //   console.log("NEWSTAGE: " + newStage);
  //   const data = {
  //     stage: newStage,
  //     id: id,
  //   };
  //   console.log("ID: " + id);
  //   $.ajax({
  //     url: "api/job",
  //     type: "PUT",
  //     data: data,
  //   }).then(function (data) {
  //     console.log("successfully changed status");
  //     location.reload();
  //   });
  // };

  // const allowDrop = (event) => {
  //   event.preventDefault();
  //   // console.log(event.currentTarget.lastElementChild.getAttribute("data-id"));
  // };

  $.get("/api/user_data").then((dbUser) => {
    $(".user-name").text(dbUser.firstName);
  });
});
