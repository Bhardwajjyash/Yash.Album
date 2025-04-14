import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { updateUserFollowing } from "../redux/actions";  // Action to update following list

const SuggestedUsers = () => {
  const { suggestedUsers, user: currentUser } = useSelector((store) => store.auth);
  const [followedUsers, setFollowedUsers] = useState({});
  const dispatch = useDispatch();

  // Initialize followedUsers state based on currentUser.following
  useEffect(() => {
    if (currentUser && suggestedUsers.length > 0) {
      const initialFollowed = {};
      suggestedUsers.forEach((user) => {
        initialFollowed[user._id] = currentUser.following.includes(user._id);
      });
      setFollowedUsers(initialFollowed);
    }
  }, [currentUser, suggestedUsers]);

  const handleFollow = async (userId) => {
    try {
      const res = await axios.post(
        `https://yash-album.onrender.com/api/v1/user/followorunfollow/${userId}`,
        {},
        { withCredentials: true }
      );

      toast.success(res.data.message);

      // Toggle follow status
      setFollowedUsers((prev) => ({
        ...prev,
        [userId]: !prev[userId],
      }));

      // Update the following list in Redux after successful follow/unfollow
      dispatch(updateUserFollowing(userId));

    } catch (err) {
      console.error("Follow error:", err);
      toast.error(
        err?.response?.data?.message || err.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="my-10">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold text-gray-600">Suggested for you</h1>
        <span className="font-medium cursor-pointer">See All</span>
      </div>
      {suggestedUsers.map((user) => {
        return (
          <div key={user._id} className="flex items-center justify-between my-5">
            <div className="flex items-center gap-2">
              <Link to={`/profile/${user?._id}`}>
                <Avatar>
                  <AvatarImage src={user?.profilePicture} alt="profile" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <h1 className="font-semibold text-sm">
                  <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
                </h1>
                <span className="text-gray-600 text-sm">
                  {user?.bio || "Bio here..."}
                </span>
              </div>
            </div>
            <span
              onClick={() => handleFollow(user._id)}
              className={`text-xs font-bold cursor-pointer ${
                followedUsers[user._id]
                  ? "text-red-500 hover:text-red-400"
                  : "text-[#3BADF8] hover:text-[#3495d6]"
              }`}
            >
              {followedUsers[user._id] ? "Unfollow" : "Follow"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestedUsers;
