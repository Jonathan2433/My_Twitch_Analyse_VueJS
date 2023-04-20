<template>
  <h2>RÉSUMÉ :</h2>
  <div class="resume">
    <div class="main-content">
      <div class="total-followers">
        <h1>{{ totalFollowers }}</h1>
        <p>Followers</p>
      </div>
      <div class="recent-followers">
        <h3>Mes 3 derniers followers :</h3>
        <div class="recent-followers-container">
          <UserCard v-for="(follower, index) in followerData" :key="index"
                    :profile-image-url="follower.profile_image_url"
                    :display-name="follower.display_name"
                    :followed-at="recentFollowers[index].followed_at"
                    bgColor="rebeccapurple"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import UserCard from "@/components/UserCard.vue";
// GET ACCESS TOKEN
// axios.post('https://id.twitch.tv/oauth2/token', {
//   client_id: 'ghcpdfskl6dqnkfqijx3vjht02zqgo',
//   client_secret: 'o9h6lgd7iab9oatgyn3ootozpbpd2e',
//   grant_type: 'client_credentials'
// })
//     .then(function (response) {
//       console.log(response);
//     })

export default {
  name: 'theResume',
  components: {UserCard},
  data() {
    return {
      totalFollowers: 0,
      recentFollowers: [],
      followerData: []
    }
  },
  mounted() {
    this.getFollowers()
  },
  methods: {
    async getFollowers() {
      const clientId = 'ghcpdfskl6dqnkfqijx3vjht02zqgo'
      const userId = '144395906'
      const access_token = '0wz7r1zmzohfaizos335a2gnb7e83p'

      try {
        const response = await axios.get(
          `https://api.twitch.tv/helix/users/follows?to_id=${userId}`,
          {
            headers: {
              'Client-ID': clientId,
              Authorization: 'Bearer ' + access_token
            }
          }
        )

        this.totalFollowers = response.data.total

        const usersResponse = await axios.get(
          `https://api.twitch.tv/helix/users/follows?to_id=${userId}&first=3`,
          {
            headers: {
              'Client-ID': clientId,
              Authorization: 'Bearer ' + access_token
            }
          }
        )

        this.recentFollowers = usersResponse.data.data

        for (let i = 0; i < 3; i++) {
          const follower = this.recentFollowers[i].from_id
          const followerResponse = await axios.get(
            `https://api.twitch.tv/helix/users?id=${follower}`,
            {
              headers: {
                'Client-ID': clientId,
                Authorization: 'Bearer ' + access_token
              }
            }
          )
          this.followerData.push(followerResponse.data.data[0])
        }
      } catch (error) {
        console.log(error)
      }
    },
    formatDate(date) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
      return new Date(date).toLocaleDateString('fr-FR', options)
    }
  }
}
</script>

<style scoped>
h2 {
  padding: 20px;
  color: white;
}

.resume {
  background-color: #1d1d1d;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-links a {
  margin-left: 1.5rem;
  color: #fff;
  font-size: 1.25rem;
}

.main-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.total-followers {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: #2c2c2c;
  border-radius: 10px;
}

.total-followers h1 {
  font-size: 4rem;
  margin-bottom: 0.5rem;
  color: rebeccapurple;
  font-weight: bold;
}

.total-followers p {
  font-size: 1.5rem;
  margin-bottom: 0;
}

.recent-followers {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: #2c2c2c;
  border-radius: 10px;
  margin-bottom: 1.5rem;
}

.recent-followers h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.recent-followers-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.follower {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  color: #fff;
  background-color: rebeccapurple;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
}

.follower img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
}

.follower p {
  font-size: 1.5rem;
  margin-bottom: 0;
}

@media only screen and (min-width: 1280px) {
  .resume {
    margin: 0 auto;
  }

  .main-content {
    flex-direction: row;
    padding: 0;
  }

  .total-followers {
    margin-right: 2rem;
    margin-bottom: 0;
    padding: 2rem;
  }

  .recent-followers {
    padding: 2rem;
    margin-bottom: 0;
  }

  .recent-followers-container {
    flex-direction: row;
    gap: 20px;
  }

  .follower {
    width: auto;
  }
}
</style>
