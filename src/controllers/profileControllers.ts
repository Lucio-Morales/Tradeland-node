import { Request, Response } from 'express';
import { getUserProfileData } from '../services/userServices';

export const userProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = (req as any).user;

  if (!user || !user.id) {
    res
      .status(400)
      .json({ message: 'User not authenticated or invalid user data' });
    return;
  }

  try {
    const userProfileData = await getUserProfileData(user.id);
    res.json({
      message: 'User profile fetched successfully',
      profile: userProfileData,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
