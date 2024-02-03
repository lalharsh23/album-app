// Create seperate Album context
import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

const albumContext = createContext();

//custom hook to return albumContext states and functions
const useValue = () => {
  const value = useContext(albumContext);
  return value;
};

//Custom Album Context Component
export default function CustomAlbumcontext({ children }) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [editAlbum, setEditAlbum] = useState(null);
  const [searchedAlbum, setSearchedAlbum] = useState([]);

  // Fetching all albums from Api
  const fetchAlbums = async () => {
    try {
      
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/albums"
        );
        const data = await response.json();
        setAlbums(data.slice(0, 30));
        setSearchedAlbum(data.slice(0, 30));
        setLoading(false);
      
    } catch (err) {
      setLoading(false);
      setError("Oops! Something went wrong!");
    }
  };

  useEffect(() => {
    setLoading(true);
    setAlbums([]);
    setError(false);
    fetchAlbums();
  }, []);




  // POST request to creating a new album
  const CreateAlbum = async(album)=>{
    try{
      const res = await fetch('https://jsonplaceholder.typicode.com/posts',{
        method:'POST',
        body: JSON.stringify({
          id:album.id,
          title:album.title,
          userId:album.userId
        }),
        headers:{
          "Content-type":"application/json; charset=UTF-8"
        }
      })

      const data = await res.json()
      console.log(data);

    }catch(error){

      toast.error(`Error:${error}`)

    }

  }

  //PUT request for update existing album
  const updateAlbumReq = async (album)=>{

    try{
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${album.id}`,{
        method:'PUT',
        body:JSON.stringify({
          id:album.id,
          title:album.title,
          userId:album.userId
  
        }), headers:{
          "Content-type":"application/json; charset=UTF-8"
        }
      })
      const data = await res.json()
      console.log(data);

    }catch(error){
          toast.error(`Error:${error}`)
    }

  }

    //DELETE request for deleteing  existing album
    const deleteAlbumReq = async (id)=>{

      try{
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
          method:'DELETE',
          })
        const data = await res.json()
        console.log(data);
  
      }catch(error){
            toast.error(`Error:${error}`)
      }
  
    }




  //function to updaing existing album
  const editAlbumHandler = (album) => {
    const albumIndex = searchedAlbum.findIndex((item) => item.id === album.id);
    searchedAlbum.splice(albumIndex, 1, album);
    updateAlbumReq(album)
    setAlbums(albums);
    toast.success("Album succesfully edit");
  };

  //function to delete existing album
  const deleteAlbum = (id) => {
    const newData = albums.filter((album) => album.id !== id);
    setAlbums(newData);
    setSearchedAlbum(newData);
    deleteAlbumReq(id)
    toast.info("Album successfully deleted!");
  };

  //function to add new album
  const addAlbum = (album) => {
    albums.push(album);
    setSearchedAlbum(albums)
    CreateAlbum(album)
    toast.success("New Album successfully added!");
  };

  return (
    <albumContext.Provider
      value={{
        albums,
        loading,
        error,
        editAlbum,
        searchedAlbum,
        setAlbums,
        editAlbumHandler,
        setEditAlbum,
        addAlbum,
        deleteAlbum,
        setSearchedAlbum,
      }}
    >
      {children}
    </albumContext.Provider>
  );
}

export { useValue };
