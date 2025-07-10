import axios from 'axios'

export const getTranslatedMessage = async (
  text: string,
  from: string,
  to: string
) => {
  const encoded = encodeURIComponent(text)
  const langpair = `${from}|${to}`
  const url = `https://api.mymemory.translated.net/get?q=${encoded}&langpair=${langpair}`

  try {
    const res = await axios(url)
    return res.data
  } catch (error) {
    console.error(error)
  }
}
