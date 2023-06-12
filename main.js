/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/img/check_mark.png
const check_mark_namespaceObject = __webpack_require__.p + "4f80ea1494088de43a4e.png";
;// CONCATENATED MODULE: ./src/img/circle.png
const circle_namespaceObject = __webpack_require__.p + "e81ced6290fc66a9f0f6.png";
;// CONCATENATED MODULE: ./src/img/edit.png
const edit_namespaceObject = __webpack_require__.p + "68f20e49f069363b9776.png";
;// CONCATENATED MODULE: ./src/img/close.png
const close_namespaceObject = __webpack_require__.p + "ef3d22bf0a6b507ea8e8.png";
;// CONCATENATED MODULE: ./src/js/ticketsController.js




let someDescription;
class TicketsController {
  constructor() {
    this.deleteDivClose = this.deleteDivClose.bind(this);
    this.deleteDivShow = this.deleteDivShow.bind(this);
    this.inputFormShow = this.inputFormShow.bind(this);
    this.inputFormClose = this.inputFormClose.bind(this);
  }
  startDataListener(xhr) {
    let putData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let data;
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          data = JSON.parse(xhr.response);
          if (putData) {
            this.putData(data);
          } else {
            this.getDescription(data);
          }
          return data;
        } catch (e) {
          console.error(e);
        }
      }
    });
  }
  startElementListeners() {
    this.addTicketButton.addEventListener("click", e => this.inputFormShow(e));
    document.addEventListener("DOMContentLoaded", this.getTickets);
  }
  toDom() {
    this.addTicketButton = document.createElement("button");
    this.addTicketButton.textContent = "Добавить тикет";
    this.addTicketButton.classList.add("add-button");
    this.ticketsDiv = document.createElement("div");
    this.ticketsDiv.classList.add("ticket-list");
    this.ticketsDiv.appendChild(this.addTicketButton);
    document.body.appendChild(this.ticketsDiv);
  }
  putData = data => {
    if (data.length > 0) {
      let ticketsArray = Array.from(document.querySelectorAll(".ticket"));
      ticketsArray.forEach(ticket => ticket.remove());
      this.addDivTicket(data.length);
      ticketsArray = Array.from(document.querySelectorAll(".ticket"));
      for (let i = 0; i < data.length; i++) {
        ticketsArray[i].id = data[i].id;
        ticketsArray[i].querySelector(".ticket-name").textContent = data[i].name;
        ticketsArray[i].firstElementChild.firstElementChild.style.visibility = data[i].status === "true" ? "visible" : "hidden";
        ticketsArray[i].querySelector(".ticket-date").textContent = new Date(data[i].created).toLocaleString().replace(",", "").slice(0, -3);
      }
      this.deleteDivClose();
    } else {
      const ticketsArray = Array.from(document.querySelectorAll(".ticket"));
      ticketsArray.forEach(ticket => ticket.remove());
      this.deleteDivClose();
      this.inputFormClose();
    }
  };
  addTicket = e => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    let formData = new FormData();
    if (this.addTicketFormText.value !== "") {
      formData.append("name", this.addTicketFormText.value);
      formData.append("status", "false");
      if (this.addTicketFormTextArea.value != "") {
        formData.append("description", this.addTicketFormTextArea.value);
      }
      xhr.open("POST", "http://localhost:7070/" + "?method=createTicket");
      xhr.send(formData);
      this.startDataListener(xhr);
      this.inputFormClose();
    }
  };
  removeTicket = (e, id) => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:7070/" + "?method=ticketById" + `&id=${id}`);
    xhr.send();
    this.startDataListener(xhr);
    this.deleteDivClose();
  };
  getTicket = (() => {
    var _this = this;
    return function (id) {
      let loadOne = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "http://localhost:7070/" + "?method=ticketById" + `&id=${id}`);
      xhr.send();
      _this.startDataListener(xhr, false);
    };
  })();
  getTickets = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:7070/" + "?method=allTickets");
    xhr.send();
    this.startDataListener(xhr);
  };
  changeTicketStatus = (() => {
    var _this2 = this;
    return function (id) {
      let status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      const xhr = new XMLHttpRequest();
      let formData = new FormData();
      formData.append("name", document.getElementById(id).firstElementChild.children[2].textContent);
      formData.append("status", `${status}`);
      xhr.open("PATCH", "http://localhost:7070/" + "?method=ticketById" + `&id=${id}`);
      xhr.send(formData);
      _this2.startDataListener(xhr, false);
    };
  })();
  changeTicket = id => {
    const xhr = new XMLHttpRequest();
    let formData = new FormData();
    if (this.addTicketFormText.value !== "") {
      formData.append("name", this.addTicketFormText.value);
      formData.append("status", document.getElementById(id).firstElementChild.firstElementChild.style.visibility === "visible" ? "true" : "false");
      if (this.addTicketFormTextArea.value != "") {
        formData.append("description", this.addTicketFormTextArea.value);
      }
      xhr.open("PATCH", "http://localhost:7070/" + "?method=ticketById" + `&id=${id}`);
      xhr.send(formData);
      this.startDataListener(xhr);
    }
  };
  inputFormShow = (() => {
    var _this3 = this;
    return function (e) {
      let id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      e.preventDefault();
      if (_this3.deleteDiv) {
        _this3.deleteDivClose();
      }
      _this3.addTicketForm = document.createElement("form");
      _this3.addTicketForm.action = "http://localhost:7070";
      _this3.addTicketForm.method = "POST";
      _this3.addTicketForm.enctype = "multipart/form-data";
      _this3.addTicketForm.classList.add("add-form");
      _this3.addTicketFormTitle = document.createElement("h3");
      _this3.addTicketFormTitle.textContent = "Добавить тикет";
      _this3.addTicketFormTitle.classList.add("add-form_title");
      _this3.addTicketFormText = document.createElement("input");
      _this3.addTicketFormText.classList.add("add-form_name-input");
      _this3.addTicketFormText.type = "text";
      _this3.addTicketFormTextArea = document.createElement("textarea");
      _this3.addTicketFormTextArea.classList.add("add-form_description-input");
      _this3.addTicketFormTextTitle = document.createElement("p");
      _this3.addTicketFormTextAreaTitle = document.createElement("p");
      _this3.addTicketFormTextTitle.textContent = "Краткое описание";
      _this3.addTicketFormText.name = "name";
      _this3.addTicketFormTextArea.name = "description";
      _this3.addTicketFormTextAreaTitle.textContent = "Полное описание";
      _this3.addTicketFormOkButton = document.createElement("button");
      _this3.addTicketFormCancelButton = document.createElement("button");
      _this3.addTicketFormOkButton.classList.add("ok-button");
      _this3.addTicketFormCancelButton.classList.add("cancel-button");
      _this3.addTicketFormOkButton.textContent = "Ок";
      _this3.addTicketFormCancelButton.textContent = "Отмена";
      _this3.addTicketForm.appendChild(_this3.addTicketFormTitle);
      _this3.addTicketForm.appendChild(_this3.addTicketFormTextTitle);
      _this3.addTicketForm.appendChild(_this3.addTicketFormText);
      _this3.addTicketForm.appendChild(_this3.addTicketFormTextAreaTitle);
      _this3.addTicketForm.appendChild(_this3.addTicketFormTextArea);
      _this3.addTicketFormButtons = document.createElement("div");
      _this3.addTicketFormButtons.classList.add("add-form_buttons");
      _this3.addTicketFormButtons.appendChild(_this3.addTicketFormOkButton);
      _this3.addTicketFormButtons.appendChild(_this3.addTicketFormCancelButton);
      _this3.addTicketForm.appendChild(_this3.addTicketFormButtons);
      _this3.ticketsDiv.appendChild(_this3.addTicketForm);
      if (!id) {
        _this3.addTicketFormOkButton.addEventListener("click", _this3.addTicket);
      } else {
        _this3.addTicketFormOkButton.addEventListener("click", () => {
          _this3.changeTicket(id);
          _this3.inputFormClose();
        });
      }
      _this3.addTicketFormCancelButton.addEventListener("click", _this3.inputFormClose);
      _this3.addTicketForm.addEventListener("submit", e => {
        e.preventDefault();
      });
    };
  })();
  inputFormClose = () => {
    if (this.addTicketForm) {
      this.addTicketForm.remove();
      this.addTicketForm = undefined;
    }
  };
  deleteDivShow = ticket => {
    if (this.addTicketForm) {
      this.inputFormClose();
    }
    if (!this.deleteDiv) {
      this.deleteDiv = document.createElement("div");
      this.deleteDiv.classList.add("delete-div");
      this.deleteDivTitle = document.createElement("h3");
      this.deleteDivText = document.createElement("p");
      this.deleteDivTitle.classList.add("delete-div_title");
      this.deleteDivTitle.textContent = "Удалить тикет";
      this.deleteDivText.classList.add("delete-div_text");
      this.deleteDivText.textContent = "Вы уверены, что хотите удалить тикет? Это действие необратимо.";
      this.deleteDivOkButton = document.createElement("button");
      this.deleteDivCancelButton = document.createElement("button");
      this.deleteDivOkButton.classList.add("ok-button");
      this.deleteDivOkButton.textContent = "Ок";
      this.deleteDivCancelButton.classList.add("cancel-button");
      this.deleteDivCancelButton.textContent = "Отмена";
      this.deleteDiv.appendChild(this.deleteDivTitle);
      this.deleteDiv.appendChild(this.deleteDivText);
      this.deleteDivButtons = document.createElement("div");
      this.deleteDivButtons.classList.add("delete-div_buttons");
      this.deleteDivButtons.appendChild(this.deleteDivOkButton);
      this.deleteDivButtons.appendChild(this.deleteDivCancelButton);
      this.deleteDiv.appendChild(this.deleteDivButtons);
      this.ticketsDiv.appendChild(this.deleteDiv);
      this.deleteDivCancelButton.addEventListener("click", this.deleteDivClose);
      this.deleteDivOkButton.addEventListener("click", e => {
        this.removeTicket(e, ticket.id);
      });
    }
  };
  deleteDivClose = () => {
    if (this.deleteDiv) {
      this.deleteDiv.remove();
      this.deleteDiv = undefined;
    }
  };
  addDivTicket = quantity => {
    for (let i = 0; i < quantity; i++) {
      let ticketDiv = document.createElement("div");
      ticketDiv.classList.add("ticket");
      let ticketMain = document.createElement("div");
      ticketMain.classList.add("ticket_main");
      let circleImg = document.createElement("img");
      circleImg.src = circle_namespaceObject;
      let checkMarkImg = document.createElement("img");
      checkMarkImg.src = check_mark_namespaceObject;
      checkMarkImg.classList.add("checkmark");
      circleImg.classList.add("circle");
      ticketMain.appendChild(checkMarkImg);
      let ticketName = document.createElement("p");
      ticketName.classList.add("ticket-name");
      let ticketDate = document.createElement("p");
      ticketDate.classList.add("ticket-date");
      let closeImg = document.createElement("img");
      closeImg.src = close_namespaceObject;
      closeImg.classList.add("close");
      let editImg = document.createElement("img");
      editImg.src = edit_namespaceObject;
      editImg.classList.add("edit");
      ticketMain.appendChild(circleImg);
      ticketMain.appendChild(ticketName);
      ticketMain.appendChild(ticketDate);
      ticketMain.appendChild(editImg);
      ticketMain.appendChild(closeImg);
      ticketDiv.appendChild(ticketMain);
      this.ticketsDiv.appendChild(ticketDiv);
      closeImg.onload = () => {
        closeImg.addEventListener("click", e => {
          e.preventDefault();
          e.stopPropagation();
          this.deleteDivShow(e.target.closest(".ticket"));
        });
      };
      editImg.onload = () => {
        editImg.addEventListener("click", e => {
          e.preventDefault();
          e.stopPropagation();
          this.getTicket(e.target.closest(".ticket").id, false);
          setTimeout(() => {
            this.inputFormShow(e, e.target.closest(".ticket").id);
            this.addTicketFormText.value = editImg.parentElement.children[2].textContent;
            this.addTicketFormTextArea.value = someDescription;
            someDescription = undefined;
          }, 60);
        });
      };
      circleImg.onload = () => {
        circleImg.addEventListener("click", e => {
          e.preventDefault();
          e.stopPropagation();
          const style = getComputedStyle(e.target.previousElementSibling);
          if (style.visibility === "hidden") {
            this.changeTicketStatus(e.target.closest(".ticket").id, true);
            e.target.previousElementSibling.style.visibility = "visible";
          } else {
            this.changeTicketStatus(e.target.closest(".ticket").id);
            e.target.previousElementSibling.style.visibility = "hidden";
          }
        });
      };
      ticketDiv.addEventListener("click", e => {
        this.showDescription(e, e.currentTarget.id);
      });
    }
  };
  getDescription = data => {
    someDescription = data.description;
  };
  showDescription = (e, id) => {
    e.preventDefault();
    this.getTicket(id, false);
    setTimeout(() => {
      if (someDescription) {
        let descriptionP = document.querySelector(".ticket_description");
        if (!descriptionP) {
          let description = document.createElement("p");
          description.classList.add("ticket_description");
          description.textContent = someDescription;
          document.getElementById(id).appendChild(description);
        } else {
          descriptionP.remove();
        }
      }
    }, 60);
  };
  closeDescription = () => {
    document.querySelector(".ticket_description").remove();
  };
}
;// CONCATENATED MODULE: ./src/js/app.js


const ticketList = new TicketsController();
ticketList.toDom();
ticketList.startElementListeners();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;