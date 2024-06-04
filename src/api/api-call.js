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
    craeteChecklists: async (data) => {
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
    fetchAllGroups: async () => {
        try {
            const response = await axios.get(baseDetails.CORE_SERVICE_URL + 'groups', {
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
    postGroups: async (data) => {
        try {
            const response = await axios.post(baseDetails.CORE_SERVICE_URL + 'groups', data, {
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
    convertChecklist: async (data) => {
        try {
            const response = await axios.post(baseDetails.CORE_SERVICE_URL + 'checklistConverter/convertChecklist', data, {
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('atoken')}`,
                // },
            });
            return response.data;
        } catch (error) {
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
    fetchChecklistById: async (id) => {
        try {
            const response = await axios.get(baseDetails.CORE_SERVICE_URL + `checklist/id/${id}`, {
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('atoken')}`,
                // },
            });
            return response.data;
        } catch (error) {
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
