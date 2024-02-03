// album card component
import "../styles/album-card.css";
import { FiEdit } from "react-icons/fi";
import { RxCrossCircled } from "react-icons/rx";
import albumIcon from "../photo-gallery.png";
import { Link } from "react-router-dom";
import { useValue } from "../albumContext";

const AlbumCard = ({ album, deleteAlbum,index }) => {
  const { setEditAlbum } = useValue();
  return (
    <>
      <div className="card__container">
        <div className="album__details text-center">
          <h4>Album {index+1}</h4>

          <img src={albumIcon} className="album__icon" />

          <div className="album__title">
            <h5> {album.title} </h5>
          </div>
        </div>
        <div className="action__button">
          <div
            className="action__icon"
            onClick={() => setEditAlbum({ ...album })}
          >
            <Link to="edit-album" className="edit_btn">
              <button>
                {" "}
                <FiEdit />
              </button>
            </Link>
            <span className="sub-title__edit">edit</span>
            
          </div>
         

          <div className="action__icon" onClick={() => deleteAlbum(album.id)}>
            <button className="delete_btn">
          
              <RxCrossCircled />
            </button>
            <span className="sub-title__delete">delete</span>
            
          </div>
          
        </div>
      </div>
    </>
  );
};

export default AlbumCard;
