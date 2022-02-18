import { IComponent, IComponentData } from '../../../types/Commands';

const CommandIsEphemeral = (data: IComponent): boolean => {
    const objectData = JSON.parse(data.server_data) as IComponentData[];
    const ephemeralData = objectData.find(dataPart => dataPart.name === 'ephemeral');

    if (!ephemeralData) {
        return false;
    }

    return ephemeralData.turned_on;
};

export default CommandIsEphemeral;
