import React from 'react';
import "./style.css";
import closeBlack from "../../../../assets/Icons/closeBlack.png";
import fileIcon from "../../../../assets/Icons/fileIcon.png";
import assignIconCircle from "../../../../assets/Icons/assignIconCircle.png";




function RightSideGrid() {
    return (
        // <div className="all-companies-task-grid">
        //     <div className="all-companies-title">All Companies</div>
        //     <div className="companies-sub-title">Tasks</div>

        // </div>
        <div className="task-details-veiw">
            <div className="task-details-header">
               <div className="closing-icon"> 
                    <div className="task-details-title">B&K Securities</div>
                    <div className="task-close-icon"><img src={closeBlack} alt="Arrow close" /></div>
                </div>
                <div className="task-details-sub-title">Uploading of Holding Statement <span className="nse-label">NSE</span></div>
                <div className="border-header">
                    <div className="approved-label">
                        <div className="approved-text">Approval PENDING</div>
                    </div>
                </div>
                <div className="task-detail-data">
                    <div className="row">
                        <div className="col-3">
                            <div className="holding-list-normal-title">Assigned to</div>
                        </div>
                        <div className="col-9">
                            <div className="holding-list-bold-title">Priyal Jain</div>
                        </div>
                        {/* <div className="col-9">
                            <div className="dashboard-assign"><img src={assignIconCircle} alt="account Circle Purple" /> Assign</div>
                            <div className="bottom-tool-tip">
                                <div className="shadow-tooltip">
                                <div className="">
                                    <div className="tool-tip-head">
                                        <div className="add-Email">
                                            <div class="form-group">
                                                <input type="text" class="form-control" placeholder="Enter name or email" value=""/>
                                            </div>
                                           <span className="or-devider"> or</span>
                                            <button class="btn save-details assign-me">reject Task</button>
                                        </div>                                                                           
                                    </div>
                                    <div class="divide-space"><div class="space-border-header"></div></div> 
                                    <div className="email-list-box">                                    
                                        <div className="email-list-row">
                                            <span class="name-circle">Pj</span>
                                            <span className="name-of-emailer">Priyal Jain</span>
                                            <span className="last-email-box">priyaljain@bnksecurities.com</span>
                                        </div>
                                        <div className="email-list-row">
                                            <span class="name-circle">Aj</span>
                                            <span className="name-of-emailer">Akash Jain</span>
                                            <span className="last-email-box">akashjain@bnksecurities.com</span>
                                        </div>
                                        <div className="email-list-row">
                                            <span class="name-circle">Bj</span>
                                            <span className="name-of-emailer">Bharat Jadhav</span>
                                            <span className="last-email-box">priyaljain@bnksecurities.com</span>
                                        </div>
                                        <div className="email-list-row">
                                            <span class="name-circle">Am</span>
                                            <span className="name-of-emailer">Abhinav Mishra</span>
                                            <span className="last-email-box">priyaljain@bnksecurities.com</span>
                                        </div>                                  
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <div className="holding-list-normal-title">Due Date</div>
                        </div>
                        <div className="col-9">
                            <div className="holding-list-bold-title">11 Mar</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <div className="holding-list-normal-title">Deadline</div>
                        </div>
                        <div className="col-9">
                            <div className="holding-list-bold-title">13 Mar</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <div className="holding-list-normal-title">Status</div>
                        </div>
                        <div className="col-9">
                            <div className="holding-list-bold-title">Approval Pending</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <div className="holding-list-normal-title">Completed on</div>
                        </div>
                        <div className="col-9">
                            <div className="holding-list-bold-title">08 Mar, 03:56 pm</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <div className="holding-list-normal-title">License</div>
                        </div>
                        <div className="col-9">
                            <div className="holding-list-bold-title">NSE</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <div className="holding-list-normal-title">Company</div>
                        </div>
                        <div className="col-9">
                            <div className="holding-list-bold-title">B&K Securities</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="task-details-file-grid-bottom">
                <div className="file-title">Files</div>
                <div className="file-title-progress"></div>
                
            </div>
            <div className="file-grid-data">
                    <div className="row">
                        <div className="col-4">
                            <div className="file-upload-title"><img src={fileIcon} alt="file Icon" /> Holding Statement pt1.pdf</div>
                        </div>
                        <div className="col-8">
                            <div className="file-download-title">download</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div className="file-upload-title"><img src={fileIcon} alt="file Icon" /> Holding Statement pt1.pdf</div>
                        </div>
                        <div className="col-8">
                            <div className="file-download-title">download</div>
                        </div>
                    </div>
                    <div class="btn-toolbar text-center well">
                        <div class="col-2 text-left pl-0">
                            <button className="btn save-details reject-task">reject Task</button>
                        </div>        
                        <div class="col-2 text-left">
                            <button className="btn save-details approve-task">approve task</button>
                        </div>                
                    </div>
                </div>
        </div>
    )
}


export default RightSideGrid;