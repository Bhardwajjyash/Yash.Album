"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react"
import { Button } from "./ui/button"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import CommentDialog from "./CommentDialog"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { toast } from "sonner"
import { setPosts, setSelectedPost } from "@/redux/postSlice"
import { Badge } from "./ui/badge"
import { motion, AnimatePresence } from "framer-motion"

const Post = ({ post }) => {
  const [text, setText] = useState("")
  const [open, setOpen] = useState(false)
  const { user } = useSelector((store) => store.auth)
  const { posts } = useSelector((store) => store.post)
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false)
  const [postLike, setPostLike] = useState(post.likes.length)
  const [comment, setComment] = useState(post.comments)
  const [isHovered, setIsHovered] = useState(false)
  const dispatch = useDispatch()

  const changeEventHandler = (e) => {
    const inputText = e.target.value
    if (inputText.trim()) {
      setText(inputText)
    } else {
      setText("")
    }
  }

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like"
      const res = await axios.get(`http://localhost:8000/api/v1/post/${post._id}/${action}`, { withCredentials: true })
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1
        setPostLike(updatedLikes)
        setLiked(!liked)

        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked ? p.likes.filter((id) => id !== user._id) : [...p.likes, user._id],
              }
            : p,
        )
        dispatch(setPosts(updatedPostData))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/post/${post._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      )
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment]
        setComment(updatedCommentData)

        const updatedPostData = posts.map((p) => (p._id === post._id ? { ...p, comments: updatedCommentData } : p))

        dispatch(setPosts(updatedPostData))
        toast.success(res.data.message)
        setText("")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/post/delete/${post?._id}`, { withCredentials: true })
      if (res.data.success) {
        const updatedPostData = posts.filter((postItem) => postItem?._id !== post?._id)
        dispatch(setPosts(updatedPostData))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.messsage)
    }
  }

  const bookmarkHandler = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/post/${post?._id}/bookmark`, { withCredentials: true })
      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <motion.div
      className="my-8 w-full max-w-lg mx-auto backdrop-blur-sm bg-white rounded-xl border border-white/10 shadow-[0_0_15px_rgba(120,58,240,0.2)] p-4 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ boxShadow: "0 0 20px rgba(120,58,240,0.3)" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="border border-purple-500/50">
            <AvatarImage src={post.author?.profilePicture || "/placeholder.svg"} alt="post_image" />
            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-500 text-white">
              {post.author?.username?.substring(0, 2).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3">
            <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-blue-900 font-medium">{post.author?.username}</h1>
            {user?._id === post.author._id && (
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                Author
              </Badge>
            )}
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer text- hover:text-purple-400 transition-colors" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center bg-slate-900/90 backdrop-blur-md border border-white/10 text-white">
            {post?.author?._id !== user?._id && (
              <Button variant="ghost" className="cursor-pointer w-fit text-[#ED4956] font-bold hover:bg-white/10">
                Unfollow
              </Button>
            )}

            <Button variant="ghost" className="cursor-pointer w-fit text-white hover:bg-white/10">
              Add to favorites
            </Button>

            {user && user?._id === post?.author._id && (
              <Button
                onClick={deletePostHandler}
                variant="ghost"
                className="cursor-pointer w-fit text-red-500 hover:bg-white/10"
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <motion.div
        className="relative my-4 rounded-lg overflow-hidden"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.img
          className="rounded-lg w-full object-cover"
          src={post.image}
          alt="post_img"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-white text-sm">{post.caption}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="flex items-center justify-between my-4">
        <div className="flex items-center gap-4">
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            {liked ? (
              <FaHeart onClick={likeOrDislikeHandler} size={"24"} className="cursor-pointer text-red-600" />
            ) : (
              <FaRegHeart
                onClick={likeOrDislikeHandler}
                size={"22px"}
                className="cursor-pointer text-black hover:text-gray-300"
              />
            )}
          </motion.div>

          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <MessageCircle
              onClick={() => {
                dispatch(setSelectedPost(post))
                setOpen(true)
              }}
              className="cursor-pointer text-black hover:text-gray-300"
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <Send className="cursor-pointer text-black hover:text-gray-300" />
          </motion.div>
        </div>
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
          <Bookmark onClick={bookmarkHandler} className="cursor-pointer text-black hover:text-gray-300" />
        </motion.div>
      </div>

      <span className="font-medium block mb-2 text-black">{postLike} likes</span>
      <p className="text-gray-900">
        <span className="font-medium mr-2 text-black">{post.author?.username}</span>
        {post.caption}
      </p>

      {comment.length > 0 && (
        <span
          onClick={() => {
            dispatch(setSelectedPost(post))
            setOpen(true)
          }}
          className="cursor-pointer text-sm text-gray-400 hover:text-purple-400 transition-colors mt-2 inline-block"
        >
          View all {comment.length} comments
        </span>
      )}

      <CommentDialog open={open} setOpen={setOpen} />

      <div className="flex items-center justify-between mt-4 bg-white/5 rounded-full px-4 py-2 border border-white/10">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className="outline-none text-sm w-full bg-transparent text-black placeholder:text-gray-400"
        />
        {text && (
          <motion.span
            onClick={commentHandler}
            className="text-purple-400 cursor-pointer font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Post
          </motion.span>
        )}
      </div>
    </motion.div>
  )
}

export default Post
