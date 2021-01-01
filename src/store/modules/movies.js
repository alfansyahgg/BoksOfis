import movieList from '../../assets/movie-list'
import moviesApi from '../../services/moviesApi'

const SET_SEARCH = "SET_SEARCH"
const SET_FILTER = "SET_FILTER"
const ADD_MOVIE = "ADD_MOVIE"
const DELETE_MOVIE = "DELETE_MOVIE"
const UPDATE_MOVIE = "UPDATE_MOVIE"
const SET_MOVIES = "SET_MOVIE"

const state = {
    movies: movieList,
    search : '',
    filter: {key: 'rating',order: 'desc'}

}

const mutations = {
    [SET_SEARCH](state, search){
        state.search = search
    },
    [SET_FILTER](state, filter){
        state.filter = filter
    },
    [ADD_MOVIE](state, movie){
        state.movies.push(movie)
    },
    [DELETE_MOVIE](state, id){
        state.movies.splice(state.movies.findIndex(movie => movie.id === id),1)
    },
    [UPDATE_MOVIE](state, movie){
        state.movies = state.movies.map(oldMovies => {
            if(movie.id === oldMovies.id){
                return movie
            }

            return oldMovies
        })
    },
    [SET_MOVIES](state,movies){
        state.movies = movies
    }
}

const actions = {
    search({commit}, search){
        commit(SET_SEARCH,search)
    },
    filter({commit}, filter){
        commit(SET_FILTER,filter)
    },
    addMovie({commit,state},movie){

        moviesApi.addMovie(movie).then(res => commit(ADD_MOVIE,res)).catch(err => console.log(err))

        // movie.id = state.movies.length + 1
        // commit(ADD_MOVIE,movie)
    },
    deleteMovie({commit},id){
        moviesApi.deleteMovie(id).then(res => { commit(DELETE_MOVIE,res); return }).catch(err => console.log(err))
    },
    updateMovie({commit},movie){
        moviesApi.updateMovie(movie).then(res => commit(UPDATE_MOVIE,res)).catch(err => console.log(err))
    },
    fetchMovies({commit}){
        moviesApi.getMovies().then(res => commit(SET_MOVIES,res)).catch(err => console.log(err))
    }
}

const getters = {
    getMovies: state => {
        return state.movies.filter(movie => movie.name.toLowerCase().indexOf(state.search.toLowerCase()) > -1).sort(compare(state.filter)) 
    },
    getMovieById: state => id => {
        return state.movies.find(movie => movie.id === id)
    }
}

const compare = ({key,order}) => {
    return(a,b) => {
        // console.log('a key : ' + a[key] +' - ' + b[key])
        let result = 0

        if(a[key] > b[key]){
            result = 1
        }

        if(b[key] > a[key]){
            result = -1
        }

        if(order === 'asc') return result;

        return result *-1
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
}