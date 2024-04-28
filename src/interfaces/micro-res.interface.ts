import {ServiceNameEnum} from "../enums/service-name.enum";


export interface MicroResInterface {
    error?: boolean;
    reason?: Reason;
    data?: any;
    from: ServiceNameEnum;
    to: ServiceNameEnum;
}

export interface MicroSendInterface {
    from: ServiceNameEnum;
    to: ServiceNameEnum;
    data?: any;
    ttl?: number | string;
}

export interface Reason {
    status?: number;
    message: string;
}
