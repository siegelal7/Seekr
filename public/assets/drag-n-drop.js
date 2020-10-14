
$(document).ready(function () {
  //   console.log("test");
  // const newJobModal = $("#newJobModal");
  // const addJob = $("#submit-new-job-form");
  // addJob.on("submit", function (event) {
  //   event.preventDefault();
  //   console.log("test");
  //   const obj = {
  //     jobName: $("#job-title").val().trim(),
  //     company: $("#company-name").val().trim(),
  //     position: $("#position").val().trim(),
  //     stage: $("#stage").val().trim(),
  //   };
  //   $.ajax({
  //     type: "POST",
  //     url: "api/job",
  //     data: obj,
  //   }).then(function (data) {
  //     console.log(data);
  //     location.reload();
  //   });
    //not sure this is the best solution to hide it
    // newJobModal.attr("style", "display:none");
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
  //   // console.log("NEWSTAGE: " + newStage);
  //   const data = {
  //     stage: newStage,
  //     id: id,
  //   };
  //   // console.log("ID: " + id);
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
});
