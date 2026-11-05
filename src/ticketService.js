// Estructura inicial de tickets si no existe ninguno
const initialTickets = {
  prioritarios: [],
  sinLeer: [],
  enCurso: [],
  cerrados: []
};

export const ticketService = {
  // Genera un ID único para cada ticket
  generateTicketId() {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  },

  // Obtiene todos los tickets
  getAllTickets() {
    const tickets = localStorage.getItem('tickets');
    return tickets ? JSON.parse(tickets) : initialTickets;
  },

  // Crea un nuevo ticket
  createTicket(ticketData) {
    const tickets = this.getAllTickets();
    const newTicket = {
      id: this.generateTicketId(),
      title: ticketData.title,
      department: ticketData.department,
      fullName: ticketData.fullName,
      incident: ticketData.incident,
      date: new Date().toLocaleDateString(),
      status: 'sinLeer',
      responses: [{
        id: Math.random().toString(36).substr(2, 9),
        message: ticketData.incident,
        date: new Date().toLocaleString(),
        attachments: ticketData.attachments || [],
        author: 'Usuario'
      }]
    };
    
    tickets.sinLeer.push(newTicket);
    localStorage.setItem('tickets', JSON.stringify(tickets));
    return newTicket.id;
  },

  // Busca un ticket por ID
  getTicketById(ticketId) {
    const tickets = this.getAllTickets();
    for (const status in tickets) {
      const ticket = tickets[status].find(t => t.id === ticketId);
      if (ticket) return ticket;
    }
    return null;
  },

  // Actualizar el estado de un ticket
  updateTicketStatus(ticketId, newStatus) {
    const tickets = this.getAllTickets();
    let ticketFound = false;
    
    // Buscar y eliminar el ticket de su estado actual
    for (const status in tickets) {
      const index = tickets[status].findIndex(t => t.id === ticketId);
      if (index !== -1) {
        const ticket = tickets[status].splice(index, 1)[0];
        ticket.status = newStatus;
        tickets[newStatus].push(ticket);
        ticketFound = true;
        break;
      }
    }
    
    if (ticketFound) {
      localStorage.setItem('tickets', JSON.stringify(tickets));
      return true;
    }
    return false;
  },

  // Establecer el origen del acceso
  setAccessOrigin(origin) {
    localStorage.setItem('ticketAccessOrigin', origin);
  },

  // Obtener el origen del acceso
  getAccessOrigin() {
    return localStorage.getItem('ticketAccessOrigin') || 'user';
  },

  // Añadir una respuesta a un ticket
  addResponse(ticketId, responseData) {
    const tickets = this.getAllTickets();
    let ticketFound = false;
    
    // Determinar el autor basado en el origen del acceso
    const accessOrigin = this.getAccessOrigin();
    const author = accessOrigin === 'admin' ? 'Administrador' : 'Usuario';
    
    // Buscar el ticket en todas las categorías
    for (const status in tickets) {
      const ticketIndex = tickets[status].findIndex(t => t.id === ticketId);
      if (ticketIndex !== -1) {
        // Inicializar el array de respuestas si no existe
        if (!tickets[status][ticketIndex].responses) {
          tickets[status][ticketIndex].responses = [];
        }

        // Añadir la nueva respuesta con el autor correspondiente
        const response = {
          id: Math.random().toString(36).substr(2, 9),
          message: responseData.message,
          date: new Date().toLocaleString(),
          attachments: responseData.attachments || [],
          author: author
        };

        tickets[status][ticketIndex].responses.push(response);
        ticketFound = true;
        localStorage.setItem('tickets', JSON.stringify(tickets));
        break;
      }
    }
    
    return ticketFound;
  }
}; 