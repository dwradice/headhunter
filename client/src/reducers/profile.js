import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  FILTER_PROFILES,
  CLEAR_FILTER,
} from './../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  filtered: [],
  search: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
        search: null,
      };
    case FILTER_PROFILES:
      return {
        ...state,
        search: payload,
        filtered: state.profiles.filter(profile => {
          const regex = new RegExp(`${payload}`, 'gi');
          const stringSkills = profile.skills.toString();
          return (
            profile.occupation.match(regex) ||
            profile.user.name.match(regex) ||
            stringSkills.match(regex)
          );
        }),
        loading: false,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: [],
        search: null,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
}
