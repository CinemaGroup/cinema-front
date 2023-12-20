export const convertMinutes = (totalMinutes: number) => {
	const hours = Math.floor(totalMinutes / 60)
	const minutes = totalMinutes % 60

	if (hours === 0) return `${minutes}mins`
	if (minutes === 0) return `${hours}hr`

	return `${hours}hr ${minutes}mins`
}
