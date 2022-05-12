const createAvatar = (text) => {
  // const DEFAULT_AVATAR =
  //   'https://www.gravatar.com/avatar/c21f969b5f03d33d43e04f8f136e7682?d=robohash&s=200'

  const newAvatar = `https://robohash.org/${text
    .replace(/[^a-zA-Z]/g, '')
    .toLowerCase()}.png?size=100x100&set=set1`

  return newAvatar
}

module.exports = createAvatar
