import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

export const verifyJwt = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://virtual-company.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'this is virtual company unique identifier',
  issuer: 'https://virtual-company.us.auth0.com/',
  algorithms: ['RS256'],
}).unless({path:['/user']})

