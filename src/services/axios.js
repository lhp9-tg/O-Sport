import axios from 'axios'
import { VITE_API_SERVER_URL } from '../env'

// l'idée c'est de créer une instance d'axios préconfigurée que l'on pourra utiliser partout dans notre code


// on crée une instance avec une URL de base, on aura juste à compléter l'URL au besoin, lorsqu'on effectuera des requêtes
// ex : axiosInstance.get('/recipes') fera une requete sur ...
export const axiosInstance = axios.create({
    baseURL: VITE_API_SERVER_URL
})

// on peut aussi utiliser un middleware pour configurer notre requête avant de l'envoyer
axiosInstance.interceptors.request.use((config) => {

    // ici le MW essaye de récupérer le user dans le storage
    const user = JSON.parse(localStorage.getItem('user'))

    console.log(user);

    // si il le trouve, il ajoute un headers Authorization avec comme valeur le token du localstorage
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }

    return config;
})

// * On utilise cette instance dans userActions.js et recipesActions.js