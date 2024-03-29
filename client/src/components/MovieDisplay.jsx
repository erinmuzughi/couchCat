import { useEffect, useState, useContext } from 'react';
import { List, ListItem, Box, Typography } from "@mui/material";
import getCastCrew from "../utils/getCastCrew"
import getServices from "../utils/getServices"
import tmdb_main from "../assets/tmdb_main.svg";
import WatchListButton from './WatchListButton';
import userContext from "../utils/userContext";
// import streamingServices from '../assets/streamingServices';

const MovieDisplay = (props) => {

  const [services, setServices] = useState();
  const [castCrew, setCastCrew] = useState();
  const [director, setDirector] = useState();
  const [topCast, setTopCast] = useState();
  const handleWatchList = props.handleWatchList

  const { userInfo } = useContext(userContext)

  //grabs cast and service from TMDB
  useEffect(() => {
    if(!props.movie){return}
    getServices(props.movie?.id)
    .then(servicesResult => {
      setServices(servicesResult);
      })
    getCastCrew(props.movie?.id)
    .then(castCrewResult => {
      setCastCrew(castCrewResult)
      })
  }, [props.movie])

  useEffect(() => {
    if(!props.movie){return}
    if(castCrew) {
      setDirector(castCrew.crew.filter(({job})=> job ==='Director'))
      setTopCast(castCrew.cast.slice(0,3))
    } 
  }, [castCrew, props.movie])

  return (

    <>
      {props.movie ? 
      <List
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "1.5rem",
        width: "60%"
      }}
      >
{/* title */}
        <ListItem
        key={props.movie.original_title}
        sx={{
          display: "flex",
          justifyContent: "center"
        }}>
          {/* movie poster and add button-left side*/}
          <Box component="div">
                {/* movie poster */}
                <Box 
                  sx={{
                    height: "35rem",
                    width: "25rem",
                  }}
                  component="img" 
                  src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} 
                  alt="movie poster" />
                  {userInfo.isAuthenticated && <WatchListButton
                      movie={props.movie}
                      handleWatchList={handleWatchList}
                      director={director}
                      topCast={topCast} />}
          </Box>
          {/* right side */}
          <Box 
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "50%",
            alignSelf: "flex-start",
            padding: "2rem"
          }}>
                {/* movie title and release year-top*/}
                <Box component="div"
                sx={{
                  display: "flex",
                  gap: "1rem",
                  marginBottom: "1rem"
                }}>
                  <Typography
                    sx={{
                      alignSelf: "flex-start",
                      fontSize: "2.5rem",
                      fontWeight: "bold",
                      color: "primary.main"
                    }}
                    >{props.movie.original_title}</Typography>
                  <Typography
                  sx={{
                    alignSelf: "center",
                    color: "accent.main"
                  }}>{props.movie.release_date.slice(0,4)}</Typography>
                </Box>
                {/* overview-middle */}
                <Typography
                sx={{
                  marginBottom: "1rem",
                  color: "accent.main"
                }}>{props.movie.overview}</Typography>
                <Box
                  sx={{
                      display: "flex",
                      gap: "1rem"
                  }}>
                      <Box 
                      component="img" 
                      src={tmdb_main}
                      sx={{
                          width: "2rem"
                      }} />
                      <Typography
                      sx={{
                          fontSize: "1.5rem",
                          color: "primary.main"
                      }}>{String(props.movie.vote_average).slice(0,3)}</Typography>
                  </Box>
                {/* director and top billed cast-middle */}
                <Box sx={{
                  display: "flex",
                  gap: "3rem",
                  marginBottom: "1rem"
                }}>
                    {/* director */}
                    <Box 
                    sx={{
                      display: "flex",
                      flexDirection: "column"
                    }}>
                        <Typography
                        sx={{
                          fontSize: "3rem",
                          color: "primary.main"
                        }}>Director</Typography>
                        {director ? 
                          <>
                            {director.map((item) => (
                            <Typography
                            key={item.name}
                            sx={{
                              color: "accent.main"
                            }}>{item.name}</Typography>
                          ))}
                          </> 
                          : "No Director"}
                    </Box>
                    {/* Top Billed Cast */}
                    <Box 
                    sx={{
                      display: "flex",
                      flexDirection: "column"
                    }}>
                        <Typography
                        sx={{
                          fontSize: "3rem",
                          color: "primary.main"
                        }}>Cast</Typography>
                        {topCast ? 
                          <>
                            {topCast.map((item) => (
                            <Typography
                            key={item.name}
                            sx={{
                              color: "accent.main"
                            }}>{item.name}</Typography>
                          ))}
                          </> 
                          : "No Top Billed"}
                    </Box>
                </Box>  
                {/* streaming services-bottom */}
                {services ? 
                <Box> 
                  {services.map((service) => (
                    <Box 
                      key={service.provider_name}
                      sx={{
                        height: "4rem",
                        width: "4rem",
                        borderRadius: "5rem"
                      }}
                      component="img" 
                      src={`https://image.tmdb.org/t/p/original/${service.logo_path}`} alt="stream logo" />
                  ))}
                  </Box>
                  : <Typography
                      sx={{
                        color: "primary.main"
                      }}>Not on Streaming...</Typography>}
          </Box>
        </ListItem>
      </List>
      : <Typography sx={{ color: "accent.main", fontSize: "2rem"}}>No movies match this search...</Typography>
      }
      </>
    )
  }

export default MovieDisplay;