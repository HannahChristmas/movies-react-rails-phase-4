import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Box } from "../styles";



function MovieCard( {user} ) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState("")

    useEffect(() => {
        fetch(`/movies/${id}`).then((res) => {
            if (res.ok) {
                res.json().then((movie) =>
                setMovie(movie)
                );
            } else {
                res.json().then(alert("This movie does not exist. Add it here at our Add Movie page.")).then(navigate("/"));
            }
        });
    }, [id]);

    return (
        <Wrapper>
            <Box>
                <h1>{movie.title}</h1>
                <h1>{movie.genre}</h1>
                <h1>{movie.year}</h1>
            </Box>
        </Wrapper>
    )
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
`;

export default MovieCard;