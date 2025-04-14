import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import useGetUserProfile from '@/hooks/useGetUserProfile'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { AtSign, Heart, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const Profile = () => {
  const params = useParams()
  const userId = params.id
  useGetUserProfile(userId)
  const [activeTab, setActiveTab] = useState('posts')

  const { userProfile, user } = useSelector(store => store.auth)

  // Check if logged-in user is following this profile
  const isFollowing = userProfile?.followers.includes(user?._id)

  const handleTabChange = (tab) => setActiveTab(tab)

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks

  const handleFollowClick = async () => {
    // Handle follow/unfollow action
    // Call your API to follow/unfollow the user and update state accordingly
    if (isFollowing) {
      // Unfollow logic here (API call, dispatch actions, etc.)
      console.log("Unfollowing user...");
    } else {
      // Follow logic here (API call, dispatch actions, etc.)
      console.log("Following user...");
    }
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-purple-100 via-indigo-100 to-cyan-100">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div whileHover={{ scale: 1.05 }} className="flex justify-center">
            <Avatar className="h-36 w-36 border-4 border-purple-400 shadow-md">
              <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
              <AvatarFallback>pfp</AvatarFallback>
            </Avatar>
          </motion.div>

          <div className="space-y-4">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-2xl font-semibold text-purple-800">{userProfile?.username}</span>
              {user?._id === userProfile?._id ? (
                <Link to="/account/edit">
                  <Button variant="secondary" className="h-8 hover:bg-purple-100">Edit profile</Button>
                </Link>
              ) : (
                <>
                  <Button
                    onClick={handleFollowClick}
                    className={`h-8 ${isFollowing ? 'bg-gray-400 text-black' : 'bg-purple-500 hover:bg-purple-600 text-white'}`}
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                  </Button>
                  {isFollowing && (
                    <Link to="/chat" ><Button variant="secondary" className="h-8">Message</Button></Link>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-800">
              <p><span className="font-bold">{userProfile?.posts.length}</span> posts</p>
              <p><span className="font-bold">{userProfile?.followers.length}</span> followers</p>
              <p><span className="font-bold">{userProfile?.following.length}</span> following</p>
            </div>

            <div className="text-sm space-y-1">
              <Badge className="w-fit bg-gradient-to-r from-purple-600 to-indigo-500 text-white border-0">
                <AtSign className="h-4 w-4" />
                <span className="ml-1">{userProfile?.username}</span>
              </Badge>
              <p className="font-semibold text-black">{userProfile?.bio || "bio here..."}</p>
              <p className="text-gray-700 font-bold">Share Profile via </p>
              <div className='flex flex-col w-fit'>
                <Badge className="bg-gradient-to-r from-black to-purple-900 text-white border-0 mt-2">Yash.Message</Badge>
                <br />
                <Badge className="bg-gradient-to-r from-black to-purple-900 text-white border-0">Yash.Book</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-gray-300 pt-6">
          <div className="flex justify-center gap-10 text-sm font-medium text-gray-600">
            <span className={`cursor-pointer ${activeTab === 'posts' ? 'text-purple-600 border-b-2 border-purple-600' : ''}`} onClick={() => handleTabChange('posts')}>
              POSTS
            </span>
            <span className={`cursor-pointer ${activeTab === 'saved' ? 'text-purple-600 border-b-2 border-purple-600' : ''}`} onClick={() => handleTabChange('saved')}>
              SAVED
            </span>
            <span className="cursor-pointer">REELS</span>
            <span className="cursor-pointer">TAGS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
            {displayedPost?.map((post) => (
              <motion.div
                key={post?._id}
                className="relative group overflow-hidden rounded-xl shadow-md border border-white/10"
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={post.image}
                  alt="postimage"
                  className="w-full h-full object-cover aspect-square"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-white gap-6 text-sm">
                    <div className="flex items-center gap-1 hover:text-gray-300">
                      <Heart className="h-4 w-4" />
                      <span>{post?.likes.length}</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-gray-300">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post?.comments.length}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
