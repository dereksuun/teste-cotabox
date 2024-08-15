<template>
  <div>
    <input v-model="firstName" placeholder="First name" />
    <input v-model="lastName" placeholder="Last name" />
    <input v-model="participation" type="number" placeholder="Participation" />
    <button @click="submitForm">SEND</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      participation: 0,
      message: ''
    }
  },
  methods: {
    async submitForm () {
      if (!this.firstName || !this.lastName || !this.participation) {
        this.message = 'Todos os campos são obrigatórios.'
        return
      }

      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation($firstName: String!, $lastName: String!, $participation: Int!) {
              addParticipation(firstName: $firstName, lastName: $lastName, participation: $participation) {
                id
              }
            }
          `,
          variables: {
            firstName: this.firstName,
            lastName: this.lastName,
            participation: parseInt(this.participation)
          }
        })
        this.$emit('new-entry', {
          firstName: this.firstName,
          lastName: this.lastName,
          participation: this.participation
        })
        this.message = 'Participação adicionada com sucesso!'
        this.firstName = ''
        this.lastName = ''
        this.participation = 0
      } catch (error) {
        this.message = 'Erro ao adicionar participação: ' + error.message
      }
    }
  }
}
</script>

<style scoped>
input {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

button {
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #369f6e;
}

p {
  margin-top: 10px;
  color: red;
}
</style>
