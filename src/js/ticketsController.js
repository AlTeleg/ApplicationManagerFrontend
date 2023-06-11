import checkMark from '../img/check_mark.png';
import circle from '../img/circle.png';
import edit from '../img/edit.png';
import close from '../img/close.png';

export let someDescription;

export default class TicketsController {
  constructor() {
    this.deleteDivClose = this.deleteDivClose.bind(this);
    this.deleteDivShow = this.deleteDivShow.bind(this);
    this.inputFormShow = this.inputFormShow.bind(this);
    this.inputFormClose = this.inputFormClose.bind(this); 
  }

  startDataListener (xhr, putData=true) {
    let data;
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
          try {
                data = JSON.parse(xhr.response);
                if (putData) {
                  this.putData(data);
                } else {
                  this.getDescription(data);
                }
                return data
          } catch (e) {
              console.error(e);
          }
      }
    });
  }

  startElementListeners() { 
    this.addTicketButton.addEventListener('click', (e) => this.inputFormShow(e));
    document.addEventListener("DOMContentLoaded", this.getTickets);
  }


  toDom() {
    this.addTicketButton = document.createElement('button');
    this.addTicketButton.textContent = 'Добавить тикет';
    this.addTicketButton.classList.add('add-button');
    this.ticketsDiv = document.createElement('div');
    this.ticketsDiv.classList.add('ticket-list');
    this.ticketsDiv.appendChild(this.addTicketButton);
    document.body.appendChild(this.ticketsDiv);
  }

  putData = (data) => {
    if (data.length > 0) {
      let ticketsArray = Array.from(document.querySelectorAll('.ticket'));
      ticketsArray.forEach(ticket => ticket.remove());
      this.addDivTicket(data.length);
      ticketsArray = Array.from(document.querySelectorAll('.ticket'));
      for (let i=0; i < data.length; i++) {
        ticketsArray[i].id = data[i].id;
        ticketsArray[i].querySelector('.ticket-name').textContent = data[i].name;
        ticketsArray[i].firstElementChild.firstElementChild.style.visibility = (data[i].status === 'true' ? 'visible' : 'hidden');
        ticketsArray[i].querySelector('.ticket-date').textContent = new Date(data[i].created).toLocaleString().replace(',', '').slice(0,-3);
      }
      this.deleteDivClose();
    } else {
      const ticketsArray = Array.from(document.querySelectorAll('.ticket'));
      ticketsArray.forEach(ticket => ticket.remove());
      this.deleteDivClose();
      this.inputFormClose();
    }
  }

  addTicket = (e) => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    let formData = new FormData();
    if (this.addTicketFormText.value !== '') {
      formData.append('name', this.addTicketFormText.value);
      formData.append('status', 'false');
      if (this.addTicketFormTextArea.value != '') {
        formData.append('description', this.addTicketFormTextArea.value);
      }

    xhr.open('POST', 'http://localhost:7070/' + '?method=createTicket');
    xhr.send(formData);
    this.startDataListener(xhr);
    this.inputFormClose();
    }
  }

  removeTicket = (e, id) => {
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'http://localhost:7070/' + '?method=ticketById' + `&id=${id}`);
    xhr.send();   
    this.startDataListener(xhr);
    this.deleteDivClose();
  }

  getTicket = (id, loadOne=false) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:7070/' + '?method=ticketById' + `&id=${id}`);
    xhr.send();
    this.startDataListener(xhr, false);  
  }

  getTickets = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:7070/' + '?method=allTickets');
    xhr.send();
    this.startDataListener(xhr);
  }

  changeTicketStatus = (id, status=false) => {
    const xhr = new XMLHttpRequest();
    let formData = new FormData();
    formData.append('name', document.getElementById(id).firstElementChild.children[2].textContent);
    formData.append('status', `${status}`);
    xhr.open('PATCH', 'http://localhost:7070/' + '?method=ticketById' + `&id=${id}`);
    xhr.send(formData);
    this.startDataListener(xhr, false);
  }

  changeTicket = (id) => {
    const xhr = new XMLHttpRequest(); 
    let formData = new FormData();
    if (this.addTicketFormText.value !== '') {
      formData.append('name', this.addTicketFormText.value);
      formData.append('status', (document.getElementById(id).firstElementChild.firstElementChild.style.visibility === 'visible' ? 'true' : 'false'));
      if (this.addTicketFormTextArea.value != '') {
        formData.append('description', this.addTicketFormTextArea.value);
      }
    xhr.open('PATCH', 'http://localhost:7070/' + '?method=ticketById' + `&id=${id}`);
    xhr.send(formData);
    this.startDataListener(xhr);
    }
  }

  inputFormShow = (e, id=undefined) => {
    e.preventDefault();
    if (this.deleteDiv) {
      this.deleteDivClose()
    }
    this.addTicketForm = document.createElement('form');
    this.addTicketForm.action = 'http://localhost:7070';
    this.addTicketForm.method = 'POST';
    this.addTicketForm.enctype = 'multipart/form-data';
    this.addTicketForm.classList.add('add-form')
    this.addTicketFormTitle = document.createElement('h3');
    this.addTicketFormTitle.textContent = 'Добавить тикет'
    this.addTicketFormTitle.classList.add('add-form_title');
    this.addTicketFormText = document.createElement('input');
    this.addTicketFormText.classList.add('add-form_name-input');
    this.addTicketFormText.type = 'text';
    this.addTicketFormTextArea = document.createElement('textarea');
    this.addTicketFormTextArea.classList.add('add-form_description-input');
    this.addTicketFormTextTitle = document.createElement('p');
    this.addTicketFormTextAreaTitle = document.createElement('p');
    this.addTicketFormTextTitle.textContent = 'Краткое описание';
    this.addTicketFormText.name = 'name';
    this.addTicketFormTextArea.name = 'description';
    this.addTicketFormTextAreaTitle.textContent = 'Полное описание';
    this.addTicketFormOkButton = document.createElement('button');
    this.addTicketFormCancelButton = document.createElement('button');
    this.addTicketFormOkButton.classList.add('ok-button');
    this.addTicketFormCancelButton.classList.add('cancel-button');
    this.addTicketFormOkButton.textContent = 'Ок';
    this.addTicketFormCancelButton.textContent = 'Отмена';
    this.addTicketForm.appendChild(this.addTicketFormTitle);
    this.addTicketForm.appendChild(this.addTicketFormTextTitle);
    this.addTicketForm.appendChild(this.addTicketFormText);
    this.addTicketForm.appendChild(this.addTicketFormTextAreaTitle);
    this.addTicketForm.appendChild(this.addTicketFormTextArea);
    this.addTicketFormButtons = document.createElement('div');
    this.addTicketFormButtons.classList.add('add-form_buttons')
    this.addTicketFormButtons.appendChild(this.addTicketFormOkButton);
    this.addTicketFormButtons.appendChild(this.addTicketFormCancelButton);
    this.addTicketForm.appendChild(this.addTicketFormButtons);
    this.ticketsDiv.appendChild(this.addTicketForm);

    if (!id) {
      this.addTicketFormOkButton.addEventListener('click', this.addTicket);
    } else {
      this.addTicketFormOkButton.addEventListener('click', ()  => {
          this.changeTicket(id);
          this.inputFormClose();
        })
      }
    this.addTicketFormCancelButton.addEventListener('click', this.inputFormClose);
    this.addTicketForm.addEventListener('submit', (e) => {
      e.preventDefault();
    })
  }

  inputFormClose = () => {
    if (this.addTicketForm) {
      this.addTicketForm.remove();
      this.addTicketForm = undefined;
    }
  }

  deleteDivShow = (ticket) => {
    if (this.addTicketForm) {
      this.inputFormClose();
    }
    if (!this.deleteDiv) {
      this.deleteDiv = document.createElement('div');
      this.deleteDiv.classList.add('delete-div');
      this.deleteDivTitle = document.createElement('h3');
      this.deleteDivText = document.createElement('p');
      this.deleteDivTitle.classList.add('delete-div_title');
      this.deleteDivTitle.textContent = 'Удалить тикет';
      this.deleteDivText.classList.add('delete-div_text');
      this.deleteDivText.textContent = 'Вы уверены, что хотите удалить тикет? Это действие необратимо.'
      this.deleteDivOkButton = document.createElement('button');
      this.deleteDivCancelButton = document.createElement('button');
      this.deleteDivOkButton.classList.add('ok-button');
      this.deleteDivOkButton.textContent = 'Ок';
      this.deleteDivCancelButton.classList.add('cancel-button');
      this.deleteDivCancelButton.textContent = 'Отмена';
      this.deleteDiv.appendChild(this.deleteDivTitle);
      this.deleteDiv.appendChild(this.deleteDivText);
      this.deleteDivButtons = document.createElement('div');
      this.deleteDivButtons.classList.add('delete-div_buttons');
      this.deleteDivButtons.appendChild(this.deleteDivOkButton);
      this.deleteDivButtons.appendChild(this.deleteDivCancelButton);
      this.deleteDiv.appendChild(this.deleteDivButtons);
      this.ticketsDiv.appendChild(this.deleteDiv);
  
      this.deleteDivCancelButton.addEventListener('click', this.deleteDivClose);
      this.deleteDivOkButton.addEventListener('click', (e) => {
        this.removeTicket(e, ticket.id);
      })
    }
  }
  
  deleteDivClose = () => {
    if (this.deleteDiv) {
      this.deleteDiv.remove();
      this.deleteDiv = undefined;
    }
  }

  addDivTicket = (quantity) => {
    for (let i = 0; i < quantity; i++) {

        let ticketDiv = document.createElement('div');
        ticketDiv.classList.add('ticket');
        let ticketMain = document.createElement('div');
        ticketMain.classList.add('ticket_main');
        let circleImg = document.createElement('img');
        circleImg.src = circle;
        let checkMarkImg = document.createElement('img');
        checkMarkImg.src = checkMark;
        checkMarkImg.classList.add('checkmark');
        circleImg.classList.add('circle');
        ticketMain.appendChild(checkMarkImg);
        let ticketName = document.createElement('p');
        ticketName.classList.add('ticket-name');
        let ticketDate = document.createElement('p');
        ticketDate.classList.add('ticket-date');
        let closeImg = document.createElement('img');
        closeImg.src = close;
        closeImg.classList.add('close');
        let editImg = document.createElement('img');
        editImg.src = edit;
        editImg.classList.add('edit');
        ticketMain.appendChild(circleImg);
        ticketMain.appendChild(ticketName);
        ticketMain.appendChild(ticketDate);
        ticketMain.appendChild(editImg);
        ticketMain.appendChild(closeImg);
        ticketDiv.appendChild(ticketMain);
        this.ticketsDiv.appendChild(ticketDiv);
        
        closeImg.onload = () => {
          closeImg.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.deleteDivShow(e.target.closest('.ticket'))
          })
        }
        editImg.onload = () => {
          editImg.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.getTicket(e.target.closest('.ticket').id, false);
            
            setTimeout(()=> {
              this.inputFormShow(e, e.target.closest('.ticket').id);     
              this.addTicketFormText.value = editImg.parentElement.children[2].textContent;
              this.addTicketFormTextArea.value = someDescription;
              someDescription = undefined;
            }, 60)
          })
        }

        circleImg.onload = () => {
          circleImg.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const style = getComputedStyle(e.target.previousElementSibling);
            if (style.visibility === 'hidden') {
              this.changeTicketStatus(e.target.closest('.ticket').id, true);
              e.target.previousElementSibling.style.visibility = 'visible';
            } else {
              this.changeTicketStatus(e.target.closest('.ticket').id);
              e.target.previousElementSibling.style.visibility = 'hidden';
            }
          })
        }
        ticketDiv.addEventListener('click', (e) => {
          this.showDescription(e, e.currentTarget.id);
        })
    }
  }

  getDescription = (data) => {
    someDescription = data.description;
  }

  showDescription = (e, id) => {
    e.preventDefault();
    this.getTicket(id, false);
    setTimeout(()=> {
      if (someDescription) {
        let descriptionP = document.querySelector('.ticket_description');
        if (!descriptionP) {
          let description = document.createElement('p');
          description.classList.add('ticket_description');
          description.textContent = someDescription;
          document.getElementById(id).appendChild(description);  
        } else {
          descriptionP.remove();
        }

      }
    }, 60)
  }

  closeDescription = () => {
    document.querySelector('.ticket_description').remove();
  }

}
