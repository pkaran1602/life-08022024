import axios from "axios";
import authHeader from "./authheader/auhHeader";
import API_URL from "src/base_url/Base_Url";

export const get_details = async ()=>{
    return axios.get('https://jsonplaceholder.typicode.com/users').then((res)=>{
        return res.data;
    })
}

export const get_users_list = async () => {
    return axios.get(API_URL + "getUsers", {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const get_feedback_list = async () => {
    return axios.get(API_URL + "get_feedbacks", {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const get_affiliation_list = async () => {
    return axios.get(API_URL + "get_affiliations", {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const get_admin_data = async () => {
    return axios.get(API_URL + "get_admin_detail", {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const update_admin_data = async (user_data) => {
    return axios.post(API_URL + "update_profile",user_data, {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const addAffiliation_data = async (user_data) => {
    return axios.post(API_URL + "addAffiliation",user_data, {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const remove_affiliation_data = async (id) => {
    return axios.get(API_URL + "remove_affiliation/" + id, {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const edit_affliation_data = async (user_data) => {
    return axios.post(API_URL + "edit_affiliation",user_data, {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const change_password = async (data) => {
    return axios.post(API_URL + "changePassword",data, {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const get_pust_notifications_data = async () => {
    return axios.get(API_URL + "notification_list", {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const send_pust_notification = async (data) => {
    return axios.post(API_URL + "send_notification",data, {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const forgot_pass = async (user_data) => {
    return axios.post(API_URL + "forgotPassword",user_data, {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const verify_otp = async (user_data) => {
    return axios.post(API_URL + "verifyOTP",user_data, {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const reorder_data = async (data) => {
    return axios.post(API_URL + "re_order_affiliation",data, {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const reset_Password = async (data) => {
    return axios.post(API_URL + "resetPassword",data, {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};

export const get_userStatistics = async (data) => {
    return axios.post(API_URL + "get_userStatistics",data, {
        headers: authHeader()
    }
    ).then((response) => {
        return response.data;
    });
};