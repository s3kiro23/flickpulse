import React from 'react'
import styles from './MovieDetails.module.scss'
import Image from 'next/image';

const MovieDetails = ({movie}) => {
    console.log(movie)
  return (
    <div className={styles.details}>
        <div className={styles.background}>
            <Image src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/original${movie.backdrop_path}`} fill alt={movie.title}/>
        </div>
        <div className={styles.content}>
            <Image src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_PATH}/w342${movie.poster_path}`} width={250} height={400} alt={movie.title}/>
            <div className={styles.description}>
                <h1>
                    {movie.title} {" "}
                    <span className={styles.release}>({new Date(movie.release_date).toLocaleDateString("fr-FR")})</span>
                </h1>
            </div>
        </div>
    </div>
  )
}

export default MovieDetails