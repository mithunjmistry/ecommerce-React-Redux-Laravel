const base_url = "http://127.0.0.1:8000/api/";

export const subitemsAPI = (subCategory) => (
    `${base_url}subitems/${subCategory}`
);