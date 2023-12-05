import { Button } from "@mui/material";
import "../assets/css/LandingPage.css";
import NavBar from "../components/NavBar";
import useFetch from "../hooks/useFetch";

const LandingPage = () => {

    //discover why this is fetching 6 times per page load
    const topMoviesRequest = useFetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", process.env.REACT_APP_API_ACCESS_TOKEN);
    const topMovies = topMoviesRequest.data?.results;

    return(
        <>
            <NavBar />
            <div className="hero">
                <h2 className="title">
                    CouchCat
                </h2>
                <h2 className="tagline">
                    Spend your time watching.
                </h2>
                <Button variant="outlined">Find your Movie!</Button>
            </div>
            <h1>Top Movies of the Day</h1>
            <div className="topMovies">
                {topMovies && topMovies.length > 0 ? (
                    <>
                    {topMovies.slice(0, 3).map((movie) => (
                        <div key={movie.id} className="topMovie">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie poster" />
                                <h2>{movie.original_title}</h2>
                                <h2>{movie.overview}</h2>
                        </div>
                    ))}
                    </>
                    ) : (<div>Loading top movies...</div> )
                        }
            </div>
        </>
    )
}

export default LandingPage;