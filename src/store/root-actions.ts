import { filesFiltersSlice } from './filters/files/files-filters.slice'
import { mediaFiltersSlice } from './filters/media/media-filters.slice'
import * as userActions from './user/user.actions'

export const rootActions = {
	...userActions,
	...mediaFiltersSlice.actions,
	...filesFiltersSlice.actions,
}
