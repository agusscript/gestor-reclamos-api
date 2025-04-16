import officeModule from "./office/officeModule.js";
import complaintModule from "./complaint/complaintModule.js";
import complaintStatusModule from "./complaintStatus/complaintStatusModule.js";
import complaintTypeModule from "./complaintType/complaintTypeModule.js";
import userModule from "./user/userModule.js";
import authModule from "./auth/authModule.js";

export default function initModules(app) {
  userModule(app);
  officeModule(app);
  complaintModule(app);
  complaintStatusModule(app);
  complaintTypeModule(app);
  authModule(app);
}