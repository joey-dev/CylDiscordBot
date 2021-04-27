import Data from './data';

class Welcome {
    static getData(serverId, callback) {
        Data.command(serverId, callback);
    }
}

export default Welcome;
