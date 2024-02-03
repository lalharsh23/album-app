import AlbumCard from "./AlbumCard";
import "../styles/albumlist.css";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useValue } from "../albumContext";
import { useEffect, useState } from "react";


const AlbumList = () => {
  const { setEditAlbum, error, loading, searchedAlbum, deleteAlbum } =
    useValue();
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(searchedAlbum);
  }, [searchedAlbum]);

  // reset field value to empty 
  const handleAddAlbumButton = () => {
    setEditAlbum(null);
  };

  return (
    <>
      {error ? (
        <div className="error__message">
          <h1>{error}...</h1>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="loader__section">
              <div class="custom-loader"></div>
            </div>
          ) : (
            <>
              <section>
                <Container>
                  <Row>
                    <Col lg='3' md='4' sm='6' xs='12' className="album-col">
                      <div
                        className="add_link btn"
                        onClick={handleAddAlbumButton}
                      >
                        <Link to="add-album">
                          <h4 className="text-white">+ Add New Album</h4>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
              <section>
                <Container>
                  <Row>
                    {data.map((album,index) => {
                      return (
                        <Col lg='3' md='4' sm='6' xs='12' className="mb-5 gap-2 album-col">
                          <AlbumCard
                            album={album}
                            key={album.id}
                            deleteAlbum={deleteAlbum}
                            index={index}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </Container>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AlbumList;
