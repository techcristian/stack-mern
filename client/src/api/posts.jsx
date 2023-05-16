import axios from 'axios';

export const getPostsRequests = async () =>  await axios.get('/posts')

export const createPostRequests = async (post) => {
const form = new FormData()
 
for(let key in post){
  form.append(key, post[key])
}

return await axios.post('/posts',form,{
  headers: {
    "content-type":"multipart/form-data"
  }
});

}
export const deletePostRequests = async (id) => await axios.delete(`/posts/${id}`)

export const getPostRequests = async (id) => await axios.get(`/posts/${id}`)

export const updatePostRequests = async (id,newPost) =>{

const form = new FormData();
for(let key in newPost){
  form.append(key, newPost[key]);
}

return await axios.put(`/posts/${id}`, form,{
  headers:{
    "content-type":"multipart/form-data",
  }
});
};




  

 