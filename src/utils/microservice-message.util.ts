import {
    MicroResInterface,
    MicroSendInterface,
    Reason,
} from '../interfaces/micro-res.interface';
import {firstValueFrom, timeout} from 'rxjs';
import {ClientProxy} from '@nestjs/microservices';
import {PatternEnum} from "../enums/pattern.enum";
import {ServiceNameEnum} from "../enums/service-name.enum";
import {toMs} from "ms-typescript";

export function generateMessage(
    from: ServiceNameEnum,
    to: ServiceNameEnum,
    data: any,
    ttl: number | string = 0
): MicroSendInterface {
    if ((typeof ttl === 'number' && ttl > 0) || typeof ttl === 'string') {
        ttl = typeof ttl === 'string' ? toMs(ttl) : ttl;
        ttl = new Date().getTime() + (ttl as number);
    }
    return {
        from,
        to,
        data,
        ttl,
    };
}

export function generateResMessage(
    from: ServiceNameEnum,
    to: ServiceNameEnum,
    data: any,
    error: boolean = false,
    reason?: Reason,
): MicroResInterface {
    const message: MicroResInterface = {
        from,
        to,
        data,
        error,
        reason,
    };

    if (reason) {
        message.reason = reason;
    }

    return message;
}

export async function sendMicroMessage(
    client: ClientProxy,
    pattern: PatternEnum,
    message: MicroSendInterface,
): Promise<MicroResInterface> {
    return firstValueFrom(client.send(pattern, message));
}

export async function sendMicroMessageWithTimeOut(
    client: ClientProxy,
    pattern: PatternEnum,
    message: MicroSendInterface,
    timeOut: number | string = 10000
): Promise<MicroResInterface> {
    timeOut = typeof timeOut === 'string' ? toMs(timeOut) : timeOut;
    return firstValueFrom(client.send(pattern, message).pipe(timeout(timeOut as number)));
}
