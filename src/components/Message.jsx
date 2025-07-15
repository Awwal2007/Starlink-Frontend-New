import React,{ } from 'react'
import "./css/Message.css"
import { Link,  useNavigate } from 'react-router-dom';

import DashNav from './DashNav'

import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';

const Message = () => {
    // const [selectedConversation, setSelectedConversation] = useState(null);
    const navigate = useNavigate();

    const tickets = [
        {
            title: "Service Disconnected Despite Payment",
            id: "TIK-5242811-29148-45",
            status: "Archived",
            updated: "7/14/2025",
            unread: true,
        },
        {
            title: "Service Disconnected Despite Payment",
            id: "TIK-5243563-53506-45",
            status: "Archived",
            updated: "7/13/2025",
            unread: true,
        },
        
    ];
        
    return (<div>
        <DashNav messageP={"active"} />
        <div className='main'>
            <div className="messages-container">
                <div className="messages-header">
                    <h2>Messages</h2>
                    <button onClick={()=>navigate("/new-ticket")} className="new-ticket">New Ticket</button>
                </div>

                <div style={{display:"flex", alignItems: "center"}}>
                    <div className="search-bar">
                        <input type="text" placeholder="Search tickets" />
                        <div className="icons">
                            <span>
                                <SearchIcon />
                            </span>
                        </div>
                    </div>
                    <span className="filter-icon">
                        <TuneIcon />
                    </span>
                </div>

                <table className="messages-table">
                    <thead>
                    <tr>
                        <th>Ticket</th>
                        <th>Last Updated</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tickets.map((ticket, index) => (
                        <tr key={index} className={ticket.unread ? "unread" : "archived"}>
                        <td>
                            {ticket.unread && <span className="dot" />}
                            <div className="ticket-title">{ticket.title}</div>
                            <div className="ticket-meta">
                            {ticket.status} • {ticket.id}
                            </div>
                        </td>
                        <td>
                            <span className="updated-date">{ticket.updated}</span>
                            <span className="arrow">{">"}</span>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <div className="pagination">
                    <span>Rows per page:</span>
                    <select className='bg-dark'>
                    <option>5</option>
                    <option>10</option>
                    </select>
                    <span>1 - 2 of 2</span>
                    <button className='btn'>{"<"}</button>
                    <button className='btn'>{">"}</button>
                </div>
            </div>
        </div>
    </div>)

}

export default Message