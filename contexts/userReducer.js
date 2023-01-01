//@ts-nocheck
export const initialState = {
  profilePic: "",
  name: "",
  email: "",
  city: "",
  country: "",
  phone: "",
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "setProfilePic":
      return { ...state, profilePic: action.payload.profilePic };
      break;
    case "setName":
      return { ...state, name: action.payload.name };
      break;
    case "setEmail":
      return { ...state, email: action.payload.email };
      break;
    case "setAddress":
      return {
        ...state,
        city: action.payload.city,
        country: action.payload.country,
      };
      break;

    case "setAll":
      return {
        profilePic: action.payload.profilePic,
        name: action.payload.name,
        email: action.payload.email,
        city: action.payload.city,
        country: action.payload.country,
      };
      break;
    default:
      return state;
  }
};
