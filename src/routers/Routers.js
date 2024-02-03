import React from 'react'
import { Route,Routes } from 'react-router-dom'
import AlbumList from '../components/AlbumList'
import EditAlbum from '../components/EditAlbum'
import AddAlbum from '../components/AddAlbum'

const Routers = () => {
  return (
    <Routes>
      <Route path="/albums" element={<AlbumList/>}/>
      <Route path="/albums/edit-album" element={<EditAlbum/>}/>
      <Route path="/albums/add-album" element={<AddAlbum/>}/>

    </Routes>
  )
}

export default Routers