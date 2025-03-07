import axios from 'axios';

const BACKEND_URL = 'http://localhost:8080';

export const signup = async (firstName, lastName, email, password, phoneNumber) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/user/signup`, {
            firstName,
            lastName,
            email,
            password,
            phoneNumber
        });
        return response.data;
    } catch (error) {
        console.error("Signup error:", error.response?.data || error.message);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`http://localhost:8080/user/login?email=${email}&password=${password}`);
        return response.data;
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw error;
    }
};

export const getFlight = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/flight`); // Updated path
        return response.data;
    } catch (error) {
        console.error("Error fetching flights:", error.response?.data || error.message);
        return [];
    }
};


export const addFlight=async(flightName,
    from,
    to,
    departureTime,
    arrivalTime,
    price,
    availableSeats,)=>{
    try{
        const response = await axios.post(`${BACKEND_URL}/admin/flight`, {
        flightName,
        from,
        to,
        departureTime,
        arrivalTime,
        price,
        availableSeats,
        });
        const data = response.data;
        return data;
    }catch(error){
        console.log(error);
    }
};
export const editFlight = async (
    id,
    flightName,
    from,
    to,
    departureTime,
    arrivalTime,
    price,
    availableSeats
  ) => {
    try {
      const res = await axios.put(`${BACKEND_URL}/admin/flight/${id}`, {
        flightName,
        from,
        to,
        departureTime,
        arrivalTime,
        price,
        availableSeats,
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
};
  
export const getHotel = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/hotel`); // Updated path
        return response.data;
    } catch (error) {
        console.error("Error fetching flights:", error.response?.data || error.message);
        return [];
    }
};

export const addHotel = async (
    hotelName,
    location,
    pricePerNight,
    availableRooms,
    amenities
  ) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/admin/hotel`, {
        hotelName,
        location,
        pricePerNight,
        availableRooms,
        amenities,
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  export const editHotel = async (
    id,
    hotelName,
    location,
    pricePerNight,
    availableRooms,
    amenities
  ) => {
    try {
      const res = await axios.put(`${BACKEND_URL}/admin/hotel/${id}`, {
        hotelName,
        location,
        pricePerNight,
        availableRooms,
        amenities,
      });
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };