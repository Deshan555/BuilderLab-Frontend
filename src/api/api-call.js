import axios from 'axios';
import { baseDetails } from './api-config';
// import { LocalStroage } from './localstorage';
// import { get, random } from 'lodash';

const apiExecutions = {
    getChecklistsFetch: async () => {
        try {
            const response = await axios.get(baseDetails.CORE_SERVICE_URL + 'checklists', {
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('atoken')}`,
                // },
            });
            return response.data;
        } catch (error) {
            console.error('Axios error:', error);
            if (error.response) {
                return error.response.data;
            } else if (error.request) {
                return error.request.data;
            } else {
                console.error('Error setting up the request:', error.message);
            }
            return null;
        }
    },
    postChecklistsFetch: async (data) => {
        try {
            const response = await axios.post(baseDetails.CORE_SERVICE_URL + 'data', data, {
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('atoken')}`,
                // },
            });
            return response.data;
        } catch (error) {
            console.error('Axios error:', error);
            if (error.response) {
                return error.response.data;
            } else if (error.request) {
                return error.request.data;
            } else {
                console.error('Error setting up the request:', error.message);
            }
            return null;
        }
    },
    fetchAllSections: async () => {
        try {
            const response = await axios.get(baseDetails.CORE_SERVICE_URL + 'data', {
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('atoken')}`,
                // },
            });
            return response.data;
        } catch (error) {
            console.error('Axios error:', error);
            if (error.response) {
                return error.response.data;
            } else if (error.request) {
                return error.request.data;
            } else {
                console.error('Error setting up the request:', error.message);
            }
            return null;
        }
    },
    craeteChecklists : async (data) => {
        try {
            const response = await axios.post(baseDetails.CORE_SERVICE_URL + 'checklists', data, {
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('atoken')}`,
                // },
            });
            return response.data;
        } catch (error) {
            console.error('Axios error:', error);
            if (error.response) {
                return error.response.data;
            } else if (error.request) {
                return error.request.data;
            } else {
                console.error('Error setting up the request:', error.message);
            }
            return null;
        }
    },
    // /checklists/:id
    updateChecklist: async (id, data) => {
        try {
            const response = await axios.put(baseDetails.CORE_SERVICE_URL + `checklists/${id}`, data, {
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('atoken')}`,
                // },
            });
            return response.data;
        } catch (error) {
            console.error('Axios error:', error);
            if (error.response) {
                return error.response.data;
            } else if (error.request) {
                return error.request.data;
            } else {
                console.error('Error setting up the request:', error.message);
            }
            return null;
        }
    },
    fetchSectionsByChklName: async (id) => {
        try {
            const response = await axios.get(baseDetails.CORE_SERVICE_URL + `data/checklist/${id}`, {
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('atoken')}`,
                // },
            });
            return response.data;
        } catch (error) {
            console.error('Axios error:', error);
            if (error.response) {
                return error.response.data;
            } else if (error.request) {
                return error.request.data;
            } else {
                console.error('Error setting up the request:', error.message);
            }
            return null;
        }
    },
    // http://localhost:3001/data/checklist/id/933611
    fetchSectionsByChklId: async (id) => {
        try {
            const response = await axios.get(baseDetails.CORE_SERVICE_URL + `data/checklist/id/${id}`, {
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('atoken')}`,
                // },
            });
            return response.data;
        } catch (error) {
            console.error('Axios error:', error);
            if (error.response) {
                return error.response.data;
            } else if (error.request) {
                return error.request.data;
            } else {
                console.error('Error setting up the request:', error.message);
            }
            return null;
        }
    },


    
    };

export { apiExecutions };
