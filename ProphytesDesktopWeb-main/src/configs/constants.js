import APA_COVER from "../assets/img/organization/cover/alpha-phi-alpha.png";
import AKA_COVER from "../assets/img/organization/cover/alpha-kappa-alpha.png";
import KAP_COVER from "../assets/img/organization/cover/kappa-alpha-psi.png";
import OPP_COVER from "../assets/img/organization/cover/omega-psi-phi.png";
import DST_COVER from "../assets/img/organization/cover/delta-sigma-theta.png";
import PBS_COVER from "../assets/img/organization/cover/phi-beta-sigma.png";
import ZPB_COVER from "../assets/img/organization/cover/zeta-phi-beta.png";
import SGR_COVER from "../assets/img/organization/cover/sigma-gamma-rho.png";
import IPT_COVER from "../assets/img/organization/cover/iota-phi-theta.png";
import PersonSvg from "@/public/img/icon/PersonSvg";
import BookSvg from "@/public/img/icon/BookSvg";
import StatusSvg from "@/public/img/icon/StatusSvg";
import MentorSvg from "@/public/img/icon/MentorSvg";
import MoreSettingSvg from "@/public/img/icon/MoreSettingSvg";
import SocialSvg from "@/public/img/icon/SocialSvg";

export const API_ROUTES = {
  MEMBERS_DIRECTORY: "/api/members-directory",
  MEMBERS_CONNECTION_REQUEST: "/api/connections",
  UPDATE_CONNECTION_REQUEST: "/api/update-connection",
  ORGANIZATIONS: "/api/organizations",
  CHAPTERS: "/api/chapters",
  MEMBERS: "/api/members",
  CITIES: "/api/cities",
  COUNTRIES: "/api/countries",
  STATES: "/api/states",
  VERSITIES: "/api/universities",
  SEND_OTP: "/api/send-otp",
  FAMOUS_PROPHYTES: "/api/famous-prophytes",
  ONBOADING: "/api/onboading",
  IMAGE_UPLOAD: "/api/image-upload",
  ME: "/api/me",
  UPDATE_USER_INFO: "/api/userinfo-update",
  LOGOUT: "/api/logout",
  DELETE_USER: "/api/delete-user",
  STRIPE_PAYMENT: "/api/stripe-payment",
  STRIPE_PAYMENT_INTENT: "/api/stripe-clientId",
  STRIPE_PRICEPLAN: "/api/stripe-plan",
  NOTIFICATIONS: "/api/notifications",
  UPGRADE_PLAN: "/api/upgrade-plan",
  CANCEL_SUBSCRIPTION: "/api/cancel-subscription",
  SUBSCRIPTION_DETAILS: "/api/subscription-details",
  INVOICES: "/api/invoices",
  SUBSCRIPTION_UPDATE_INFO: "/api/stripe-update-info",
  SET_TOKEN: "/api/setToken",
  STATE_APPROVED: "/api/status-approved",
  SEND_OTP_PHONE: "/api/send-otp-phone",
  SEND_CODE_EMAIL: "/api/send-code-email",
  VERIFY_OTP_LOGIN: "/api/verify-otp-login",
  ACCEPT_CONVERSION: "/api/p2p/acceptConversion",
  CONVERSION_REQUESTS: "/api/p2p/conversionReq",
  ALL_CONVERSATIONS: "/api/p2p/conversations",
  DECLINE_CONVERSION: "/api/p2p/declineConversation",
  DELETE_CONVERSATION: "/api/p2p/deleteConversation",
  NEW_CONVERSATION: "/api/p2p/newConvertion",
  UPDATE_CONVERSATION: "/api/p2p/updateConversation",
  SEND_MESSAGE: "/api/p2p/sendMessage",
  ALL_MESSAGES: "/api/p2p/messages",
  DELETE_MESSAGE: "/api/p2p/deleteMsg",
  CONVERSATIONBYRECEIVER: "/api/p2p/conversationByReceiver",
  ALL_CONNECTIONS: "/api/all-connections",
  CREATE_GROUP_CONVERSATION: "/api/group-chat/create-conversation",
  GROUP_INVITATION: "/api/group-chat/group-invitation",
  SEND_GROUP_MESSAGE: "/api/group-chat/send-message",
  LEAVE_GROUP: "/api/p2p/leave-group",
  MESSAGE_REACT: "/api/p2p/message-reaction",
  DELETE_CONVERSATION: "/api/p2p/delete-conversation",
  EDIT_GROUP_NAME: "/api/group-chat/update-group-conversation",
  GET_GROUPCONVERSATION_BY_ID: "/api/group-chat/group-conversation-by-id",
  GET_CHAPTERCONVERSATION_BY_ID: "/api/chapter-chat/conversation",
  GET_ORGCONVERSATION_BY_ID: "/api/organization-chat/conversation",

  UNREAD_MESSAGE: "api/p2p/unreadMessage",
  CONVERSATION_ATTACHMENTS: "api/p2p/conversationAttachments",
  PROFILE_OPT_VERIFICATION: "api/profile-otp-verify",
  CLEAR_CONVERSATION_HISTORY: "api/p2p/clear-history",
  CHAPTER_USER_VERIFICATION: "api/chapter-verification/verify",
  CHAPTER_USER: "api/chapter-verification",
  CHAPTER_USER_SUBMIT_FOR_REVIEW: "api/chapter-verification/submit-for-review",
  CHAPTER_USER_ENTER: "api/chapter-verification/enter",
};

export const ROUTES = {
  PUBLIC: ["/"], // Accessible to all, no redirects
  RESTRICTED: ["/signin", "/onboard"], // Inaccessible to authenticated users, redirect to /profile
  OTP: ["/signin/email-verify", "/signin/phone-verify"], // Skip /api/me fetch
  PROTECTED: [
    "/profile", // Covers /profile/:path*
    "/api/userinfo-update",
    "/api/me",
    "/account-status",
    "/chat",
  ], // Require authentication, redirect to /signin if unauthenticated

  // TOKEN_PROTECTED: ["/chat"], //only need  token, no extra verification.
};

// organaizationon logo
export const orgLogos = {
  APA: "https://prophytesapp22.nyc3.digitaloceanspaces.com/undefined/1685373518955",
  AKA: "https://prophytesapp22.nyc3.digitaloceanspaces.com/undefined/1685374104558",
  KAP: "https://prophytesapp22.nyc3.digitaloceanspaces.com/undefined/1685373801533",
  OPP: "https://prophytesapp22.nyc3.digitaloceanspaces.com/undefined/1685373852231",
  DST: "https://prophytesapp22.nyc3.digitaloceanspaces.com/undefined/1685373627095",
  PBS: "https://prophytesapp22.nyc3.digitaloceanspaces.com/undefined/1685373887521",
  ZPB: "https://prophytesapp22.nyc3.digitaloceanspaces.com/undefined/1685373988931",
  SGR: "https://prophytesapp22.nyc3.digitaloceanspaces.com/undefined/1685373935789",
  IPT: "https://prophytesapp22.nyc3.digitaloceanspaces.com/undefined/1685373710697",
};
export const orgContact = {
  APA: "https://apa1906.net/chapter-locator/",
  AKA: "https://akawebnet.aka1908.net/eweb/DynamicPage.aspx?webcode=CL_public",
  KAP: "https://www.kappaalphapsi1911.com/province-polemarchs/",
  OPP: "https://members.oppf.org/OPPMembers/ChapterSearch/ChapterSearch.aspx",
  DST: "https://delta.dstonline.org/DSTMember/Chapter-Locator.aspx",
  PBS: "https://phibetasigma1914.org/leadership/genboard/",
  ZPB: "https://zphib1920.org/membership/chapter-locator-search-map/",
  SGR: "https://www.sgrho1922.org/SGR/sgr/Membership/Find_a_Chapter.aspx",
  IPT: "https://iotaphitheta.org/chapter-locator/",
};

// organaization

export const organizations = [
  {
    id: 1,
    shortName: "APA",
    organization: "Alpha Phi Alpha",
    logo: "Alpha Phi Alpha.png",
    color: "000000",
    fullName: "Alpha Phi Alpha Fraternity, Inc.",
    defaultAvatar:
      "https://prophytesapp22.nyc3.digitaloceanspaces.com/avatar/Alpha%20Phi%20Alpha.png",
    miniLogo:
      "https://prophytesapp22.nyc3.digitaloceanspaces.com/undefined/1685373518955",
    cover: APA_COVER,
  },
  {
    id: 2,
    shortName: "AKA",
    organization: "Alpha Kappa Alpha",
    logo: "Alpha Kappa Alpha.png",
    color: "FFAABB",
    fullName: "Alpha Kappa Alpha Sorority, Inc.",
    defaultAvatar:
      "https://prophytesapp22.nyc3.digitaloceanspaces.com/avatar/Alpha%20Kappa%20Alpha.png",
    miniLogo:
      "https://prophytesapp22.nyc3.digitaloceanspaces.com/undefined/1685374104558",
    cover: AKA_COVER,
  },
  {
    id: 3,
    shortName: "KAP",
    organization: "Kappa Alpha Psi",
    logo: "Kappa Alpha Psi.png",
    color: "9A0000",
    fullName: "Kappa Alpha Psi Fraternity Inc.",
    defaultAvatar:
      "https://prophytesapp22.nyc3.digitaloceanspaces.com/avatar/Kappa%20Alpha%20Psi.png",
    miniLogo:
      "https://prophytesapp22.nyc3.digitaloceanspaces.com/undefined/1685373801533",
    cover: KAP_COVER,
  },
  {
    id: 4,
    shortName: "OPP",
    organization: "Omega Psi Phi",
    logo: "Omega Psi Phi.png",
    color: "3C0651",
    fullName: "Omega Psi Phi Fraternity, Inc.",
    defaultAvatar:
      "https://prophytesapp22.nyc3.digitaloceanspaces.com/avatar/Omega%20Psi%20Phi.png",
    miniLogo:
      "https://prophytesapp22.nyc3.digitaloceanspaces.com/undefined/1685373852231",
    cover: OPP_COVER,
  },
  {
    id: 5,
    shortName: "DST",
    organization: "Delta Sigma Theta",
    logo: "Delta Sigma Theta.png",
    color: "DF0000",
    fullName: "Delta Sigma Theta Sorority, Inc.",
    defaultAvatar:
      "https://prophytesapp22.nyc3.digitaloceanspaces.com/avatar/Delta%20Sigma%20Theta.png",
    miniLogo:
      "https://prophytesapp22.nyc3.digitaloceanspaces.com/undefined/1685373627095",
    cover: DST_COVER,
  },
  {
    id: 6,
    shortName: "PBS",
    organization: "Phi Beta Sigma",
    logo: "Phi Beta Sigma.png",
    color: "1C3DC8",
    fullName: "Phi Beta Sigma Fraternity, Inc.",
    defaultAvatar:
      "https://prophytesapp22.nyc3.digitaloceanspaces.com/avatar/Phi%20Beta%20Sigma.png",
    miniLogo:
      "https://prophytesapp22.nyc3.digitaloceanspaces.com/undefined/1685373887521",
    cover: PBS_COVER,
  },
  {
    id: 7,
    shortName: "ZPB",
    organization: "Zeta Phi Beta",
    logo: "Zeta Phi Beta.png",
    color: "1C3DC8",
    fullName: "Zeta Phi Beta Sorority, Inc.",
    defaultAvatar:
      "https://prophytesapp22.nyc3.digitaloceanspaces.com/avatar/Zeta%20Phi%20Beta.png",
    miniLogo:
      "https://prophytesapp22.nyc3.digitaloceanspaces.com/undefined/1685373988931",
    cover: ZPB_COVER,
  },
  {
    id: 8,
    shortName: "SGR",
    organization: "Sigma Gamma Rho",
    logo: "Sigma Gamma Rho.png",
    color: "FFBE00",
    fullName: "Sigma Gamma Rho Sorority, Inc.",
    defaultAvatar:
      "https://prophytesapp22.nyc3.digitaloceanspaces.com/avatar/Sigma%20Gamma%20Rho.png",
    miniLogo:
      "https://prophytesapp22.nyc3.digitaloceanspaces.com/undefined/1685373935789",
    cover: SGR_COVER,
  },
  {
    id: 9,
    shortName: "IPT",
    organization: "Iota Phi Theta",
    logo: "Iota Phi Theta.png",
    color: "663201",
    fullName: "Iota Phi Theta Fraternity, Inc",
    defaultAvatar:
      "https://prophytesapp22.nyc3.digitaloceanspaces.com/avatar/Iota%20Phi%20Theta.png",
    miniLogo:
      "https://prophytesapp22.nyc3.digitaloceanspaces.com/undefined/1685373710697",
    cover: IPT_COVER,
  },
];

export const onboardingSteps = [
  { name: "Welcome", path: "/onboard/welcome", currentPath: "welcome" },
  { name: "Select Your Organization", path: "/onboard", currentPath: "" },
  {
    name: "Find your chapter",
    path: "/onboard/initiated-chapter",
    currentPath: "initiated-chapter",
  },
  // { name: "Select the Year You Joined", path: "/onboard/joined-year" },
  {
    name: "Verify Email",
    path: "/onboard/verify-email",
    currentPath: "verify-email",
  },
  {
    name: "Enter The Code",
    path: "/onboard/verify-code",
    currentPath: "verify-code",
  },
  {
    name: "Pending Verification",
    path: "/onboard/pending-verification",
    currentPath: "pending-verification",
  },
  // { name: "Choose Paywall (Monthly & Yearly)", path: "/onboard/choose-plan" },
  {
    name: "Unlock Chapter Access",
    path: "/onboard/unlock chapter",
    currentPath: "unlock chapter",
  },
  // { name: "Finish Verification", path: "/onboard/finish" },
];

export const navItems = [
  {
    label: "Personal Information",
    href: "/profile",
    icon: <PersonSvg />,
  },

  { label: "Education", href: "/profile/education", icon: <BookSvg /> },
  {
    label: "Employment Status",
    href: "/profile/employment-status",
    icon: <StatusSvg />,
  },
  { label: "Mentorship", href: "/profile/mentorship", icon: <MentorSvg /> },
  {
    label: "Social Information",
    href: "/profile/social",
    icon: <SocialSvg />,
  },
  { label: "Settings", href: "/profile/setting", icon: <MoreSettingSvg /> },
];
