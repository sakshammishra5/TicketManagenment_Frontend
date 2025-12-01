import React, { useEffect, useState } from 'react';
import './Dashbaord.css';
import { getTicket } from '../../../services/api';
import { parse, format } from 'date-and-time';
import { NavLink } from 'react-router';

const Dashbaord = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tickets, setTickets] = useState([]);

  // Sample ticket data
  // const tickets = [
  //   {
  //     id: '2023-00123',
  //     message: 'Hey!',
  //     timestamp: '12:45 AM',
  //     postedAt: 'Posted at 12:45 AM',
  //     time: '10:00',
  //     user: {
  //       name: 'John Snow',
  //       phone: '+91-0000000000',
  //       email: 'johnsnow@gmail.com',
  //       avatar: 'https://ui-avatars.com/api/?name=John+Snow&background=FFA500&color=fff'
  //     },
  //     status: 'unresolved'
  //   }
  // ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.messages[0].text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.client.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'resolved') return matchesSearch && ticket.status === 'closed';
    if (activeTab === 'unresolved') return matchesSearch && ticket.status === 'pending';
    return matchesSearch;
  });


  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await getTicket();
        const data = res.data;
        setTickets(data)
        console.log(data)
      } catch (error) {

      }
    }
    fetchTickets();
  }, [])

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-box">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4.35-4.35" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            type="text"
            placeholder="Search for ticket"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <button
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="tab-icon">
            <path d="M2 4h16M2 10h16M2 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          All Tickets
        </button>
        <button
          className={`tab ${activeTab === 'resolved' ? 'active' : ''}`}
          onClick={() => setActiveTab('resolved')}
        >
          Resolved
        </button>
        <button
          className={`tab ${activeTab === 'unresolved' ? 'active' : ''}`}
          onClick={() => setActiveTab('unresolved')}
        >
          Unresolved
        </button>
      </div>

      {/* Tickets List */}
      <div className="tickets-list">
        {filteredTickets.map((ticket) => (
          <div key={ticket._id} className="ticket-card">
            <div className="ticket-header">
              <div className="ticket-info">
                <div className="ticket-avatar"></div>
                <div>
                  <h3 className="ticket-id">Ticket# {ticket._id}</h3>
                  <p className="ticket-message">{ticket.messages[0].text}</p>
                </div>
              </div>
              <div className="ticket-meta">
                <span className="ticket-posted">{format(
                  parse(ticket.createdAt, "YYYY-MM-DDTHH:mm:ss.SSSZ"),
                  "hh:mmA"
                )}</span>
                <span className="ticket-time">{format(
                  parse(ticket.createdAt, "YYYY-MM-DDTHH:mm:ss.SSSZ"), "hh:mmA")}</span>
              </div>
            </div>

            <div className="ticket-footer">
              <div className="user-info">
                <img src={`https://ui-avatars.com/api/?name=${ticket.client.name}&background=FFA500&color=fff`} alt={ticket.client.name} className="user-avatar" />
                <div className="user-details">
                  <p className="user-name">{ticket.client.name}</p>
                  <p className="user-contact">{ticket.client.phone}</p>
                  <p className="user-contact">{ticket.client.email}</p>
                </div>
              </div>
              <NavLink to={`chat/${ticket._id}`}>
                <button className="open-ticket-btn">Open Ticket</button>
              </NavLink>
            </div>
          </div>
        ))}

        {filteredTickets.length === 0 && (
          <div className="no-tickets">
            <p>No tickets found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashbaord;
