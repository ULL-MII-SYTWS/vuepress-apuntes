<template>
  <div>
    <div v-for="(team, index) in teams" :key="team.name">
    <details>
        <summary>{{ pad(index+1,2) }}: {{ team.userName }}</summary>
          <ul>
            <li><img :src="team.avatarUrl" /></li>
            <li>Team <a :href="team.url" target="_blank">{{ team.name }}</a></li>
            <li><a :href="team.repositories" target="_blank">Repositories</a></li>
            <li><a :href="team.notifications" target="_blank"> Notifications</a> from {{ team.userName  }}</li>
            <li><a :href="team.userUrl" target="_blank">{{ team.userName }}  ({{ team.login }})</a>  at GitHub</li>
            <li><a :href="team.memberAccessUrl" target="_blank">{{ team.userName }} ({{ team.login }})</a> at the Organization</li>
            <details>
            <summary>Related Labs</summary>
              <ol>
                <li v-for="lab in labFiles" :key="lab.frontmatter.key"> {{ lab.title }}
                  <studentActivity v-if="lab.frontmatter.key" 
                  :lab="lab.frontmatter.key" 
                  :student="team.name" 
                  :name="team.userName"></studentActivity>
                </li>
              </ol>
            </details>
          </ul>
    </details>
    </div>
  </div>
</template>

<script>
// Check the team has only one member
//import Teams from '../teams.mjs'
import Teams from '../teams.json'


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalizeFirstLetterOfEachWord(string) {
  let words = string.split(/[-_]/);
  words.pop();
  return words.map(capitalizeFirstLetter).join(' ');
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
      return this.rawTeams.map(team => {
        let node = team.node
        if (node.members.totalCount === 0) {
          return {
            name: node.name,
            totalCount: node.members.totalCount,
            url: node.url,
            avatarUrl: '',
            repositories: node.url + '/repositories',
            userName: capitalizeFirstLetterOfEachWord(node.name),
            memberAccessUrl: '',
            userUrl: '',
            notifications: '',
            login: ''
          }
        }
        let firstMember = node.members.edges[0]
        let member = firstMember.node
        const user = {
          name: node.name,
          totalCount: node.members.totalCount,
          url: node.url,
          avatarUrl: member.avatarUrl,
          repositories: node.url + '/repositories',
          userName: capitalizeFirstLetterOfEachWord(node.name),
          memberAccessUrl: firstMember.memberAccessUrl,
          userUrl: member.url,
          notifications: `https://github.com/notifications?query=author%3A${member.login}`,
          login: member.login
        }
        return user
      }).filter(team => team.totalCount === 1)
    },
    labFiles() { // DRY: Code repeated in practicas.vue
      let pages = this.$site.pages;
      let labs = pages.filter((page) => page.frontmatter.published && /practicas.[a-z\d]/.test(page.relativePath)
      ); // Ignore files starting for uppercase as README.md
      return labs.sort(
        (a, b) => Number(b.frontmatter.order) - Number(a.frontmatter.order)
      );
    },
  },
  methods: {
    // write a function that receives an integer and a length and returns a string with the integer padded with zeros to the left
    // until it reaches the length
    pad(number, length) {
      let str = '' + number;
       while (str.length < length) {
         str = '0' + str;
       }
      return str;
   }
  }
}
</script>

<style scoped>
details {
  border: 1px solid rgb(176, 26, 190);
  border-radius: 4px;
  padding: .4em .4em 0;
}
summary {
  /* font-weight: bold; */
  font-size: 1em;
}
summary:hover {
  cursor: pointer;
}

details:hover {
  background: #dcf4fc;
}

ol {
  list-style-type: decimal;
  padding-left: 0;
}

ul {
  list-style-type: square;
  list-style-position: inside;
  padding-left: 0;
}
li {
  margin: 0;
}



</style>