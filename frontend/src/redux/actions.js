// redux/actions.js

export const updateUserFollowing = (userId) => (dispatch, getState) => {
    const { auth } = getState();
    const currentFollowing = auth.user.following;
    const isFollowing = currentFollowing.includes(userId);
  
    const updatedFollowing = isFollowing
      ? currentFollowing.filter((id) => id !== userId)
      : [...currentFollowing, userId];
  
    dispatch({
      type: "UPDATE_FOLLOWING",
      payload: updatedFollowing,
    });
  };
  