import React, { useState, useEffect, useCallback } from "react"
import "./style.css"
import Modal from "react-awesome-modal"
import closeBlack from "../../../../../../assets/Icons/closeBlack.png"
import fileIcon from "../../../../../../assets/Icons/fileIcon.png"
import sideBarlogo from "../../../../../../assets/Icons/sideBarlogo.png"
import togglemobile from "../../../../../../assets/Icons/togglemobile.png"
import keyboardArrowRightBlack from "../../../../../../assets/Icons/keyboardArrowRightBlack.png"
import downArrow from "../../../../../../assets/Icons/downArrow.png"
import inputRightArrow from "../../../../../../assets/Icons/inputRightArrow.png"
import sidebarSettingIcon from "../../../../../../assets/Icons/sidebarSettingIcon.png"
import editpen from "../../../../../../assets/Icons/editpen.png"
import mobileTopArrow from "../../../../../../assets/Icons/mobileTopArrow.png"
import LogoutIcon from "../../../../../../assets/Icons/LogoutIcon.png"
import sidebarAccountCircle from "../../../../../../assets/Icons/sidebarAccountCircle.png"
import taskIcon from "../../../../../../assets/Icons/taskIcon.png"
import sidebarBell from "../../../../../../assets/Icons/sidebarBell.png"
import upArrow from "../../../../../../assets/Icons/topArrowAccordian.png"
import RedLine from "../../../../../../assets/Icons/RedLine.png"
import {isMobile} from "react-device-detect"
import assignIconCircle from "../../../../../../assets/Icons/assignIconCircle.png"
import viewAllArow from "../../../../../../assets/Icons/viewAllArow.png"
import viewAllArowTop from "../../../../../../assets/Icons/viewAllArowTop.png"
import sidebarCheckIcon from "../../../../../../assets/Icons/sidebarCheckIcon.png"
import closeIconGray from "../../../../../../assets/Icons/closeIconGray.png"
import searchIcon from "../../../../../../assets/Icons/searchIcon.png"
import fileUploadIcon from "../../../../../../assets/Icons/fileUploadIcon.png"
import completeTaskIcon from "../../../../../../assets/Icons/emailVerify.png"
import { toast } from "react-toastify"
import moment from "moment"
import Dropzone from "react-dropzone"
import { useOuterClick } from "./outerClick.js"
import TaskDetailsView from "./TaskDetailView"
import {BACKEND_BASE_URL} from "../../../../../../apiServices/baseurl"
import { useSelector, useDispatch, connect } from "react-redux"
import { actions as taskReportActions } from "../../redux/actions"
import MobileLeftSidebar from "../MobileLeftSidebar"
import axios, { post } from "axios"
import { withRouter } from "react-router-dom"
import deleteBlack from "../../../../../../assets/Icons/deleteBlack.png"

import TextareaAutosize from "react-textarea-autosize"
function RightSideGrid({
  isTaskListOpen,
  setIsTaskListOpen,
  isTaskApproved,
  setIsTaskApproved,
  taskList,
  companyName,
  user,
  history,
  NotificationRedu,
}) {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const [completedDate, setCompletedDate] = useState("")

  const [showFiles, setShowFiles] = useState(true)
  const [showComments, setShowComments] = useState(false)
  const [showHtoDoIt, setShowHtoDoIt] = useState(false)

  const [approverDropDown, setApproverDropDown] = useState("")
  const [inputComment, setInputComment] = useState("")
  const [rejectTaskInput, setRejectTaskInputComment] = useState("")
  const [uploadFile, setUploadFile] = useState()
  const [visibleRejectTaskModal, setVisibleRejectTaskModal] = useState(false)

  const [allUser, setAllUser] = useState([])
  const [allUserBackup, setAllUserBackup] = useState([])

  const [selectedUser, setSelectedUser] = useState("")

  const [currentTaskData, setCurrentTaskData] = useState([])
  const [currentDropDown, setCurrentDropDown] = useState("")
  const [fileList, setFileList] = useState([])
  const [searchBoxShow, setsearchBoxShow] = useState(false)

  const [searchBoxShowMobile, setsearchBoxShowMobile] = useState(false)
  const [navigationHideShow, setNavigationHideShow] = useState(false)
  const [taskData, setTaskData] = useState([])
  const [taskDataBackup, setTaskDataBackup] = useState([])
  const [expandedFlags, setExpandedFlags] = useState([])
  const [rowCount, setRowCount] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [searchData, setSearchData] = useState([])
  const [showUserToolTip, setShowUserToolTip] = useState("")
  const [today, setToday] = useState(new Date())
  const [emailAvaliableCheck, setEmailAvaliableCheck] = useState(false)

  const getTaskById =
    state &&
    state.taskReport &&
    state.taskReport.taskReportById &&
    state.taskReport.taskReportById.taskReportById

  useEffect(() => {
    if (taskList != undefined && taskList.length > 0) {
      let tempArr = []
      let tempRowCount = {}
      taskList.map((item) => {
        if (item.Details.length >= 1 && item.Details[0].TaskId != 0) {
          tempArr.push({ ...item })
          tempRowCount[item.Status.trim()] = 4
        }
      })
      let sortedArray = tempArr.sort((a, b) => a.ORD - b.ORD)
      setRowCount(tempRowCount)
      setTaskData(sortedArray)
      setTaskDataBackup(sortedArray)
    }
  }, [taskList])

  useEffect(() => {
    const ApproverUsers =
      state &&
      state.taskReport &&
      state.taskReport.getUserByRole &&
      state.taskReport.getUserByRole.getUserByRole

    if (ApproverUsers != undefined) {
      let temp = []
      ApproverUsers &&
        ApproverUsers.length > 0 &&
        ApproverUsers.forEach((obj1) => {
          obj1 &&
            obj1.GEN_Users &&
            obj1.GEN_Users.forEach((obj2) => {
              temp.push(obj2)
            })
        })
      setAllUser(temp)
      setAllUserBackup(temp)
    }
  }, [state.taskReport.getUserByRole])

  useEffect(() => {
    const getTaskId = getTaskById
    if (getTaskId) {
      const taskId = getTaskById.TaskId

      const payload = {
        taskID: taskId,
        actionFlag: 0,
      }
      axios
        .post(`${BACKEND_BASE_URL}/api/getTaskFile`, payload)
        .then((response) => {
          let fileData = response.data
          setFileList(fileData)
        })
        .catch((error) => {})
    }
  }, [getTaskById, uploadFile])

  useEffect(() => {
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, "0")
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    const mm = monthNames[today.getMonth()]
    var yyyy = today.getFullYear()
    today = dd + " " + mm + " " + yyyy
    setToday(today)
  }, [getTaskById])

  const innerSearch = useOuterClick((e) => {
    if (searchBoxShow) {
      setsearchBoxShow(false)
      setSearchValue("")
    }
  })

  const innerSearchMobile = useOuterClick((e) => {
    if (searchBoxShowMobile) {
      setsearchBoxShowMobile(false)
      setSearchValue("")
    }
  })

  const innerRef = useOuterClick((e) => {
    if (
      (currentDropDown !== "open" && !e.target.id.includes("assignBtn")) ||
      (currentDropDown === "open" && e.target.id == "")
    ) {
      setCurrentDropDown("")
      setSelectedUser("")
    }
  })

  const approverDropDownRef = useOuterClick((e) => {
    if (approverDropDown === "openapproverdropdown") {
      setApproverDropDown("")
      setSelectedUser("")
    }
  })

  const userDetails = state && state.auth && state.auth.loginInfo

  const getCommentsbyId =
    state &&
    state.taskReport &&
    state.taskReport.getTaskCommentByRole &&
    state.taskReport.getTaskCommentByRole.getTaskCommentByRole

  const getInitials = (str) => {
    var initials = " "
    if (str != "" && str) {
      var names = str.split(" "),
        initials = names[0].substring(0, 1).toUpperCase()
      if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase()
      }
    }
    return initials
  }

  const getAllFile = () => {
    if (getTaskById != undefined) {
      const taskId = getTaskById.TaskId
      const payload = {
        taskID: taskId,
        actionFlag: 0,
      }
      axios
        .post(`${BACKEND_BASE_URL}/api/getTaskFile`, payload)
        .then((response) => {
          let fileData = response.data
          setFileList(fileData)
        })
        .catch((error) => {
          console.log("error => ", error)
        })
    }
  }

  const deleteFile = (file) => {
    if (userDetails.UserType === 4) {
      const payload = {
        taskID: 0,
        TaskFileId: file.TaskFileId,
        actionFlag: 3,
      }
      axios
        .post(`${BACKEND_BASE_URL}/api/getTaskFile`, payload)
        .then((response) => {
          if (
            response &&
            response.data &&
            response.data[0] &&
            response.data[0].Status === "Deleted"
          ) {
            getAllFile()
            toast.success("File deleted successfully")
          } else {
            toast.error("Error in the deleting file !!!")
          }
        })
        .catch((error) => {})
    }
  }

  const submitModal = () => {
    let id = getTaskById.TaskId
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: id,
        userType: 1,
        email: "",
        invitee: "",
        isApproved: 3,
        loginID: userDetails.UserID,
        userDetails: userDetails,
      })
    )
    dispatch(
      taskReportActions.postTaskCommentByTaskID({
        actionFlag: 1, //Action Flag
        taskID: getTaskById.TaskId, //TaskID
        comment: rejectTaskInput,
        commentBy: user.UserID, //UserID
      })
    )
    setRejectTaskInputComment("")
    setVisibleRejectTaskModal(false)
    toast.success("Task rejected successfully")
  }

  const teamMemberMarkComplete = () => {
    let taskId = getTaskById.TaskId
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: taskId,
        userType: 1,
        email: "",
        invitee: "",
        isApproved: 4, //Compeleted by user
        userDetails: userDetails,
        loginID: userDetails.UserID,
      })
    )
    toast.success("Mark completed  successfully")
  }

  const handleChangeRejectTaskComment = (e) => {
    e.preventDefault()
    setRejectTaskInputComment(e.target.value)
  }

  const renderRejectTaskModal = () => {
    return (
      <Modal
        onClickAway={() => setVisibleRejectTaskModal(false)}
        visible={visibleRejectTaskModal}
        width="373px"
        height="265px"
      >
        <div className="model-design-reject">
          <div className="reject-model-title">
            Select a reason for rejecting the task
          </div>
          <div className="white-bottom">
            <div class="form-group">
              <label htmlFor="comment">Comment:</label>
              <textarea
                className="form-control"
                placeholder="Enter the reason for rejecting this task."
                value={rejectTaskInput}
                onChange={(e) => handleChangeRejectTaskComment(e)}
                rows="5"
                id="comment"
                name="rejectTaskComment"
              ></textarea>
              <div className="text-count-area">0/200</div>
            </div>
            <div className="btn-group float-right">
              <button
                type="submit"
                onClick={() => setVisibleRejectTaskModal(false)}
                className="btn cancel-btn-reject mr-2"
              >
                Cancel
              </button>
              <button
                disabled={rejectTaskInput === ""}
                type="submit"
                onClick={() => submitModal()}
                className="btn reject-submit-btn"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    )
  }

  useEffect(() => {
    let task_id = NotificationRedu &&  NotificationRedu.NotificationRedu && NotificationRedu.NotificationRedu.task_id
    if (task_id) {
      getSelectTaskDetails()
    }
  }, [])

  const getSelectTaskDetails = (e) => {
    setShowFiles(true)
    setShowComments(false)
    setExpandedFlags([])
    setCurrentTaskData(e)
    let taskID = null
    let task_id = NotificationRedu.NotificationRedu.task_id

    if (task_id !== null && e === undefined) {
      taskID = task_id
    } else {
      taskID = e.TaskId
    }
    dispatch(
      taskReportActions.taskReportByIdRequest({
        taskID: taskID,
      })
    )

    setIsTaskListOpen(true)
  }

  const getApproveUsers = () => {
    dispatch(
      taskReportActions.userByRoleRequest({
        coUserId: user.UserID,
        ecoUserId: "",
        coUserType: 5,
      })
    )
  }

  const getUserDetail = (e) => {
    dispatch(
      taskReportActions.userByRoleRequest({
        coUserId: user.UserID,
        ecoUserId: "",
        coUserType: 4,
      })
    )
  }

  const handleChange = (e) => {
    setInputComment(e.target.value)
  }

  const submitComment = () => {
    dispatch(
      taskReportActions.postTaskCommentByTaskID({
        actionFlag: 1, //Action Flag
        taskID: getTaskById.TaskId, //TaskID
        comment: inputComment,
        commentBy: user.UserID, //UserID
      })
    )
    setInputComment("")
  }

  const getComments = () => {
    setShowFiles(false)
    setShowComments(true)
    setShowHtoDoIt(false)

    dispatch(
      taskReportActions.taskCommentsByTaskIdRequest({
        taskid: getTaskById.TaskId,
      })
    )
  }

  const getUpload = (file) => {
    const url = `${BACKEND_BASE_URL}/api/UploadFile?Taskid=${currentTaskData.TaskId}`
    var formData = []
    formData = new FormData()
    for (var i = 0; i < file.length; i++) {
      formData.append("file", file[i])
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
    return post(url, formData, config)
  }

  const handleSelectUploadFile = (file) => {
    const _fileList = (fileList && fileList[0] && fileList[0].Files) || []
    var isPresent = false
    let fileArray = []
    file.forEach((file) => {
      isPresent = _fileList.some(function (el) {
        return el.FileName === file.name
      })
      if (!isPresent) {
        fileArray.push(file)
      } else {
        toast.error(
          `File ${file.name} is already uploaded. Please rename it and upload`
        )
        return ""
      }
    })
    getUpload(fileArray).then((response) => {
      toast.success("File Upload Successfully")
      setUploadFile("")
      getAllFile()
    })
  }

  const ApprovDisplay = (e) => {
    setApproverDropDown("openapproverdropdown")
    if (approverDropDown == "") {
      getApproveUsers()
      setEmailAvaliableCheck(false)
      setSelectedUser("")
    }
  }

  const AssignDisplay = () => {
    // setCurrentDropDown("open")
    if (currentDropDown === "open") {
      setCurrentDropDown("")
    } else {
      setCurrentDropDown("open")
      getUserDetail()
    }
  }

  const handleAppSearch = (searchText) => {
    setEmailAvaliableCheck(false)
    setSelectedUser(searchText)
    let temp = []
    if (searchText == "") {
      setAllUser(allUserBackup)
    } else {
      allUserBackup &&
        allUserBackup.length > 0 &&
        allUserBackup.filter((item, index) => {
          if (
            item.EmailID.toLowerCase().includes(searchText.toLowerCase()) ||
            (item.UserName &&
              item.UserName.toLowerCase().includes(searchText.toLowerCase()))
          ) {
            temp.push(item)
          }
        })
      setAllUser(temp)
    }
  }

  const handleAppTask = (getTaskById) => {
    let taskId = getTaskById.TaskId
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: taskId,
        isApproved: 1, //Approve Task
        userType: 1,
        email: "",
        invitee: "",
        loginID: userDetails.UserID,
        userDetails: userDetails,
      })
    )

    toast.success("Task approved !!!")
  }

  const handleChooseApprove = (data) => {
    let approvEmail = data.EmailID
    let id = getTaskById.TaskId
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: id,
        email: approvEmail,
        userType: 5,
        invitee: user.EmailID,
        isApproved: 0,
        loginID: userDetails.UserID,
      })
    )
  }

  const onAssignTaskClick = (data) => {
    let assignEmail = data.EmailID
    let id = getTaskById.TaskId
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: id,
        email: assignEmail,
        userType: 4,
        invitee: user.EmailID,
        isApproved: 0,
        userDetails: userDetails,
        loginID: userDetails.UserID,
      })
    )
  }

  const handleCheckEmailAvailability = (event) => {
    axios
      .post(`${BACKEND_BASE_URL}/api/availabilityCheck`, {
        loginID: selectedUser,
        loginty: "AdminEmail",
      })
      .then((response) => {
        console.log("inside resposnse => ", response)
        if (response && response.data && response.data.Status === "True") {
          setEmailAvaliableCheck(true)
        } else {
          setEmailAvaliableCheck(false)
          handleApproveTask(event)
        }
      })
      .catch((err) => {
        console.log("error =>  ", err)
      })
  }

  const handleCheckAssignToEmailAvailability = (event) => {
    console.log("selectedUser => ", selectedUser)
    axios
      .post(`${BACKEND_BASE_URL}/api/availabilityCheck`, {
        loginID: selectedUser,
        loginty: "AdminEmail",
      })
      .then((response) => {
        console.log("inside resposnse => ", response)
        if (response && response.data && response.data.Status === "True") {
          setEmailAvaliableCheck(true)
        } else {
          setEmailAvaliableCheck(false)
          handleAssignToTask(event)
        }
      })
      .catch((err) => {
        console.log("error =>  ", err)
      })
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCheckEmailAvailability(event)
      // handleApproveTask(event);
    }
  }

  const handleAssignKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("1234")
      handleCheckAssignToEmailAvailability(e)
      // handleAssignToTask(e)
    }
  }
  const handleAssignToTask = (e) => {
    let id = getTaskById.TaskId
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: id,
        email: selectedUser,
        userType: 4,
        invitee: user.EmailID,
        isApproved: 0,
        loginID: userDetails.UserID,
      })
    )
    setSelectedUser("")
  }

  const handleApproveTask = (e) => {
    let id = getTaskById.TaskId
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: id,
        email: selectedUser,
        userType: 5,
        invitee: user.EmailID,
        isApproved: 0,
        loginID: userDetails.UserID,
      })
    )
    setSelectedUser("")
  }

  const AssignTaskToMe = (e) => {
    let id = getTaskById.TaskId
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: id,
        email: user.EmailID,
        userType: 4,
        invitee: user.EmailID,
        isApproved: 0,
        userDetails: userDetails,
        loginID: userDetails.UserID,
      })
    )
    setSelectedUser("")
  }

  const approvTaskToMe = (e) => {
    let id = getTaskById.TaskId
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: id,
        email: user.EmailID,
        userType: 5,
        invitee: user.EmailID,
        isApproved: 0,
        loginID: userDetails.UserID,
      })
    )
  }

  const clearSearch = () => {
    setsearchBoxShow(false)
    setsearchBoxShowMobile(false)
    setSearchValue("")
  }

  const _handleApproveTaskOnCheckBoxClick = (taskId) => {
    dispatch(
      taskReportActions.taskAssignByTaskID({
        taskID: taskId,
        isApproved: 1, //Approve Task
        userType: 1,
        email: "",
        invitee: "",
        loginID: userDetails.UserID,
      })
    )
    setTimeout(() => {
      dispatch(
        taskReportActions.taskReportRequest({
          entityid: "",
          userID: userDetails.UserID,
          usertype: userDetails.UserType,
        })
      )
    }, 1000)
  }

  const closeMobileSidebar = () => {
    const drawerParent = document.getElementById("sideBarParent");
      const drawerChild = document.getElementById("sideBarChild");
      if (drawerParent) {
         drawerParent.classList.remove("overlay");
         drawerChild.style.left = "-100%";
      }
  }

  const showLessMore = (status, count) => {
    let tempRowCnt = { ...rowCount }
    tempRowCnt[status.trim()] = count
    setRowCount(tempRowCnt)
  }

  const handleExpandList = (flag, index) => {
    let tempExtend = [...expandedFlags]
    if (flag === "show") {
      tempExtend.push(index)
    } else {
      tempExtend = tempExtend.filter((item) => item !== index)
    }
    setExpandedFlags(tempExtend)
  }

  const getDayDate = (date, flag) => {
    var today = new Date()
    var dateObj = new Date(date)
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)
    if (dateObj.toLocaleDateString() == today.toLocaleDateString()) {
      return "Today"
    } else if (dateObj.toLocaleDateString() == yesterday.toLocaleDateString()) {
      return "Yesterday"
    } else {
      return flag === 1
        ? moment(date).format("DD MMM YYYY")
        : moment(date).format("DD MMM")
    }
  }

  const handleSearch = (searchText) => {
    setSearchValue(searchText)
    let tempArr = []
    if (searchText != "") {
      taskList &&
        taskList.forEach((obj1) => {
          obj1.Details.forEach((obj2) => {
            if (
              obj2.TaskName.toLowerCase().includes(searchText.toLowerCase())
            ) {
              let task = { Status: obj1.Status, data: obj2 }
              tempArr.push(task)
            }
          })
        })
      setSearchData(tempArr)
    }
  }

  const renderTaskList = (task, Status, listType) => {
    return (
      <div
        className="row"
        style={{ marginBottom: "15px", position: "relative" }}
      >
        {listType === 1 && Status === "overdue" && (
          <div className="redWidth">
            <div className="redLine">
              {" "}
              <img src={RedLine} alt="" />
            </div>
          </div>
        )}
        <div className="col-10 col-md-6 col-sm-6 col-xl-6">
          <div className="all-companies-sub-title">
            {/* <img id={task.TaskId} style={{ cursor: "pointer" }}
              src={task.Status === "Approved" ? completeTaskIcon : sidebarCheckIcon}
              alt="sidebar Check Icon"
              onClick={() => _handleApproveTaskOnCheckBoxClick(task.TaskId)} /> */}
            <div
              onClick={(e) => getSelectTaskDetails(task)}
              style={{ cursor: "pointer" }}
            >
              <div class="graybox-left">
                <span class="all-companies-nse-label">{task.LicenseCode}</span>
              </div>
              <span className="pink-label-title-right">
                <div className="overdue-title">{task.TaskName}</div>
                <div
                  className={
                    Status === "overdue"
                      ? "red-week d-block d-sm-none"
                      : "black-week d-block d-sm-none"
                  }
                  style={{ cursor: "pointer" }}
                  onClick={(e) => getSelectTaskDetails(task)}
                >
                  <div className="d-block d-sm-none">
                    {getDayDate(task.EndDate, 2)}
                  </div>
                </div>
                <p
                  className="pink-label-text d-none d-sm-block"
                  style={{
                    backgroundColor:
                      task && task.Status
                        ? task.Status === "Assign"
                          ? "#fcf3cd"
                          : // task.Status === "Completed By User"  ? "#cdfcd8 " :
                          task.Status === "Completed By User"
                          ? task.EndDate < today
                            ? "#cdfcd8"
                            : "#ffefea"
                          : task.Status === "Approved"
                          ? "#cdfcd8"
                          : task.Status === "Assigned"
                          ? "#ffefea"
                          : task.Status === "Request Rejected"
                          ? "#ffefea"
                          : "#d2fccd"
                        : "#d2fccd",
                    color:
                      task && task.Status
                        ? task.Status === "Completed By User"
                          ? task.EndDate < today
                            ? "#7fba7a"
                            : "#ff5f31"
                          : // task.Status === "Completed By User" ? "#7fba7a" :
                          task.Status === "Approved"
                          ? "#7fba7a"
                          : task.Status === "Assigned"
                          ? "#f8c102"
                          : task.Status === "Assign"
                          ? "#f8c102"
                          : task.Status === "Request Rejected"
                          ? "#ff5f31"
                          : ""
                        : "#fcf3cd",
                  }}
                >
                  {task.Status && task.Status === "Completed By User"
                    ? task.EndDate < today
                      ? "Task Completed"
                      : "Approval Pending"
                    : task.Status === "Assign"
                    ? "Assign Task"
                    : task.Status === "Assigned"
                    ? "Task Assigned"
                    : task.Status === "Approved"
                    ? "Task Approved"
                    : task.Status === "Request Rejected"
                    ? "Task Rejected"
                    : ""}
                </p>
              </span>
            </div>
          </div>
        </div>
        <div className="col-2 col-md-2 col-sm-2 col-xl-2 d-none d-sm-block">
          <div
            className="circle-front-text"
            style={{ width: "fit-content", cursor: "pointer" }}
            value={task.TaskId}
            onClick={(e) => getSelectTaskDetails(task)}
          >
            {task.EntityName}
          </div>
        </div>
        <div
          className="col-2 col-md-2 col-sm-2 col-xl-2 d-none d-sm-block"
          style={{ cursor: "pointer" }}
          onClick={(e) => getSelectTaskDetails(task)}
        >
          {task.AssignedTo != 0 ? (
            <div className="d-flex">
              {userDetails.UserType === 4 ? (
                task.ApproverName === "Assign" ? null : (
                  <div className="circle-name d-none d-sm-block">
                    <div className="circle-text">
                      {userDetails.UserType === 4 &&
                        getInitials(task.ApproverName)}
                    </div>
                  </div>
                )
              ) : (
                <div className="circle-name d-none d-sm-block">
                  <div className="circle-text">
                    {getInitials(task.AssignedName)}
                  </div>
                </div>
              )}
              {/* // <div className="circle-name d-none d-sm-block">
              //   <div className="circle-text">
              //     {
              //        userDetails.UserType === 4 ?
              //        getInitials(task.ApproverName === "Assign" ? "no approver" : task.ApproverName)
              //        :
              //         getInitials(task.AssignedName)
              //     }
              //   </div>
              // </div> */}
              {userDetails.UserType === 4 ? (
                <div className="circle-front-text d-none d-sm-block">
                  {task.ApproverName === "Assign"
                    ? "No Approver"
                    : task.ApproverName}
                </div>
              ) : (
                <div className="circle-front-text d-none d-sm-block">
                  {task.AssignedName}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div
                className="circle-front-text NoStatus"
                style={{ color: "#6c5dd3" }}
              >
                {" "}
                <img src={assignIconCircle} alt="" /> ASSIGN
              </div>
            </div>
          )}
        </div>
        <div className="col-2">
          <div className="align-right">
            <div className="d-flex">
              <div
                className={
                  Status === "overdue"
                    ? "red-week d-none d-sm-block"
                    : "black-week d-none d-sm-block"
                }
                style={{ cursor: "pointer" }}
                onClick={(e) => getSelectTaskDetails(task)}
              >
                {getDayDate(task.EndDate, 1)}
              </div>
              <div
                className="right-arrow-week text-right-grid"
                style={{ cursor: "pointer" }}
                onClick={(e) => getSelectTaskDetails(task)}
              >
                {
                  <img
                    className="d-none d-sm-block"
                    src={keyboardArrowRightBlack}
                    alt="Right Arrow"
                  />
                }
                {task.AssignedTo !== 0 && (
                  <img
                    className="d-block d-sm-none"
                    src={keyboardArrowRightBlack}
                    alt="Right Arrow"
                  />
                )}
                {showUserToolTip === `Tooltip${task.TaskId}` && (
                  <div className="toolTip-input">
                    <div className="tooltiptext1 mobDisplaynone">
                      <span className="font-normal-text1">
                        {task.AssignedName}
                      </span>
                    </div>
                  </div>
                )}
                {
                  // task.AssignedTo > 0 &&
                  task.AssignedTo === 0 && (
                    <div className="only-mobile-assign-add d-block d-sm-none">
                      <div
                        className="assign-user-icon"
                        onMouseOver={() =>
                          setShowUserToolTip(`Tooltip${task.TaskId}`)
                        }
                        onMouseOut={() => setShowUserToolTip("")}
                      >
                        <img
                          src={assignIconCircle}
                          className="d-block d-sm-none"
                          alt="Assign Circle"
                        />
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        {Status === "overdue" && (
          <div className="redWidth-bottom">
            <div className="redLine">
              {" "}
              <img src={RedLine} alt="" />
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderSidebarTaskList = (task, Status, listType) => {
    return (
      <div
        className={
          getTaskById && task.TaskId == getTaskById.TaskId
            ? " row active-action-card-sidebar "
            : "row action-card-sidebar"
        }
        onClick={(e) => getSelectTaskDetails(task)}
        style={{ cursor: "pointer" }}
      >
        <div className="col-10">
          <div className="all-companies-sub-title">
            {/* <img id={task.TaskId} src={task.Status === "Approved" ? completeTaskIcon : sidebarCheckIcon}
              alt="sidebar Check Icon" onClick={() => _handleApproveTaskOnCheckBoxClick(task.TaskId)} /> */}

            <div className="graybox-left">
              <span className="all-companies-nse-label">
                {task.LicenseCode}
              </span>{" "}
            </div>
            <div
              className="pink-label-title-right"
              onClick={(e) => getSelectTaskDetails(task)}
            >
              <div className="overdue-title-sidebar-title pl-1">
                {task.TaskName}
              </div>
              <div
                className="red-week  date-font pl-1"
                style={{ cursor: "pointer" }}
              >
                {getDayDate(task.EndDate, 2)}
              </div>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="align-right">
            <div className="d-flex">
              <div
                className="right-arrow-week text-right-grid"
                style={{ cursor: "pointer" }}
                onClick={(e) => getSelectTaskDetails(task)}
              >
                <img
                  className=""
                  src={keyboardArrowRightBlack}
                  alt="Right Arrow"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const onHBMenu = () =>{
    const drawerParent = document.getElementById("sideBarParent");
      const drawerChild = document.getElementById("sideBarChild");
      if (drawerParent) {
         drawerParent.classList.add("overlay");
         drawerChild.style.left = "0%";
      }

  }

  return (
    <>
      {visibleRejectTaskModal && renderRejectTaskModal()}
      {!isTaskListOpen && (
        <div className="all-companies-task-grid ">
          {isMobile && (
             <div id="sideBarParent" className="">
             <div id="sideBarChild" className="leftSideBarFixed">
            <MobileLeftSidebar
              className="d-block d-sm-none"
              close={() => closeMobileSidebar()}
            />
            </div>
            </div>
          )}

          <div className="mobile-head d-block d-sm-none">
            <div className="d-flex">
              <div
                className="w-25"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onHBMenu ()
                }}
              >
                <img src={togglemobile} alt="toggle mobile" />
              </div>
              <div className="w-75">
                {" "}
                <img
                  className="mobile-logo"
                  src={sideBarlogo}
                  alt="sideBarlogo"
                />{" "}
              </div>
            </div>
          </div>
          <div className="d-flex mobile-height">
            <div className="companies-sub-title w-25 d-none d-sm-block">
              Tasks
            </div>
            {!searchBoxShowMobile && (
              <div className="companies-sub-title w-25 d-block d-sm-none">
                Tasks
              </div>
            )}
            <div className="w-75 d-none d-sm-block">
              {!searchBoxShow && (
                <div
                  className="only-search-icon"
                  onClick={() => setsearchBoxShow(true)}
                >
                  <img src={searchIcon} alt="sidebar Check Icon" />
                </div>
              )}
              {searchBoxShow && (
                <div className="searchBox d-none d-sm-block" ref={innerSearch}>
                  <div className="input-group form-group">
                    <img
                      className="IconGray"
                      src={searchIcon}
                      alt="search Icon"
                    />
                    <input
                      className="form-control mozilla-py"
                      type="text"
                      placeholder="Search Tasks"
                      onChange={(e) => handleSearch(e.target.value)}
                      value={searchValue}
                    />
                    <span className="input-group-append">
                      <button
                        className="btn border-start-0 border-top-0 border-bottom-0 border-0 ms-n5"
                        type="button"
                      >
                        <img
                          src={closeIconGray}
                          alt="close Icon"
                          onClick={() => clearSearch()}
                        />
                      </button>
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div
              className={
                searchBoxShowMobile
                  ? "col-12 d-block d-sm-none"
                  : "col-10 d-block d-sm-none mobile"
              }
            >
              {!searchBoxShowMobile && (
                <div
                  className="only-search-icon"
                  onClick={() => setsearchBoxShowMobile(true)}
                >
                  <img src={searchIcon} alt="sidebar Check Icon" />
                </div>
              )}
              {searchBoxShowMobile && (
                <div className="searchBox" ref={innerSearchMobile}>
                  <div className="input-group form-group">
                    <img
                      className="IconGray"
                      src={searchIcon}
                      alt="search Icon"
                    />
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Search Tasks"
                      onChange={(e) => handleSearch(e.target.value)}
                      value={searchValue}
                    />
                    <span className="input-group-append">
                      <button
                        className="btn border-start-0 border-top-0 border-bottom-0 border-0 ms-n5"
                        type="button"
                      >
                        <img
                          src={closeIconGray}
                          onClick={() => clearSearch()}
                          alt="close Icon"
                        />
                      </button>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="task-details-file-grid">
            {searchValue != "" && (
              <div className="file-title">Search Results: </div>
            )}
            {searchValue === "" && (
              <div>
                <div className="file-title">List</div>
                <div className="file-title-progress"></div>
              </div>
            )}
          </div>

          <div className="task-grid-scroll">
            {searchValue != "" && (
              <div
                className="take-action"
                style={{
                  marginBottom: "0px",
                  paddingBottom: "0px",
                  paddingTop: "20px",
                }}
              >
                {searchData.length > 0 &&
                  searchData.map((task) => {
                    return <>{renderTaskList(task.data, task.Status, 2)}</>
                  })}
              </div>
            )}
            {searchValue === "" &&
              taskData &&
              taskData.length > 0 &&
              taskData.map((item, index) => {
                return (
                  <>
                    <div className="take-action">
                      <div className="task-list-grid">
                        {item.Status.trim() === "overdue" && (
                          <div
                            className="action-title"
                            style={{ color: "#f22727", fontWeight: "500" }}
                          >
                            {"Overdue"}
                          </div>
                        )}
                        {item.Status.trim() === "Pending" && (
                          <div className="action-title">{"Take Action"}</div>
                        )}
                        {(item.Status.trim() === "Upcoming" ||
                          item.Status.trim() === "Completed") && (
                          <div
                            className="upcoming-btn"
                            onClick={() => {
                              expandedFlags.includes(index)
                                ? handleExpandList("hide", index)
                                : handleExpandList("show", index)
                            }}
                          >
                            <div
                              style={{ cursor: "pointer" }}
                              className={
                                item.Status.trim() === "Upcoming"
                                  ? "upcoming-title"
                                  : "complete-title"
                              }
                            >
                              {item.Status.trim() === "Upcoming"
                                ? "Upcoming"
                                : "Completed"}
                              <span
                                className={
                                  item.Status.trim() === "Upcoming"
                                    ? "black-circle"
                                    : "green-circle"
                                }
                              >
                                <p className="black-circle-text">
                                  {item.Details.length}
                                </p>
                              </span>
                              {expandedFlags.includes(index) ? (
                                <img
                                  src={upArrow}
                                  className="arrowDown"
                                  alt="Arrow Up"
                                />
                              ) : (
                                <img
                                  src={downArrow}
                                  className="arrowDown"
                                  alt="Arrow down"
                                />
                              )}
                            </div>
                          </div>
                        )}
                        {item.Status.trim() === "overdue" &&
                          item.Details.slice(
                            0,
                            rowCount[item.Status.trim()]
                          ).map((task) => {
                            return (
                              <>{renderTaskList(task, item.Status.trim(), 1)}</>
                            )
                          })}
                        {item.Status.trim() != "overdue" &&
                          (item.Status.trim() === "Pending"
                            ? true
                            : !expandedFlags.includes(index)) && (
                            <>
                              {item.Details.slice(
                                0,
                                rowCount[item.Status.trim()]
                              ).map((task) => {
                                return (
                                  <>
                                    {renderTaskList(
                                      task,
                                      item.Status.trim(),
                                      1
                                    )}
                                  </>
                                )
                              })}
                              <div>
                                {item.Details.length > 4 && (
                                  <>
                                    {rowCount[item.Status.trim()] > 4 && (
                                      <div
                                        onClick={() =>
                                          showLessMore(item.Status, 4)
                                        }
                                        className="viewAll showLess"
                                      >
                                        Show Less{" "}
                                        <img
                                          src={viewAllArowTop}
                                          alt="Show Less"
                                        />
                                      </div>
                                    )}
                                    {rowCount[item.Status.trim()] === 4 && (
                                      <div
                                        onClick={() =>
                                          showLessMore(
                                            item.Status,
                                            item.Details.length
                                          )
                                        }
                                        className="viewAll"
                                      >
                                        View All ({item.Details.length - 4} )
                                        <img
                                          src={viewAllArow}
                                          alt="view All Arow"
                                        />
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </>
                          )}
                      </div>
                    </div>
                  </>
                )
              })}
          </div>
        </div>
      )}

      {isTaskListOpen && (
        <div className="row ">
          <div className="col-3 new-side-bar d-none d-sm-block">
            <div className="scroll-inside">
              <div className="all-companies-task-grid-2 inside-padding-sidebar">
                {!searchBoxShow && (
                  <div
                    className="only-search-icon"
                    onClick={() => setsearchBoxShow(true)}
                  >
                    <img src={searchIcon} alt="sidebar Check Icon" />
                  </div>
                )}
                {searchBoxShow && (
                  <div
                    className="task-details-file-grid-sidebar ss"
                    ref={innerSearch}
                    style={{ marginTop: "12px" }}
                  >
                    <img
                      className="IconGray"
                      src={searchIcon}
                      alt="search Icon"
                      style={{
                        position: "absolute",
                        marginTop: "10px",
                        paddingLeft: "10px",
                      }}
                    />
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Search Tasks"
                      onChange={(e) => handleSearch(e.target.value)}
                      value={searchValue}
                      style={{ paddingLeft: "40px" }}
                    />

                    <span
                      className="input-group-append"
                      style={{ marginTop: "-40px", float: "right" }}
                    >
                      <button
                        className="btn border-start-0 border-top-0 border-bottom-0 border-0 ms-n5"
                        type="button"
                      >
                        <img
                          src={closeIconGray}
                          alt="close Icon"
                          onClick={() => clearSearch()}
                        />
                      </button>
                    </span>
                  </div>
                )}
                {!searchBoxShow && (
                  <>
                    <div className="all-companies-title-sidebar">
                      All Companies
                    </div>
                    <div className="companies-sub-title-sidebar">Tasks</div>
                  </>
                )}
                <div className="task-details-file-grid-sidebar">
                  <div className="row">
                    <div className="col">
                      {searchValue != "" && (
                        <div className="file-title">Search Results: </div>
                      )}
                      {searchValue === "" && (
                        <div>
                          <div className="file-title">List</div>
                          <div className="file-title-progress"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="take-action">
                  {searchValue != "" && (
                    <div
                      className="take-action"
                      style={{
                        marginBottom: "0px",
                        paddingBottom: "0px",
                        paddingTop: "20px",
                      }}
                    >
                      {searchData.length > 0 &&
                        searchData.map((task) => {
                          return (
                            <>
                              {renderSidebarTaskList(task.data, task.Status, 2)}
                            </>
                          )
                        })}
                    </div>
                  )}
                  {searchValue === "" &&
                    taskData &&
                    taskData.length > 0 &&
                    taskData.map((item, index) => {
                      return (
                        <>
                          <div className="task-list-grid">
                            {item.Status.trim() === "overdue" && (
                              <div
                                className="overdue-title-sidebar"
                                style={{ color: "#f22727", fontWeight: "500" }}
                              >
                                {"Overdue"}
                              </div>
                            )}
                            {item.Status.trim() === "Pending" && (
                              <div className="action-title-sidebar">
                                {"Take Action"}
                              </div>
                            )}
                            {(item.Status.trim() === "Upcoming" ||
                              item.Status.trim() === "Completed") && (
                              <div
                                className={
                                  item.Status.trim() === "Upcoming"
                                    ? "upcoming-btn sidebar-upcoming"
                                    : "upcoming-btn sidebar-completed"
                                }
                                onClick={() => {
                                  expandedFlags.includes(index)
                                    ? handleExpandList("hide", index)
                                    : handleExpandList("show", index)
                                }}
                              >
                                <div
                                  style={{ cursor: "pointer" }}
                                  className={
                                    item.Status.trim() === "Upcoming"
                                      ? "upcoming-title"
                                      : "complete-title"
                                  }
                                >
                                  {item.Status.trim() === "Upcoming"
                                    ? "Upcoming"
                                    : "Completed"}
                                  <span
                                    className={
                                      item.Status.trim() === "Upcoming"
                                        ? "black-circle"
                                        : "green-circle"
                                    }
                                  >
                                    <p className="black-circle-text">
                                      {item.Details.length}
                                    </p>
                                  </span>
                                  {expandedFlags.includes(index) ? (
                                    <img
                                      src={upArrow}
                                      className="arrowDown"
                                      alt="Arrow Up"
                                    />
                                  ) : (
                                    <img
                                      src={downArrow}
                                      className="arrowDown"
                                      alt="Arrow down"
                                    />
                                  )}
                                </div>
                              </div>
                            )}
                            {item.Status.trim() === "overdue" &&
                              item.Details.slice(
                                0,
                                rowCount[item.Status.trim()]
                              ).map((task) => {
                                return (
                                  <>
                                    {renderSidebarTaskList(
                                      task,
                                      item.Status.trim(),
                                      1
                                    )}
                                  </>
                                )
                              })}

                            {item.Status.trim() != "overdue" &&
                              (item.Status.trim() === "Pending"
                                ? true
                                : !expandedFlags.includes(index)) && (
                                <>
                                  {item.Details.slice(
                                    0,
                                    rowCount[item.Status.trim()]
                                  ).map((task) => {
                                    return (
                                      <>
                                        {renderSidebarTaskList(
                                          task,
                                          item.Status.trim(),
                                          1
                                        )}
                                      </>
                                    )
                                  })}
                                  <div>
                                    {item.Details.length > 4 && (
                                      <>
                                        <div className="sidebar-btn">
                                          {rowCount[item.Status.trim()] > 4 && (
                                            <div
                                              onClick={() =>
                                                showLessMore(item.Status, 4)
                                              }
                                              className="viewAll showLess"
                                            >
                                              Show Less{" "}
                                              <img
                                                src={viewAllArowTop}
                                                alt="Show Less"
                                              />
                                            </div>
                                          )}
                                          {rowCount[item.Status.trim()] ===
                                            4 && (
                                            <div
                                              onClick={() =>
                                                showLessMore(
                                                  item.Status,
                                                  item.Details.length
                                                )
                                              }
                                              className="viewAll"
                                            >
                                              View All (
                                              {item.Details.length - 4} )
                                              <img
                                                src={viewAllArow}
                                                alt="view All Arow"
                                              />
                                            </div>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </>
                              )}
                          </div>
                        </>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isTaskListOpen && (
        <div className="row ">
          <div className="col-12 right-side-bar">
            <div className="">
              <div className="task-details-veiw">
                <div className="task-details-header">
                  <div className="closing-icon">
                    <div className="task-details-title">
                      {getTaskById && getTaskById.EntityName}
                    </div>
                    <div
                      className="task-close-icon"
                      onClick={() => {
                        setIsTaskListOpen(false)
                        setExpandedFlags([])
                      }}
                    >
                      <img src={closeBlack} alt="Arrow close" />
                    </div>
                  </div>
                  <div className="task-details-sub-title">
                    {getTaskById && getTaskById.TaskName}{" "}
                    <span className="nse-label d-none d-sm-block">
                      {getTaskById && getTaskById.LicenseCode}
                    </span>
                  </div>

                  <div className="d-flex d-block d-sm-none">
                    <span className="nse-label ml-0">
                      {getTaskById && getTaskById.LicenseCode}
                    </span>
                    <div
                      className="pink-label-mobile ml-0"
                      style={{
                        backgroundColor:
                          getTaskById && getTaskById.Status
                            ? getTaskById.Status === "Assign"
                              ? "#fcf3cd"
                              : // getTaskById.Status === "Completed By User" ? "#cdfcd8 " :
                              getTaskById.Status === "Completed By User"
                              ? getTaskById && getTaskById.EndDate < today
                                ? "#cdfcd8"
                                : "#ffefea"
                              : getTaskById.Status === "Approved"
                              ? "#cdfcd8"
                              : getTaskById.Status === "Assigned"
                              ? "#ffefea"
                              : getTaskById.Status === "Request Rejected"
                              ? "#ffefea"
                              : "#d2fccd"
                            : "#d2fccd",
                      }}
                    >
                      <div
                        className="approved-text"
                        style={{
                          color:
                            getTaskById && getTaskById.Status
                              ? getTaskById.Status === "Completed By User"
                                ? getTaskById && getTaskById.EndDate < today
                                  ? "#7fba7a"
                                  : "#ff5f31"
                                : // task.Status === "Completed By User" ? "#7fba7a" :
                                getTaskById.Status === "Approved"
                                ? "#7fba7a"
                                : getTaskById.Status === "Assigned"
                                ? "#f8c102"
                                : getTaskById.Status === "Assign"
                                ? "#f8c102"
                                : getTaskById.Status === "Request Rejected"
                                ? "#ff5f31"
                                : ""
                              : "#fcf3cd",
                        }}
                      >
                        {getTaskById && getTaskById.Status && (
                          <div style={{ textTransform: "uppercase" }}>
                            {
                              // getTaskById.Status === "Completed By User" ? "Task Completed" :
                              getTaskById.Status === "Completed By User"
                                ? getTaskById && getTaskById.EndDate < today
                                  ? "Task Completed"
                                  : "Approval Pending"
                                : getTaskById.Status === "Assign"
                                ? "Assign Task"
                                : getTaskById.Status === "Assigned"
                                ? "Task Assigned"
                                : getTaskById.Status === "Approved"
                                ? "Task Approved"
                                : getTaskById.Status === "Request Rejected"
                                ? "Task Rejected"
                                : null
                            }
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-header d-none d-sm-block">
                    <div
                      className="approved-label"
                      style={{
                        backgroundColor:
                          getTaskById && getTaskById.Status
                            ? getTaskById.Status === "Assign"
                              ? "#fcf3cd"
                              : getTaskById.Status === "Completed By User"
                              ? getTaskById && getTaskById.EndDate < today
                                ? "#cdfcd8"
                                : "#ffefea"
                              : // getTaskById.Status === "Completed By User"  ? "#cdfcd8 " :
                              getTaskById.Status === "Approved"
                              ? "#cdfcd8"
                              : getTaskById.Status === "Assigned"
                              ? "#ffefea"
                              : getTaskById.Status === "Request Rejected"
                              ? "#ffefea"
                              : "#d2fccd"
                            : "#d2fccd",
                      }}
                    >
                      <div
                        className="approved-text"
                        style={{
                          color:
                            getTaskById && getTaskById.Status
                              ? getTaskById.Status === "Completed By User"
                                ? getTaskById && getTaskById.EndDate < today
                                  ? "#7fba7a"
                                  : "#ff5f31"
                                : // task.Status === "Completed By User" ? "#7fba7a" :
                                getTaskById.Status === "Approved"
                                ? "#7fba7a"
                                : getTaskById.Status === "Assigned"
                                ? "#f8c102"
                                : getTaskById.Status === "Assign"
                                ? "#f8c102"
                                : getTaskById.Status === "Request Rejected"
                                ? "#ff5f31"
                                : ""
                              : "#fcf3cd",
                        }}
                      >
                        {getTaskById && getTaskById.Status && (
                          <div style={{ textTransform: "uppercase" }}>
                            {
                              // getTaskById.Status === "Completed By User" ? "Task Completed" :
                              getTaskById.Status === "Completed By User"
                                ? getTaskById && getTaskById.EndDate < today
                                  ? "Task Completed"
                                  : "Approval Pending"
                                : getTaskById.Status === "Assign"
                                ? "Assign Task"
                                : getTaskById.Status === "Assigned"
                                ? "Task Assigned"
                                : getTaskById.Status === "Approved"
                                ? "Task Approved"
                                : getTaskById.Status === "Request Rejected"
                                ? "Task Rejected"
                                : null
                            }
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="task-detail-data">
                    {userDetails.UserType != 4 && (
                      <div className="row">
                        <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                          <div className="holding-list-normal-title">
                            Assigned to
                          </div>
                        </div>
                        <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                          {getTaskById && getTaskById.AssignedTo != 0 ? (
                            <div className="holding-list-bold-title">
                              {getTaskById &&
                              getTaskById.AssignedToUserName == "" ? null : (
                                <span className="cicrcle-name">
                                  {getInitials(
                                    getTaskById &&
                                      getTaskById.AssignedToUserName
                                  )}
                                </span>
                              )}
                              {getTaskById && getTaskById.AssignedToUserName}
                            </div>
                          ) : (
                            <div
                              className="holding-list-bold-title AssinTo"
                              // onClick={getUserDetail}
                            >
                              <div className="col-9 pl-0">
                                <div
                                  className="dashboard-assign"
                                  id="assignBtn"
                                  style={{
                                    cursor: "pointer",
                                    width: "fit-content",
                                  }}
                                  onClick={(e) => AssignDisplay(e)}
                                >
                                  <img
                                    src={assignIconCircle}
                                    alt="account Circle Purple"
                                  />{" "}
                                  Assign
                                </div>
                                {currentDropDown === "open" && (
                                  <div
                                    ref={innerRef}
                                    className="bottom-tool-tip"
                                    style={{ display: "block" }}
                                  >
                                    <div
                                      className="shadow-tooltip"
                                      style={{
                                        minHeight: "113px",
                                        maxHeight: "auto",
                                        height: "auto",
                                      }}
                                    >
                                      <div className="">
                                        <div className="tool-tip-head">
                                          <div className="add-Email border-bottom">
                                            <div class="form-group" style={{width:"100%"}}>
                                              <input
                                                style={{width:"100%"}}
                                                type="text"
                                                class="form-control"
                                                placeholder="Enter name or email"
                                                value={selectedUser}
                                                onKeyPress={(e) =>
                                                  handleAssignKeyDown(e)
                                                }
                                                onChange={(e) =>
                                                  handleAppSearch(
                                                    e.target.value
                                                  )
                                                }
                                              />
                                              {emailAvaliableCheck &&
                                                selectedUser != "" && (
                                                  <div
                                                    className=""
                                                    style={{
                                                      color: "#ef5d5d",
                                                      paddingLeft: "7px",
                                                      position: "absolute",
                                                    }}
                                                  >
                                                    Email already exists
                                                  </div>
                                                )}
                                            </div>
                                            <span className="or-devider" style={{display:"none"}}>or </span>
                                            <button class="btn save-details assign-me"style={{display:"none"}} value="4" onClick={(e) => AssignTaskToMe(e)}>Assign to me</button>
                                          </div>
                                        </div>
                                        <div
                                          className="email-list-box"
                                          style={{
                                            paddingBottom: "15px",
                                            maxHeight: "115px",
                                            height: "auto",
                                          }}
                                        >
                                          {allUser && allUser.length > 0 ? (
                                            allUser.map((user, index) => (
                                              <div
                                                className="email-list-row"
                                                key={index}
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                  onAssignTaskClick(user)
                                                }
                                              >
                                                <span class="name-circle">
                                                  {getInitials(
                                                    user.UserName
                                                      ? user.UserName
                                                      : user.EmailID
                                                      ? user.EmailID
                                                      : null
                                                  )}
                                                </span>
                                                <span className="name-of-emailer">
                                                  {user.UserName
                                                    ? user.UserName
                                                    : ""}
                                                </span>
                                                <span className="last-email-box">
                                                  {user.EmailID}
                                                </span>
                                              </div>
                                            ))
                                          ) : (
                                            <span
                                              className="last-email-box email-list-row"
                                              style={{ textAlign: "center" }}
                                            >
                                              No records Available
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {userDetails.UserType != 3 && (
                      <div className="row">
                        <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                          <div className="holding-list-normal-title">
                            Assigned by
                          </div>
                        </div>
                        <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                          <div className="holding-list-bold-title">
                            {getTaskById &&
                            getTaskById.AssignedFromUserName == "" ? null : (
                              <span className="cicrcle-name">
                                {getInitials(
                                  getTaskById &&
                                    getTaskById.AssignedFromUserName
                                )}
                              </span>
                            )}
                            {getTaskById && getTaskById.AssignedFromUserName}
                          </div>
                        </div>
                      </div>
                    )}
                    {userDetails.UserType != 5 && (
                      <div className="row">
                        <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                          <div className="holding-list-normal-title">
                            Approver
                          </div>
                        </div>
                        <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                          {getTaskById &&
                          getTaskById.ApproverName != "Assign" ? (
                            <div className="holding-list-bold-title">
                              {getTaskById &&
                              getTaskById.ApproverName == "" ? null : (
                                <span className="cicrcle-name">
                                  {getInitials(
                                    getTaskById && getTaskById.ApproverName
                                  )}
                                </span>
                              )}
                              {getTaskById && getTaskById.ApproverName}
                            </div>
                          ) : (
                            <div
                              className="holding-list-bold-title"
                              // onClick={getApproveUsers}
                            >
                              <div className="col-9 pl-0">
                                {user && user.UserType === 4 ? (
                                  <div className="holding-list-bold-title">
                                    Not Assigned
                                  </div>
                                ) : (
                                  <div
                                    className="dashboard-assign"
                                    style={{
                                      cursor: "pointer",
                                      width: "fit-content",
                                    }}
                                    onClick={(e) => ApprovDisplay(e)}
                                  >
                                    <img
                                      src={assignIconCircle}
                                      alt="account Circle Purple"
                                    />{" "}
                                    Assign
                                  </div>
                                )}
                                {approverDropDown ===
                                  "openapproverdropdown" && (
                                  <div
                                    ref={approverDropDownRef}
                                    className="bottom-tool-tip"
                                    style={{ display: "block" }}
                                  >
                                    <div
                                      className="shadow-tooltip"
                                      style={{
                                        minHeight: "113px",
                                        maxHeight: "auto",
                                        height: "auto",
                                      }}
                                    >
                                      <div className="">
                                        <div className="tool-tip-head">
                                          <div className="add-Email border-bottom">
                                            <div class="form-group" style={{width:"100%"}}> 
                                              <input
                                                style={{width:"100%"}}
                                                type="text"
                                                class="form-control"
                                                placeholder="Enter name or email"
                                                value={selectedUser}
                                                onKeyPress={(e) =>
                                                  handleKeyDown(e)
                                                }
                                                onChange={(e) =>
                                                  handleAppSearch(
                                                    e.target.value
                                                  )
                                                }
                                              />
                                              {emailAvaliableCheck &&
                                                selectedUser != "" && (
                                                  <div
                                                    className=""
                                                    style={{
                                                      color: "#ef5d5d",
                                                      paddingLeft: "7px",
                                                      position: "absolute",
                                                    }}
                                                  >
                                                    Email already exists
                                                  </div>
                                                )}
                                            </div>
                                            <span className="or-devider" style={{display:"none"}}> or</span>
                                            <button class="btn save-details assign-me" value="5" onClick={(e) => approvTaskToMe(e)}style={{display:"none"}}>Assign to me</button>
                                          </div>
                                        </div>
                                        <div
                                          className="email-list-box"
                                          style={{
                                            paddingBottom: "15px",
                                            maxHeight: "115px",
                                            height: "auto",
                                          }}
                                        >
                                          {allUser && allUser.length > 0 ? (
                                            allUser.map((user, index) => (
                                              <div
                                                className="email-list-row"
                                                key={index}
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                  handleChooseApprove(user)
                                                }
                                              >
                                                <span class="name-circle">
                                                  {getInitials(
                                                    user.UserName
                                                      ? user.UserName
                                                      : user.EmailID
                                                      ? user.EmailID
                                                      : null
                                                  )}
                                                </span>
                                                <span className="name-of-emailer">
                                                  {user.UserName
                                                    ? user.UserName
                                                    : ""}
                                                </span>
                                                <span className="last-email-box">
                                                  {user.EmailID}
                                                </span>
                                              </div>
                                            ))
                                          ) : (
                                            <span
                                              className="last-email-box email-list-row"
                                              style={{ textAlign: "center" }}
                                            >
                                              No records Available
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="row">
                      <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                        <div className="holding-list-normal-title">
                          Due Date
                        </div>
                      </div>
                      <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                        <div className="holding-list-bold-title">
                          {moment(getTaskById && getTaskById.EndDate).format(
                            "DD MMM"
                          )}
                        </div>
                      </div>
                    </div>
                    {userDetails.UserType != 4 && (
                      <div className="row">
                        <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                          <div className="holding-list-normal-title">
                            Deadline
                          </div>
                        </div>
                        <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                          <div className="holding-list-bold-title">
                            {moment(
                              getTaskById && getTaskById.ActualTaskEndDate
                            ).format("DD MMM")}
                          </div>
                        </div>
                      </div>
                    )}
                    {userDetails.UserType != 4 && (
                      <div className="row">
                        <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                          <div className="holding-list-normal-title">
                            Status
                          </div>
                        </div>
                        <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                          <div className="holding-list-bold-title">
                            {getTaskById && getTaskById.Status
                              ? getTaskById.Status === "Completed By User"
                                ? getTaskById.EndDate < today
                                  ? "Task Completed"
                                  : "Approval Pending"
                                : getTaskById.Status === "Assign"
                                ? "Assign Task"
                                : getTaskById.Status === "Assigned"
                                ? "Task Assigned"
                                : getTaskById.Status === "Approved"
                                ? "Task Approved"
                                : getTaskById.Status === "Request Rejected"
                                ? "Task Rejected"
                                : null
                              : ""}
                          </div>
                        </div>
                      </div>
                    )}
                    {completedDate &&
                      isTaskApproved &&
                      userDetails.UserType != 4 && (
                        <div className="row">
                          <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                            <div className="holding-list-normal-title">
                              Completed on
                            </div>
                          </div>
                          <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                            <div className="holding-list-bold-title">
                              {moment(completedDate).format("DD MMM  h:mm a")}
                            </div>
                          </div>
                        </div>
                      )}
                    <div className="row">
                      <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                        <div className="holding-list-normal-title">License</div>
                      </div>
                      <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                        <div className="holding-list-bold-title">
                          {getTaskById && getTaskById.LicenseCode}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 col-sm-3 col-md-3 col-xl-3">
                        <div className="holding-list-normal-title">Company</div>
                      </div>
                      <div className="col-8 col-sm-9 col-md-9 col-xl-9">
                        <div className="holding-list-bold-title">
                          {getTaskById && getTaskById.EntityName}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="task-details-file-grid1">
                  <div className="d-flex">
                    <div className="tab-list-space">
                      {showFiles ? (
                        <div
                          className="file-title pointer"
                          onClick={() => {
                            setShowFiles(true)
                            setShowComments(false)
                            setShowHtoDoIt(false)
                          }}
                        >
                          Files
                        </div>
                      ) : (
                        <div
                          className="file-title unActiveText-color pointer"
                          onClick={() => {
                            setShowFiles(true)
                            setShowComments(false)
                            setShowHtoDoIt(false)
                          }}
                        >
                          Files
                        </div>
                      )}
                      {showFiles && (
                        <div className="file-title-progress col-5"></div>
                      )}
                    </div>
                    <div className="tab-list-space">
                      {showComments ? (
                        <div
                          className="file-title  pointer"
                          style={{ color: "#2c2738" }}
                          onClick={() => getComments()}
                        >
                          Comments
                        </div>
                      ) : (
                        <div
                          className="file-title unActiveText-color"
                          onClick={() => getComments()}
                        >
                          Comments
                        </div>
                      )}
                      {showComments && (
                        <div className="file-title-progress comments-progress-width"></div>
                      )}
                    </div>
                  </div>
                </div>
                {showFiles && (
                  <div className="file-grid-data">
                    {user && user.UserType && user.UserType === 4 || user && user.UserType && user.UserType === 3 ?  (
                      <>
                        {getTaskById &&
                        getTaskById.Status &&
                        getTaskById.Status === "Assigned" &&
                        getTaskById &&
                        getTaskById.Status &&
                        getTaskById.TaskStatus === 0 ? (
                          user && user.UserType && user.UserType === 4 || user && user.UserType && user.UserType === 3 ? (
                            <>
                              {" "}
                              <div className="row">
                                <div className="col-12 col-sm-4 col-md-4 col-xl-4">
                                  <div className="file-upload-title file-img-width">
                                    <div className="">
                                      <div className="file-upload-box">
                                        <div className="image-display">
                                          <Dropzone
                                            multiple={true}
                                            maxSize={26214400}
                                            accept=".png,.jpg,
                                        application/pdf,application/rtf,application/msword,image/bmp,
                                        application/vnd.ms-excel,image/tiff,image/tif,image/jpeg,
                                        application/ms-excel,
                                        .tiff,.pdf,.doc,.docx,
                                        .XLS,.xlsx,.CSV,.zip,.rar,.txt"
                                            onDrop={(acceptedFiles) =>
                                              handleSelectUploadFile(
                                                acceptedFiles
                                              )
                                            }
                                          >
                                            {({
                                              getRootProps,
                                              getInputProps,
                                            }) => (
                                              <div
                                                {...getRootProps({
                                                  className: "dropzone",
                                                })}
                                              >
                                                <div>
                                                  <input {...getInputProps()} />
                                                </div>
                                                <img
                                                  src={fileUploadIcon}
                                                  className="cloudImg"
                                                  alt="File Upload icon"
                                                />
                                                <div className="drag-drop-title text-center">
                                                  Drag and drop your files here
                                                </div>
                                                <div className="text-center">
                                                  Upload files
                                                </div>
                                              </div>
                                            )}
                                          </Dropzone>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : null
                        ) : null}

                        {fileList && fileList.length > 0 ? (
                          fileList.map((file, index) => (
                            <div className="no-files">
                              {file && file.Files && file.Files.length > 0
                                ? file.Files.map((files, index) => (
                                    <div className="d-flex">
                                      <div className="pr-3">
                                        <div className="file-upload-title file-img-width">
                                          <img
                                            src={fileIcon}
                                            alt="file Icon"
                                            className="file-icon-box"
                                            value={files.TaskFileId}
                                          />{" "}
                                          {files.FileName}
                                        </div>
                                      </div>
                                      <div className="pr-3">
                                        {getTaskById &&
                                          getTaskById.TaskId !== undefined && (
                                            <a
                                              href={`${BACKEND_BASE_URL}/viewfiles.ashx?id=${getTaskById.TaskId}&flag=downloadtaskfiles&file=${files.FileName}`}
                                              style={{ textDecoration: "none" }}
                                              className="file-download-title pointer d-flex"
                                            >
                                              download{" "}
                                              <span className="d-none d-sm-block">
                                                &nbsp;file
                                              </span>
                                            </a>
                                          )}
                                      </div>
                                      <div className="pr-3">
                                        <div
                                          style={{ cursor: "pointer" }}
                                          onClick={() => deleteFile(files)}
                                          className="file-download-title pointer d-flex"
                                        >
                                          <img
                                            className="delete-icon"
                                            src={deleteBlack}
                                            alt="delete Icon"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                : "No Files To View here"}
                            </div>
                          ))
                        ) : (
                          <div className="no-files">No Files To View here</div>
                        )}
                      </>
                    ) : fileList && fileList.length > 0 ? (
                      fileList.map((file, index) => (
                        <div className="no-files">
                          {file && file.Files && file.Files.length > 0
                            ? file.Files.map((files, index) => (
                                <div className="row">
                                  <div className="col-8 col-sm-4 col-md-4 col-xl-4">
                                    <div className="file-upload-title file-img-width">
                                      <img
                                        src={fileIcon}
                                        alt="file Icon"
                                        value={files.TaskFileId}
                                      />{" "}
                                      {files.FileName}
                                    </div>
                                  </div>
                                  <div className="col-4 col-sm-8 col-md-8 col-xl-8">
                                    {getTaskById &&
                                      getTaskById.TaskId !== undefined && (
                                        <a
                                          href={`${BACKEND_BASE_URL}/viewfiles.ashx?id=${getTaskById.TaskId}&flag=downloadtaskfiles&file=${files.FileName}`}
                                          style={{ textDecoration: "none" }}
                                          className="file-download-title pointer d-flex"
                                        >
                                          download{" "}
                                          <span className="d-none d-sm-block">
                                            &nbsp;file
                                          </span>
                                        </a>
                                      )}
                                  </div>
                                </div>
                              ))
                            : "No Files To View here"}
                        </div>
                      ))
                    ) : (
                      <div className="no-files">No Files To View here</div>
                    )}

                    {(getTaskById &&
                      getTaskById.Status &&
                      getTaskById.Status === "Approved") ||
                    (getTaskById &&
                      getTaskById.Status &&
                      getTaskById.TaskStatus === 1) ? (
                      (user && user.UserType && user.UserType === 3) ||
                      user.UserType === 4 ||
                      (user.UserType === 5 && " ")
                    ) : getTaskById &&
                      getTaskById.Status &&
                      getTaskById.Status === "Assigned" &&
                      getTaskById &&
                      getTaskById.Status &&
                      getTaskById.TaskStatus === 0 ? (
                      user && user.UserType && user.UserType === 4 ? (
                        <button
                          style={{ marginTop: 10, width: 150 }}
                          onClick={() => teamMemberMarkComplete()}
                          className="btn save-details-bnt approve-task"
                          value="3"
                        >
                          Mark Complete
                        </button>
                      ) : (
                        ""
                      )
                    ) : getTaskById &&
                      getTaskById.Status &&
                      getTaskById.Status === "Assign" &&
                      getTaskById &&
                      getTaskById.Status &&
                      getTaskById.TaskStatus === 0 ? (
                      ""
                    ) : getTaskById &&
                      getTaskById.Status &&
                      getTaskById.Status === "Request Rejected" &&
                      getTaskById &&
                      getTaskById.Status &&
                      getTaskById.TaskStatus === 3 ? (
                      user &&
                      user.UserType &&
                      user.UserType === 4 && (
                        <button
                          style={{ marginTop: 10, width: 150 }}
                          onClick={() => teamMemberMarkComplete()}
                          className="btn save-details-bnt approve-task"
                          value="3"
                        >
                          Mark Complete
                        </button>
                      )
                    ) : (getTaskById &&
                        getTaskById.Status &&
                        getTaskById.Status === "Completed By User") ||
                      (getTaskById &&
                        getTaskById.Status &&
                        getTaskById.TaskStatus === 4) ? (
                      (user && user.UserType && user.UserType === 3) ||
                      (user && user.UserType && user.UserType === 5) ? (
                        <div class="btn-toolbar text-center well">
                          <div class="col-6 col-sm-2 col-md-2 col-xl-2 text-left pl-0">
                            <button
                              onClick={(e) => handleAppTask(getTaskById)}
                              className="btn save-details-bnt approve-task"
                            >
                              approve task
                            </button>
                          </div>
                          <div class="col-6 col-sm-2 col-md-2 col-xl-2 text-left pl-45">
                            <button
                              className="btn save-details-bnt reject-task"
                              value="3"
                              onClick={() => setVisibleRejectTaskModal(true)}
                            >
                              reject Task
                            </button>
                          </div>
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                )}
                {showComments && (
                  <div className="file-grid-data blank-space-height">
                    {getCommentsbyId && getCommentsbyId.length > 0 ? (
                      getCommentsbyId.map((comment, index) => (
                        <div>
                          <div className="comment-box">
                            <div className="name-box">
                              {getInitials(
                                comment &&
                                  comment.B &&
                                  comment.B[0] &&
                                  comment.B[0].UserName &&
                                  comment.B[0].UserName != ""
                                  ? comment.B[0].UserName
                                  : "No Username"
                              )}
                            </div>
                            <div className="rigt-box-comment">
                              <div className="d-flex">
                                <div className="right-box-text">
                                  {comment &&
                                  comment.B &&
                                  comment.B[0] &&
                                  comment.B[0].UserName &&
                                  comment.B[0].UserName != ""
                                    ? comment.B[0].UserName
                                    : "No Username"}
                                </div>
                                <div className="days-ago">
                                  {moment(comment.CommentOn).format("DD MMM")}
                                </div>
                              </div>
                              <div className="comment-desc">
                                {comment.Comment}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-comments">No Comments</div>
                    )}

                    <div className="comment-box">
                      <div className="name-box">
                        {getInitials(user && user.UserName)}
                      </div>
                      <div className="rigt-box-comment">
                        <div className="input-comment-box input-comment-boxLeft">
                          <TextareaAutosize
                            minRows={1.3}
                            style={{ overflow: "hidden" }}
                            type="text"
                            className="form-control textAreaHeight"
                            value={inputComment}
                            placeholder="Add a comment"
                            onChange={(e) => handleChange(e)}
                            required
                          />
                          <div className="inputIcon">
                            <img
                              src={inputRightArrow}
                              alt=""
                              style={{ cursor: "pointer" }}
                              onClick={() => submitComment()}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {showHtoDoIt && (
                  <div className="file-grid-data blank-space-height">
                    <h1>We Don't Know</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <TaskDetailsView />
      </div>
    </>
  )
}
const mapStateToProps = (state) => ({
  NotificationRedu: state,
})
export default connect(mapStateToProps)(withRouter(RightSideGrid))
