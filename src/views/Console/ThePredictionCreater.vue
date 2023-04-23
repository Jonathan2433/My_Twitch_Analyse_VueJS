<template>
    <div>
        <h2>Créer une prédiction</h2>
        <form @submit.prevent="createPrediction">
            <div>
                <label for="title">Titre :</label>
                <input type="text" id="title" v-model="title" />
            </div>
            <div>
                <label for="choices">Choix :</label>
                <textarea id="outcomes" v-model="outcomes"></textarea>
                <small>Un choix par ligne</small>
            </div>
            <div>
                <label for="prediction_window">Durée (en secondes) :</label>
                <input type="number" id="prediction_window" v-model="prediction_window" />
            </div>
            <button type="submit">Créer la prédiction</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'ThePredictionCreater',
    data() {
        return {
            title: '',
            outcomes: '',
            prediction_window: ''
        }
    },
    methods: {
         createPrediction() {
             const channelId = '144395906';
             const clientId = 'ghcpdfskl6dqnkfqijx3vjht02zqgo'
             const access_token = 'iuo65boxk4t5tom717nul304zncd26'

            const outcomesArray = this.outcomes.split('\n').filter((outcomes) => outcomes.trim() !== '')

            let outcomesAssociatifArray = [];
            for (let i = 0; i < outcomesArray.length; i++){
                outcomesAssociatifArray.push({'title':outcomesArray[i]});
            }

            const body = {
                broadcaster_id: channelId,
                title: this.title,
                outcomes: outcomesAssociatifArray,
                prediction_window: parseInt(this.prediction_window, 10)
                // prediction_window: this.prediction_window
            }
            axios.post(`https://api.twitch.tv/helix/predictions`, body, {
                headers: {
                    Authorization: 'Bearer ' + access_token,
                    'Client-ID': clientId,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response.data);
                    alert('La prédiction a été créé avec succès !');
                })
                .catch(error => {
                    console.error(error);
                    alert('Une erreur est survenue lors de la création de la prédiction.');
                });
        }
    }
}
</script>
<style scoped>
form div {
    margin-bottom: 1rem;
}

form label {
    display: block;
    margin-bottom: 0.5rem;
}

form input,
form textarea {
    border: none;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 1.2rem;
    padding: 0.5rem;
    width: 100%;
}

form textarea {
    height: 120px;
}

form small {
    display: block;
    margin-top: 0.5rem;
}

form button[type='submit'] {
    background-color: hsla(160, 100%, 37%, 1);
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s ease-in-out;
}

form button[type='submit']:hover {
    background-color: #8c64d2;
}
</style>