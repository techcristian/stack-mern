import toast from 'react-hot-toast'
import { usePosts } from "../context/postContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function PostCard({ post }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  }

  const item = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1 }
  }

  const { deletePost } = usePosts();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    toast((t) => (
      <motion.div variants={container}
        initial="hidden"
        animate="show" >
        <motion.p variants={item} className="text-white">Do you want to delete?</motion.p>
        <p className="text-white">post :<strong> {id}</strong></p>

        <div className='flex justify-between mx-10'>
          <motion.button variants={item} className="button-delete"
            onClick={() => {
              deletePost(id);
              toast.dismiss(t.id);
            }}>

            <p>delete</p>
          </motion.button>
          <motion.button variants={item} className="button-cancel
      " onClick={() => toast.dismiss(t.id)}>

            <p>cancel</p>
          </motion.button>

        </div>
      </motion.div>
    ), {
      style: {
        background: '#202020'
      }
    })
  }
  return (

    <div className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black 
   hover:bg-zinc-700 hover:cursor-pointer ">
      <div className="px-4 py-7">
        < div className="flex justify-between">
          <h3>
            {post.title}
          </h3>

          <button className=" button-delete"

            onClick={() => handleDelete(post.id)}>
            <p>delete</p>
          </button>
          <button className=" button-up" onClick={() => navigate(`/posts/${post.id}`)}>
            <p>update</p>
          </button>

        </div>
        <p>
          {post.description}
        </p>
      </div>

       <div>
        {post.image_url && <img
          src={post.image_url}
          className='object-cover'
        />}
      </div>

    </div>

  )
}


