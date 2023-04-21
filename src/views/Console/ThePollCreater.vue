<template>
    <div>
        <h1>Créer un sondage</h1>
        <form @submit.prevent='createPoll'>
            <label htmlFor='question'>Question :</label>
            <input type='text' id='question' v-model='question' required>

            <label htmlFor='choices'>Choix (séparés par une virgule) :</label>
            <input type='text' id='choices' v-model='choices' required>

            <label htmlFor='duration'>Durée du sondage (secondes):</label>
            <input type='number' id='duration' v-model='duration' min=30  step="30" required>

            <label htmlFor='channel_points_voting_enabled'>Vote avec points de chaîne ? </label>
            <input type='checkbox' id='channel_points_voting_enabled' v-model='channel_points_voting_enabled' @change="updateChannelPointsPerVote">

            <label htmlFor='channel_points_per_vote'> Nombre de point de chaîne par vote :</label>
            <input type='number' id='channel_points_per_vote' v-model='channel_points_per_vote' step='100' :required="channel_points_voting_enabled">


            <button type='submit'>Créer le sondage</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            question: '',
            choices: '',
            duration: 30,
            channel_points_voting_enabled: false,
            channel_points_per_vote: 0
        };
    },

    methods: {
        createPoll() {
            const channelId = '144395906';
            const clientId = 'ghcpdfskl6dqnkfqijx3vjht02zqgo';
            const accessToken = '9jfu059cnliwdj23a1sp6kvjmg1byv';


            const choicesArray = this.choices.split(',').map(choice => choice.trim());

            let choicesAssociatifArray = [];
            for (let i = 0; i < choicesArray.length; i++){
                choicesAssociatifArray.push({'title':choicesArray[i]});
            }

            const requestBody = {
                "broadcaster_id": channelId,
                "title": this.question,
                "choices": choicesAssociatifArray,
                "channel_points_voting_enabled": this.channel_points_voting_enabled,
                "channel_points_per_vote": this.channel_points_per_vote,
                "duration": this.duration
            };
            console.log(requestBody)
            axios.post(`https://api.twitch.tv/helix/polls`, requestBody, {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    'Client-Id': clientId,
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    console.log(response.data);
                    alert('Le sondage a été créé avec succès !');
                })
                .catch(error => {
                    console.error(error);
                    alert('Une erreur est survenue lors de la création du sondage.');
                });
        },

        updateChannelPointsPerVote() {
            if (this.channel_points_voting_enabled) {
                this.channel_points_per_vote = 100;
            }
        }
    },
};
</script>

<style scoped>
h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    max-width: 500px;
    margin: 0 auto;
}

label {
    font-size: 1.2rem;
    font-weight: bold;
}

input[type="text"],
input[type="number"],
input[type="checkbox"] {
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
}

button[type="submit"] {
    padding: 0.5rem;
    background-color: #6441a5;
    color: #fff;
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    width: 100%;
}

button[type="submit"]:hover {
    background-color: #8c64d2;
}
</style>
