import './Search.css';
import Movies from './Movies';
import { useState, useEffect } from 'react';

const Search = () => {
    //Finished

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);


    useEffect(() => {
        const updateContent = async () => {
            const initialFetch = new Promise((res, rej) => {
                const fetchMovies = async () => {
                    try {
                        const response = await fetch(`http://www.omdbapi.com/?apikey=80a07ef7&s=${query}`);
                        const data = await response.json();
        
                        const secondaryFetch = new Promise((res, rej) => {
                            try {
                                if (data.Response === 'True') {
                                    // const allMovies = [];
                                    // const eachMovie = async (id) => {
                                    //     const promise = new Promise((res, rej) => {
                                    //         try {
                                    //             const fetchEach = async () => {
                                    //                 const response = await fetch(`http://www.omdbapi.com/?apikey=80a07ef7&i=${id}`);
                                    //                 const json = await response.json();
                                    //                 res(json);
                                    //             }

                                    //             fetchEach();
                                    //         } catch (error) {
                                    //             console.error(error);
                                    //         }
                                    //     });

                                    //     return promise;
                                    // }

                                    // data.Search.forEach(async (item) => {
                                    //     allMovies.push(await eachMovie(item.imdbID));
                                    //     if (allMovies.length === data.Search.length) {
                                    //         res(allMovies);
                                    //     }
                                    // });



                                    const allMovies = [];
                                    data.Search.forEach(async (item) => {
                                        const response = await fetch(`http://www.omdbapi.com/?apikey=80a07ef7&i=${item.imdbID}`);
                                        const json = await response.json();
                                        allMovies.push(json);
                                        if (allMovies.length === data.Search.length) {
                                            res(allMovies);
                                        }
                                    });
                                } else {
                                    res(undefined);
                                }
                            } catch (error) {
                                console.error(error);
                            }
                        });
        
                        res(await secondaryFetch);
                    } catch (error) {
                        rej([]);
                    }
                }
        
                fetchMovies();
            });

            const data = await initialFetch;
            setMovies(data);
        }

        updateContent();
    }, [query]);

    // useEffect(() => {
    //     const allMovies = [];
    //     const fetchMovies = async () => {
    //         const response = await fetch(`http://www.omdbapi.com/?apikey=80a07ef7&s=${query}`);
    //         const data = await response.json();
    //         // setMovies(data.Search);

    //         // let idArray = []
    //         if (data.Response === 'True') {
    //             // console.log(data)
    //             const something = async (id) => {
    //                 const response = await fetch(`http://www.omdbapi.com/?apikey=80a07ef7&i=${id}`);
    //                 const json = await response.json();
    //                 allMovies.push(json);
    //             }

    //             data.Search.forEach((item) => {
    //                 something(item.imdbID);
    //             });
    //          }

    //         //  console.log(allMovies);
    //         // setMovies(allMovies)
    //     }

    //     fetchMovies();
    //     // setMovies(allMovies);
    //     // console.log(movies)
    //     // console.log(allMovies);
    //     setMovies(allMovies)
    // }, [query]);

    return (
        <>
            <div className='search'>
                <input type={'search'} className='search-bar' placeholder='Search' onChange={() => {setQuery(document.querySelector('input[type="search"]').value)}}></input>
            </div>
            <Movies content={movies}/>
        </>
    );
}

export default Search;