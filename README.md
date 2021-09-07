# Spotify Clone (w/ Lyrics!)

A minimalist Spotify clone that includes a lyric generator. Built with React, Bootstrap, Express, Axios, and more.

## Getting Started

- [Heroku deployed link](https://bg-spotify-clone-with-lyrics.herokuapp.com/) (deployed app forthcoming)
- Frontend: "npm start"
- Backend: CD into "server" folder, "npm run server"

## Tool, Technologies & NPM Packages

- [Spotify for Developers](https://developer.spotify.com/)
- [Bootstrap](https://getbootstrap.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Styled Components](https://styled-components.com/docs)
- [Spotify Web Api Node](https://github.com/thelinmichael/spotify-web-api-node)
- [Express](https://expressjs.com/)
- [Nodemon](https://nodemon.io/)
- [Axios](https://axios-http.com/)
- [Cors](https://www.npmjs.com/package/cors)
- [Body parser](https://www.npmjs.com/package/body-parser)
- [React Spotify web playback](https://www.npmjs.com/package/react-spotify-web-playback)
- [Lyrics finder](https://www.npmjs.com/package/lyrics-finder)

## To Add (Icebox)

- Fix 405 "Method Not Allowed" error with deployment; make sure Login, SFD, and dot are consistent.
- Be able to play full albums instead of just one song at a time.
- When no song is selected and you press play, customize error message (currently rendering "Cannot perform operation; no list was loaded").
- When you select a song that has no lyrics, return "No Lyrics Found, Sad!" even before you press play.
- Simplify Player styling and add more responsive features.
- Continue exploring the Spotify API to render more song information to the screen, or look into other APIs to pull info including linear notes, song credits, YouTube link, and other articles.
- Fix Styled Components error with Dashboard page (won't play nice with Player styling).

## Credits

- Thank you, [Web Dev Simplified](https://www.youtube.com/watch?v=Xcet6msf3eE), for your intro video on where to start with Spotify's API.
