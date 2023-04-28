import { gql } from "@apollo/client";

export const LOAD_PLAYLISTS = gql`
query {
  getPlaylists {
    id
    title
  }   
}`

export const LOAD_SONGS = gql`
query GetSongs($playlistId: Int!, $search: String) {
    getSongs(playlistId: $playlistId, search: $search) {
        _id
        artist
        duration
        photo
        title
        url
    }
}`