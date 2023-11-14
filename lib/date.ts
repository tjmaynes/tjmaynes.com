export const getFormattedDate = (dateString: string) => {
  return new Intl.DateTimeFormat('en-us', { dateStyle: 'long' }).format(
    new Date(dateString)
  )
}
