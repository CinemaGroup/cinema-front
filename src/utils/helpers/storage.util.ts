export const setValueToStorage = (name: string, data: any) => {
	localStorage.setItem(name, JSON.stringify(data))
}

export const getValueFromStorage = (name: string) => {
	if (typeof localStorage !== 'undefined') {
		const ls = localStorage.getItem(name)
		return ls ? JSON.parse(ls) : null
	}
	return null
}
