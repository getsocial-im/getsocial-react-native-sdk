// @flag
import User from '../communities/User';

/**
 * PromoCode object.
 */
export default class PromoCode {
    code: string;
    properties: Map<string, string>;
    maxClaimCount: number;
    startDate: number;
    endDate: number;
    creator: User;
    claimCount: number;
    isEnabled: boolean;
    isClaimable: boolean;

    // eslint-disable-next-line require-jsdoc
    constructor(codeMap: any) {
        this.code = codeMap['code'];
        this.properties = codeMap['data'];
        this.maxClaimCount = codeMap['maxClaimCount'];
        this.startDate = codeMap['startDate'];
        this.endDate = codeMap['endDate'];
        this.creator = new User(codeMap['creator']);
        this.claimCount = codeMap['claimCount'];
        this.isEnabled = codeMap['isEnabled'] === true;
        this.isClaimable = codeMap['isClaimable'] === true;

        Object.freeze(this);
    }
}
