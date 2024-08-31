import createHttpError from 'http-errors';
import { Session } from '../db/models/session.js';

export const authenticate = async (req, res, next) => {
  const header = req.get('Autorization');
  if (!header) {
    return next(createHttpError(401, 'Auth header is not provided'));
  }
  const [bearer, token] = header.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Auth header should be of bearer type'));
  }

  const session = await Session.findOne({ accessToken: token });
  if (!session) {
    return next(createHttpError(401, 'Session is not found'));
  }

  if(Date.now() > session.accessTokenValidUntil){
    return next(createHttpError(401, 'Session token is expired'));
  }

  const user = await Session.findById(session.userId);
  if(!user) {
    return next(createHttpError(401, 'User associated with this session is not found'));
  }
  req.user = user;
  return next();
};

