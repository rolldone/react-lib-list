export interface MasterDataInterface {
    record_url: null | String;
    pending: any;
    vars: any;
    listeners: any;
    resetListener: Function;
    setOnListener: {
        (arg1: any, arg2?: any, arg3?: any): any;
    };
    removeListener: {
        (listenerName: string, key: string): void;
    };
    saveData: {
        (key: string, props: any, timeout?: number): void;
    };
    updateData: {
        (key: string, props: any, timeout?: number): void;
    };
    getData: {
        (key: string, props: any): void;
    };
    run?: Function;
    setOnMultiSameListener?: Function;
}
declare const MasterData: MasterDataInterface;
export default MasterData;
