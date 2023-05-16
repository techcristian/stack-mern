import { useState, createContext, useContext, useEffect } from 'react';
import { getPostsRequests, createPostRequests, deletePostRequests, getPostRequests, updatePostRequests } from '../api/posts';


const PostContext = createContext();

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("Post Provider is missing");
  return context;
}

export const PostProvider = ({ children }) => {

  const [posts, setPosts] = useState([])
  console.log(posts)

  //get Posts
  useEffect(() => {
    (async () => {
      const res = await getPostsRequests()
      setPosts(res.data)

    })();

  }, [])


  //Create Post
  const createPost = async (post) => {
    try {
      const res = await createPostRequests(post)
      console.log(res)
      setPosts([...posts, res.data])
    } catch (error) {
      console.log(error)
    }
  
  }
  //Delete Post
  const deletePost = async (id) => {
   try {
    const res = await deletePostRequests(id)
    console.log(res)
    if(res.status === 204){
      setPosts( posts.filter(post => post.id !== id))
    }
   } catch (error) {
    console.log(error)
   }
  
 
    
  };
  //edit post
  const getPost = async (id) => {
    const res = await getPostRequests(id)
    return res.data
  }
  //update post
  const updatePost = async (id, post) => {
    try {
      const res = await updatePostRequests(id, post);
      console.log(res)
      setPosts(posts.map((p) => p.id === id ? res.data : p))
    } catch (error) {
      console.error(error)
    }
  }
  




  return (

    <PostContext.Provider value={{
      posts,
      createPost,
      deletePost,
      getPost,
      updatePost
    }}>

      {children}


    </PostContext.Provider>




  )
}

