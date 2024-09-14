import api from "./api";

export const findAllFilm = async() => {
    try {
        const response = await api.get('/api/films');
        return response.data;
    } catch (error) {
        console.error("Error fetching films:", error);
        throw error;
    }
}

export const findFilmById = async (id) => {
    return await api.get(`/api/films/${id}`);
}

// export const findFilmByTitle = async (id) => {
//     try {
//         const response = await api.get(`/api/films/search`, {
//             params: { title }
//         });
//         return response.data; 
//     } catch (error) {
//         console.error("Error finding film by title:", error);
//         throw error;
//     }
// }

export const createFilm = async (product) => {
    return await api.post("/api/films/create", product);
}

export const updateFilm = async (product) => {
    return await api.put("/api/films/update", product);
}

export const deleteFilmById = async (id) => {
    return await api.delete(`/api/films/${id}`);
}