module.exports = `
type Mutation {
  talkFavorite(input: TalkFavoriteInput!) : TalkFavoritePayload!
  talkAdd(input: TalkAddInput!) : TalkAddPayload!
}
`;
