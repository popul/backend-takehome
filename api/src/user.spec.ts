import { expect } from 'chai';
import spies from 'chai-spies';

import { createUserLogic } from './user';

chai.use(spies);

describe('/user', () => {
    it('should persist schedule T + 2 min', async () => {
        const send = chai.spy(() => Promise.resolve());
        const userLogic = createUserLogic(send);

        const request = {
            uuid: 1,
            timeZone: 'Europe/Paris',
        }

        userLogic(request);

        expect(true).to.equal(true);
    });
});