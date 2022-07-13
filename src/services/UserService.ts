import { UserResponseDto } from "../interfaces/user/UserResponseDto";
import User from "../models/User";

const findUserById = async (
    userId: string,
): Promise<UserResponseDto | null> => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default{
    findUserById,
};