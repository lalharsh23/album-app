
import React, { useEffect, useRef } from "react";
import { Form, FormGroup } from "reactstrap";
import "../styles/albumform.css";
import { useValue } from "../albumContext";
import { useNavigate } from "react-router-dom";

const AlbumForm = () => {
  const {
    albums,
    editAlbum,
    editAlbumHandler,
    addAlbum,
    setEditAlbum,
  } = useValue();
  const userIdRef = useRef();
  const titleRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (editAlbum) {
      userIdRef.current.value = editAlbum.userId;
      titleRef.current.value = editAlbum.title;
    }
  }, [editAlbum]);

  const submitHandler = (e) => {
    e.preventDefault();
    const userId = userIdRef.current.value;
    const title = titleRef.current.value;

    //if user select edit the album
    if (editAlbum) {
      const obj = {
        userId: parseInt(userId),
        id: parseInt(editAlbum.id),
        title: title,
      };
      editAlbumHandler(obj);
      setEditAlbum(null);
      clear();
      navigate("/albums");
      return;
    }

    const albumLength = albums.length - 1
    const newAlbumId = albums[albumLength].id + 1
     
    // creating new album
 
    const obj = {
      userId: parseInt(userId),
      id: parseInt(newAlbumId),
      title: title,
    };

    addAlbum(obj);
    clear();
    navigate("/albums");
    return;
  };

  // reset form field to empty
  const clear = () => {
    userIdRef.current.value = "";
    titleRef.current.value = "";
    return;
  };
  return (
    <div className="Form__wrapper">
      <Form className="w-50 " onSubmit={submitHandler}>
        <FormGroup className="form__group">
          <input
            type="number"
            placeholder="Enter User Id"
            ref={userIdRef}
            required
          />
        </FormGroup>
        <FormGroup className="form__group">
          <input
            type="text"
            placeholder="Enter Album Name"
            ref={titleRef}
            required
          />
        </FormGroup>

        <button className="btn">
          {editAlbum ? "Edit Album" : "Add Album"}
        </button>
      </Form>
    </div>
  );
};

export default AlbumForm;
