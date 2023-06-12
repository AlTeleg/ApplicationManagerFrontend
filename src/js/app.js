import TicketsController from "./ticketsController";
import {someDescription} from './ticketsController';

const ticketList = new TicketsController();
ticketList.toDom();
ticketList.startElementListeners();
