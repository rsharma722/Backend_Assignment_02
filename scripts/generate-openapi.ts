import fs from "fs";
import { generateSwaggerSpec } from "../config/swaggerOptions";

const spec = generateSwaggerSpec();
fs.writeFileSync("./openapi.json", JSON.stringify(spec, null, 2));

console.log("OpenAPI specification generated successfully!");