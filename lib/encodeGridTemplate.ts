import { createERC725Instance } from "./erc725.js";

// 1. Import the JSON template
import template from "../json-templates/event-conference.json";

// 2. Set the IPFS CID of the JSON file
const ipfsCid = "bafkreignk4jxqlfevc3dlkwe4pvomv6f2ebsh4yqsax74oxq36po45bm5m";

// this is just a placeholder
const profileAddress = "0x1234567890123456789012345678901234567890";

// 3. Create an ERC725 instance
const erc725js = createERC725Instance(profileAddress);

// 4. Encode the grid template raw value
const result = erc725js.encodeData([
    {
        keyName: "LSP28TheGrid",
        value: {
            json: template,
            url: `https://api.universalprofile.cloud/ipfs/${ipfsCid}`,
        },
    },
]);

console.log(
    "Generated grid template raw value successfully! ✅: ",
    result.values[0]
);
