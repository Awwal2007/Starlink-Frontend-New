

import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import CircularProgress from '@mui/material/CircularProgress';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
// import './css/RecentMessages.css';

const RecentMessages = () => {
  const [profile, setProfile] = useState('');

  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);

//   const baseUrl = import.meta.env.VITE_BASE_URL;

  // Decode user profile initials
  
  // Auto scroll to latest message
  // useEffect(() => {
  //   chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  // }, [messages, adminMessages]);


  return (
    <div>
      <div className="topbar">
        <Link to="/" style={{ flex: "1", fontWeight: "700", fontSize: "25px", marginLeft: "25px", textDecoration: "none", color: "white" }}>
          STARLINK
        </Link>
        <div className="topbar-middle">
          <Link>ACCOUNT</Link>
          <Link>SHOP</Link>
          <Link>HELP CENTER</Link>
        </div>
        <div style={{ display: "flex", alignItems: "center", flexGrow: "0.3" }}>
          <ShoppingCartOutlinedIcon />
          <div className="profile-h">
            <span className="profile">{profile || "??"}</span>
          </div>
        </div>
      </div>

      <div className="new-ticket-container">
        <Link to="/message" className="top-message">
          <span style={{ marginRight: "10px" }}>{"<"}</span>
          <span>Message</span>
        </Link>

        <div style={{fontSize: "15px", marginBottom: "10px"}}>Billing</div>
        <div className="new-ticket-header">
            Service Disconnected Despite Payment
        </div>


        <hr style={{backgroundColor: "white", width: "100%", height: "0.5px"}} />
        <br />


        <div style={{display: "flex", justifyContent: "space-between"}}>
            <hr style={{backgroundColor: "white", width: "38%", height: "0.5px"}} />
            <div>Chat started on June 11, 2025</div>
            <hr style={{backgroundColor: "white", width: "38%", height: "0.5px"}} />
        </div>

        <br />

        <div className="chat-window">
          <div className="a-message">
                  <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyItems: "right"}}>
                    <div style={{ justifyContent: "right", display: "flex"}}>
                        <div className="sender-name">
                            {/* <span className="profile">{profile || "??"}</span> */}
                            <div style={{textAlign: "right " , fontSize: "14px"}}>amir@halalfoodauthority.com</div>
                        </div>
                    </div>
                    <div style={{marginLeft: "50px", width: "fit-content", textAlign: "right", display: "flex"}}
                      className={"user-message"}
                    >
                      <div style={{textAlign: "right"}}>
                        Hi We have paid annual invoice till dec 2025 still our service got disconnected due to non payment
                      </div>
                    </div>
                    
                  </div>

                  <div style={{ width: "100%"}}>
                    <div>
                        <div className="sender-name">
                            {/* <span className="profile">{profile || "??"}</span> */}
                            <div style={{textAlign: "left ", fontSize: "14px"}}>Starlink Assistant</div>
                        </div>
                    </div>
                    <div style={{flexGrow: "1", border: "1px solid var(--divider)", background: "transparent"}}
                      className={"admin-message"}
                    >
                      Hi We have paid annual invoice till dec 2025 still our service got disconnected due to non payment
                    </div>
                  </div>
          </div>

          <div ref={chatRef} />
        </div>

      </div>
    </div>
  );
};

export default RecentMessages;