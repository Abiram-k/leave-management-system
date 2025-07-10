import app from "./app";
import { config } from "dotenv";
import http from "http";
import { employeeTable } from "./schema/employee.schema";
import { syncSchemas } from "./utils/schemaSync";
import { leaveTypesTable } from "./schema/leave.types.schema";
import { leaveRequestsTable } from "./schema/leave.requests.schema";
config();

const PORT = process.env.BACKEND_PORT || 5000;

const server = http.createServer(app);

(async () => {
  await syncSchemas([employeeTable]);
  // await syncSchemas([leaveTypesTable]); 
  // await syncSchemas([leaveRequestsTable]); 
  server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
})();
