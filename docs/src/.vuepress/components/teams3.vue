<template>
  <div>
    <h2>{{ totalCount }} Teams</h2>
    <ul>
      <li v-for="team in teams" :key="team.name"> <a :href="team.url">{{ team.name }} ({{ team.length }} member)</a>
        <ul>
          <li><a :href="team.repositories" target="_blank">Repositories</a></li>
          <li><a :href="team.userUrl" target="_blank">{{ team.userName }}</a></li>
          <li><a :href="team.notifications" target="_blank"> Notifications</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import Teams from '../teams.mjs'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default {
  data() {
    return {
      rawTeams: Teams.data.organization.teams.edges,
      totalCount: Teams.data.organization.teams.totalCount,

    }
  },
  computed: {
    teams() {
      if (!this.rawTeams || !Array.isArray(this.rawTeams)) {
        return []
      }
      return this.rawTeams.map(team => {
        let node = team.node;
        //console.log(node.name)
        //console.log(node.url)
        let members = node?.members?.edges
        if (!members || !Array.isArray(members) || members.length === 0) {
          //console.log(members);
          //console.log('no members')
          return {
            name: node.name,
            url: node.url,
            repositories: node.url + '/repositories',
            userName: capitalizeFirstLetter(node.name.split(/[-_]/)[0]),
            userUrl: '',
            notifications: '',
            length: 0,
          }
        }
        let member = members[0].node
        //console.log(member.login)
        //console.log(member.name)
        const user = {
          name: node.name,
          url: node.url,
          repositories: node.url + '/repositories',
          userName: member.name || capitalizeFirstLetter(node.name.split(/[-_]/)[0]),
          userUrl: member.url,
          notifications: `https://github.com/notifications?query=author%3A${member.login}`,
          length: members.length,
        }
        return user
      })
    }
  }
}
</script>