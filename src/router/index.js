import React from "react";
import { Route } from "react-router-dom";
import Header from "../CommonModules/Header";
import Compliance from "../Components/ComplianceModule";
import CapmTechLandingPage from "../Components/CapmTechLandingPage";
import TeamMember from "../Components/TeamMemberFlow/DashBoard";
import OnBoarding from "../Components/OnBording/SubModules/GetStarted";
import ComplianceDemo7 from "../Components/ComplianceModule/ComplianceDemo7";
import PersonalDetails from "../Components/OnBording/SubModules/PersonalDetails";
import CoDashboard from "../Components/CoDashboard";
import AssignTask from "../Components/OnBording/SubModules/AssignTask";
import VerifyEmailErrorPage from "../Components/OnBording/SubModules/VerifyEmail";
import EmailVerifiedPage from "../Components/OnBording/SubModules/EmailVerify";
import TeamMemberFlow from "../Components/TeamMemberFlow/VerificationFlow/";
import TeamMemberFlowPersonalDetails from "../Components/TeamMemberFlow/VerificationFlow/components/PersonalDetails";
import TeamMemberFlowOTP from "../Components/TeamMemberFlow/VerificationFlow/components/OTPVerification";
import OTPVerificationCO from "../Components/OnBording/SubModules/VerifyOTP";
import DashBoardCO from "../Components/OnBording/SubModules/DashBoardCO/components";
import SIGNUPPOP from "../Components/TeamMemberFlow/index";
import CompanyDetails from "../Components/OnBording/SubModules/CompanyDetails";
import VerifyOTPCO from "../Components/OnBording/SubModules/VerifyOTP";
import YouAreDone from "../Components/OnBording/SubModules/YourAreDone";
// import loginComtech from "../Components/LoginComtech";
// import ForgotPasswordComtech from "../Components/ForgotPasswordComtech";
// import NewPasswordComtech from "../Components/NewPasswordComtech";
import Governance from "../Components/OnBording/SubModules/Governance";

import CoPersonal from '../Components/OnBording/SubModules/DashBoardCO/components/CoSetting/CoPersonal/index';
import PersonalDetailsTM from "../Components/TeamMemberFlow/VerificationFlow/components/PersonalDetails";
import Login from '../Components/Authectication/components/Login';
import ForgotPassword from '../Components/Authectication/components/ForgotPassword';
import ChangePassword from '../Components/Authectication/components/ChangePassword';
import RedirectToDashboard from '../Components/OnBording/SubModules/redirectToLogin'
import InvitationMemberFlow from "../Components/OnBording/SubModules/IniviteFlowMember"
import Notification from "../Components/OnBording/SubModules/DashBoardCO/components/notification";
//import CoManagment from "../Components/OnBording/SubModules/DashBoardCO/components/HeadCOManagement";
import CoSetting from "../Components/OnBording/SubModules/DashBoardCO/components/CoSetting";
import UserProfileVerifcation from "../Components/UserVerification/components/PersonalDetails"
import UserOTPVerifcation from "../Components/UserVerification/components/OTPVerification";
import UserVerificationProcess from "../Components/UserVerification/components";


export default function AppRouter() {
  const checkHeader = () => {
    
    if (window.location.includes === '/compliance-demo-end"' ||
      window.location.includes === '/') {
      document.body.style.backgroundColor = "white";
      return true;
    }
    return false;
  }
  return (
    <div>
      <>
        {/* {checkHeader() && <Header />} */}
        <div>
          {/** Home */}
          <Route exact path="/" component={OnBoarding} />
          <Route exact path="/assign-task" component={AssignTask} />
          <Route
            exact
            path="/capm-tect-landing"
            component={CapmTechLandingPage}
          />
          <Route exact path="/on-boarding" component={OnBoarding} />
          <Route exact path="/team-member" component={TeamMember} />
          <Route
            exact
            path="/compliance-demo-end"
            component={ComplianceDemo7}
          />
          <Route exact path="/you-are-done" component={YouAreDone} />
          <Route exact path="/co-dashboard" component={CoDashboard} />
          <Route exact path="/personal-details" component={PersonalDetails} />
          <Route exact path="/company-details" component={CompanyDetails} />
          <Route exact path="/company-personal" component={CoPersonal} />
          <Route
            exact
            path="/email-verification-info-page"
            component={VerifyEmailErrorPage}
          />
          <Route
            exact
            path="/email-verification-confirmed"
            component={EmailVerifiedPage}
          />
          <Route
            exact
            path="/team-member-personal-info"
            component={TeamMemberFlowPersonalDetails}
          />
          <Route
            exact
            path="/team-member-secure-verification"
            component={TeamMemberFlowOTP}
          />
          <Route
            exact
            path="/otpverification-co"
            component={OTPVerificationCO}
          />
          <Route exact path="/sign-up-request" component={SIGNUPPOP} />
          <Route exact path="/otp-verification-co" component={VerifyOTPCO} />
          <Route
            exact
            path="/dashboard"
            component={DashBoardCO}
          />
          <Route
            exact
            path="/personal-details-team-member"
            component={PersonalDetailsTM}
          />
           <Route
            exact
            path="/login"
            component={Login}
          />

          <Route
            exact
            path="/forgot-password"
            component={ForgotPassword}
          />
          <Route
            exact
            path="/change-password"
            component={ChangePassword}
          />

          <Route
            exact
            path="/governance"
            component={Governance}
          />

          <Route exact path="/redirect-user-dashboard" component={YouAreDone} />
          <Route exact path="/redirect-dashboard" component={RedirectToDashboard} />

          <Route exact path="/invitation-member" component={InvitationMemberFlow} />
          <Route exact path="/notifications" component={Notification} />
          {/* <Route exact path="/co-managment" component={CoManagment}/> */}
          <Route exact path="/settings" component={CoSetting} />

          <Route exact path="/user-details-verification" component={UserProfileVerifcation} />
          <Route exact path="/otp-verification" component={UserOTPVerifcation} />
          <Route exact path="/user-verification-process" component={UserVerificationProcess} />
        </div>
      </>
    </div>
  );
}
