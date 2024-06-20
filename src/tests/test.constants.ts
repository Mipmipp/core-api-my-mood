import * as jwt from 'jsonwebtoken';

export const TEST_SECRET = 'test-secret';

const userToken = jwt.sign(
  {
    sub: '00000000-0000-0000-0000-00000000000X',
  },
  TEST_SECRET,
);

export { userToken };
