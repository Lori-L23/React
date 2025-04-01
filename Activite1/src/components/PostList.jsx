import React, { useEffect, useState } from 'react';


const PostList = () => {

    //Etats pour gerer les donnees, le chargement et les erreurs
    const [posts, setPosts] = useState([]);
    const [chargement, setChargement] = useState(false);
    const [errors, setErrors] = useState(null);

    //Fonction pour charger les articles
    const fetchPosts = async () => {
        setChargement(true);
        setErrors(null);

        try{
            const reponse = await fetch('https://jsonplaceholder.typicode.com/posts');
            if (!reponse.ok){
                throw new Error ('Erreur de chargemet des articles');
            }

            const data = await reponse.json();
            setPosts(data);
        }catch(err) {
            setErrors(err.message);
        }finally {
            setChargement(false);
        }

    };
 //chargement des articles au premier rendu
 useEffect(() =>{
    fetchPosts();

 },[]); // le tableau vide signifie que leffect ne s'excute qu au premier rendu

 return (
    <div className="post-list-container bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className='text-3xl text-purple-500 p-4'>Bienvenue dans la Liste des articles </h2>
      
      <button 
        onClick={fetchPosts} 
        disabled={chargement}
        className="reload-button mt-6 bg-purple-500 text-white text-1xl px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        {chargement ? 'Chargement...' : 'Recharger'}
      </button>
      
      {errors && <p className="error-message text-red-300 text-xl">Erreur: {errors}</p>}
      
      <ul className="posts-list text-1xl p-6 mt-6">
        {posts.length === 0 && !chargement && <p className="no-posts text-gray-500">Aucun article trouvé.</p>}
        {posts.length > 0 && posts.map(post => (
          <li key={post.id} className="post-item bg-white p-4 mb-2 rounded-md shadow-sm">
            <h3 className="post-title text-xl font-bold">{post.title}</h3>
            <p className="post-body text-gray-700">{post.body}</p>
          </li>
        ))}
        {/* {posts.map(post => (
          <li key={post.id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))} */}
      </ul>
    </div>
  );

}
export default PostList;
