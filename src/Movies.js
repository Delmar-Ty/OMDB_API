import './Movies.css';

const Movies = ( { content } ) => {
    if (content !== undefined) {
        return (
            <>
            <div className='movie-container'>
                {content.map((data, index) => {
                    const poster = (data.Poster === 'N/A')? <div className='NA'><p>{data.Title}</p><img src='/placeholder.png' alt='placeholder'></img></div>: <img src={data.Poster} alt={data.Title} className='movie-img'></img>;
                    return (
                        <div className='movie-item' key={index}>
                            {poster}
                            <div className='effect'>
                                <div className='info'>
                                    <p>Runtime: {data.Runtime}</p>
                                    <p>Rated: {data.Rated}</p>
                                    <p>Language: {data.Language}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <br></br>
            </>
        );
    } else {
        return (
            <div className='movie-container'>

            </div>
        );
    }
}

export default Movies;