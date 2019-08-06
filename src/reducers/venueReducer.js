import constants from '../constants'


var initialState = {
	all: null,
	currentUser: null // signed in user
}

export default (state = initialState, action) => {
	let newState = Object.assign({}, state)

	switch (action.type) {

        case constants.SELECT_VENUE:
            console.log('SELECT_VENUE: ' + JSON.stringify(action.data));
            newState['selectedVenue'] = action.data
            return newState

		default:
			return state
	}
}