import React, {useState} from 'react'
import DashNav from './DashNav'

import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import downloadBtn from "../assets/download_button.svg"

import "./css/Billing.css"
// import { InvalidTokenError } from 'jwt-decode';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from './MediaQuery';

const baseUrl = import.meta.env.VITE_BASE_URL

const Billing = () => {
    const isMobile = useMediaQuery('(max-width: 768px)')
    const [invoicesQuantity, setInvoiceQuatity] = useState(10);
    const navigate = useNavigate()
    const handleDownload = async (type, name) => {
        try {
            const token = JSON.parse(localStorage.getItem('accessToken'));
            if (!token) {
            throw new Error('No authentication token found');
            }

            const response = await fetch(`${baseUrl}/download?type=${type}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            });

            if (response.statusText === "Internal Server Error") {
                toast.error("No Internet");
                throw new Error("No Internet Connection");
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;

            // 🔽 Set your own custom filename here
            a.download = `${name}.pdf`;

            document.body.appendChild(a);
            a.click();

            // Optionally open in new tab (not recommended for download)
            // window.open(url, '_blank');

            setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            }, 100);

        } catch (error) {
            console.log('Download failed:', error);
            if (error.message === "Token Expired, please login again") {
            toast.error("Your Token Expired, Please Login Again");
            setTimeout(() => {
                navigate("/signin");
            }, 1000);
            }
        }
    };

    function handleInvoiceQuantityChange(e) {
        const value = parseInt(e.target.value, 10);
        setInvoiceQuatity(value);
    }
  return (
    <div>
        <DashNav billingP={"active"} />
        <div className='main'>
            <div className="warning-banner">
                <span style={{alignItems:"center", display: "flex"}}>
                    <ErrorOutlineOutlinedIcon/> 
                    <div style={{marginLeft: "10px"}}>Your starlink has an obstructed view of sky. Please change to a business plan.</div>
                </span>
            </div>
            <h2 className='billing' >Billing</h2>
            <p className="billing-sub">Manage your invoices and payments.</p>
            <div className="billing-container">
                <div className='billing-box'>
                    <div style={{display: "flex"}}>
                        <div style={{flexGrow: "2"}}>
                            <h2 style={{fontSize: "15px", fontWeight: "400", marginBottom: "20px"}}>Balance Due - 16/12/2025 </h2>
                            <div className="balance-amount">
                                <div style={{display: 'inline', marginRight:"8px"}}>
                                    £0.00 
                                </div>
                                <span className="Unpaid">
                                    <ErrorOutlineOutlinedIcon />
                                </span>
                            </div>
                        </div>
                        <div >
                            <button className="pay-button">Pay</button>
                        </div>
                    </div>
                </div>
                <div className='billing-box'>
                    <div style={{display: "flex"}}>
                        <div style={{flexGrow: "2"}}>                            
                            <h2 style={{fontSize: "15px", fontWeight: "400", marginBottom: "20px"}}>Billing Cycle</h2>
                            <div className="balance-amount">
                                <p style={{display: 'inline', marginRight:"8px", fontSize: "15px"}}>
                                    Yearly subscriptions have been added to this account.
                                </p>
                                {/* <span className="Unpaid">
                                    <ErrorOutlineOutlinedIcon />    
                                </span> */}
                            </div>
                        </div>
                        <div >
                            <ErrorOutlineOutlinedIcon /> 
                        </div>
                    </div>
                </div>
                <div className='billing-box'>
                    <div style={{display: "flex"}}>
                        <div style={{flexGrow: "2"}}>
                            <h2 style={{fontSize: "15px", fontWeight: "400", marginBottom: "20px"}}>Payment Method</h2>
                            <div className="balance-amount">
                                <div style={{display: 'inline', marginRight:"8px", fontSize: "15px"}}>
                                    <p>Muhammad Amir Masoom</p>
                                    <p>MC ending in 1371</p>
                                    <p>Expires: 9/25</p>
                                </div>
                            </div>
                        </div>
                        <div >
                            <button className="pay-button">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="invoice">
                Invoice
            </h2>
            <div className="invoice-conatainer">
                <table style={isMobile ? {maxWidth: "200px", overflowY: "auto"} : {}} className='billing-table'>
                    <thead >
                        <tr className='billing-thead'>
                            <th >Date</th>
                            <th>Due Date</th>
                            <th>Description</th>
                            <th>Invoice Number</th>
                            <th>Method</th>
                            <th>Total</th>
                            <th>Balance..</th>
                            <th colSpan={2}>Status</th>
                            
                        </tr>
                    </thead>
                    <tbody className='billing-tbody'>
                        <tr>
                            <td>5/17/2025</td>
                            <td>5/17/2025</td>
                            <td>Subscription</td>
                            <td>INV-GBR-2198603-40199-19</td>
                            <td>Credit Card..</td>
                            <td>£75.00</td>
                            <td>£75.00</td>
                            <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                <div className='billing-overdue'>Overdue</div>
                                <button className='download-button' onClick={() => handleDownload('existing1', "INV-GBR-2198603-40199-19")} >
                                    <img src={downloadBtn} alt="" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>4/17/2025</td>
                            <td>4/17/2025</td>
                            <td>Subscription</td>
                            <td>INV-GBR-2084195-61462-15</td>
                            <td>Credit Card..</td>
                            <td>£75.00</td>
                            <td>£0.00</td>
                            <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                <div className='billing-paid'>Paid</div>
                                <button className='download-button' onClick={() => handleDownload('existing2', 'INV-GBR-2084195-61462-15')} >
                                    <img src={downloadBtn} alt="" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>3/17/2025</td>
                            <td>3/17/2025</td>
                            <td>Subscription</td>
                            <td>INV-GBR-1981437-77640-24</td>
                            <td>Credit Card..</td>
                            <td>£75.00</td>
                            <td>£0.00</td>
                            <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                <div className='billing-paid'>Paid</div>
                                <button className='download-button' onClick={() => handleDownload('existing3', 'INV-GBR-1981437-77640-24')} >
                                    <img src={downloadBtn} alt="" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>2/17/2025</td>
                            <td>2/17/2025</td>
                            <td>Subscription</td>
                            <td>INV-GBR-1881773-85974-35</td>
                            <td>Credit Card..</td>
                            <td>£75.00</td>
                            <td>£0.00</td>
                            <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                <div className='billing-paid'>Paid</div>
                                <button className='download-button' onClick={() => handleDownload('existing4', 'INV-GBR-1881773-85974-35')} >
                                    <img src={downloadBtn} alt="" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>1/17/2025</td>
                            <td>1/17/2025</td>
                            <td>Subscription</td>
                            <td>INV-GBR-1784087-85066-27</td>
                            <td>Credit Card..</td>
                            <td>£75.00</td>
                            <td>£0.00</td>
                            <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                <div className='billing-paid'>Paid</div>
                                <button className='download-button' onClick={() => handleDownload('existing5', 'INV-GBR-1784087-85066-27')} >
                                    <img src={downloadBtn} alt="" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>12/17/2024</td>
                            <td>12/17/2024</td>
                            <td>Subscription</td>
                            <td>INV-GBR-1690988-15106-21</td>
                            <td>Credit Card..</td>
                            <td>£75.00</td>
                            <td>£0.00</td>
                            <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                <div className='billing-paid'>Paid</div>
                                <button className='download-button' onClick={() => handleDownload('existing6', 'INV-GBR-1690988-15106-21')} >
                                    <img src={downloadBtn} alt="" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>11/17/2024</td>
                            <td>11/17/2024</td>
                            <td>Subscription</td>
                            <td>INV-GBR-1596931-40495-23</td>
                            <td>Credit Card..</td>
                            <td>£75.00</td>
                            <td>£0.00</td>
                            <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                <div className='billing-paid'>Paid</div>
                                <button className='download-button' onClick={() => handleDownload('existing7', 'INV-GBR-1596931-40495-23')} >
                                    <img src={downloadBtn} alt="" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>10/17/2024</td>
                            <td>10/17/2024</td>
                            <td>Subscription</td>
                            <td>INV-GBR-1501413-37432-1</td>
                            <td>Credit Card..</td>
                            <td>£75.00</td>
                            <td>£0.00</td>
                            <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                <div className='billing-paid'>Paid</div>
                                <button className='download-button' onClick={() => handleDownload('existing8', 'INV-GBR-1501413-37432-1')} >
                                    <img src={downloadBtn} alt="" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>9/17/2024</td>
                            <td>9/17/2024</td>
                            <td>Subscription</td>
                            <td>INV-GBR-1408890-31527-15</td>
                            <td>Credit Card..</td>
                            <td>£75.00</td>
                            <td>£0.00</td>
                            <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                <div className='billing-paid'>Paid</div>
                                <button className='download-button' onClick={() => handleDownload('existing9', 'INV-GBR-1408890-31527-15')} >
                                    <img src={downloadBtn} alt="" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>8/17/2024</td>
                            <td>8/17/2024</td>
                            <td>Subscription</td>
                            <td>INV-GBR-1316778-25368-24</td>
                            <td>Credit Card..</td>
                            <td>£75.00</td>
                            <td>£0.00</td>
                            <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                <div className='billing-paid'>Paid</div>
                                <button className='download-button' onClick={() => handleDownload('existing10', 'INV-GBR-1316778-25368-24')} >
                                    <img src={downloadBtn} alt="" />
                                </button>
                            </td>
                        </tr>
                        
                        {/* ANOTHER 10 */}
                        {invoicesQuantity > 10 && (
                            <>

                            <tr>
                                <td>7/17/2024</td>
                                <td>7/17/2024</td>
                                <td>Subscription</td>
                                <td>INV-GBR-1228382-68298-26</td>
                                <td>Credit Card..</td>
                                <td>£75.00</td>
                                <td>£0.00</td>
                                <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                    <div className='billing-paid'>Paid</div>
                                    <button className='download-button' onClick={() => handleDownload('existing11', 'INV-GBR-1228382-68298-26')} >
                                        <img src={downloadBtn} alt="" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>6/17/2024</td>
                                <td>6/24/2024</td>
                                <td>Subscription</td>
                                <td>INV-GBR-1140331-49514-3</td>
                                <td>Credit Card..</td>
                                <td>£75.00</td>
                                <td>£0.00</td>
                                <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                    <div className='billing-paid'>Paid</div>
                                    <button className='download-button' onClick={() => handleDownload('existing12', 'INV-GBR-1140331-49514-3')} >
                                        <img src={downloadBtn} alt="" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>5/17/2024</td>
                                <td>5/24/2024</td>
                                <td>Subscription</td>
                                <td>INV-GBR-1057820-67732-15</td>
                                <td>Credit Card..</td>
                                <td>£75.00</td>
                                <td>£0.00</td>
                                <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                    <div className='billing-paid'>Paid</div>
                                    <button className='download-button' onClick={() => handleDownload('existing13', 'INV-GBR-1057820-67732-15')} >
                                        <img src={downloadBtn} alt="" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>4/17/2024</td>
                                <td>4/24/2024</td>
                                <td>Subscription</td>
                                <td>INV-GBR-975709-63665-82</td>
                                <td>Credit Card..</td>
                                <td>£75.00</td>
                                <td>£0.00</td>
                                <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                    <div className='billing-paid'>Paid</div>
                                    <button className='download-button' onClick={() => handleDownload('existing14', 'INV-GBR-975709-63665-82')} >
                                        <img src={downloadBtn} alt="" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>3/17/2024</td>
                                <td>3/24/20244</td>
                                <td>Subscription</td>
                                <td>INV-GBR-895910-59006-71</td>
                                <td>Credit Card..</td>
                                <td>£96.00</td>
                                <td>£0.00</td>
                                <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                    <div className='billing-paid'>Paid</div>
                                    <button className='download-button' onClick={() => handleDownload('existing15', 'INV-GBR-895910-59006-71')} >
                                        <img src={downloadBtn} alt="" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>2/17/2024</td>
                                <td>2/24/2024</td>
                                <td>Subscription</td>
                                <td>INV-GBR-821311-40676-58</td>
                                <td>Credit Card..</td>
                                <td>£96.00</td>
                                <td>£0.00</td>
                                <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                    <div className='billing-paid'>Paid</div>
                                    <button className='download-button' onClick={() => handleDownload('existing16', 'INV-GBR-821311-40676-58')} >
                                        <img src={downloadBtn} alt="" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>1/17/2024</td>
                                <td>1/24/2024</td>
                                <td>Subscription</td>
                                <td>INV-GBR-750734-90649-73</td>
                                <td>Credit Card..</td>
                                <td>£96.00</td>
                                <td>£0.00</td>
                                <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                    <div className='billing-paid'>Paid</div>
                                    <button className='download-button' onClick={() => handleDownload('existing17', 'INV-GBR-750734-90649-73')} >
                                        <img src={downloadBtn} alt="" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>12/17/2023</td>
                                <td>12/24/2023</td>
                                <td>Subscription</td>
                                <td>INV-GBR-693390-45501-64</td>
                                <td>Credit Card..</td>
                                <td>£96.00</td>
                                <td>£0.00</td>
                                <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                    <div className='billing-paid'>Paid</div>
                                    <button className='download-button' onClick={() => handleDownload('existing18', 'INV-GBR-693390-45501-64')} >
                                        <img src={downloadBtn} alt="" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>11/17/2023</td>
                                <td>11/24/2023</td>
                                <td>Subscription</td>
                                <td>INV-GBR-637371-92017-65</td>
                                <td>Credit Card..</td>
                                <td>£96.00</td>
                                <td>£0.00</td>
                                <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                    <div className='billing-paid'>Paid</div>
                                    <button className='download-button' onClick={() => handleDownload('existing19', 'INV-GBR-637371-92017-65')} >
                                        <img src={downloadBtn} alt="" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>10/27/2023</td>
                                <td>10/27/2023</td>
                                <td>Order</td>
                                <td>INV-GBR-600122-71981-56</td>
                                <td>Credit Card..</td>
                                <td>£0.00</td>
                                <td>£0.00</td>
                                <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                    <div className='billing-paid'>Paid</div>
                                    <button className='download-button' onClick={() => handleDownload('existing20', 'INV-GBR-600122-71981-56')} >
                                        <img src={downloadBtn} alt="" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>10/25/2023</td>
                                <td>10/25/2023</td>
                                <td>Order</td>
                                <td>INV-GBR-596539-72018-74</td>
                                <td>Credit Card..</td>
                                <td>£105.00</td>
                                <td>£0.00</td>
                                <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                    <div className='billing-paid'>Paid</div>
                                    <button className='download-button' onClick={() => handleDownload('existing21', 'INV-GBR-596539-72018-74')} >
                                        <img src={downloadBtn} alt="" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>10/17/2023</td>
                                <td>10/16/2023</td>
                                <td>Subscription</td>
                                <td>INV-GBR-585049-70734-71</td>
                                <td>Credit Card..</td>
                                <td>£96.00</td>
                                <td>£0.00</td>
                                <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                    <div className='billing-paid'>Paid</div>
                                    <button className='download-button' onClick={() => handleDownload('existing22', 'INV-GBR-585049-70734-71')} >
                                        <img src={downloadBtn} alt="" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>10/12/2023</td>
                                <td>10/12/2023</td>
                                <td>Order</td>
                                <td>INV-GBR-578106-16419-67</td>
                                <td>Credit Card..</td>
                                <td>£140.00</td>
                                <td>£0.00</td>
                                <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                    <div className='billing-paid'>Paid</div>
                                    <button className='download-button' onClick={() => handleDownload('existing23', 'INV-GBR-585049-70734-71')} >
                                        <img src={downloadBtn} alt="" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>10/12/2023</td>
                                <td>10/12/2023</td>
                                <td>Order</td>
                                <td>INV-GBR-577845-41609-75</td>
                                <td>Credit Card..</td>
                                <td>£469.00</td>
                                <td>£0.00</td>
                                <td style={{textAlign: "center", display: "flex", justifyContent:"space-between", alignItems:"center"}}>
                                    <div className='billing-paid'>Paid</div>
                                    <button className='download-button' onClick={() => handleDownload('existing24', 'INV-GBR-585049-70734-71')} >
                                        <img src={downloadBtn} alt="" />
                                    </button>
                                </td>
                            </tr>

                            </>
                        )}
                        
                        


                    </tbody>
                    
                </table>
                <div colSpan={6}  style={{width: "100%", display: "", justifyContent: "right", }} className="pagination">
                    <span>Rows per page:</span>
                    <select value={invoicesQuantity} onChange={handleInvoiceQuantityChange} className='p-button'>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <span>1 - 4 of 4</span>
                    <button className='p-button'>{"\u25C0"}</button>
                    <button className='p-button'>{"\u25B6"}</button>
                </div>
            </div>
            {/* <div className="billing-payment">
                <h2 className='invoice'>Payments</h2>
                <div style={{backgroundColor: "rgb(18,18,18)"}} className='billing-payment-container'>
                    <div>Date</div>
                    <div>Payment</div>
                    <div>Status</div>
                </div>
                <div className='billing-payment-container'>
                    <div>6/3/2025</div>
                    <div>£75.00</div>
                    <div className='payment-failed'>Failed</div>
                </div>
                <div className='billing-payment-container'>
                    <div>6/3/2025</div>
                    <div>£75.00</div>
                    <div className='payment-complete'>Complete</div>
                </div>
                <div colSpan={6}  style={{width: "100%", display: "", justifyContent: "right", }} className="pagination">
                    <span>Rows per page:</span>
                    <select className='p-button'>
                    <option>10</option>
                    <option>25</option>
                    </select>
                    <span>1 - 4 of 4</span>
                    <button className='p-button'>{"\u25C0"}</button>
                    <button className='p-button'>{"\u25B6"}</button>
                </div>

            </div> */}
        </div>
    </div>
  )
}

export default Billing