import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useValue } from "../albumContext";
import { Container,Row,Col } from "reactstrap";
import logo from "../photo-gallery.png"

const Navbar = () => {
  const [show, setShow] = useState("");
  const { albums, setSearchedAlbum } = useValue();

  // function to make navbar stick at top
  const stickyNavbarFunc = () => {
    if (window.scrollY > 70) {
      setShow("sticky");
    } else {
      setShow("");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickyNavbarFunc);

    return ()=> {window.removeEventListener("scroll",stickyNavbarFunc)}
  }, );  

  // [window.scrollY]

  // function for search album 
  // using debouncing 
  const searchHandler = (e) => {
    const searchedValue = e.target.value;

    if (parseInt(searchedValue.length) === 0 || searchedValue === " ") {
      setSearchedAlbum(albums);
      return;
    }

    setTimeout(() => {
      const result = albums.filter((item) =>
        item.title.toLowerCase().includes(searchedValue.toLowerCase())
      );
      setSearchedAlbum(result);
    }, 1000);
  };
  return (
    <div className={`navbar__wrapper ${show}`}>
    <Container>
      <Row>
        <Col className="d-flex justify-content-between">
      <div className="title"  >
        <Link to="/albums" className="d-flex gap-2">
          {/* <img className="logo" src={logo} alt="image txt" />
          <h2>Albums</h2> */}
          <img className="logo" src={logo} alt="img" />

        
        </Link>
      </div>

      <div className="search__box">
        <input
          type="text"
          placeholder="Search...."
          onChange={searchHandler}
        />
        <BiSearch />
      </div>

        </Col>
      </Row>
    </Container>
        </div>
    
  );
};

export default Navbar;
