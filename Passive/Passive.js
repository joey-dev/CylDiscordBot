import RoleRequest from './RoleRequest/RoleRequest.js';
import Welcome from './Welcome/Welcome.js';

class Passive {
    constructor(client) {
        new RoleRequest(client);
        new Welcome(client);
    }
}

export default Passive
