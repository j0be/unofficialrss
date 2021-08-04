import JWT from 'jwt-simple';
import connectDB from '../db';
import User from '../models/User';
import { refreshAccessToken } from './StitcherAuth';

const useAuth = async (token: string) => {
  try {
      await connectDB();
  } catch (error) {
      throw Error(`Couldn't connect to DB`);
  }

  // Read user's JWT which contains an _id for the user's account
  let _id;
  try {
    _id = JWT.decode(token, process.env.JWT_KEY as string)._id;
    if (!_id) throw 'Missing _id.';
  } catch (error) {
    throw Error('Invalid token');
  }

  // Lookup by user _id
  const user = await User.findOne({ _id: _id }).lean();
  if (!user || !user.token) throw Error('Unauthorized Request.');

  // Read access_token and confirm Premium + non-expired
  try {
    let currentTokenDecoded = JWT.decode(user.token.access_token, '', true);
    if (currentTokenDecoded.exp <= Date.now() / 1000) {
      const newToken = await refreshAccessToken(user.token.refresh_token);
      currentTokenDecoded = JWT.decode(newToken.access_token, '', true);
      await User.updateOne(
        { _id: user._id },
        {
          'token.access_token': newToken.access_token,
          'token.id_token': newToken.id_token,
          isPremium: !!currentTokenDecoded['cognito:groups']?.includes(
            'Premium'
          )
        }
      );
    }
  } catch (error) {
    throw Error(error);
  }

  return user;
};

export default useAuth;
