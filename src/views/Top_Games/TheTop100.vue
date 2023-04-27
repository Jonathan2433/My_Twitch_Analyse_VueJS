<template>
    <div>
        <h2>Top 100 Twitch Streams</h2>
        <input
            type="text"
            id="search-input"
            placeholder="Rechercher une catégorie"
            v-model="searchQuery"
        />
        <div class="top-games-container">
            <div
                class="game"
                v-for="(game, index) in paginatedGames"
                :key="game.id"
                @click="redirectToTwitch(game)"
            >
                <!-- Lors d'une recherche, le ranking sur 100 n'est pas réinitialiser avec l'index de la boucle  -->
                <div v-if="searchQuery">
                    <div class="rank">{{ game.originalRank }}</div>
                </div>
                <!-- Initialisation du ranking de 1 à 100 -->
                <div v-else>
                    <div class="rank">{{ (currentPage - 1) * 20 + index + 1 }}</div>
                </div>
                <div class="game-info">
                    <img
                        :src="game.box_art_url.replace('{width}x{height}', '300x400')"
                        :alt="game.name"
                        class="game-image"
                    />
                    <div class="game-name" @click="redirectToTwitch(game.name)">
                        {{ game.name }}
                    </div>
                </div>
            </div>
        </div>
        <div class="pagination">
            <button @click="previousPage" :disabled="currentPage === 1">Précédent</button>
            <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
        </div>
        <p>Page {{ currentPage }} sur {{ totalPages }}</p>
    </div>
</template>

<script>
import axios from 'axios'
import autoComplete from '@tarekraafat/autocomplete.js'

const clientId = 'ghcpdfskl6dqnkfqijx3vjht02zqgo'
const access_token = '0wz7r1zmzohfaizos335a2gnb7e83p'

export default {
    name: 'TheTop100',
    data() {
        return {
            topGames: [], // Tableau pour stocker le résultat de la recherche
            searchQuery: '', // Recherche de l'utilisateur
            originalRankings: [], // Tableau pour stocker les 100 catégories avec leurs rank
            currentPage: 1, // Initialisation de la page actuel
            pageSize: 20 // Nombre de catégorie par page
        }
    },
    mounted() {
        this.getTopGames()
    },
    methods: {
        // Méthode pour récupérer les top catégories actuellement sur twitch
        async getTopGames() {
            const response = await axios.get('https://api.twitch.tv/helix/games/top?first=100', {
                headers: {
                    'Client-ID': clientId,
                    Authorization: 'Bearer ' + access_token
                }
            })
            this.topGames = response.data.data
            this.originalRankings = this.topGames.map((game, index) => index + 1)
            this.initAutoComplete()
        },
        // Initialisation et paramètrage de la barre de recherche
        initAutoComplete() {
            const searchInput = document.querySelector('#search-input')

            const autoCompletejs = new autoComplete({
                data: {
                    src: this.topGames,
                    cache: true,
                    key: 'name'
                },
                selector: '#search-input',
                threshold: 2,
                debounce: 300,
                searchEngine: 'strict',
                highlight: true,
                maxResults: 10,
                onSelection: (feedback) => {
                    searchInput.blur()
                    this.redirectToTwitch(feedback.selection.value)
                }
            })
        },
        // Méthode pour rediriger l'utilisateur sur la catégorie Twitch
        redirectToTwitch(game) {
            window.open(`https://www.twitch.tv/directory/game/${game.name}`, '_blank')
        },
        // Méthode pour retourner les catégories en cours d recherche avec le rank sur 100
        searchGames(query) {
            this.resetPage() // réinitialise le numéro de page actuel à 1
            const filteredGames = this.topGames.filter((game) => {
                return game.name.toLowerCase().includes(query.toLowerCase())
            })
            const rankedGames = filteredGames.map((game) => {
                const originalRank = this.originalRankings[this.topGames.indexOf(game)]
                return { ...game, originalRank }
            })
            return rankedGames.sort((a, b) => a.originalRank - b.originalRank)
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++
            }
        },
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--
            }
        },
        resetPage() {
            this.currentPage = 1
        }
    },
    computed: {
        // Fonction pour renvoyer les 100 catégories de l'appel de l'API SI searchQuery est vide
        filteredGames() {
            if (this.searchQuery === '') {
                return this.topGames
            } else {
                return this.searchGames(this.searchQuery)
            }
        },
        totalGames() {
            return this.filteredGames.length
        },
        totalPages() {
            return Math.ceil(this.totalGames / this.pageSize)
        },
        // Fonction pour renvoyer les jeux 20 par 20
        paginatedGames() {
            const start = (this.currentPage - 1) * this.pageSize
            const end = start + this.pageSize
            return this.filteredGames.slice(start, end)
        }
    }
}
</script>

<style scoped>
.top-games-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 20px 0px;
}

.game {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    overflow: hidden;
    width: calc(25% - 20px);
    cursor: pointer;
}

.game .rank {
    align-items: center;
    background-color: hsla(160, 100%, 37%, 1);
    color: #fff;
    display: flex;
    flex-direction: column;
    font-size: 2rem;
    font-weight: bold;
    height: 100%;
    justify-content: center;
    padding: 20px;
    width: 60px;
}

.game .game-info {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.game .game-image {
    display: block;
    margin: 0 auto;
    max-height: 200px;
    height: 200px;
    width: 150px;
}

.game .game-name {
    color: hsla(160, 100%, 37%, 1);
    font-size: 1.5rem;
    font-weight: bold;
    margin: 10px 0;
    cursor: pointer;
}

.game .game-viewers {
    color: #000;
    font-size: 1rem;
    font-weight: bold;
}

#search-input {
    padding: 10px;
    font-size: 1.5rem;
    border: 2px solid hsla(160, 100%, 37%, 1);
    border-radius: 5px;
    width: 50%;
    margin-bottom: 20px;
}

#search-input:focus {
    outline: none;
    border-color: hsla(160, 100%, 47%, 1);
    box-shadow: 0px 0px 5px hsla(160, 100%, 47%, 0.5);
}

.pagination button {
    background-color: #4caf50; /* Green background color */
    border: none; /* Remove borders */
    color: white; /* White text color */
    padding: 12px 24px; /* Padding */
    text-align: center; /* Center text */
    text-decoration: none; /* Remove underline */
    display: inline-block; /* Make it inline */
    font-size: 16px; /* Font size */
    margin: 4px 2px; /* Margin */
    cursor: pointer; /* Add cursor on hover */
    border-radius: 5px; /* Rounded corners */
}

.pagination button:hover {
    background-color: #3e8e41; /* Darker green on hover */
}

.pagination button:disabled {
    background-color: #ddd; /* Grey background for disabled button */
    color: #bbb; /* Lighter text color for disabled button */
    cursor: not-allowed; /* Disabled cursor on hover */
}
</style>
