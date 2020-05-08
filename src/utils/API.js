import axios from "axios";
const BASEURL = "https://randomuser.me/api/?nat=US&exc=id,registered,gender,location,dob,cell,nat&results=";
const quantity = 5;

export default {
  search: function() {
    return axios.get(BASEURL + quantity);
  }
};