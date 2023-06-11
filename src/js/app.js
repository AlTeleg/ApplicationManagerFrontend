import TicketListController from "./ticketController";
import {someDescription} from './ticketController';

const ticketList = new TicketListController();
ticketList.toDom();
ticketList.startElementListeners();
