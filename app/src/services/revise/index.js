// const { Revise } = require("revise-sdk");
const {Revise} = require ('revise-sdk');
const AUTH_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk2NTI1ODlhLWY4ZmYtNDlhMS05YjljLWFlNjFkZjJiNmI2YiIsImtleSI6ImNyc2JpdnA3IiwiaWF0IjoxNjcwMDg3Mjg5fQ.oGeALbBh_eNBSLeEdPbyagVH3sS4JX5l-3ZeG3PQYBc'; //this needs to be replaced by the AUTH TOKEn you generate
const revise = new Revise ({auth: AUTH_TOKEN});

async function run () {
  const collection = await revise.addCollection ({
    name: 'Kitai Hazure 1',
    uri: 'kitaihazure1',
  });

  const nft = await revise.addNFT (
    {
      image: 'https://cdn.technadu.com/wp-content/uploads/2021/07/Eren-Yeager-696x392.jpg',
      name: 'Kitai Hazure 1',
      tokenId: '4',
      description: 'This is our Revise NFT Collection',
    },
    [{strength: '80'}, {color: 'maroon'}, {reps: '90'}, {agility: '12'}],
    collection.id
  );

  console.log (nft);
}
try {
  run ();
} catch (err) {
  console.log("ERRRRORRRR");
}
