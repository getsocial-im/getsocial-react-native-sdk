// @flow

import PollOption from './PollOption.js';
import UserVotes from './UserVotes.js';

/**
 * Poll object.
 */
export default class Poll {
    allowMultipleVotes: boolean;
    endDate: ?number;
    options: Array<PollOption> = [];
    totalVotes: number;
    voters: Array<UserVotes> = [];

    /**
    * Creates a new Poll instance from the provider parameters.
    * @param {any} pollMap poll parameters
    */
    constructor(pollMap: any) {
        this.allowMultipleVotes = pollMap['allowMultipleVotes'] === true;
        this.endDate = pollMap['endDate'];
        this.totalVotes = pollMap['totalVotes'];

        const rawVoters = pollMap['knownVoters'];
        if (rawVoters !== undefined && rawVoters != null) {
            rawVoters.forEach((voter) => {
                const userVotes = new UserVotes(voter);
                this.voters.push(userVotes);
            });
        }
        const rawOptions = pollMap['options'];
        if (rawOptions !== undefined && rawOptions != null) {
            rawOptions.forEach((pollOptionMap) => {
                const pollOption = new PollOption(pollOptionMap);
                this.options.push(pollOption);
            });
        }
        Object.freeze(this);
    }
}
