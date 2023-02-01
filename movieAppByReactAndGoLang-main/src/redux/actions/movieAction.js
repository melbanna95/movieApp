import { AllMOVIES, MovieApi } from '../types/moviesType'
import axios from 'axios'




export const getAllMovie = () => {
    return async (dispatch) => {
        const res = await axios.get(MovieApi)
        dispatch({ type: AllMOVIES, data: res.data.results, pages: res.data.total_pages })

    }
}

export const getMovieSearch = (word) => {
    return async (dispatch) => {
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c851876a073c39e320f8b0202bb126d5&query=${word}&language=ar`)
        dispatch({ type: AllMOVIES, data: res.data.results, pages: res.data.total_pages })

    }
}


export const getPage = (page) => {
    return async (dispatch) => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=c851876a073c39e320f8b0202bb126d5&language=ar&page=${page}`)

        dispatch({ type: AllMOVIES, data: res.data.results, pages: res.data.total_pages })

    }
}



