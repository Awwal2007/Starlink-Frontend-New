import React from 'react'
import DashNav from './DashNav'
import './css/Settings.css'

const Settings = () => {
  return (
    <div>
        <DashNav settingsP={"active"} />
        <div className="main">
            <h2 style={{marginTop: "80px"}}>Settings</h2>
            <p>Muhammad Amir • ACC-3046416-28749-19</p>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "20px", fontSize: "18px", alignContent: "center"}}>
                <div>Profile</div>
                <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                    <div style={{marginRight: "10px"}}>Notification Peference</div>
                    <button style={{backgroundColor: "transparent", color: "white", border: "1px solid white", textAlign: "center", padding: "5px 10px", borderRadius: "5px", fontSize: "15px"}}>Edit Profile</button>
                </div>
            </div>
            <div style={{display: "flex", gap: "10px"}}>
                <div style={{background: "transparent", marginTop: "10px", display: "flex", flexDirection: "row", gap: "100px", padding: "15px", alignItems: "center"}} className="billing-box">
                        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                            <div className="settings-item-title">Name</div>
                            <div className="settings-item-value">Taoheed Ogundapo</div>
                            <div className="settings-item-title">Email</div>
                            <div className="settings-item-value">taoheed@halalfoodauthority.com</div>
                            <div className="settings-item-title">Shipping Address</div>
                            <div className="settings-item-value">Unit 15, Linen House, 253, Kilburn Lane, Queens Park <br /> <br /> London W10 4BQ</div>
                            <div className="settings-item-value">GB</div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                            <div className="settings-item-title">Phone Number</div>
                            <div className="settings-item-value">+447950967561</div>
                            <div className="settings-item-title">Roles</div>
                            <div className="settings-item-value" style={{background: "var(--divider)", borderRadius: "30px", padding: "5px 10px", textAlign: "center", width: "fit-content"}}>Admin</div>
                        </div>
                </div>
                
            </div>


            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: "20px", fontSize: "18px", alignContent: "center"}}>
                <div>Users</div>
                <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                    <button  style={{backgroundColor: "transparent", color: "white", border: "1px solid white", textAlign: "center", padding: "5px 10px", borderRadius: "5px", fontSize: "15px"}}>Add Users</button>
                </div>
            </div>
            <div style={{marginTop: "10px"}}>
                    <table style={{width: "100%", fontSize: "13px", color: "#fefefe96", height: "fit-content"}}>
                        <thead >
                            <tr  className='billing-thead'>
                                <th>User</th>
                                <th>Roles</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='billing-tbody'>
                            <tr>
                                <td style={{width: "500px"}}>amir@halalfoodauthority.com</td>
                                <td className="settings-item-value" style={{background: "var(--divider)", borderRadius: "20px", padding: "", textAlign: "center", width: "10px", fontSize: "15px", height: "10px"}}>Admin</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>taoheed@halalfoodauthority.com</td>
                                <td className="settings-item-value" style={{background: "var(--divider)", borderRadius: "30px", padding: "5px 10px", textAlign: "center", width: "20px"}}>Admin</td>
                                <td></td>
                            </tr>
                        </tbody>
                       </table>
                
            </div>
        </div>
    </div>
  )
}

export default Settings