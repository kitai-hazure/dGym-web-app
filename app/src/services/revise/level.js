const {Revise} = require ('revise-sdk');
const AUTH_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk2NTI1ODlhLWY4ZmYtNDlhMS05YjljLWFlNjFkZjJiNmI2YiIsImtleSI6ImNyc2JpdnA3IiwiaWF0IjoxNjcwMDg3Mjg5fQ.oGeALbBh_eNBSLeEdPbyagVH3sS4JX5l-3ZeG3PQYBc'; //this needs to be replaced by the AUTH TOKEn you generate
const revise = new Revise ({auth: AUTH_TOKEN});

const API = async function() {
  const options = [
    // todo -> add more in here
    {strength: 'Level1', color: 'Red', reps: '30', agility: '20', image: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FydG9vbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"},
    {strength: 'Level2', color: 'Blue', reps: '10', agility: '50', image: "https://images.unsplash.com/photo-1606663889134-b1dedb5ed8b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGNhcnRvb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"}
  ]
  const randomIndex =  Math.floor(Math.random() * 2)
  return options[randomIndex];
}

async function runNFT() {
  revise.every('2s').listenTo(API).start(async (data) => {
    const player = await revise.fetchNFT("2172115f-9d08-48d3-ab7f-245c304285c9")
    revise.nft(player)
      .setProperty("strength", data.strength)
      .setProperty("color", data.color)
      .setProperty("reps", data.reps)
      .setProperty("agility", data.agility)
      .setImage(data.image)
      .save()

	return player.image;
  })

}
export default runNFT;